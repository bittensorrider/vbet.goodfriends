"use client";

import { cn } from "@/lib/utils";
import { layoutSelectors } from "@/store/layout.store";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

export default function SlotGridContainer({ ...props }: Props) {
  const isNotificationOpen = layoutSelectors.use.isNotificationOpen();
  const leftSideOpen = layoutSelectors.use.isAsideOpen();
  const rightSideOpen = isNotificationOpen;

  const gridStylesWhen = {
    bothIsOpen: "lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7",
    onlyOneIsOpen: "lg:grid-cols-5 xl:grid-cols-7",
    bothIsClosed: "",
  };
  const gridDefaultStyles =
    leftSideOpen && rightSideOpen
      ? gridStylesWhen.bothIsOpen
      : leftSideOpen || rightSideOpen
      ? gridStylesWhen.onlyOneIsOpen
      : gridStylesWhen.bothIsClosed;
  return (
    <div
      className={cn(
        `grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 ${gridDefaultStyles} gap-3`,
        props.className
      )}
      {...props}
    >
      {props.children}
    </div>
  );
}
