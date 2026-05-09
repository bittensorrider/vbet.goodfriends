"use server";

import { API_ROUTES } from "@/constants/routes";
import fetcher from "@/lib/fetcher";
import SSRFetcher from "@/lib/SSRFetcher";
import { GameItem, GameResponseType } from "@/types/game.types";
import { headers } from 'next/headers';
import { cache } from "react";

// export const PAGINATION_LIMIT_PER_PAGE = 6;

const _getGameList = async (
  type: string,
  provider: string,
  title: string,
  page: number,
  limit: number
) => {
  let query = `${API_ROUTES.GAME.LIST}?page=${page}&limit=${limit}`;

  if (type !== "all") query += `&type=${type}`;
  if (provider !== "") query += `&provider=${provider}`;
  if (title !== "") query += `&title=${title}`;

  const res = await fetcher<GameResponseType>(query);

  if (!res.success) {
    return { data: [] as GameItem[], pagination: null, providers: [] };
  }

  return {
    data: res.data.list,
    pagination: res.data.pagination,
    providers: res.data.providers,
  };
};

// ✅ Export memoized version
export const getGameList = cache(_getGameList);

export async function getGameLaunch(game_code: string) {
  const cookie: any = (await headers()).get('cookie') || '';

  const res: any = await SSRFetcher(API_ROUTES.GAME.LAUNCH, {
    method: "POST",
    body: JSON.stringify({
      game_code
    }),
    headers: {
      cookie
    },
    next: { tags: ["game-launch"] }
  });

  if (res.success) return {
    data: { url: res.data.url, name: res.data.name }, success: true
  }

  return {
    message: res.message,
    sucess: false
  }
}