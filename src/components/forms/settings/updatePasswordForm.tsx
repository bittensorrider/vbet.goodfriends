import { SendCodeAction, UpdateUserAction, VerifyCodeAction } from "@/actions/user.actions";
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
import { userSelectors } from "@/store/user.store";
import { UpdatePasswordSchema, updatePasswordSchema } from "@/validations/auth.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

type Props = {
  onClose: () => void;
};

export default function UpdatePasswordForm({ onClose }: Props) {
  const t = useTranslations('update_password_form');
  const user = userSelectors.use.user();
  const form = useForm({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      email: "",
      email_code: "",
      new_password: "",
      password_confirmation: "",
    },
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [emailTime, setEmailTime] = useState<number>(0);
  const [emailConfirmed, setEmailConfirmed] = useState<boolean>(false);

  useEffect(() => {
    if (!user) {
      return;
    }

    form.setValue("email", user.loginId);
  }, [user, form]);

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

  const onSubmit = async (values: UpdatePasswordSchema) => {
    if (!user) return;

    const res = await UpdateUserAction(user._id, {
      loginId: values.email,
      pw: values.new_password,
    })

    if (!res.success) {
      return toastDanger(res.message);
    }
    toastSuccess(res.message);
    // await LoginOut()
    onClose()
  };

  const onSendEmail = async () => {
    const isValid = await form.trigger("email");

    if (loading || !isValid || emailTime > 0 || emailConfirmed) return;

    const email = form.getValues("email");
    setLoading(true);
    const res = await SendCodeAction(email)

    setLoading(false);

    if (!res.success) {
      if (res.code === "1111") {
        return form.setError("email", {
          message: t('email_already_registered'),
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

    const res = await VerifyCodeAction(email, code);
    if (!res.success) {
      return toastDanger(t('authentication_code_mismatch'));
    }

    toastSuccess(res.message);
    setEmailConfirmed(true);
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('email_label')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('email_placeholder')}
                    className="pr-24"
                    disabled
                    render={
                      <Button
                        type="button"
                        variant="success"
                        disabled={emailTime > 0 || emailConfirmed}
                        size={"sm"}
                        onClick={onSendEmail}
                        className={`${emailConfirmed ? "w-auto !bg-transparent" : "w-[85px]"
                          } rounded-lg text-xs !absolute right-1 top-1/2 -translate-y-1/2 !h-[20px] !min-h-[32px]`}
                      >
                        {emailConfirmed ? (
                          <IconBase
                            icon={ICONS.CHECKMARK}
                            className="text-success size-5"
                          />
                        ) : emailTime > 0 ? (
                          `${Math.floor(emailTime / 60)}:${String(
                            emailTime % 60
                          ).padStart(2, "0")}`
                        ) : (
                          t('send_code_button')
                        )}
                      </Button>
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('email_code_label')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('email_code_placeholder')}
                    className="pr-24"
                    max={6}
                    disabled={emailTime === 0 || emailConfirmed}
                    render={
                      emailConfirmed && (
                        <Button
                          onClick={onSendCode}
                          disabled={emailConfirmed}
                          type="button"
                          variant="success"
                          size={"sm"}
                          className={`${emailConfirmed
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
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="new_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('new_password_label')}</FormLabel>

                <FormControl>
                  <Input type="password" placeholder={t('new_password_placeholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password_confirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('confirm_password_label')}</FormLabel>
                <FormControl>
                  <Input type="password" placeholder={t('confirm_password_placeholder')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full rounded-xl" variant={"primary"} size={"sm"}>
          {t('update_button')}
        </Button>
      </form>
    </Form>
  );
}
