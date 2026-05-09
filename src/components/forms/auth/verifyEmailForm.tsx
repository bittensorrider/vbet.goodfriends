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
  verifyEmailSchema,
  VerifyEmailSchema,
} from "@/validations/auth.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

type Props = {
  setActiveTab: (val: AuthModalTab)=> void;
};

export default function VerifyEmailForm({ setActiveTab }: Props) {
  const t = useTranslations('auth_verify');
  const tError = useTranslations('auth_errors');
  const form = useForm<VerifyEmailSchema>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = (values: VerifyEmailSchema) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-4">
          <FormField
            control={form.control}
            name="code"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>{t("verificationCode")}</FormLabel>
                <FormControl>
                  <Input placeholder="000000" {...field} />
                </FormControl>
                <FormMessage>{fieldState.error?.message ? tError(fieldState.error.message) : null}</FormMessage>
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => setActiveTab("register")}
            type="button"
            className="w-full border-transparent rounded-xl"
            variant={"default"}
            size={"default"}
          >
            <IconBase icon={ICONS.ARROW_RIGHT} className="rotate-180 size-4" />
            {t("goBack")}
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
