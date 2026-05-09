"use server"

import { API_ROUTES } from "@/constants/routes";
import { cookies } from 'next/headers';

type ErrorCodes = unknown;

type ApiError = {
    success: false;
    code: ErrorCodes;
    message: string;
};

type ApiSuccess<T> = {
    success: true;
    message: string;
    data: T;
};

export type ApiResponse<T = unknown> = ApiError | ApiSuccess<T>;

export default async function SSRFetcher<T = unknown>(
    path: string,
    options: RequestInit = {},
    isRetry: boolean = false
): Promise<ApiResponse<T>> {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/${path}`;
    const GF_API_KEY = `Bearer ${process.env.NEXT_PUBLIC_NEW_GAMING_AUTHORIZATION}`;
    const cookieStore = cookies();

    try {
        let response = await fetch(baseUrl, {
            ...options,
            headers: {
                Authorization: GF_API_KEY,
                "Content-Type": "application/json",
                ...options.headers,
            },
            next: { revalidate: 0 },
            credentials: options.credentials || "include",
        });

        const contentType = response.headers.get("content-type");
        const isJson = contentType?.includes("application/json");

        if (!response.ok) {
            const errorBody = isJson ? await response.json() : null;

            // console.log('fetcher => ', response.status)
            // Handle 401 Unauthorized (token expired)
            if (response.status === 401 && !isRetry) {
                // 🚫 Prevent infinite loop if the path is already the refresh endpoint
                if (path === API_ROUTES.AUTH.REFRESH) {
                    return {
                        success: false,
                        code: "unauthorized",
                        message: "Refresh token invalid or expired",
                    };
                }

                // console.log('fetcher => again ')
                // Start refresh process
                const refreshResult = await handleTokenRefresh(cookieStore);
                
                console.log('refresh => ', refreshResult)

                if (!refreshResult.success) {
                    return {
                        success: false,
                        code: "unauthorized",
                        message: "Session expired. Please login again.",
                    };
                }

                const { accessToken, refreshToken, accessTokenOptions, refreshTokenOptions } = refreshResult;

                // Helper function to serialize cookie options
                const serializeCookie = (name: any, value: any, options = {}) => {
                    const encodedValue = encodeURIComponent(value ?? '');
                    const optionString = Object.entries(options)
                        .filter(([key]) => key !== 'name') // Skip name if present
                        .map(([key, val]) => `${key}=${val}`)
                        .join('; ');

                    return `${name}=${encodedValue}${optionString ? `; ${optionString}` : ''}`;
                };

                // Create cookie strings with options
                const accessCookie = serializeCookie('accessToken', accessToken, accessTokenOptions);
                const refreshCookie = serializeCookie('refreshToken', refreshToken, refreshTokenOptions);

                response = await fetch(baseUrl, {
                    ...options,
                    headers: {
                        Authorization: GF_API_KEY,
                        "Content-Type": "application/json",
                        ...options.headers,
                        Cookie: `${accessCookie}; ${refreshCookie}`
                    },
                    next: { revalidate: 0 },
                    credentials: options.credentials || "include",
                });
            }

            else return {
                success: false,
                code: (errorBody?.code as ErrorCodes) || "server-error",
                message: errorBody?.message || "Request failed",
            };
        }

        // Cookie set for SSR
        const cookieHeader = response.headers.get("set-cookie");
        const setCookies = cookieHeader ? cookieHeader.split(/,(?=\s*[a-zA-Z0-9_\-]+\=)/) : null; // Robust splitting

        let accessToken, refreshToken;
        let accessTokenOptions = {};
        let refreshTokenOptions = {};

        if (setCookies) {
            setCookies.forEach((cookie) => {
                const parts = cookie.split(';').map(part => part.trim());

                // Extract name/value from the first part
                const [name, value] = parts[0].split('=');

                // Parse attributes into an object
                const attrs = parts.slice(1).reduce((acc: any, attr) => {
                    const [key, val] = attr.split('=').map(a => a.trim());
                    const normalizedKey: any = key.toLowerCase();
                    acc[normalizedKey] = val ?? true; // Handle flag attributes (e.g., "Secure")
                    return acc;
                }, {});

                if (name === "accessToken") {
                    accessToken = value;
                    accessTokenOptions = attrs;
                } else if (name === "refreshToken") {
                    refreshToken = value;
                    refreshTokenOptions = attrs;
                }
            });

            const getCookieOptions = (attrs: Record<string, any>) => ({
                httpOnly: true,
                secure: attrs.secure
                    ? process.env.NODE_ENV !== 'development'
                    : false,
                maxAge: attrs['max-age']
                    ? parseInt(attrs['max-age'])
                    : 60 * 60 * 24, // Fallback: 1 day
                path: attrs.path || '/', // Fallback to root path
            });

            (await cookies()).set('accessToken', accessToken ?? '',
                getCookieOptions(accessTokenOptions)
            );

            (await cookies()).set('refreshToken', refreshToken ?? '',
                getCookieOptions(refreshTokenOptions)
            );
        }

        const data = isJson ? await response.json() : null;

        return {
            success: true,
            message: data?.message || "Request successful",
            data: data?.data ?? data,
        };
    } catch (error) {
        return {
            success: false,
            code: "server-error",
            message: error instanceof Error ? error.message : "Unknown error occurred",
        };
    }
}

// Updated handleTokenRefresh function
async function handleTokenRefresh(cookieStore: ReturnType<typeof cookies>):
    Promise<{ success: boolean; accessToken?: string, refreshToken?: string, accessTokenOptions?: any, refreshTokenOptions?: any }> {
    try {
        // Get all cookies as a string to forward to the refresh endpoint
        const cookieHeader = (await cookieStore).getAll()
            .map(cookie => `${cookie.name}=${cookie.value}`)
            .join('; ');

        const refreshUrl = `${process.env.NEXT_PUBLIC_API_URL}/${API_ROUTES.AUTH.REFRESH}`;

        const response = await fetch(refreshUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEW_GAMING_AUTHORIZATION}`,
                "Content-Type": "application/json",
                Cookie: cookieHeader
            },
            credentials: "include", // Important for cross-origin requests if needed
        });


        if (!response.ok) {
            return { success: false };
        }

        // Parse new tokens from response body
        const refreshCookieHeader = response.headers.get("set-cookie");
        const setCookies = refreshCookieHeader ? refreshCookieHeader.split(/,(?=\s*[a-zA-Z0-9_\-]+\=)/) : null; // Robust splitting

        let accessToken = "", refreshToken = "";
        let accessTokenOptions = {};
        let refreshTokenOptions = {};

        if (setCookies) {
            setCookies.forEach((cookie) => {
                const parts = cookie.split(';').map(part => part.trim());

                // Extract name/value from the first part
                const [name, value] = parts[0].split('=');

                // Parse attributes into an object
                const attrs = parts.slice(1).reduce((acc: any, attr) => {
                    const [key, val] = attr.split('=').map(a => a.trim());
                    const normalizedKey: any = key.toLowerCase();
                    acc[normalizedKey] = val ?? true; // Handle flag attributes (e.g., "Secure")
                    return acc;
                }, {});

                if (name === "accessToken") {
                    accessToken = value;
                    accessTokenOptions = attrs;
                } else if (name === "refreshToken") {
                    refreshToken = value;
                    refreshTokenOptions = attrs;
                }
            });
        }

        return { success: true, accessToken, refreshToken, accessTokenOptions, refreshTokenOptions };
    } catch {
        return { success: false };
    }
}