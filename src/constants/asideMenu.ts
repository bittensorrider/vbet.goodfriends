import { BitcoinTransactionIcon, TransactionHistoryIcon } from '@hugeicons/core-free-icons'
import type { IconSvgObject } from '@/components/icon/iconBase';
import { RoutePath, ROUTES } from "@/constants/routes";
import { ICONS } from '@/constants/icons';

export type Action = "deposit-modal" | "withdraw-modal" | "chat";

export type AsideNavType = {
    label: string;
    icon: IconSvgObject;
    href: RoutePath;
    action?: Action;
    identifier?: string;
}

type AsideMenu = {
    title: string;
    nav: AsideNavType[];
};

export const ASIDE_MENU: AsideMenu[] = [
    {
        title: "games",
        nav: [
            {
                href: ROUTES.CASINO,
                identifier: "casino",
                icon: ICONS.LIVE_STREAMING,
                label: "liveCasino"
            },
            {
                href: ROUTES.SLOT,
                identifier: "slot",
                icon: ICONS.CHERRY,
                label: "slot",
            },
            // {
            //     href: ROUTES.HOLDEM,
            //     identifier: "holdem",
            //     icon: ICONS.POKER_CHIP,
            //     label: "Hold'em"
            // },
            // {
            //     href: ROUTES.MINIGAME,
            //     identifier: "minigame",
            //     icon: ICONS.GAME_CONSOLE,
            //     label: "Minigame"
            // },
            // {
            //     href: ROUTES.VIRTUAL,
            //     identifier: "virtual",
            //     icon: ICONS.VR_GLASSES,
            //     label: "Virtual"
            // },
            // {
            //     href: ROUTES.SPORT,
            //     icon: ICONS.FOOTBALL_BALL,
            //     label: "Sport"
            // },
            // {
            //     href: ROUTES.FAVORITES,
            //     icon: ICONS.HEART,
            //     label: "Favorites"
            // },
        ]
    },
    {
        title: "activity",
        nav: [
            // {
            //     href: ROUTES.BONUS,
            //     icon: ICONS.GIFT,
            //     label: "Bonus",
            // },
            {
                href: ROUTES.PROMOTIONS,
                icon: ICONS.MEGAPHONE,
                label: "promotions"
            },
            {
                href: ROUTES.WALLET.TRANSACTIONS,
                icon: BitcoinTransactionIcon,
                label: "transaction"
            },
            {
                href: ROUTES.WALLET.BET_HISTORY,
                icon: TransactionHistoryIcon,
                label: "betHistory"
            },
        ]
    },
    {
        title: "others",
        nav: [
            {
                href: ROUTES.NOTICES,
                icon: ICONS.NOTICE_BELL,
                label: "notices",
            },
            // {
            //     href: `/`,
            //     icon: ICONS.HEADPHONES,
            //     label: "Support",
            //     action: "chat",
            // },
            {
                href: ROUTES.HELP_CENTER.TERMS_OF_SERVICES,
                icon: ICONS.HELP_CENTER,
                label: "helpCenter"
            },
            {
                href: ROUTES.SETTINGS.GENERAL,
                icon: ICONS.SETTINGS,
                label: "settings",
            },
        ]
    },
];

export const SETTINGS_MENU: AsideNavType[] = [
    {
        label: "general",
        icon: ICONS.USER,
        href: ROUTES.SETTINGS.GENERAL
    },
    // {
    //     label: "Security",
    //     icon: ICONS.SHIELD_CHECK,
    //     href: ROUTES.SETTINGS.SECURITY
    // },
    // {
    //     label: "Offers",
    //     icon: ICONS.TICKET_PERCENT,
    //     href: ROUTES.SETTINGS.OFFERS
    // }
]

export const WALLET_MENU: AsideNavType[] = [
    {
        label: "balance",
        icon: ICONS.WALLET,
        href: ROUTES.WALLET.BALANCE
    },
    {
        label: "deposit",
        icon: ICONS.WALLET_ADD,
        href: "/",
        action: "deposit-modal"
    },
    {
        label: "withdraw",
        icon: ICONS.BANK,
        href: "/",
        action: "withdraw-modal",
    },
    {
        label: "transactions",
        icon: ICONS.BTC_TRANSACTION,
        href: ROUTES.WALLET.TRANSACTIONS
    },
    {
        label: "betHistoryWallet",
        icon: ICONS.HISTORY,
        href: ROUTES.WALLET.BET_HISTORY
    }
]

export const HELP_CENTER_MENU: AsideNavType[] = [
    {
        label: "termsOfService",
        icon: ICONS.BANK,
        href: ROUTES.HELP_CENTER.TERMS_OF_SERVICES
    },
    // {
    //     label: "Bonus Terms",
    //     icon: ICONS.GIFT,
    //     href: ROUTES.HELP_CENTER.BONUS_TERMS
    // },
    {
        label: "support",
        icon: ICONS.HEADPHONES,
        href: ROUTES.HELP_CENTER.SUPPORT
    },
    {
        label: "faq",
        icon: ICONS.BITCOIN_BAG,
        href: ROUTES.HELP_CENTER.FAQ
    },
    // {
    //     label: "Registration & Login",
    //     icon: ICONS.USER,
    //     href: ROUTES.HELP_CENTER.REGISTRATION_LOGIN
    // },
]