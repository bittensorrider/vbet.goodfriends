"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import IconBase from "../icon/iconBase";
import { ICONS } from "@/constants/icons";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { locales } from "@/i18n/request";

type Props = {
  isAsideOpen: boolean;
};

export default function LanguageSwitcher({ isAsideOpen }: Props) {
  const activeLocale = useLocale(); // current locale key (e.g., "en", "vi")
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  const currentLocaleInfo = locales.find((l) => l.key === activeLocale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`${
          isAsideOpen ? "px-[10px]" : "justify-center"
        } group w-full flex items-center gap-2 h-10 rounded-xl bg-neutral/5 min-w-10 outline-none`}
      >
        <Image
          src={`/imgs/flags/${currentLocaleInfo?.image}`}
          className="w-5 h-5 rounded-full"
          width={20}
          height={20}
          alt={currentLocaleInfo?.label ?? "Multi Languages Support"}
        />
        {isAsideOpen && (
          <span className="text-sm font-medium">
            {currentLocaleInfo?.label}
          </span>
        )}
        {isAsideOpen && (
          <IconBase
            className="ml-auto size-4 group-data-[state=open]:rotate-180"
            icon={ICONS.ARROW_DOWN}
          />
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className={`${
          isAsideOpen ? "w-[200px]" : "w-5"
        } p-0 min-w-max linear-background border border-neutral/15 shadow-md rounded-xl`}
      >
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale.key}
            onClick={() => handleLocaleChange(locale.key)}
            className={`${
              !isAsideOpen && activeLocale === locale.key
                ? "!bg-primary/40"
                : ""
            } rounded-none hover:bg-primary/20 transition-all px-2 cursor-pointer`}
          >
            <Image
              src={`/imgs/flags/${locale.image}`}
              className="w-5 h-5 rounded-full"
              width={20}
              height={20}
              alt={locale.label}
            />
            {isAsideOpen && (
              <span className="text-sm font-medium">{locale.label}</span>
            )}

            {activeLocale === locale.key && isAsideOpen && (
              <IconBase
                icon={ICONS.CHECKMARK}
                className="ml-auto text-primary size-5"
              />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
