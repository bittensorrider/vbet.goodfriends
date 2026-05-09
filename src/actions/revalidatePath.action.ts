"use server";

import { revalidatePath } from "next/cache";

export async function revalidatePathAction(
  path: string,
  type?: "page" | "layout",
) {
  revalidatePath(path, type);
}

export async function revalidatePathsAction(
  paths: { path: string; type?: "page" | "layout" }[],
) {
  if (!Array.isArray(paths)) return;

  for (const { path, type } of paths) {
    revalidatePath(path, type);
  }
}
