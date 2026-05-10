import type { Metadata } from "next";

// import CategoryBanners from "@/components/banners/CategoryBanners";
import { GetRecentBetting } from "@/actions/user.actions";
import HeroBanner from "@/components/banners/HeroBanner";
import CasinoList from "@/components/sections/casinoList";
import ProvidersMarque from "@/components/sections/providersMarque";
import RecentBetsTable from "@/components/sections/recentBetsTable";
import SlotList from "@/components/sections/slotList";
import { getBannerData } from "@/helpers/banners.helpers";
import { BannerItem } from "@/types/banner.types";

export const metadata: Metadata = {
  title: "Home | GoodFriends",
  description: "Welcome to the GoodFriends Online Casino platform of Vietnam",
};

export default async function Home() {
  const { data: banners } = await getBannerData("active", 1, 8, "dashbaord");
  const promoBanners = banners.filter(
    (item: BannerItem) => item.pageComponent == "promotion",
  );
  const dashbaordBanners = banners.filter(
    (item: BannerItem) => item.pageComponent != "promotion",
  );

  const { data: bettings } = await GetRecentBetting(
    1,
    undefined,
    9,
    undefined,
    undefined,
    undefined,
  );
  console.log(bettings);

  return (
    <>
      <HeroBanner
        promoBanners={promoBanners}
        dashbaordBanners={dashbaordBanners}
      />
      {/* <CategoryBanners /> */}
      <CasinoList />
      <SlotList />
      <RecentBetsTable data={bettings} />
      <ProvidersMarque />
    </>
  );
}
