"use client";
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
import { useModal } from "@/hooks/useModal";
import { userSelectors } from "@/store/user.store";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

export default function AccountInformationForm() {
  const t = useTranslations('account_information_form');
  const updatePasswordModal = useModal("update-password");
  const user = userSelectors.use.user();
  const form = useForm({
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    if (!user) {
      return;
    }

    form.setValue("email", user.loginId)
  }, [user, form]);

  return (
    <Form {...form}>
      <form className="space-y-6" >
        <div className="flex flex-col space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('email_label')}</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-foreground/5"
                      placeholder={t('email_placeholder')}
                      {...field}
                      disabled
                      render={
                        <Button
                          onClick={() => updatePasswordModal.onOpen()}
                          type="button"
                          variant="primary"
                          size={"sm"}
                          className="w-[85px] rounded-lg text-xs !absolute right-1 top-1/2 -translate-y-1/2 !h-[20px] !min-h-[32px]"
                        >
                          {t('change_button')}
                        </Button>
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form >
    </Form >
  );
}
