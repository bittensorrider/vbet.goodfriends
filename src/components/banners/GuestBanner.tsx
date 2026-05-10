import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPagination,
} from "@/components/ui/carousel";
import Image from "next/image";
// import LiveUserStats from "@/components/banners/LiveUserStats";
import { BannerItem } from "@/types/banner.types";

export default function GuestBanner({ banners }: { banners: BannerItem[] }) {
  return (
    <div className="relative w-full flex flex-col gap-6">
      <div className="rounded-[36px] overflow-hidden bg-neutral/5">
        <Carousel>
          <CarouselContent>
            {banners.map((banner: BannerItem, index) => (
              <CarouselItem key={index}>
                <div className="rounded-[36px] overflow-hidden">
                  <picture>
                    <source
                      srcSet={banner.thumbnail}
                      media="(min-width: 768px)"
                    />
                    <Image
                      src={banner.mobileThumbnail}
                      className="w-full"
                      width={500}
                      height={300}
                      alt="Responsive Image for Banner mobile thumbnail"
                      priority
                    />
                  </picture>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPagination
            dotClassname="size-2.5 border border-foreground/10"
            className="absolute bottom-[25%] left-1/2 -translate-x-1/2 gap-[5px]"
          />
        </Carousel>
      </div>

      {/* <LiveUserStats /> */}
    </div>
  );
}
