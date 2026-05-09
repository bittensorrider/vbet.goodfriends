"use client";
import { userSelectors } from "@/store/user.store";
import PromotionBanners from "@/components/banners/PromotionBanners";
import GuestBanner from "@/components/banners/GuestBanner";
import { BannerItem } from "@/types/banner.types";

export default function HeroBanner({
  promoBanners,
  dashbaordBanners,
}: {
  promoBanners: BannerItem[];
  dashbaordBanners: BannerItem[];
}) {
  const user = userSelectors.use.user();

  return user ? <PromotionBanners banners={promoBanners} /> : <GuestBanner banners={dashbaordBanners} />;
}
