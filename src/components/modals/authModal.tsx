import { ModalControls } from "@/hooks/useModal";
import ModalLayout from "./modalLayout";
import Logo from "../common/brand/logo";
import { useEffect, useState } from "react";
import TabFilter from "../filter/tabFilter";
import LoginForm from "../forms/auth/loginForm";
import RegisterForm from "../forms/auth/registerForm";
import VerifyEmailForm from "../forms/auth/verifyEmailForm";
import ResetPasswordForm from "../forms/auth/resetPassword";
import { AuthModalTab } from "@/types/modal.types";
import { useTranslations } from "next-intl";

type Props = ModalControls<"auth">;

export default function AuthModal({
  isOpen,
  onClose,
  getParam,
  setParam,
}: Props) {
  const t = useTranslations('auth_modal');
  const [activeTab, setActiveTab] = useState<AuthModalTab>(
    getParam("tab", "login")
  );
  const [verifyEmail] = useState<string | null>(null);

  useEffect(() => {
    setActiveTab(getParam("tab", "login"));
  }, [getParam]);

  const onTabChange = (tab: AuthModalTab) => {
    setParam("tab", tab);
  };

  const getTitle = () => {
    switch (activeTab) {
      case "login":
        return t("title_login");
      case "register":
        return t("title_register");
      case "reset-password":
        return t("title_reset");
      case "verify-email":
        return t("title_verify");
      default:
        return t("title_login"); // fallback
    }
  };

  const getDescription = (verifyEmail: string | null) => {
    switch (activeTab) {
      case "login":
        return t("desc_login");
      case "register":
        return t("desc_register");
      case "reset-password":
        return t("desc_reset");
      case "verify-email":
        return t.rich("desc_verify", { email: verifyEmail ?? "" });
      default:
        return t("desc_login"); // fallback
    }
  };

  return (
    <ModalLayout
      size={activeTab === "register" ? "md" : "default"}
      className="w-full max-w-[600px]"
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel={activeTab}
    >
      <div className="flex flex-col items-center gap-1">
        <div className="flex flex-col items-center gap-2">
          <Logo withTitle={false} className="w-[40px] h-[35px]" />
          <h6 className="text-xl font-semibold text-foreground">
            {getTitle()}
          </h6>
        </div>
        <div
          className="text-xs text-foreground/70 leading-[150%]"
        >{getDescription(verifyEmail)}</div>
      </div>

      {(activeTab === "login" || activeTab === "register") && (
        <TabFilter
          value={activeTab}
          onValueChange={onTabChange}
          tabs={["login", "register"]}
        />
      )}

      {activeTab === "login" ? (
        <LoginForm setActiveTab={onTabChange} />
      ) : activeTab === "register" ? (
        <RegisterForm />
      ) : activeTab === "verify-email" ? (
        <VerifyEmailForm setActiveTab={onTabChange} />
      ) : (
        <ResetPasswordForm setActiveTab={onTabChange} />
      )}

      {/* {activeTab === "login" ||
        (activeTab === "register" && (
          <>
            <div className="flex items-center gap-[10px] justify-center">
              <span className="w-full max-w-[100px] h-[1px] bg-foreground/5"></span>
              <span className="text-xs font-medium text-foreground/60">
                or continue with
              </span>
              <span className="w-full max-w-[100px] h-[1px] bg-foreground/5"></span>
            </div>

            <div className="flex items-center justify-center gap-9">
              <button
                type="button"
                className="cursor-pointer hover:opacity-80 active:scale-95 active:opacity-100 transition-all"
              >
                <Image
                  src={"/imgs/social-platform-logos/google.svg"}
                  alt="google"
                  width={32}
                  height={32}
                  className="w-[32px]"
                />
              </button>
              <button
                type="button"
                className="cursor-pointer hover:opacity-80 active:scale-95 active:opacity-100 transition-all"
              >
                <Image
                  src={"/imgs/social-platform-logos/facebook.svg"}
                  alt="facebook"
                  width={32}
                  height={32}
                  className="w-[32px]"
                />
              </button>
              <button
                type="button"
                className="cursor-pointer hover:opacity-80 active:scale-95 active:opacity-100 transition-all"
              >
                <Image
                  src={"/imgs/social-platform-logos/apple.svg"}
                  alt="apple"
                  width={32}
                  height={32}
                  className="w-[32px]"
                />
              </button>
            </div>
          </>
        ))} */}
    </ModalLayout>
  );
}
