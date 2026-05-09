"use client";

import { cn } from "@/lib/utils";
import { layoutSelectors } from "@/store/layout.store";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

export default function CategoryBannersContainer({ ...props }: Props) {
  const isNotificationOpen = layoutSelectors.use.isNotificationOpen();
  const leftSideOpen = layoutSelectors.use.isAsideOpen();
  const rightSideOpen = isNotificationOpen;

  //   <div className="w-full grid grid-cols-3 lg:grid-cols-4 gap-x-1 gap-y-10">

  const stylesWhen = {
    bothIsOpen: "lg:grid-cols-[50%_auto] xl:grid-cols-[60%_auto] aspect-[892/213]",
    onlyOneIsOpen: "lg:grid-cols-[60%_auto] md:aspect-[892/213]",
    bothIsClosed:
      "aspect-[358/177] md:aspect-[892/213]",
  };
  const styles =
    leftSideOpen && rightSideOpen
      ? stylesWhen.bothIsOpen
      : leftSideOpen || rightSideOpen
      ? stylesWhen.onlyOneIsOpen
      : stylesWhen.bothIsClosed;
  return (
    <div
      className={cn(
        `w-full grid md:grid-cols-[60%_auto] aspect-[358/177] gap-2 md:gap-3 ${styles}`,
        props.className
      )}
      {...props}
    >
      {props.children}
    </div>
  );
}
