import { ModalControls } from "@/hooks/useModal";
import { useEffect, useState } from "react";
import ModalLayout from "../modalLayout";
import Logo from "@/components/common/brand/logo";
import TabFilter from "@/components/filter/tabFilter";
import { userSelectors } from "@/store/user.store";
import ProfileForm from "@/components/forms/profile/profileForm";
import CropEditor from "@/components/forms/profile/avatarCrop";
import { urlToFile } from "@/lib/utils";
import { ICONS } from "../../../constants/icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import IconBase from "@/components/icon/iconBase";
import Image from "next/image";
import { ProfileModalTab } from "@/types/modal.types";
import { useTranslations } from "next-intl";
// import ProgressBar from "@/components/progress/ProgressBar";
// import CardWrapper from "@/components/wrapper/cardWrapper";
// import { User } from "@/types/user.types";

type Props = ModalControls<"profile">;

export default function ProfileModal({
  isOpen,
  onClose,
  getParam,
  setParam,
}: Props) {
  const t = useTranslations("profile_modal");
  const user = userSelectors.use.user();

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<ProfileModalTab>(
    getParam("tab", "profile"),
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setActiveTab(getParam("tab", "profile"));
  }, [getParam]);

  const onTabChange = (tab: ProfileModalTab) => {
    setParam("tab", tab);
  };

  useEffect(() => {
    if (!user) {
      return;
    }

    const prepareForm = async () => {
      const file = await urlToFile(user.info.avatar);
      setUploadedFile(file);
      setLoading(false);
    };

    prepareForm();
  }, [user]);

  const getTitle = () => {
    switch (activeTab) {
      case "profile":
        return t("manage_profile_title");
      case "vip":
        return t("manage_profile_title");
      case "edit":
        return t("edit_image_title");
      default:
        return t("welcome_title");
    }
  };

  return (
    user && (
      <ModalLayout
        className="w-full max-w-[600px]"
        isOpen={isOpen}
        onClose={onClose}
        ariaLabel={activeTab}
        hasPrevBtn={activeTab === "edit"}
        onPrevBtn={() => onTabChange("profile")}
      >
        <div className="flex flex-col items-center gap-1">
          <div className="flex flex-col items-center gap-2">
            <Logo withTitle={false} className="w-[40px] h-[35px]" />
            <h6 className="text-xl font-semibold text-foreground">
              {getTitle()}
            </h6>
          </div>
        </div>

        {(activeTab === "profile" || activeTab === "vip") && (
          <TabFilter
            value={activeTab}
            onValueChange={onTabChange}
            // tabs={["profile", "vip"]}
            tabs={["profile"]}
          />
        )}

        {activeTab === "profile" ? (
          loading ? (
            <div className="py-24 grid place-content-center">
              <IconBase icon={ICONS.SPINNER} className="animate-spin" />
            </div>
          ) : uploadedFile ? (
            <>
              <ProfileForm
                initialData={{
                  name: user.info.nickname,
                  avatar: uploadedFile,
                }}
                onEditStart={(file: File) => {
                  setUploadedFile(file);
                  onTabChange("edit");
                }}
              />

              {/* <ProfileInfo user={user} /> */}
            </>
          ) : null
        ) : activeTab === "vip" ? (
          <VipTab />
        ) : (
          uploadedFile && (
            <CropEditor
              file={uploadedFile}
              onSave={async (croppedFile) => {
                setUploadedFile(croppedFile);
                onTabChange("profile");
              }}
            />
          )
        )}
      </ModalLayout>
    )
  );
}

// const ProfileInfo = ({ user }: { user: User }) => {
//   return (
//     <div className="space-y-3">
//       <CardWrapper
//         title="Progress"
//         description="Earn bonuses and spin rewards as you level up. Plus, the higher your
//             level, the more bonus rewards you can get!"
//       >
//         <ProgressBar
//           value={(user.info.exp / user.info.needExp) * 100}
//           header={{
//             leftText: `${user.info.exp} Exp`,
//             rightText: `${user.info.needExp} Exp`,
//           }}
//           footer={{
//             rightText: `Level ${user.info.level} - Level ${
//               user.info.level + 1
//             }`,
//           }}
//         />
//       </CardWrapper>
//     </div>
//   );
// };

