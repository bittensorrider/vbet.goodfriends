import Image from "next/image";
import IconBase from "../icon/iconBase";
import { ICONS } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import CasinoSlotListContainer from "../common/containers/casinoSlotListContainer";
import SectionTitle from "./sectionTitle";
import { ROUTES } from "@/constants/routes";
import { useTranslations } from "next-intl";

const CasinoListCard = ({
  href,
  title,
  title_ch,
  logo,
  additionalImg,
  logoClassName = "",
  additionalImgClassName = "",
}: {
  href: string;
  title: string;
  title_ch: string;
  logo: { src: string; alt: string };
  additionalImg: { src: string; alt: string };
  logoClassName?: string;
  additionalImgClassName?: string;
}) => {
  return (
    <Link
      href={href}
      className="group hover:opacity-90 scale-95 transition-all relative w-full rounded-2xl"
      style={{
        aspectRatio: 217 / 120,
        background: "linear-gradient(180deg, #7E2CFF, #625DF9)",
      }}
    >
      <div className="flex flex-col gap-[2px] absolute z-10 bottom-2 sm:bottom-[14px] left-[14px]">
        <h6 className="text-[11px] md:text-[13px] font-regular text-white">
          {title_ch}
        </h6>
        <h6 className="text-[11px] md:text-[13px] font-semibold text-white">
          {title}
        </h6>
      </div>
      <Image
        src={logo.src}
        className={`${cn(
          "absolute top-2 left-2 w-full max-w-[100px] z-10",
          logoClassName,
        )}`}
        width={100}
        height={46}
        alt={logo.alt}
      />
      <Image
        src={additionalImg.src}
        className={`${cn(
          "group-hover:w-[61%] duration-400 transition-all absolute w-[52%] md:w-[56%] h-auto bottom-[0px] right-[-10px]  object-cover",
          additionalImgClassName,
        )}`}
        width={146}
        height={132}
        alt={additionalImg.alt}
      />
    </Link>
  );
};

export default function CasinoList() {
  const t = useTranslations("casino_list");
  return (
    <div className="flex flex-col gap-4 md:gap-10">
      <SectionTitle className="flex items-center gap-2">
        <IconBase icon={ICONS.POKER_CHIP} className="size-5" />
        {t("title")}
      </SectionTitle>

      <CasinoSlotListContainer>
        <CasinoListCard
          href={ROUTES.CASINO}
          logo={{
            src: "/imgs/slot-casino-assets/pragmatic_logo.png",
            alt: "pragmatic",
          }}
          additionalImg={{
            src: "/imgs/slot-casino-assets/pragmatic.png",
            alt: "pragmatic",
          }}
          title_ch={t("pragmatic_title_ch")}
          title={t("pragmatic_title")}
        />
      </CasinoSlotListContainer>
    </div>
  );
}
