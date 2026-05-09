import { Link } from "@/i18n/navigation";
import IconBase from "@/components/icon/iconBase";
import { AsideNavType } from "@/constants/asideMenu";
import { LayoutState } from "@/store/layout.store";
import { useTranslations } from "next-intl";

type StoreActionProps = Pick<LayoutState, "isAsideOpen" | "toggleAside">;

type Props = {
  nav: AsideNavType;
  isActive: boolean;
  isMobile: boolean;
  onAction: (action: AsideNavType["action"]) => void;
} & StoreActionProps;

export default function AsideLink({
  nav: { href, icon, label, action },
  isActive = false,
  isAsideOpen,
  toggleAside,
  isMobile,
  onAction,
}: Props) {

  const t = useTranslations('aside_menu');


  return (
    <Link
      href={href}
      onClick={(e) => {
        if (action) {
          e.preventDefault();
          onAction(action);
        }

        if (isMobile) {
          toggleAside();
        }
      }}
      prefetch={true}
      className={`${isActive
        ? "text-primary"
        : "text-secondary/70 dark:text-secondary hover:text-foreground"
        } active:scale-95 flex items-center gap-3 px-2 h-10 text-sm transition-all`}
    >
      <div className="[&>svg]:size-5">
        <IconBase icon={icon} />
      </div>
      {isAsideOpen && (
        <span className={`${isActive ? "text-neutral" : ""} text-nowrap mt-1`}>
          {t(label)}
        </span>
      )}
    </Link>
  );
}
