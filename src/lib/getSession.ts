import { API_ROUTES } from "@/constants/routes";
import { cookies } from "next/headers";
import { User } from "@/types/user.types";

export type GetSessionType = { user: User | null; needRefresh: boolean };

async function getCookieHeader(): Promise<string> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const cookieParts: string[] = [];
  if (accessToken) cookieParts.push(`accessToken=${accessToken}`);
  if (refreshToken) cookieParts.push(`refreshToken=${refreshToken}`);

  return cookieParts.join("; ");
}

export async function getSession(): Promise<GetSessionType> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!accessToken && !refreshToken) {
    return { user: null, needRefresh: false };
  }

  const GF_API_KEY = `Bearer ${process.env.NEXT_PUBLIC_NEW_GAMING_AUTHORIZATION}`;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/${API_ROUTES.AUTH.LOGIN_SUCCESS}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: GF_API_KEY,
      "Content-Type": "application/json",
      Cookie: await getCookieHeader(),
    },
    credentials: "include",
    next: {
      tags: ["user"],
    },
    // ???
    // cache: "force-cache",
  });

  const data = await res.json();
  try {
    if (data.code) {
      if (data.code === 5008) {
        // refresh token
        return { user: null, needRefresh: true };
      }
      return { user: null, needRefresh: false };
    }
    return { user: data, needRefresh: false };
  } catch (error) {
    console.error(error);
    return { user: data, needRefresh: false };
  }
}
