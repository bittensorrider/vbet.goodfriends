"use client";
// import ChatBtn from "@/components/common/btns/chatBtn";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModal";
import { useTranslations } from "next-intl";

export default function HeaderGuest() {
  const t = useTranslations("header_guest");
  const authModal = useModal("auth");
  const openAuthModal = (tab: "login" | "register") => {
    authModal.onOpen({ tab });
  };

  return (
    <>
      <div className="flex items-center space-x-2">
        <Button onClick={() => openAuthModal("login")}>{t("login")}</Button>
        <Button onClick={() => openAuthModal("register")} variant={"primary"}>
          {t("register")}
        </Button>
        {/* <ChatBtn /> */}
      </div>
    </>
  );
}
