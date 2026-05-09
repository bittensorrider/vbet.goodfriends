import Image from "next/image";
import IconBase from "../icon/iconBase";
import { ICONS } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import CasinoSlotListContainer from "../common/containers/casinoSlotListContainer";
import SectionTitle from "./sectionTitle";
import { ROUTES } from "@/constants/routes";
import { useTranslations } from "next-intl";

const SlotListCard = ({
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
      className="group relative hover:opacity-90 transition-all w-full scale-95 rounded-2xl"
      style={{
        aspectRatio: 217 / 120,
        background: "linear-gradient(180deg, #7E2CFF, #625DF9)",
      }}
    >
      <div className="flex flex-col gap-[2px] absolute z-10 bottom-3 sm:bottom-[14px] left-[14px]">
        <h6 className="text-[11px] md:text-[13px] font-regular text-white">{title_ch}</h6>
        <h6 className="text-[11px] md:ext-[13px] font-semibold text-white">{title}</h6>
      </div>
      <Image
        src={logo.src}
        alt={logo.alt}
        width={100}
        height={46}
        className={`${cn(
          "absolute top-2 left-2 w-full max-w-[80px] md:max-w-[100px] z-10",
          logoClassName
        )}`}
      />
      <Image
        src={additionalImg.src}
        alt={additionalImg.alt}
        width={146}
        height={132}
        className={`${cn(
          "absolute group-hover:w-[65%] md:group-hover:w-[70%] transition-all duration-400 w-[55%] md:w-[65%] h-auto max-h-[200px] bottom-[0px] right-[-10px]  object-cover",
          additionalImgClassName
        )}`}
      />
    </Link>
  );
};

export default function SlotList() {
  const t = useTranslations('slot_list');
  return (
    <div className="flex flex-col gap-4 md:gap-10">
      <SectionTitle className="flex items-center gap-2">
        <IconBase icon={ICONS.CHERRY} className="size-5" />
        {t("title")}
      </SectionTitle>

      <CasinoSlotListContainer>
        <SlotListCard
          href={ROUTES.SLOT + `&provider=PRAGMATIC`}
          logo={{
            src: "/imgs/slot-casino-assets/pragmatic_logo.png",
            alt: "pragmatic",
          }}
          additionalImg={{
            src: "/imgs/slot-casino-assets/pragmatic_slot.png",
            alt: "pragmatic",
          }}
          title_ch={t("pragmatic_title_ch")}
          title={t("pragmatic_title")}
        />

        <SlotListCard
          href={ROUTES.SLOT + `&provider=HABANERO`}
          logo={{
            src: "/imgs/slot-casino-assets/habanero_logo.png",
            alt: "habanero",
          }}
          additionalImg={{
            src: "/imgs/slot-casino-assets/habanero_slot.png",
            alt: "habanero",
          }}
          title_ch={t("habanero_title_ch")}
          title={t("habanero_title")}
          additionalImgClassName="bottom-[20px] max-w-[58%] group-hover:w-[63%] group-hover:max-w-[63%]"
        />

        <SlotListCard
          href={ROUTES.SLOT + `&provider=PLAYSON`}
          logo={{
            src: "/imgs/slot-casino-assets/playson_logo.png",
            alt: "playson",
          }}
          additionalImg={{
            src: "/imgs/slot-casino-assets/playson_slot.png",
            alt: "playson",
          }}
          title_ch={t("playson_title_ch")}
          title={t("playson_title")}
        />

        <SlotListCard
          href={ROUTES.SLOT + `&provider=PGSOFT`}
          logo={{
            src: "/imgs/slot-casino-assets/pgsoft_logo.png",
            alt: "pgsoft",
          }}
          additionalImg={{
            src: "/imgs/slot-casino-assets/pgsoft_slot.png",
            alt: "pgsoft",
          }}
          title_ch={t("pgsoft_title_ch")}
          title={t("pgsoft_title")}
        />

        <SlotListCard
          href={ROUTES.SLOT + `&provider=CQ9`}
          logo={{
            src: "/imgs/slot-casino-assets/cq9_logo.png",
            alt: "cq9",
          }}
          additionalImg={{
            src: "/imgs/slot-casino-assets/cq9_slot.png",
            alt: "cq9",
          }}
          title_ch={t("cq9_title_ch")}
          title={t("cq9_title")}
          additionalImgClassName="max-w-[58%] group-hover:w-[63%] group-hover:max-w-[63%] right-[10px]"
        />

      </CasinoSlotListContainer>
    </div>
  );
}
