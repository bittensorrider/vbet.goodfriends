import { ICONS } from "@/constants/icons";
import IconBase from "../icon/iconBase";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Link } from "@/i18n/navigation";
import SlotCard from "../cards/game-cards/slotCard";
import GameSliderCarouselItem from "../common/containers/gameSliderCarouselItem";

type Props = {
  basisClassNames?: string;
};

export default function GamesSliderSection({ basisClassNames }: Props) {
  return (
    <Carousel className="grid gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <IconBase icon={ICONS.CHERRY} className="size-4" />
          <span className="text-sm font-semibold">Suggested Games</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href={`#`} className="text-xs font-normal hover:underline">
            View All
          </Link>
          <div className="flex items-center gap-1.5">
            <CarouselPrevious className="relative left-0 translate-0 border border-neutral rounded-full size-5">
              <IconBase icon={ICONS.CHEVRON_LEFT} className="size-4" />
            </CarouselPrevious>
            <CarouselNext className="relative left-0 translate-0 border border-neutral rounded-full size-5">
              <IconBase icon={ICONS.CHEVRON_RIGHT} className="size-4" />
            </CarouselNext>
          </div>
        </div>
      </div>

      <CarouselContent className="-ml-2">
        <GameSliderCarouselItem className={basisClassNames}>
          <SlotCard
            href="#"
            src="/imgs/slots/slot1.svg"
            title="Roullette SLot Live Lobby"
            style={{ aspectRatio: 100 / 100 }}
          />
        </GameSliderCarouselItem>
        <GameSliderCarouselItem className={basisClassNames}>
          <SlotCard
            href="#"
            src="/imgs/slots/slot1.svg"
            title="Roullette SLot Live Lobby"
            style={{ aspectRatio: 100 / 100 }}
          />
        </GameSliderCarouselItem>
        <GameSliderCarouselItem className={basisClassNames}>
          <SlotCard
            href="#"
            src="/imgs/slots/slot1.svg"
            title="Roullette SLot Live Lobby"
            style={{ aspectRatio: 100 / 100 }}
          />
        </GameSliderCarouselItem>
        <GameSliderCarouselItem className={basisClassNames}>
          <SlotCard
            href="#"
            src="/imgs/slots/slot1.svg"
            title="Roullette SLot Live Lobby"
            style={{ aspectRatio: 100 / 100 }}
          />
        </GameSliderCarouselItem>
        <GameSliderCarouselItem className={basisClassNames}>
          <SlotCard
            href="#"
            src="/imgs/slots/slot1.svg"
            title="Roullette SLot Live Lobby"
            style={{ aspectRatio: 100 / 100 }}
          />
        </GameSliderCarouselItem>
        <GameSliderCarouselItem className={basisClassNames}>
          <SlotCard
            href="#"
            src="/imgs/slots/slot1.svg"
            title="Roullette SLot Live Lobby"
            style={{ aspectRatio: 100 / 100 }}
          />
        </GameSliderCarouselItem>
        <GameSliderCarouselItem className={basisClassNames}>
          <SlotCard
            href="#"
            src="/imgs/slots/slot1.svg"
            title="Roullette SLot Live Lobby"
            style={{ aspectRatio: 100 / 100 }}
          />
        </GameSliderCarouselItem>
        <GameSliderCarouselItem className={basisClassNames}>
          <SlotCard
            href="#"
            src="/imgs/slots/slot1.svg"
            title="Roullette SLot Live Lobby"
            style={{ aspectRatio: 100 / 100 }}
          />
        </GameSliderCarouselItem>
        <GameSliderCarouselItem className={basisClassNames}>
          <SlotCard
            href="#"
            src="/imgs/slots/slot1.svg"
            title="Roullette SLot Live Lobby"
            style={{ aspectRatio: 100 / 100 }}
          />
        </GameSliderCarouselItem>
        <GameSliderCarouselItem className={basisClassNames}>
          <SlotCard
            href="#"
            src="/imgs/slots/slot1.svg"
            title="Roullette SLot Live Lobby"
            style={{ aspectRatio: 100 / 100 }}
          />
        </GameSliderCarouselItem>
        <GameSliderCarouselItem className={basisClassNames}>
          <SlotCard
            href="#"
            src="/imgs/slots/slot1.svg"
            title="Roullette SLot Live Lobby"
            style={{ aspectRatio: 100 / 100 }}
          />
        </GameSliderCarouselItem>
        <GameSliderCarouselItem className={basisClassNames}>
          <SlotCard
            href="#"
            src="/imgs/slots/slot1.svg"
            title="Roullette SLot Live Lobby"
            style={{ aspectRatio: 100 / 100 }}
          />
        </GameSliderCarouselItem>
        <GameSliderCarouselItem className={basisClassNames}>
          <SlotCard
            href="#"
            src="/imgs/slots/slot1.svg"
            title="Roullette SLot Live Lobby"
            style={{ aspectRatio: 100 / 100 }}
          />
        </GameSliderCarouselItem>
        <GameSliderCarouselItem className={basisClassNames}>
          <SlotCard
            href="#"
            src="/imgs/slots/slot1.svg"
            title="Roullette SLot Live Lobby"
            style={{ aspectRatio: 100 / 100 }}
          />
        </GameSliderCarouselItem>
        <GameSliderCarouselItem className={basisClassNames}>
          <SlotCard
            href="#"
            src="/imgs/slots/slot1.svg"
            title="Roullette SLot Live Lobby"
            style={{ aspectRatio: 100 / 100 }}
          />
        </GameSliderCarouselItem>
        <GameSliderCarouselItem className={basisClassNames}>
          <SlotCard
            href="#"
            src="/imgs/slots/slot1.svg"
            title="Roullette SLot Live Lobby"
            style={{ aspectRatio: 100 / 100 }}
          />
        </GameSliderCarouselItem>
        <GameSliderCarouselItem className={basisClassNames}>
          <SlotCard
            href="#"
            src="/imgs/slots/slot1.svg"
            title="Roullette SLot Live Lobby"
            style={{ aspectRatio: 100 / 100 }}
          />
        </GameSliderCarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
