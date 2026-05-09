import { API_ROUTES } from "@/constants/routes";

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

export default async function fetcher<T = unknown>(
    path: string,
    options: RequestInit = {},
    isRetry: boolean = false
): Promise<ApiResponse<T>> {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/${path}`;
    // const GF_API_KEY = `Bearer ${process.env.NEXT_PUBLIC_NEW_GAMING_AUTHORIZATION}`;

    try {
        const response = await fetch(baseUrl, {
            ...options,
            headers: {
                // Authorization: GF_API_KEY,
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
                // Start refresh process
                const refreshRes = await fetcher(API_ROUTES.AUTH.REFRESH, {
                    method: "POST",
                });

                if (!refreshRes.success) {
                    return {
                        success: false,
                        code: "unauthorized",
                        message: "Session expired. Please login again.",
                    };
                }

                // Retry the original request after refresh
                return fetcher(path, options, true);
            }

            return {
                success: false,
                code: (errorBody?.code as ErrorCodes) || "server-error",
                message: errorBody?.message || "Request failed",
            };
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