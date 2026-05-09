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
import { toastDanger, toastSuccess } from "@/components/ui/sonner";
import { ICONS } from "@/constants/icons";
import { API_ROUTES } from "@/constants/routes";
import { useModal } from "@/hooks/useModal";
import fetcher from "@/lib/fetcher";
import { RegisterSchema, registerSchema } from "@/validations/auth.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

export default function RegisterForm() {
  const registerModal = useModal("auth");
  const [loading, setLoading] = useState<boolean>(false);
  const [emailTime, setEmailTime] = useState<number>(0);
  const [emailConfirmed, setEmailConfirmed] = useState<boolean>(false);
  const t = useTranslations("auth_register");
  const tError = useTranslations("auth_errors");

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      email_code: "",
      password: "",
      nickname: "",
    },
  });

  function onRegister() {
    return toastDanger("Still in progress!");
  }
  async function onSubmit(values: RegisterSchema) {
    if (loading) return;

    if (!emailConfirmed) {
      return toastDanger("Verify your email first");
    }

    setLoading(true);

    const res = await fetcher(API_ROUTES.AUTH.REGISTER, {
      method: "POST",
      body: JSON.stringify({
        loginId: values.email,
        pw: values.password,
        info: {
          nickname: values.nickname,
        },
      }),
    });

    setLoading(false);

    if (!res.success) {
      if (res.code === 3001) {
        return form.setError("nickname", {
          message: res.message,
        });
      }

      return toastDanger(res.message);
    }

    toastSuccess(
      "Congratulations on your membership. If approved, a text message will be sent to the phone number you entered.",
    );
    registerModal.onClose();
  }

  const onSendEmail = async () => {
    const isValid = await form.trigger("email");

    if (loading || !isValid || emailTime > 0 || emailConfirmed) return;

    const email = form.getValues("email");
    setLoading(true);
    const res = await fetcher(API_ROUTES.AUTH.SEND_EMAIL_CODE, {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    setLoading(false);

    if (!res.success) {
      if (res.code === "1111") {
        return form.setError("email", {
          message: "This email address has already been registered.",
        });
      }

      toastDanger(res.message);
      return;
    }

    toastSuccess(res.message);
    setEmailTime(300); // 5 minutes
    setEmailConfirmed(false);
  };

  const onSendCode = async () => {
    const isValid = await form.trigger("email_code");

    if (!isValid) return;

    const email = form.getValues("email");
    const code = form.getValues("email_code");

    const res = await fetcher(API_ROUTES.AUTH.VERIFY_EMAIL_CODE, {
      method: "PATCH",
      body: JSON.stringify({ email, code }),
    });

    if (!res.success) {
      return toastDanger("The authentication code do not match.");
    }

    toastSuccess(res.message);
    setEmailConfirmed(true);
  };

  useEffect(() => {
    if (emailTime <= 0) return;

    const interval = setInterval(() => {
      setEmailTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [emailTime]);

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-4">
          <div className="grid sm:grid-cols-[70%_auto] items-start gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>{t("email")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@gmail.com"
                      className="pr-24"
                      disabled={emailConfirmed}
                      render={
                        <Button
                          type="button"
                          onClick={onSendEmail}
                          disabled={emailTime > 0 || emailConfirmed}
                          variant="success"
                          size={"sm"}
                          className={`${
                            emailConfirmed
                              ? "w-auto !bg-transparent"
                              : "w-[85px]"
                          } rounded-lg text-xs !absolute right-1 top-1/2 -translate-y-1/2 !h-[20px] !min-h-[32px]`}
                        >
                          {emailConfirmed ? (
                            <IconBase
                              icon={ICONS.CHECKMARK}
                              className="text-success size-5"
                            />
                          ) : emailTime > 0 ? (
                            `${Math.floor(emailTime / 60)}:${String(
                              emailTime % 60,
                            ).padStart(2, "0")}`
                          ) : (
                            t("sendCode")
                          )}
                        </Button>
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {fieldState.error?.message
                      ? tError(fieldState.error.message)
                      : null}
                  </FormMessage>
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
                      placeholder="Code"
                      disabled={emailTime === 0 || emailConfirmed}
                      maxLength={6}
                      render={
                        emailConfirmed && (
                          <Button
                            onClick={onSendCode}
                            disabled={emailConfirmed}
                            type="button"
                            variant="success"
                            size={"sm"}
                            className={`${
                              emailConfirmed
                                ? "w-auto !bg-transparent"
                                : "w-[85px]"
                            } rounded-lg text-xs !absolute right-1 top-1/2 -translate-y-1/2 !h-[20px] !min-h-[32px]`}
                          >
                            <IconBase
                              icon={ICONS.CHECKMARK}
                              className="text-success size-5"
                            />
                          </Button>
                        )
                      }
                      {...field}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        if (e.target.value.length === 6) {
                          onSendCode();
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage>
                    {fieldState.error?.message
                      ? tError(fieldState.error.message)
                      : null}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 items-start gap-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>{t("password")}</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage>
                    {fieldState.error?.message
                      ? tError(fieldState.error.message)
                      : null}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nickname"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>{t("nickname")}</FormLabel>
                  <FormControl>
                    <Input placeholder="johnDoe10234" {...field} />
                  </FormControl>
                  <FormMessage>
                    {fieldState.error?.message
                      ? tError(fieldState.error.message)
                      : null}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button
          // type="submit"
          onClick={onRegister}
          className="w-full rounded-xl"
          variant={"primary"}
          size={"sm"}
        >
          {t("submit")}
        </Button>
      </form>
    </Form>
  );
}
