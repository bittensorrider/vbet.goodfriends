import { ModalControls } from "@/hooks/useModal";
import { useEffect, useState } from "react";
import ModalLayout from "../modalLayout";
import Logo from "@/components/common/brand/logo";
import IconBase from "@/components/icon/iconBase";
import { ICONS } from "@/constants/icons";
import { WheelModalTab } from "@/types/modal.types";
import LuckyWheel from "./wheel";
import WheelDetails from "./wheelDetails";
import { useTranslations } from "next-intl";

type Props = ModalControls<"wheel">;

export default function WheelModal({
  isOpen,
  onClose,
  setParam,
  getParam,
}: Props) {
  const t = useTranslations('wheel_modal');
  const [activeTab, setActiveTab] = useState<WheelModalTab>(
    getParam("tab", "wheel")
  );

  useEffect(() => {
    setActiveTab(getParam("tab", "wheel"));
  }, [getParam]);

  const onTabChange = (tab: WheelModalTab) => {
    setParam("tab", tab);
  };

  const getTitle = () => {
    switch (activeTab) {
      case "wheel":
        return t('lucky_wheel_title');
      case "details":
        return t('wheel_details_title');
      default:
        return ""; // Default fallback title
    }
  };  

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel={activeTab}
      hasPrevBtn={activeTab !== "wheel"}
      onPrevBtn={() => onTabChange("wheel")}
    >
      <div className="relative flex flex-col items-center gap-1">
        <div className=" flex flex-col items-center gap-2">
          <Logo withTitle={false} className="w-[40px] h-[35px]" />
          <h6 className="text-xl font-semibold text-foreground">
            {getTitle()}
          </h6>
          {activeTab === "wheel" && (
            <button
              onClick={() => onTabChange("details")}
              className="absolute -bottom-2 z-10 cursor-pointer -right-1 flex items-center gap-1 text-foreground px-3 py-2 rounded-[18px] bg-foreground/5"
            >
              <IconBase icon={ICONS.HELP_CIRCLE} className="sizr-4" />
              <span className="text-xs font-normal">{t('details_button')}</span>
            </button>
          )}
        </div>
      </div>

      {activeTab === "wheel" ? (
        <LuckyWheel />
      ) : (
        <WheelDetails setActiveTab={onTabChange} />
      )}
    </ModalLayout>
  );
}
