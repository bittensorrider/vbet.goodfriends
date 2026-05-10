"use client";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { themeSelectors } from "@/store/theme.store";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

type Props = {
  withTitle?: boolean;
  className?: string;
  parentClassName?: string;
  hasHref?: boolean;
};

export default function Logo({
  parentClassName = "",
  className = "",
  withTitle = false,
  hasHref = true,
}: Props) {
  const mode = themeSelectors.use.mode();
  return (
    <Link
      href={hasHref ? ROUTES.HOME : "#"}
      className={cn(
        `flex items-center gap-2 ml-1 ${withTitle ? "" : ""}`,
        parentClassName,
      )}
    >
      <Image
        // src={`/imgs/brand/${mode}-logo-icon.svg`}
        src={`/imgs/brand/icon.png`}
        className={cn("w-[30px] h-[26px]", className)}
        width={30}
        height={26}
        alt="GoodFriends"
      />
      {withTitle && (
        <Image
          src={`/imgs/brand/${mode}-logo-title.svg`}
          className={cn("w-[146px] h-[15px]", className)}
          width={30}
          height={26}
          alt="GoodFriends"
        />
      )}
    </Link>
  );
}
