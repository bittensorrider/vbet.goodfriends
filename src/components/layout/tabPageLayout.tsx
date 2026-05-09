"use client";
import { AsideNavType } from "@/constants/asideMenu";
import PageTitle from "../common/page/pageTitle";
import { usePathname } from "@/i18n/navigation";
import IconBase from "../icon/iconBase";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useSelect } from "@/hooks/useSelect";
import { IconSvgElement } from "@hugeicons/react";
import { ICONS } from "@/constants/icons";
import { ReactNode } from "react";
import { useModal } from "@/hooks/useModal";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type Props = {
  title: string;
  titleKey?: string; // optional translation key for title
  asideNav: AsideNavType[];
  children: ReactNode;
  labelNamespace?: string; // optional, default to 'aside_menu'
};

export default function TabPageLayout({ title, titleKey, asideNav, children, labelNamespace = 'aside_menu' }: Props) {
  const pathname = usePathname();
  const navDropdown = useSelect();
  const walletModal = useModal("wallet");
  const t = useTranslations(labelNamespace);
  const titleT = useTranslations('aside_menu'); // for title translations

  const onAction = (action: AsideNavType["action"]) => {
    if (action) {
      if (action === "deposit-modal") {
        walletModal.onOpen({ tab: "deposit" });
      }
      if (action === "withdraw-modal") {
        walletModal.onOpen({ tab: "withdraw" });
      }
    }
  };

  // Use translated title if titleKey is provided, otherwise use the title prop
  const displayTitle = titleKey ? titleT(titleKey) : title;

  return (
    <div className="space-y-4">
      <PageTitle>{displayTitle}</PageTitle>
      <div className="grid md:grid-cols-[240px_auto] gap-4">
        <nav className="sticky top-12 w-full md:block hidden">
          <ul>
            {asideNav.map((navItem, index) => {
              const isActive = pathname === `${navItem.href}`;

              return (
                <li key={index}>
                  <Link
                    href={navItem.href}
                    onClick={(e) => {
                      if (navItem.action) {
                        e.preventDefault();
                        onAction(navItem.action);
                      }
                    }}
                    className={`flex items-center gap-1.5 w-full p-3 rounded-xl text-[13px] font-medium transition-all
                        ${isActive
                        ? "bg-primary/80 text-white"
                        : "text-foreground/80 hover:bg-foreground/5"
                      }`}
                  >
                    {navItem.icon && (
                      <IconBase icon={navItem.icon} className="size-4" />
                    )}
                    <span>{t(navItem.label)}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <DropdownMenu
          open={navDropdown.isOpen}
          onOpenChange={navDropdown.onOpenChange}
        >
          <DropdownMenuTrigger
            className={`group md:hidden flex items-center h-max gap-1.5 w-full p-3 rounded-xl text-[13px] font-medium transition-all bg-primary/80 text-white`}
          >
            <IconBase
              icon={
                asideNav.find((item) => `${item.href}` === pathname)
                  ?.icon as IconSvgElement
              }
              className="size-4"
            />
            <span>
              {t(asideNav.find((item) => `${item.href}` === pathname)?.label || "")}
            </span>

            <IconBase
              icon={ICONS.CHEVRON_LEFT}
              className="-rotate-90 group-data-[state=open]:rotate-90 size-4 ml-auto"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-background border border-foreground/10 shadow-xl w-[var(--radix-popper-anchor-width)]"
          >
            {asideNav.map((navItem, index) => {
              const isActive = pathname === `${navItem.href}`

              return (
                <DropdownMenuItem key={index} onClick={navDropdown.onClose}>
                  <Link
                    href={navItem.href}
                    onClick={(e) => {
                      if (navItem.action) {
                        e.preventDefault();
                        onAction(navItem.action);
                      }
                    }}
                    className={`flex items-center gap-1.5 w-full p-3 rounded-xl text-[13px] font-medium transition-all
                        ${isActive
                        ? "bg-primary/80 text-white"
                        : "text-foreground/80 hover:bg-foreground/5"
                      }`}
                  >
                    <IconBase icon={navItem.icon} className="size-4" />
                    <span>{t(navItem.label)}</span>
                  </Link>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
}
