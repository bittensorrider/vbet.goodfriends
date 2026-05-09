import Image from "next/image";
import { Carousel, CarouselContent } from "../ui/carousel";
import SectionTitle from "../sections/sectionTitle";
import LiveStatCarouselItem from "../common/containers/liveStatCarouselItem";
import { useTranslations } from "next-intl";

const LiveUserStatCard = ({
  src,
  alt,
  username,
  win,
}: {
  src: string;
  alt: string;
  username: string;
  win: string;
}) => {
  return (
    <div className="relative flex flex-col gap-1">
      <Image
        src={src}
        alt={alt}
        width={80}
        height={80}
        className="w-full h-auto object-cover rounded-2xl"
        style={{ aspectRatio: 71 / 74 }}
      />
      <div className="relative grid gap-[2px] overflow-hidden">
        <h6 className="text-xs font-medium truncate">{username}</h6>
        <span className="text-xs font-normal text-success truncate">
          {win}$
        </span>
      </div>
    </div>
  );
};

export default function LiveUserStats() {
  const t = useTranslations('banners');

  return (
    <div className="relative w-full flex flex-col gap-3">
      <div className="w-full flex items-center gap-1.5">
        <div className="size-[5px] rounded-full bg-success"></div>
        <SectionTitle>{t("recent_bet_wins")}</SectionTitle>
      </div>
      <div className="flex bg-white/50 border border-foreground/5 dark:bg-[#12002F]/70 p-4 rounded-3xl backdrop-blur-sm shadow-sm dark:shadow-2xl ">
        <Carousel
          opts={{ align: "start" }}
          className="w-full cursor-grab active:cursor-grabbing select-none"
        >
          <CarouselContent className="-ml-4">
            <LiveStatCarouselItem>
              <LiveUserStatCard
                src="/imgs/slot-1.svg"
                alt="slot title for img alt"
                username="Player2151985124"
                win="5019.00"
              />
            </LiveStatCarouselItem>
            <LiveStatCarouselItem>
              <LiveUserStatCard
                src="/imgs/slot-2.svg"
                alt="slot title for img alt"
                username="Player2151985124"
                win="5019.00"
              />
            </LiveStatCarouselItem>
            <LiveStatCarouselItem>
              <LiveUserStatCard
                src="/imgs/slot-3.svg"
                alt="slot title for img alt"
                username="Player2151985124"
                win="5019.00"
              />
            </LiveStatCarouselItem>
            <LiveStatCarouselItem>
              <LiveUserStatCard
                src="/imgs/slot-4.svg"
                alt="slot title for img alt"
                username="Player2151985124"
                win="5019.00"
              />
            </LiveStatCarouselItem>
            <LiveStatCarouselItem>
              <LiveUserStatCard
                src="/imgs/slot-5.svg"
                alt="slot title for img alt"
                username="Player2151985124"
                win="5019.00"
              />
            </LiveStatCarouselItem>
            <LiveStatCarouselItem>
              <LiveUserStatCard
                src="/imgs/slot-1.svg"
                alt="slot title for img alt"
                username="Player2151985124"
                win="5019.00"
              />
            </LiveStatCarouselItem>
            <LiveStatCarouselItem>
              <LiveUserStatCard
                src="/imgs/slot-2.svg"
                alt="slot title for img alt"
                username="Player2151985124"
                win="5019.00"
              />
            </LiveStatCarouselItem>
            <LiveStatCarouselItem>
              <LiveUserStatCard
                src="/imgs/slot-3.svg"
                alt="slot title for img alt"
                username="Player2151985124"
                win="5019.00"
              />
            </LiveStatCarouselItem>
            <LiveStatCarouselItem>
              <LiveUserStatCard
                src="/imgs/slot-4.svg"
                alt="slot title for img alt"
                username="Player2151985124"
                win="5019.00"
              />
            </LiveStatCarouselItem>
            <LiveStatCarouselItem>
              <LiveUserStatCard
                src="/imgs/slot-5.svg"
                alt="slot title for img alt"
                username="Player2151985124"
                win="5019.00"
              />
            </LiveStatCarouselItem>
            <LiveStatCarouselItem>
              <LiveUserStatCard
                src="/imgs/slot-1.svg"
                alt="slot title for img alt"
                username="Player2151985124"
                win="5019.00"
              />
            </LiveStatCarouselItem>
            <LiveStatCarouselItem>
              <LiveUserStatCard
                src="/imgs/slot-2.svg"
                alt="slot title for img alt"
                username="Player2151985124"
                win="5019.00"
              />
            </LiveStatCarouselItem>
            <LiveStatCarouselItem>
              <LiveUserStatCard
                src="/imgs/slot-1.svg"
                alt="slot title for img alt"
                username="Player2151985124"
                win="5019.00"
              />
            </LiveStatCarouselItem>
            <LiveStatCarouselItem>
              <LiveUserStatCard
                src="/imgs/slot-2.svg"
                alt="slot title for img alt"
                username="Player2151985124"
                win="5019.00"
              />
            </LiveStatCarouselItem>
            <LiveStatCarouselItem>
              <LiveUserStatCard
                src="/imgs/slot-3.svg"
                alt="slot title for img alt"
                username="Player2151985124"
                win="5019.00"
              />
            </LiveStatCarouselItem>
            <LiveStatCarouselItem>
              <LiveUserStatCard
                src="/imgs/slot-4.svg"
                alt="slot title for img alt"
                username="Player2151985124"
                win="5019.00"
              />
            </LiveStatCarouselItem>
            <LiveStatCarouselItem>
              <LiveUserStatCard
                src="/imgs/slot-5.svg"
                alt="slot title for img alt"
                username="Player2151985124"
                win="5019.00"
              />
            </LiveStatCarouselItem>
            <LiveStatCarouselItem>
              <LiveUserStatCard
                src="/imgs/slot-1.svg"
                alt="slot title for img alt"
                username="Player2151985124"
                win="5019.00"
              />
            </LiveStatCarouselItem>
            <LiveStatCarouselItem>
              <LiveUserStatCard
                src="/imgs/slot-2.svg"
                alt="slot title for img alt"
                username="Player2151985124"
                win="5019.00"
              />
            </LiveStatCarouselItem>
            <LiveStatCarouselItem>
              <LiveUserStatCard
                src="/imgs/slot-3.svg"
                alt="slot title for img alt"
                username="Player2151985124"
                win="5019.00"
              />
            </LiveStatCarouselItem>
            <LiveStatCarouselItem>
              <LiveUserStatCard
                src="/imgs/slot-4.svg"
                alt="slot title for img alt"
                username="Player2151985124"
                win="5019.00"
              />
            </LiveStatCarouselItem>
            <LiveStatCarouselItem>
              <LiveUserStatCard
                src="/imgs/slot-5.svg"
                alt="slot title for img alt"
                username="Player2151985124"
                win="5019.00"
              />
            </LiveStatCarouselItem>
            <LiveStatCarouselItem>
              <LiveUserStatCard
                src="/imgs/slot-1.svg"
                alt="slot title for img alt"
                username="Player2151985124"
                win="5019.00"
              />
            </LiveStatCarouselItem>
            <LiveStatCarouselItem>
              <LiveUserStatCard
                src="/imgs/slot-2.svg"
                alt="slot title for img alt"
                username="Player2151985124"
                win="5019.00"
              />
            </LiveStatCarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
