"use server"

import { API_ROUTES } from "@/constants/routes";
import SSRFetcher from "@/lib/SSRFetcher";


export async function loginUser({ loginId, pw }: any) {
    const res = await SSRFetcher(API_ROUTES.AUTH.LOGIN, {
        method: "POST",
        body: JSON.stringify({
            role: "user",
            loginId,
            pw,
        }),
    });

    if (res.success)
        return res
    else return null
}