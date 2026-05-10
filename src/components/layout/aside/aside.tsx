"use client";

import Logo from "@/components/common/brand/logo";
import { layoutSelectors, LayoutState } from "@/store/layout.store";
import { FC, useEffect, useState } from "react";
import AsideNav from "@/components/layout/aside/asideNav";
import AsideLink from "@/components/layout/aside/asideLink";
import { ASIDE_MENU, AsideNavType } from "@/constants/asideMenu";
import IconBase from "@/components/icon/iconBase";
import LanguageSwitcher from "@/components/common/languageSwitcher";
import { ICONS } from "@/constants/icons";
import { Button } from "@/components/ui/button";
import ThemeSwitcher from "@/components/common/themeSwitcher";
import { useSearchParams } from "next/navigation";
import { usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type AsideTogglerProps = Pick<LayoutState, "isAsideOpen" | "toggleAside">;

const AsideToggler: FC<AsideTogglerProps> = ({ isAsideOpen, toggleAside }) => {
  return (
    <button
      aria-label={isAsideOpen ? "collapse aside menu" : "expand aside menu"}
      className="absolute z-10 top-[87px] -right-4 w-8 h-8 rounded-full bg-background shadow-md border border-neutral/5 hidden lg:grid place-content-center cursor-pointer hover:opacity-80 transition-all"
      onClick={toggleAside}
    >
      <IconBase
        icon={ICONS.MENU_COLLAPSE}
        className={`${isAsideOpen ? "" : "rotate-180"} size-4.5`}
      />
    </button>
  );
};

export default function Aside() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isAsideOpen = layoutSelectors.use.isAsideOpen();
  const toggleAside = layoutSelectors.use.toggleAside();
  const toggleChat = layoutSelectors.use.toggleChat();
  const asideT = useTranslations("aside_menu");

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function checkMobile() {
      setIsMobile(window.innerWidth < 1024); // match your lg breakpoint
    }
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const onAction = (action: AsideNavType["action"]) => {
    if (action === "chat") {
      toggleChat();
    }
  };
  return (
    <aside
      className={`${
        isAsideOpen
          ? "w-full max-w-full lg:max-w-[240px] border-r-neutral/5"
          : "max-w-0 lg:max-w-[74px] border-r-transparent lg:border-r-neutral/5"
      } fixed lg:sticky top-0 flex flex-col py-4 h-full flex-1 shrink-0 border-r linear-background transition-all z-50`}
    >
      <AsideToggler isAsideOpen={isAsideOpen} toggleAside={toggleAside} />

      <div className="w-full flex-1 flex flex-col gap-4 overflow-hidden">
        <div className="flex lg:flex-col justify-between py-2 px-4">
          <Logo withTitle={isAsideOpen} />
          <Button
            onClick={toggleAside}
            variant={`default`}
            size={`icon_xs`}
            className="border-transparent rounded-full lg:hidden flex"
          >
            <IconBase icon={ICONS.CLOSE_X} className="size-4" />
          </Button>
        </div>

        {/* <div className="w-full grid grid-cols-2 lg:flex lg:flex-col gap-2 px-4">
          <Button
            onClick={() => {
              if (isMobile) {
                toggleAside();
              }
              wheelModal.onOpen({ tab: "wheel" });
            }}
            variant={`primary`}
            className={`${
              isAsideOpen ? "" : "px-2.5"
            } justify-start bg-primary dark:bg-primary/50 hover:bg-primary border-neutral/5`}
          >
            <Image
              src={`/imgs/wheel-icon.svg`}
              alt="Wheel Icon"
              width={20}
              height={20}
              className="w-full max-w-[20px]"
            />
            {isAsideOpen && (
              <span className="text-[13px] font-medium">Spin Now</span>
            )}
          </Button>
          <Button
            onClick={() => {
              if (isMobile) {
                toggleAside();
              }
              attendanceModal.onOpen();
            }}
            variant={`default`}
            className={`${isAsideOpen ? "" : "px-2.5"} justify-start`}
          >
            <Image
              src={`/imgs/todolist-icon.svg`}
              alt="TODO List Icon"
              width={20}
              height={20}
              className="w-full max-w-[20px]"
            />
            {isAsideOpen && (
              <span className="text-[13px] font-medium">Attendance</span>
            )}
          </Button>
        </div> */}

        <div className="flex-1 overflow-auto custom-scrollbar px-4 h-[calc(100vh-200px)]">
          <div className="flex flex-col space-y-4 divide-y divide-neutral/5 border-b border-neutral/5">
            {ASIDE_MENU.map((menu, index) => (
              <AsideNav title={asideT(menu.title)} key={index}>
                {menu.nav.map((navItem, navItemIndex) => (
                  <AsideLink
                    key={navItemIndex}
                    nav={navItem}
                    isActive={
                      pathname.startsWith("/games") &&
                      navItem.identifier &&
                      navItem.identifier ===
                        (searchParams.get("type") == "live"
                          ? "casino"
                          : searchParams.get("type"))
                        ? true
                        : pathname === navItem.href
                          ? true
                          : false
                    }
                    isAsideOpen={isAsideOpen}
                    toggleAside={toggleAside}
                    isMobile={isMobile}
                    onAction={onAction}
                  />
                ))}
              </AsideNav>
            ))}
          </div>
        </div>

        <div className="px-4 flex flex-col gap-2">
          <ThemeSwitcher isAsideOpen={isAsideOpen} />
          <LanguageSwitcher isAsideOpen={isAsideOpen} />
        </div>
      </div>
    </aside>
  );
}
