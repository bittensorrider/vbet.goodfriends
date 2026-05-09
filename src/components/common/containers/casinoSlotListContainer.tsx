"use client";

import { cn } from "@/lib/utils";
import { layoutSelectors } from "@/store/layout.store";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

export default function CasinoSlotListContainer({ ...props }: Props) {
  const isNotificationOpen = layoutSelectors.use.isNotificationOpen();
  const leftSideOpen = layoutSelectors.use.isAsideOpen();
  const rightSideOpen = isNotificationOpen;

  //   <div className="w-full grid grid-cols-3 lg:grid-cols-4 gap-x-1 gap-y-10">

  const gridStylesWhen = {
    bothIsOpen: "grid-cols-2 min-[1160px]:grid-cols-3",
    onlyOneIsOpen: "grid-cols-3 xl:grid-cols-4",
    bothIsClosed: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  };
  const gridDefaultStyles =
    leftSideOpen && rightSideOpen
      ? gridStylesWhen.bothIsOpen
      : leftSideOpen || rightSideOpen
      ? gridStylesWhen.onlyOneIsOpen
      : gridStylesWhen.bothIsClosed;
  return (
    <div
      className={cn(`w-full grid ${gridDefaultStyles} gap-y-4 md:gap-y-3 gap-x-0 md:gap-x-3`, props.className)}
      {...props}
    >
      {props.children}
    </div>
  );
}
