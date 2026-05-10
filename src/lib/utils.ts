import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Decimal from "decimal.js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function urlToFile(url: string): Promise<File> {
  const response = await fetch(url);
  const blob = await response.blob();

  // Try to get the filename from the URL
  const pathname = new URL(url, window.location.origin).pathname;
  const guessedName =
    pathname.substring(pathname.lastIndexOf("/") + 1) || "avatar";

  return new File([blob], guessedName, { type: blob.type });
}

export const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number },
): Promise<Blob> => {
  const createImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.setAttribute("crossOrigin", "anonymous");
      image.src = url;
    });
  };

  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) throw new Error("Failed to get canvas context");

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.translate(-pixelCrop.x, -pixelCrop.y);
  ctx.drawImage(image, 0, 0);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
    }, "image/jpeg");
  });
};

export const formatDate = (isoString: any, type = "hour") => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  if (type == "hour")
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  else return `${year}-${month}-${day}`;
};

export const fixedDecimal = (v: any, n = 2) => {
  if (v == 0 || v == "0") return "0";
  if (v == undefined || v == "" || v == null || isNaN(v)) return "";
  const x = new Decimal(v).toFixed(n);
  const num = new Decimal(x).toFixed();
  const parts = num.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

export const calcDecimals = (v1: number, v2: number, flag: string) => {
  switch (flag) {
    case "-":
      return Number(new Decimal(v1).minus(new Decimal(v2)));
    case "+":
      return Number(new Decimal(v1).plus(new Decimal(v2)));
    default:
      break;
  }
  return 0;
};
