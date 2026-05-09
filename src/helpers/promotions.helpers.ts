import { API_ROUTES } from "@/constants/routes";
import fetcher from "@/lib/fetcher";
import { PromotionItem, PromotionResponseType } from "@/types/promotion.types";

export const PAGINATION_LIMIT_PER_PAGE = 6;

export async function getPromotionsData(filter: "all" | "active" | "ended", page: number, limit: number) {
    let query = `${API_ROUTES.SITE.PROMOTIONS.LIST}?page=${page}&limit=${limit}`;

    if (filter === "active") query += "&isUse=true";
    if (filter === "ended") query += "&isUse=false";

    const res = await fetcher<PromotionResponseType>(query);

    if (!res.success) return { data: [] as PromotionItem[], pagination: null };
    return { data: res.data.list, pagination: res.data.pagination };
}