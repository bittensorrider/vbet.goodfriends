import { LoginOut } from "@/actions/auth.actions";
import IconBase from "@/components/icon/iconBase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toastSuccess } from "@/components/ui/sonner";
import { ICONS } from "@/constants/icons";
import { PROFILE_MENU, ProfileMenu } from "@/constants/profileMenu";
import { useModal } from "@/hooks/useModal";
import { LayoutState } from "@/store/layout.store";
import { UserState } from "@/store/user.store";
import { User } from "@/types/user.types";
import { Link, useRouter } from "@/i18n/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";

type StoreActionProps = Pick<UserState, "clearUser"> &
  Pick<LayoutState, "setNotificationOpen">;

type Props = {
  user: User;
} & StoreActionProps;

export default function ProfileBtn({
  user,
  clearUser,
  setNotificationOpen,
}: Props) {
  const t = useTranslations('profile_menu');
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const walletModal = useModal("wallet");
  const profileModal = useModal("profile");
  const router = useRouter()

  const onLogout = async () => {
    clearUser();
    const res_success = await LoginOut();
    if (!res_success.success) return;
    toastSuccess(res_success.message);
    setNotificationOpen(false);
    router.push('/')
  };

  const onAction = (action: ProfileMenu["action"]) => {
    if (action) {
      setDropdownIsOpen(false);

      if (action === "wallet-modal") {
        walletModal.onOpen({ tab: "deposit" });
      } else if (action === "profile-modal") {
        profileModal.onOpen({ tab: "profile" });
      }
    }
  };

  return (
    <>
      <DropdownMenu open={dropdownIsOpen} onOpenChange={setDropdownIsOpen}>
        <DropdownMenuTrigger>
          <Avatar className="size-[45px] border-[1.5px] border-primary p-0.5">
            <AvatarImage
              src={user.info.avatar}
              className="bg-black rounded-full"
            />
            <AvatarFallback>FN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="center"
          className="rounded-xl p-1 linear-background flex flex-col w-[280px] border-neutral/10 shadow-lg mr-4"
        >
          {PROFILE_MENU.map((menu, index) => (
            <DropdownMenuItem key={index} asChild>
              <Link
                key={index}
                className="flex items-center gap-[6px] p-3 h-[41px] rounded-lg hover:bg-neutral/5 active:scale-95 cursor-pointer transition-all"
                href={menu.href}
                onClick={(e) => {
                  if (menu.action) {
                    e.preventDefault();
                    onAction(menu.action);
                  }
                }}
              >
                <IconBase icon={menu.icon} className="size-4" />
                <span>{t(menu.labelKey)}</span>
              </Link>
            </DropdownMenuItem>
          ))}

          <DropdownMenuSeparator className="bg-neutral/5" />

          <DropdownMenuItem
            onClick={onLogout}
            className="flex items-center gap-[6px] p-3 h-[41px] rounded-lg hover:bg-danger/10 text-danger/90 active:scale-95 cursor-pointer transition-all"
          >
            <IconBase icon={ICONS.LOGOUT} className="size-4" />
            <span>{t('logout')}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
