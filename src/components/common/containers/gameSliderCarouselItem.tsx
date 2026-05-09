// ${cn("pl-2 basis-[calc(100%/9)]", basisClassNames)}
"use client";

import { CarouselItem } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { layoutSelectors } from "@/store/layout.store";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

export default function GameSliderCarouselItem({ ...props }: Props) {
  const isNotificationOpen = layoutSelectors.use.isNotificationOpen();
  const leftSideOpen = layoutSelectors.use.isAsideOpen();
  const rightSideOpen = isNotificationOpen;

  const basisStyleWhen = {
    bothIsOpen: "lg:basis-1/6 xl:basis-1/8",
    onlyOneIsOpen: "lg:basis-1/6 xl:basis-1/9",
    bothIsClosed: "lg:basis-[calc(100%/9)]",
  };
  const basisDefaultStyles =
    leftSideOpen && rightSideOpen
      ? basisStyleWhen.bothIsOpen
      : leftSideOpen || rightSideOpen
      ? basisStyleWhen.onlyOneIsOpen
      : basisStyleWhen.bothIsClosed;
  return (
    <CarouselItem
      className={cn(`pl-2 basis-1/3 sm:basis-1/5 md:basis-1/7 ${basisDefaultStyles}`, props.className)}
      {...props}
    >
      {props.children}
    </CarouselItem>
  );
}