const VipTab = () => {
  const t = useTranslations("vip_tab");

  return (
    <>
      <Accordion type="single" collapsible className="gap-4 flex flex-col">
        <AccordionItem
          value="item-1"
          className="!border border-foreground/10 rounded-2xl p-4"
        >
          <AccordionTrigger className="p-0">
            <h6>{t("vip_benefits")}</h6>
            <IconBase
              icon={ICONS.CHEVRON_LEFT}
              className="-rotate-90 group-data-[state=open]:!rotate-90 size-5"
            />
          </AccordionTrigger>
          <AccordionContent className="p-0 mt-4 flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <Image
                  src={`/imgs/medals/bronze.svg`}
                  className="size-5"
                  width={20}
                  height={20}
                  alt="Bronze"
                />
                <p style={{ color: "#C4A490" }}>{t("bronze")}</p>
                <span className="text-foreground">({t("level")} 10)</span>
              </div>
              <ul>
                <li className="text-xs font-medium text-foreground/60 flex items-center gap-2 pl-2">
                  <span className="flex w-0.5 h-0.5 bg-foreground/60"></span>
                  {t("bonus_from_support")}
                </li>
                <li className="text-xs font-medium text-foreground/60 flex items-center gap-2 pl-2">
                  <span className="flex w-0.5 h-0.5 bg-foreground/60"></span>
                  {t("rakeback_enabled")}
                </li>
                <li className="text-xs font-medium text-foreground/60 flex items-center gap-2 pl-2">
                  <span className="flex w-0.5 h-0.5 bg-foreground/60"></span>
                  {t("weekly_bonuses")}
                </li>
                <li className="text-xs font-medium text-foreground/60 flex items-center gap-2 pl-2">
                  <span className="flex w-0.5 h-0.5 bg-foreground/60"></span>
                  {t("monthly_bonuses")}
                </li>
                <li className="text-xs font-medium text-foreground/60 flex items-center gap-2 pl-2">
                  <span className="flex w-0.5 h-0.5 bg-foreground/60"></span>
                  {t("vip_telegram_access")}
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <Image
                  src={`/imgs/medals/silver.svg`}
                  className="size-5"
                  width={20}
                  height={20}
                  alt="Silver"
                />
                <p style={{ color: "#B2CCCC" }}>{t("silver")}</p>
                <span className="text-foreground">({t("level")} 11)</span>
              </div>
              <ul>
                <li className="text-xs font-medium text-foreground/60 flex items-center gap-2 pl-2">
                  <span className="flex w-0.5 h-0.5 bg-foreground/60"></span>
                  {t("bonus_from_support")}
                </li>
                <li className="text-xs font-medium text-foreground/60 flex items-center gap-2 pl-2">
                  <span className="flex w-0.5 h-0.5 bg-foreground/60"></span>
                  {t("rakeback_enabled")}
                </li>
                <li className="text-xs font-medium text-foreground/60 flex items-center gap-2 pl-2">
                  <span className="flex w-0.5 h-0.5 bg-foreground/60"></span>
                  {t("weekly_bonuses")}
                </li>
                <li className="text-xs font-medium text-foreground/60 flex items-center gap-2 pl-2">
                  <span className="flex w-0.5 h-0.5 bg-foreground/60"></span>
                  {t("monthly_bonuses")}
                </li>
                <li className="text-xs font-medium text-foreground/60 flex items-center gap-2 pl-2">
                  <span className="flex w-0.5 h-0.5 bg-foreground/60"></span>
                  {t("vip_telegram_access")}
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <Image
                  src={`/imgs/medals/gold.svg`}
                  className="size-5"
                  width={20}
                  height={20}
                  alt="Gold"
                />
                <p style={{ color: "#B2CCCC" }}>{t("gold")}</p>
                <span className="text-foreground">({t("level")} 12)</span>
              </div>
              <ul>
                <li className="text-xs font-medium text-foreground/60 flex items-center gap-2 pl-2">
                  <span className="flex w-0.5 h-0.5 bg-foreground/60"></span>
                  {t("bonus_from_support")}
                </li>
                <li className="text-xs font-medium text-foreground/60 flex items-center gap-2 pl-2">
                  <span className="flex w-0.5 h-0.5 bg-foreground/60"></span>
                  {t("rakeback_enabled")}
                </li>
                <li className="text-xs font-medium text-foreground/60 flex items-center gap-2 pl-2">
                  <span className="flex w-0.5 h-0.5 bg-foreground/60"></span>
                  {t("weekly_bonuses")}
                </li>
                <li className="text-xs font-medium text-foreground/60 flex items-center gap-2 pl-2">
                  <span className="flex w-0.5 h-0.5 bg-foreground/60"></span>
                  {t("monthly_bonuses")}
                </li>
                <li className="text-xs font-medium text-foreground/60 flex items-center gap-2 pl-2">
                  <span className="flex w-0.5 h-0.5 bg-foreground/60"></span>
                  {t("vip_telegram_access")}
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <Image
                  src={`/imgs/medals/platinum-1.svg`}
                  className="size-5"
                  width={20}
                  height={20}
                  alt="Platinum"
                />
                <p>{t("platinum_1_3")}</p>
                <span className="text-foreground">({t("level")} 13)</span>
              </div>
              <ul>
                <li className="text-xs font-medium text-foreground/60 flex items-center gap-2 pl-2">
                  <span className="flex w-0.5 h-0.5 bg-foreground/60"></span>
                  {t("bonus_from_support")}
                </li>
                <li className="text-xs font-medium text-foreground/60 flex items-center gap-2 pl-2">
                  <span className="flex w-0.5 h-0.5 bg-foreground/60"></span>
                  {t("rakeback_enabled")}
                </li>
                <li className="text-xs font-medium text-foreground/60 flex items-center gap-2 pl-2">
                  <span className="flex w-0.5 h-0.5 bg-foreground/60"></span>
                  {t("weekly_bonuses")}
                </li>
                <li className="text-xs font-medium text-foreground/60 flex items-center gap-2 pl-2">
                  <span className="flex w-0.5 h-0.5 bg-foreground/60"></span>
                  {t("monthly_bonuses")}
                </li>
                <li className="text-xs font-medium text-foreground/60 flex items-center gap-2 pl-2">
                  <span className="flex w-0.5 h-0.5 bg-foreground/60"></span>
                  {t("vip_telegram_access")}
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1.5">
                <Image
                  src={`/imgs/medals/platinum-4.svg`}
                  className="size-5"
                  width={20}
                  height={20}
                  alt="Platinum"
                />
                <p>{t("platinum_4_6")}</p>
                <span className="text-foreground">({t("level")} 14)</span>
              </div>
              <ul>
                <li className="text-xs font-medium text-foreground/60 flex items-center gap-2 pl-2">
                  <span className="flex w-0.5 h-0.5 bg-foreground/60"></span>
                  {t("bonus_from_support")}
                </li>
                <li className="text-xs font-medium text-foreground/60 flex items-center gap-2 pl-2">
                  <span className="flex w-0.5 h-0.5 bg-foreground/60"></span>
                  {t("rakeback_enabled")}
                </li>
                <li className="text-xs font-medium text-foreground/60 flex items-center gap-2 pl-2">
                  <span className="flex w-0.5 h-0.5 bg-foreground/60"></span>
                  {t("weekly_bonuses")}
                </li>
                <li className="text-xs font-medium text-foreground/60 flex items-center gap-2 pl-2">
                  <span className="flex w-0.5 h-0.5 bg-foreground/60"></span>
                  {t("monthly_bonuses")}
                </li>
                <li className="text-xs font-medium text-foreground/60 flex items-center gap-2 pl-2">
                  <span className="flex w-0.5 h-0.5 bg-foreground/60"></span>
                  {t("vip_telegram_access")}
                </li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-2"
          className="!border border-foreground/10 rounded-2xl p-4"
        >
          <AccordionTrigger className="p-0 w-full flex flex-col gap-1">
            <div className="flex w-full items-center justify-between">
              <h6>{t("vip_hosts")}</h6>
              <IconBase
                icon={ICONS.CHEVRON_LEFT}
                className="-rotate-90 group-data-[state=open]:!rotate-90 size-5"
              />
            </div>
            <p className="text-foreground/60 text-xs">{t("vip_hosts_desc")}</p>
          </AccordionTrigger>
          <AccordionContent className="p-0 mt-4 flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <ul className="flex flex-col gap-1">
                <li className="flex items-center gap-1">
                  <IconBase
                    icon={ICONS.OUTLINE_CHECK}
                    className="size-4 text-success/20"
                  />
                  <span className="text-xs font-medium text-foreground/80">
                    {t("bonus_from_support")}
                  </span>
                </li>
                <li className="flex items-center gap-1">
                  <IconBase
                    icon={ICONS.OUTLINE_CHECK}
                    className="size-4 text-success/20"
                  />
                  <span className="text-xs font-medium text-foreground/80">
                    {t("tailored_bonuses")}
                  </span>
                </li>
                <li className="flex items-center gap-1">
                  <IconBase
                    icon={ICONS.OUTLINE_CHECK}
                    className="size-4 text-success/20"
                  />
                  <span className="text-xs font-medium text-foreground/80">
                    {t("gameplay_statistics")}
                  </span>
                </li>
                <li className="flex items-center gap-1">
                  <IconBase
                    icon={ICONS.OUTLINE_CHECK}
                    className="size-4 text-success/20"
                  />
                  <span className="text-xs font-medium text-foreground/80">
                    {t("exclusive_promotions")}
                  </span>
                </li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};
