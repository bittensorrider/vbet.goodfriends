"use server"

import { API_ROUTES } from "@/constants/routes";
import fetcher from "@/lib/fetcher";
import SSRFetcher from "@/lib/SSRFetcher";
import { headers } from "next/headers";

export async function GetCurrencyListAction() {
    const cookie = (await headers()).get('cookie') || '';
    const res: any = await SSRFetcher(API_ROUTES.WALLET.CURRENCIES, {
        method: "GET",
        headers: {
            cookie
        }
    });

    console.log('currencies = > ', res)
    if (!res.success) return [];
    return res.currencies || res.data?.currencies || [];
}


export async function GetWalletAddressAction(currency: string, network: string): Promise<string | null> {
    const cookie = (await headers()).get('cookie') || '';
    const res: any = await SSRFetcher(API_ROUTES.WALLET.ADDRESS, {
        method: "POST",
        body: JSON.stringify({
            currency,
            network
        }),
        headers: {
            cookie
        }
    });

    if (!res.success) return null;
    return res.data?.address ?? null;
}

export async function WithdrawalAction(data: { currency: string, network: string, amount: number, toAddress: string }) {
    const cookie = (await headers()).get('cookie') || '';
    const res: any = await fetcher(API_ROUTES.WALLET.WITHDRAW, {
        method: "POST",
        body: JSON.stringify({
            ...data
        }),
        headers: {
            cookie
        }
    });

    return res
}