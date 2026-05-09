import { API_ROUTES } from "@/constants/routes";
import fetcher from "@/lib/fetcher";
import { BannerItem, BannerResponseType } from "@/types/banner.types";

export const PAGINATION_LIMIT_PER_PAGE = 6;

export async function getBannerData(filter: "all" | "active" | "ended", page: number, limit: number, pageName: string) {
    let query = `${API_ROUTES.SITE.BANNER.LIST}?page=${page}&limit=${limit}&pageName=${pageName}`;

    if (filter === "active") query += "&isUse=true";
    if (filter === "ended") query += "&isUse=false";

    const res = await fetcher<BannerResponseType>(query);

    if (!res.success) return { data: [] as BannerItem[], pagination: null };
    return { data: res.data.list, pagination: res.data.pagination };
}