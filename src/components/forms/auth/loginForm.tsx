import { AuthModalTab } from "@/types/modal.types";
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
import { LoginSchema, loginSchema } from "@/validations/auth.schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useModal } from "@/hooks/useModal";
import { toastSuccess } from "@/components/ui/sonner";
import { userSelectors } from "@/store/user.store";
import { User } from "@/types/user.types";
import { revalidateTagAction } from "@/actions/revalidatePath.action";
import { LoginAction, LoginSuccessAction } from "@/actions/auth.actions";
import { useTranslations } from "next-intl";

type Props = {
  setActiveTab: (val: AuthModalTab) => void;
};

export default function LoginForm({ setActiveTab }: Props) {
  const loginModal = useModal("auth");
  const setUser = userSelectors.use.setUser();
  const t = useTranslations('auth_login');
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginSchema) {
    const res: any = await LoginAction(values)

    if (!res.success) {
      form.setError("email", { message: res.message });
      form.setValue("password", "");
      return;
    }

    const res_success = await LoginSuccessAction();

    if (!res_success.success) return;
    toastSuccess(res.message);
    setUser(res_success.data as User);

    revalidateTagAction("user")
    revalidateTagAction("game-launch")

    loginModal.onClose();

  }

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("email")}</FormLabel>
                <FormControl>
                  <Input placeholder="example@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>{t("password")}</FormLabel>
                  <button
                    type="button"
                    onClick={() => setActiveTab("reset-password")}
                    className="cursor-pointer text-xs font-medium underline text-foreground/60 hover:text-foreground"
                    aria-label={t("forgotPassword")}
                  >
                    {t("forgotPassword")}
                  </button>
                </div>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="******"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full rounded-xl" variant={"primary"} size={"sm"}>
          {t("signIn")}
        </Button>
      </form>
    </Form>
  );
}