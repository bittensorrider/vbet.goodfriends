"use client";

import { CarouselItem } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { layoutSelectors } from "@/store/layout.store";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

export default function LiveStatCarouselItem({ ...props }: Props) {
  const isNotificationOpen = layoutSelectors.use.isNotificationOpen();
  const leftSideOpen = layoutSelectors.use.isAsideOpen();
  const rightSideOpen = isNotificationOpen;

  const basisStyleWhen = {
    bothIsOpen: "lg:basis-[calc(100%/7)] xl:basis-[calc(100%/11)]",
    onlyOneIsOpen: "lg:basis-[calc(100%/10)] xl:basis-[calc(100%/14)]",
    bothIsClosed: "lg:basis-[calc(100%/14)]",
  };
  const basisDefaultStyles =
    leftSideOpen && rightSideOpen
      ? basisStyleWhen.bothIsOpen
      : leftSideOpen || rightSideOpen
      ? basisStyleWhen.onlyOneIsOpen
      : basisStyleWhen.bothIsClosed;
  return (
    <CarouselItem
      className={cn(`-full pl-4 basis-1/4 min-[440px]:basis-[calc(100%/6)] sm:basis-[calc(100%/8)] md:basis-[calc(100%/12)] ${basisDefaultStyles}`, props.className)}
      {...props}
    >
      {props.children}
    </CarouselItem>
  );
}
