import { BitcoinTransactionIcon, Settings01Icon, TransactionHistoryIcon, UserIcon, Wallet03Icon } from '@hugeicons/core-free-icons'
import { RoutePath, ROUTES } from "./routes";
import { IconSvgObject } from '@/components/icon/iconBase';

type Action = "wallet-modal" | "profile-modal";

export type ProfileMenu = {
    labelKey: string;
    icon: IconSvgObject;
    href: RoutePath;
    action?: Action
}

export const PROFILE_MENU: ProfileMenu[] = [
    {
        href: "/",
        icon: Wallet03Icon,
        labelKey: "wallet",
        action: "wallet-modal"
    },
    {
        href: "/",
        icon: UserIcon,
        labelKey: "profile",
        action: "profile-modal"
    },
    {
        href: ROUTES.WALLET.TRANSACTIONS,
        icon: BitcoinTransactionIcon,
        labelKey: "transaction"
    },
    {
        href: ROUTES.WALLET.BET_HISTORY,
        icon: TransactionHistoryIcon,
        labelKey: "bet_history"
    },
    {
        href: ROUTES.SETTINGS.GENERAL,
        icon: Settings01Icon,
        labelKey: "settings"
    },

];