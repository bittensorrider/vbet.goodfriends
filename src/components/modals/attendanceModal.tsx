import { ModalControls } from "@/hooks/useModal";
import ModalLayout from "@/components/modals/modalLayout";
import Logo from "@/components/common/brand/logo";
import { Button } from "../ui/button";
import InfoCard from "../cards/info/statInfoCard";
import { useTranslations } from "next-intl";

type Props = ModalControls<"attendance">;

export default function AttenndanceModal({ isOpen, onClose }: Props) {
  const t = useTranslations('attendance_modal');

  return (
    <ModalLayout isOpen={isOpen} onClose={onClose} ariaLabel={t('title')}>
      <div className="flex flex-col items-center gap-1">
        <div className="flex flex-col items-center gap-2">
          <Logo withTitle={false} className="w-[40px] h-[35px]" />
          <h6 className="text-xl font-semibold text-foreground">{t('title')}</h6>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col items-center gap-2 rounded-2xl bg-foreground/5 border border-neutral/10 p-4">
          <span className="text-xs font-semibold text-foreground/60">
            {t('three_days')}
          </span>
          <Button
            size={`xs`}
            variant={`primary`}
            className="rounded-md p-1.5 font-bold"
          >
            {t('bonus_amount')}
          </Button>
        </div>
        <div className="flex flex-col items-center gap-2 rounded-2xl bg-foreground/5 border border-neutral/10 p-4">
          <span className="text-xs font-semibold text-foreground/60">
            {t('seven_days')}
          </span>
          <Button
            size={`xs`}
            variant={`primary`}
            className="rounded-md p-1.5 font-bold"
          >
            {t('bonus_amount')}
          </Button>
        </div>
        <div className="flex flex-col items-center gap-2 rounded-2xl bg-foreground/5 border border-neutral/10 p-4">
          <span className="text-xs font-semibold text-foreground/60">
            {t('thirty_days')}
          </span>
          <Button
            size={`xs`}
            variant={`primary`}
            className="rounded-md p-1.5 font-bold"
          >
            {t('bonus_amount')}
          </Button>
        </div>
      </div>

      <p className="text-xs font-medium text-foreground/70">
        {t('reset_message')}
      </p>

      <div className="grid grid-cols-2 gap-3">
        <InfoCard
          className="bg-primary/10 border border-neutral/5"
          title={t('my_attendance')}
          description={t('zero_days')}
        />
        <InfoCard
          className="bg-primary/10 border border-neutral/5"
          title={t('total_attendance')}
          description={t('zero_bonus')}
        />
      </div>
    </ModalLayout>
  );
}
