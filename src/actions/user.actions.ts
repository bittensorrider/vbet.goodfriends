"use server";
import { API_ROUTES } from "@/constants/routes";
import SSRFetcher from "@/lib/SSRFetcher";
import { BettingItem, BettingResponseType } from "@/types/betting.types";
import { TransactionItem, TransactionResponseType } from "@/types/transactoin.types";
import { headers } from "next/headers";

export async function UpdateUserAction(userId: string, data: any) {
    const cookie = (await headers()).get('cookie') || '';

    const res = await SSRFetcher(`${API_ROUTES.AUTH.UPDATE_MEMBER}/${userId}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            cookie
        }
    });

    return res;
}

export async function SendCodeAction(email: string) {
    const cookie = (await headers()).get('cookie') || '';

    const res = await SSRFetcher(API_ROUTES.AUTH.SEND_EMAIL_CODE, {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
            cookie
        }
    });

    return res;
}

export async function VerifyCodeAction(email: string, code: string) {
    const cookie = (await headers()).get('cookie') || '';

    const res = await SSRFetcher(API_ROUTES.AUTH.VERIFY_EMAIL_CODE, {
        method: "PATCH",
        body: JSON.stringify({ email, code }),
        headers: {
            cookie
        }
    });

    return res;
}

export async function GetTransactionListAction(txID: string | undefined, page: number, type: string | undefined, limit: number, startDate?: string, endDate?: string,) {
    const cookie: any = (await headers()).get('cookie') || '';
    let query = `${API_ROUTES.TRANSACTION.TRANSACTION_LIST}?page=${page}`;

    if (type) query += `&type=${type}`;
    if (limit) query += `&limit=${limit}`;
    if (startDate && endDate) {
        query += `&startDate=${startDate}&endDate=${endDate}`
    }
    if (txID) query += `&txID=${txID}`;

    const res = await SSRFetcher<TransactionResponseType>(query, {
        headers: {
            cookie
        }
    });

    console.log('Transaction =>', res);

    if (!res.success) return { data: [] as TransactionItem[], pagination: null };
    return { data: res.data.list, pagination: res.data.pagination };
}

export async function GetBettingListAction(page: number, type: string | undefined, limit: number, startDate?: string, endDate?: string, gameName?: string) {
    const cookie: any = (await headers()).get('cookie') || '';
    let query = `${API_ROUTES.BETTING.BETTING_LIST}?page=${page}`;

    if (type) query += `&type=${type}`;
    if (limit) query += `&limit=${limit}`;
    if (gameName) query += `&gameName=${gameName}`;

    if (startDate && endDate) {
        query += `&startDate=${startDate}&endDate=${endDate}`
    }

    const res = await SSRFetcher<BettingResponseType>(query, {
        headers: {
            cookie
        }
    });
    console.log('Betting =>', res);

    if (!res.success) return { data: [] as BettingItem[], pagination: null };
    return { data: res.data.list, pagination: res.data.pagination };
}

export async function GetRecentBetting(page: number, type: string | undefined, limit: number, startDate?: string, endDate?: string, gameName?: string) {
    const cookie: any = (await headers()).get('cookie') || '';
    let query = `${API_ROUTES.BETTING.RECENT_LIST}?page=${page}`;

    if (type) query += `&type=${type}`;
    if (limit) query += `&limit=${limit}`;
    if (gameName) query += `&gameName=${gameName}`;

    if (startDate && endDate) {
        query += `&startDate=${startDate}&endDate=${endDate}`
    }

    const res = await SSRFetcher<BettingResponseType>(query, {
        headers: {
            cookie
        }
    });
    console.log('Betting =>', res);

    if (!res.success) return { data: [] as BettingItem[], pagination: null };
    return { data: res.data.list, pagination: res.data.pagination };
}
