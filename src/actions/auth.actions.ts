"use server";
import { API_ROUTES } from "@/constants/routes";
import SSRFetcher from "@/lib/SSRFetcher";
import { LoginSchema } from "@/validations/auth.schemas";
import { headers } from "next/headers";

export async function LoginAction(values: LoginSchema) {
    const res = await SSRFetcher(API_ROUTES.AUTH.LOGIN, {
        method: "POST",
        body: JSON.stringify({
            role: "user",
            loginId: values.email,
            pw: values.password,
        }),
    });

    return res;
}

export async function LoginSuccessAction() {
    const cookie = (await headers()).get('cookie') || '';

    const res = await SSRFetcher(API_ROUTES.AUTH.LOGIN_SUCCESS, {
        method: "POST",
        headers: {
            cookie
        }
    });

    return res;
}

export async function RefreshAction() {
    const cookie = (await headers()).get('cookie') || '';

    const res = await SSRFetcher(API_ROUTES.AUTH.REFRESH, {
        method: "POST",
        headers: {
            cookie
        }
    });

    return res;
}

export async function LoginOut() {
    const res = await SSRFetcher(API_ROUTES.AUTH.LOGOUT, {
        method: "POST",
    });
    return res;
}