import IconBase from "@/components/icon/iconBase";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ICONS } from "@/constants/icons";
import { AuthModalTab } from "@/types/modal.types";
import {
  ResetPasswordSchema,
  resetPasswordSchema,
} from "@/validations/auth.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

type Props = {
  setActiveTab: (val: AuthModalTab) => void;
};

export default function ResetPasswordForm({ setActiveTab }: Props) {
  const t = useTranslations('auth_reset');
  const tError = useTranslations('auth_errors');
  const [codeSended, setCodeSended] = useState<boolean | "loading">(false);
  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
      email_code: "",
      new_password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = (values: ResetPasswordSchema) => {
    console.log(values);
  };

  const onSendCode = () => {
    if (codeSended === "loading") {
      return;
    }

    setCodeSended("loading");

    setTimeout(() => {
      setCodeSended(true);
    }, 2000);
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>{t("email")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@gmail.com"
                    {...field}
                    render={
                      <Button
                        onClick={onSendCode}
                        type="button"
                        variant="success"
                        size={"sm"}
                        className="w-[85px] rounded-lg text-xs !absolute right-1 top-1/2 -translate-y-1/2 !h-[20px] !min-h-[32px]"
                      >
                        {codeSended === "loading" && (
                          <Loader className="animate-spin" />
                        )}
                        {codeSended === "loading" ? t("sending") : t("sendCode")}
                      </Button>
                    }
                  />
                </FormControl>
                <FormMessage>{fieldState.error?.message ? tError(fieldState.error.message) : null}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email_code"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>{t("emailCode")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("verificationCode")}
                    {...field}
                    render={
                      <Button
                        onClick={onSendCode}
                        type="button"
                        variant="success"
                        size={"sm"}
                        className="w-[85px] rounded-lg text-xs !absolute right-1 top-1/2 -translate-y-1/2 !h-[20px] !min-h-[32px]"
                      >
                        {t("confirm")}
                      </Button>
                    }
                  />
                </FormControl>
                <FormMessage>{fieldState.error?.message ? tError(fieldState.error.message) : null}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="new_password"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>{t("newPassword")}</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage>{fieldState.error?.message ? tError(fieldState.error.message) : null}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password_confirmation"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>{t("confirmPassword")}</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage>{fieldState.error?.message ? tError(fieldState.error.message) : null}</FormMessage>
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => setActiveTab("login")}
            type="button"
            className="w-full border-transparent rounded-xl"
            variant={"default"}
            size={"default"}
          >
            <IconBase icon={ICONS.ARROW_RIGHT} className="rotate-180 size-4" />
            {t("backToLogin")}
          </Button>
          <Button
            className="w-full rounded-xl"
            variant={"primary"}
            size={"default"}
          >
            {t("verify")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
