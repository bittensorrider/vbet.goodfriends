import { ModalControls } from "@/hooks/useModal";
import ModalLayout from "./modalLayout";
import IconBase from "../icon/iconBase";
import { ICONS } from "@/constants/icons";
import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Logo from "../common/brand/logo";
import { useTranslations } from "next-intl";

type Props = ModalControls<"unlock">;

export default function UnlockBonusModal({ isOpen, onClose }: Props) {
  const t = useTranslations("unlock_modal");

  return (
    <ModalLayout isOpen={isOpen} onClose={onClose} ariaLabel={t("title")}>
      <div className="flex flex-col items-center gap-1">
        <div className="flex flex-col items-center gap-2">
          <Logo withTitle={false} className="w-[40px] h-[35px]" />
          <h6 className="text-xl font-semibold text-foreground">
            {t("title")}
          </h6>
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full ">
        <div className="flex items-center justify-between w-full">
          <span>{t("currency_label")}</span>
          <div className="relative flex items-center gap-[6px]">
            <Image
              src={`/imgs/coins/btc.svg`}
              className="size-6 rounded-full"
              width={24}
              height={24}
              alt="BTC (Bitcoin)"
            />
            <span className="text-foreground text-base font-medium">
              BTC (Bitcoin)
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between bg-primary/10 border border-primary rounded-2xl p-6">
          <span className="text-sm font-semibold text-foreground">
            {t("unlocked_bonus")}
          </span>
          <Button variant={"primary"}>{t("bonus_amount")}</Button>
        </div>

        <Input
          placeholder={t("min_placeholder")}
          className="bg-foreground/5 h-[41px]"
          render={
            <Button
              type="button"
              variant="success"
              size={"sm"}
              className="rounded-lg text-xs !absolute right-1 top-1/2 -translate-y-1/2 !h-[20px] !min-h-[32px]"
            >
              {t("claim_bonus")}
            </Button>
          }
        />
      </div>
      <div className="flex w-full flex-col gap-2 items-start">
        <div className="flex  w-full items-center justify-between">
          <div className="flex items-center gap-1.5">
            <IconBase icon={ICONS.LOCKED} className="size-5" />
            <span className="text-sm font-semibold">{t("locked_bonus")}</span>
          </div>
          <span className="text-danger text-xs font-medium">
            {t("locked_bonus_amount")}
          </span>
        </div>
        <p className="text-xs font-medium text-foreground/70">
          {t("unlock_formula")} <br />
          {t("converting_note")}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button className="w-full rounded-xl" variant={"default"} size={"sm"}>
          {t("go_to_casino")}
        </Button>
        <Button className="w-full rounded-xl" variant={"primary"} size={"sm"}>
          {t("go_to_sports")}
        </Button>
      </div>
    </ModalLayout>
  );
}
