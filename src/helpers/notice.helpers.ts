import { API_ROUTES } from "@/constants/routes";
import fetcher from "@/lib/fetcher";
import { Notice, PageNoticeItem, PageNoticeType } from "@/types/notice.types";

export const NOTICE_LIMIT_PER_PAGE = 5;
export const DONT_SHOW_KEY = "notices_dont_show_24hr";

export async function getNoticeData(
  filter: string,
  type: Notice["type"] | "note" | "faq" | "",
  page: number,
  limit: number,
) {
  let query = `${API_ROUTES.SITE.INFO}?type=${type}&page=${page}&limit=${limit}`;

  if (filter === "active") query += "&isUse=true";
  if (filter === "inactive") query += "&isUse=false";

  const res = await fetcher<PageNoticeType>(query);

  if (!res.success) return { data: [] as PageNoticeItem[], pagination: null };
  return { data: res.data.list, pagination: res.data.pagination };
}

export function getDontShowNotices(): { id: string; expiresAt: number }[] {
  try {
    const raw = localStorage.getItem(DONT_SHOW_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addDontShowNotice(id: string) {
  const current = getDontShowNotices().filter((n) => n.expiresAt > Date.now());

  const newEntry = { id, expiresAt: Date.now() + 24 * 60 * 60 * 1000 }; // 24hr

  const updated = [...current, newEntry];
  localStorage.setItem(DONT_SHOW_KEY, JSON.stringify(updated));
}

export function shouldHideNotice(id: string): boolean {
  const entries = getDontShowNotices();
  return entries.some((n) => n.id === id && n.expiresAt > Date.now());
}
