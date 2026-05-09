import { themeSelectors, ThemeState } from "@/store/theme.store";
import IconBase from "../icon/iconBase";
import { ICONS } from "@/constants/icons";
import { LayoutState } from "@/store/layout.store";
import { useTranslations } from "next-intl";

type Props = Pick<LayoutState, "isAsideOpen">;

export default function ThemeSwitcher({ isAsideOpen }: Props) {
  const t = useTranslations('theme_switcher');
  const mode = themeSelectors.use.mode();
  const setMode = themeSelectors.use.setMode();
  const toggleMode = themeSelectors.use.toggleMode();

  const onChange = (mode: ThemeState["mode"]) => {
    if (!isAsideOpen) {
      return toggleMode();
    }
    setMode(mode);
  };

  return (
    <div className="flex items-center p-1 bg-foreground/5 rounded-full overflow-hidden">
      <button
        onClick={() => onChange("dark")}
        className={`${
          mode === "dark"
            ? "bg-foreground/5 text-foreground font-bold"
            : "text-foreground/50 hover:text-foreground/80 font-light"
        } ${
          !isAsideOpen && mode !== "dark" ? "hidden" : "flex"
        }  gap-1.5 items-center justify-center flex-1 cursor-pointer p-2 rounded-full transition-all`}
        aria-label="dark-mode"
      >
        <IconBase icon={ICONS.HALF_MOON} className="size-4" />
        <span className={`${isAsideOpen ? "" : "opacity-0 absolute"} text-xs`}>{t('dark')}</span>
      </button>

      <button
        onClick={() => onChange("light")}
        className={`${
          mode === "light"
            ? "bg-foreground/5 text-foreground font-bold"
            : "text-foreground/50 hover:text-foreground/80 font-light"
        } ${
          !isAsideOpen && mode !== "light" ? "hidden" : "flex"
        } gap-1.5 items-center justify-center flex-1 cursor-pointer p-2 rounded-full transition-all`}
        aria-label="light-mode"
      >
        <IconBase icon={ICONS.SUN} className="size-4" />
        <span className={`${isAsideOpen ? "" : "opacity-0 absolute"} text-xs`}>{t('light')}</span>
      </button>
    </div>
  );
}
