import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../../ui/input";
import {
  EditProfileData,
  editProfileSchema,
} from "@/validations/profile.schema";
import { useEffect } from "react";
import AvatarUploader from "./avatarUploader";
import { userSelectors } from "@/store/user.store";
import { toastDanger, toastSuccess } from "@/components/ui/sonner";
import { saveImageWebp, saveTempImage } from "@/lib/image";
import { UpdateUserAction } from "@/actions/user.actions";
import { useTranslations } from "next-intl";

type Props = {
  initialData: EditProfileData;
  onEditStart: (file: File) => void;
};

export default function ProfileForm({ initialData, onEditStart }: Props) {
  const user = userSelectors.use.user();
  const setUser = userSelectors.use.setUser();

  const t = useTranslations('profile_form');

  const form = useForm<EditProfileData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: "",
      avatar: undefined,
    },
  });

  useEffect(() => {
    form.setValue("name", initialData.name);
    form.setValue("avatar", initialData.avatar);
  }, [form, initialData]);


  const onSubmit = async (values: any) => {
    if (!user) return;

    const formData = new FormData();
    formData.append('image', values.avatar, 'image.png');

    const tempFile: any = await saveTempImage({ formData });
    const permanentFile: any = await saveImageWebp({
      filename: tempFile.data.filename,
      ext: 'webp'
    });

    if (!tempFile.success || !permanentFile.success) {
      return toastDanger("Error uploading iamge");
    }

    const res = await UpdateUserAction(user._id, {
      info: {
        avatar: permanentFile.data.path,
        nickname: values.name
      }
    })

    if (!res.success) {
      return toastDanger(res.message);
    }
    setUser({
      ...user, info: {
        ...user.info,
        avatar: permanentFile.data.path,
        nickname: values.name
      }
    })
    toastSuccess(res.message);
  };

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className={`grid grid-cols-[95px_auto] min-h-[95px] gap-6 items-end`}>
          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AvatarUploader
                    initialFile={form.getValues("avatar")}
                    onChange={(file) => {
                      field.onChange(file);
                      onEditStart(file);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('name')}</FormLabel>
                <FormControl>
                  <Input
                    className="bg-foreground/5"
                    placeholder={t('name_placeholder')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button className="w-full rounded-xl" variant={"primary"} size={"sm"}>
          {t('update')}
        </Button>
      </form>
    </Form>
  );
}
