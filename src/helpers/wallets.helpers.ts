import { API_ROUTES } from "@/constants/routes";
import fetcher from "@/lib/fetcher";

export async function getCurrencies(): Promise<any[]> {
    const res: any = await fetcher(API_ROUTES.WALLET.CURRENCIES, {
        method: "GET",
    });

    if (!res.success) return [];
    return res.currencies || res.data?.currencies || [];
}

export async function getWalletAddress(currency: string, network: string): Promise<string | null> {
    const res: any = await fetcher(API_ROUTES.WALLET.ADDRESS, {
        method: "POST",
        body: JSON.stringify({
            currency,
            network
        }),
    });

    if (!res.success) return null;
    return res.data?.address ?? null;
}