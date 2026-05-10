import { Link } from "@/i18n/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselPagination,
} from "@/components/ui/carousel";
import Image from "next/image";
// import LiveUserStats from "@/components/banners/LiveUserStats";
import HeroCarouselItem from "../common/containers/heroCarouselItem";
// import { PromotionItem } from "@/types/promotion.types";
import { BannerItem } from "@/types/banner.types";

const PromotionBanner = ({
  href,
  src,
  title,
}: {
  href: string;
  src: string;
  title: string;
}) => {
  return (
    <Link
      href={href}
      className="group relative w-full rounded-2xl md:rounded-[36px] h-full overflow-hidden flex aspect-[355/233] md:aspect-[595/274]"
    >
      <Image
        className="group-hover:scale-105 w-full h-auto object-cover rounded-2xl md:rounded-[36px] transition-all duration-500"
        src={src}
        width={438}
        height={274}
        alt={title}
        priority={true}
      />
      <div
        className="absolute w-full h-[68%] bottom-0 left-0"
        style={{ background: "linear-gradient(0deg, #6710B0, #6710b000)" }}
      ></div>
      <div className="absolute bottom-6 md:bottom-8 left-4 md:left-8 flex flex-col">
        <h6 className="text-xl font-semibold text-white">{title}</h6>
        {/* <p className="text-xs md:text-sm font-medium text-white/80">
          {description}
        </p> */}
      </div>
    </Link>
  );
};
export default function PromotionBanners({
  banners,
}: {
  banners: BannerItem[];
}) {
  return (
    <div className="relative w-full flex flex-col gap-6">
      <Carousel
        className="w-full rounded-3xl overflow-hidden"
        opts={{ align: "start" }}
      >
        <CarouselContent className="-ml-4">
          {banners.map((banner) => (
            <HeroCarouselItem key={banner._id}>
              <PromotionBanner
                href={banner.link}
                src={banner.thumbnail}
                title={banner.title}
              />
            </HeroCarouselItem>
          ))}
        </CarouselContent>

        <CarouselPagination
          dotClassname="size-2.5 border border-foreground/10"
          className="absolute bottom-[4%] md:bottom-[10%] left-1/2 -translate-x-1/2 gap-[5px]"
        />
      </Carousel>

      {/* <LiveUserStats /> */}
    </div>
  );
}
