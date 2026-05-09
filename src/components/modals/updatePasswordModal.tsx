import { ModalControls } from "@/hooks/useModal";
import ModalLayout from "./modalLayout";
import Logo from "../common/brand/logo";
import UpdatePasswordForm from "../forms/settings/updatePasswordForm";
import { useTranslations } from "next-intl";

type Props = ModalControls<"update-password">;

export default function UpdatePasswordModal({ isOpen, onClose }: Props) {
  const t = useTranslations('update_password_modal');

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel={t('aria_label')}
    >
      <div className="flex flex-col items-center gap-1">
        <div className="flex flex-col items-center gap-2">
          <Logo withTitle={false} className="w-[40px] h-[35px]" />
          <h6 className="text-xl font-semibold text-foreground">
            {t('title')}
          </h6>
        </div>
      </div>

      <UpdatePasswordForm onClose={onClose} />

    </ModalLayout>
  );
}
