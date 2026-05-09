"use client";

import { CarouselItem } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { layoutSelectors } from "@/store/layout.store";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

export default function HeroCarouselItem({ ...props }: Props) {
  const isNotificationOpen = layoutSelectors.use.isNotificationOpen();
  const leftSideOpen = layoutSelectors.use.isAsideOpen();
  const rightSideOpen = isNotificationOpen;

  const basisStyleWhen = {
    bothIsOpen: "md:basis-full xl:basis-1/2",
    onlyOneIsOpen: "xl:basis-1/2",
    bothIsClosed: "sm:basis-1/2",
  };
  const basisDefaultStyles =
    leftSideOpen && rightSideOpen
      ? basisStyleWhen.bothIsOpen
      : leftSideOpen || rightSideOpen
      ? basisStyleWhen.onlyOneIsOpen
      : basisStyleWhen.bothIsClosed;
  return (
    <CarouselItem
      className={cn(`-full pl-4 ${basisDefaultStyles}`, props.className)}
      {...props}
    >
      {props.children}
    </CarouselItem>
  );
}


