import Image from "next/image";
import { Link } from "@/i18n/navigation";
import CategoryBannersContainer from "../common/containers/cateogoryBannersContainer";
// import { BannerItem } from "@/types/banner.types";

export default function CategoryBanners(
  // { banners }: { banners: BannerItem }
) {
  return (
    <CategoryBannersContainer>
      <div className="w-full h-full grid grid-cols-2 gap-2 md:gap-3">
        <Link href={"#"} className="group relative rounded-2xl md:rounded-3xl overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-1/2 z-10 opacity-30"
            style={{
              background: "linear-gradient(180deg, #7d2dff94, #4b00f400)",
            }}
          ></div>
          <h6 className="absolute top-2.5 left-2.5 md:top-4 md:left-4 text-shadow-lg text-shadow-black/60 dark:text-shadow-black text-white z-10 font-bold text-lg md:text-2xl">
            Casino
          </h6>
          <Image
            src={`/imgs/banners/casino.svg`}
            alt="Casino"
            fill
            className="object-cover group-hover:scale-110 transition-all duration-500"
          />
        </Link>
        <Link href={"#"} className="group relative rounded-2xl md:rounded-3xl overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-1/2 z-10 opacity-30"
            style={{
              background: "linear-gradient(180deg, #7d2dff94, #4b00f400)",
            }}
          ></div>
          <h6 className="absolute top-2.5 left-2.5 md:top-4 md:left-4 text-shadow-lg text-shadow-black/60 dark:text-shadow-black text-white z-10 font-bold text-lg md:text-2xl">
            Slot
          </h6>
          <Image
            src={`/imgs/banners/slot.svg`}
            alt="Casino"
            fill
            className="object-cover group-hover:scale-110 transition-all duration-500"
          />
        </Link>
      </div>
      {/* <div className="w-full h-full grid grid-cols-4 md:grid-cols-2 gap-2 md:gap-3">
        <Link href={"#"} className="group relative rounded-2xl md:rounded-3xl overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-1/2 z-10 opacity-30"
            style={{
              background: "linear-gradient(180deg, #7d2dff94, #4b00f400)",
            }}
          ></div>
          <h6 className="absolute top-2.5 left-2.5 md:top-3 md:left-3 text-shadow-lg text-shadow-black/60 dark:text-shadow-black text-white z-10 font-bold text-xs sm:text-sm md:text-xl">
            Minigames
          </h6>
          <Image
            src={`/imgs/banners/minigame.svg`}
            alt="Casino"
            fill
            className="object-cover group-hover:scale-110 transition-all duration-500"
          />
        </Link>
        <Link href={"#"} className="group relative rounded-2xl md:rounded-3xl overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-1/2 z-10 opacity-30"
            style={{
              background: "linear-gradient(180deg, #7d2dff94, #4b00f400)",
            }}
          ></div>
          <h6 className="absolute top-2.5 left-2.5 md:top-3 md:left-3 text-shadow-lg text-shadow-black/60 dark:text-shadow-black text-white z-10 font-bold text-xs sm:text-sm md:text-xl">
            Sports
          </h6>
          <Image
            src={`/imgs/banners/sport.svg`}
            alt="Casino"
            fill
            className="object-cover group-hover:scale-110 transition-all duration-500"
          />
        </Link>
        <Link href={"#"} className="group relative rounded-2xl md:rounded-3xl overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-1/2 z-10 opacity-30"
            style={{
              background: "linear-gradient(180deg, #7d2dff94, #4b00f400)",
            }}
          ></div>
          <h6 className="absolute top-2.5 left-2.5 md:top-3 md:left-3 text-shadow-lg text-shadow-black/60 dark:text-shadow-black text-white z-10 font-bold text-xs sm:text-sm md:text-xl">
            Virtual
          </h6>
          <Image
            src={`/imgs/banners/virtual.svg`}
            alt="Casino"
            fill
            className="object-cover group-hover:scale-110 transition-all duration-500"
          />
        </Link>
        <Link href={"#"} className="group relative rounded-2xl md:rounded-3xl overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-1/2 z-10 opacity-30"
            style={{
              background: "linear-gradient(180deg, #7d2dff94, #4b00f400)",
            }}
          ></div>
          <h6 className="absolute top-2.5 left-2.5 md:top-3 md:left-3 text-shadow-lg text-shadow-black/60 dark:text-shadow-black text-white z-10 font-bold text-xs sm:text-sm md:text-xl">
            {`Hold'em`}
          </h6>
          <Image
            src={`/imgs/banners/holdem.svg`}
            alt="Casino"
            fill
            className="object-cover group-hover:scale-110 transition-all duration-500"
          />
        </Link>
      </div> */}
    </CategoryBannersContainer>
  );
}
