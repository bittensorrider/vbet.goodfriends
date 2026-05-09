export const ROUTES = {
    HOME: "/",
    BONUS: "/bonus",
    PROMOTIONS: "/promotions",
    NOTICES: "/notices",
    SUPPORT: "/support",
    PROFILE: "/profile",
    PAYMENT: "/payment",
    CASINO: "/games?type=live&page=1",
    SLOT: "/games?type=slot&page=1",
    // HOLDEM: "/gamelist?type=all&category=holdem&vendor=none&page=1",
    // MINIGAME: "/ gamelist?type=all&category=minigame&vendor=none&page=1",
    // VIRTUAL: "/gamelist?type=all&category=virtual&vendor=none&page=1",
    // SPORT: "/sport",
    FAVORITES: "/favorites",
    SETTINGS: {
        GENERAL: "/settings/general",
        SECURITY: "/settings/security",
        OFFERS: "/settings/offers",
    },
    WALLET: {
        BALANCE: "/wallet/balance",
        TRANSACTIONS: "/wallet/transactions",
        BET_HISTORY: "/wallet/bet-history",
    },
    HELP_CENTER: {
        BONUS_TERMS: "/help-center/bonus-terms",
        TERMS_OF_SERVICES: "/help-center/terms-of-services",
        SUPPORT: "/help-center/support",
        TRANSACTIONS: "/help-center/transactions",
        REGISTRATION_LOGIN: "/help-center/registration-and-login",
        FAQ: "/help-center/faq"
    }
} as const

export const API_ROUTES = {
    AUTH: {
        LOGIN: "api/account/login",
        REGISTER: "api/account/register",
        SEND_EMAIL_CODE: "api/service/verify",
        VERIFY_EMAIL_CODE: "api/service/verify",
        LOGIN_SUCCESS: "api/account/login/success",
        REFRESH: "api/account/login/refresh",
        LOGOUT: "api/account/logout",
        UPDATE_MEMBER: "api/account",
    },
    SITE: {
        INFO: "api/site/info",
        PROMOTIONS: {
            LIST: "api/site/promotion"
        },
        BANNER: {
            LIST: "api/site/banner"
        }
    },
    CHAT: {
        CREATE_SESSION: "api/chat/session"
    },
    WALLET: {
        CURRENCIES: "api/wallet/currencies",
        ADDRESS: "api/wallet/address",
        WITHDRAW: "api/wallet/withdraw"
    },
    GAME: {
        LIST: 'api/game',
        LAUNCH: 'api/game/launch'
    },
    TRANSACTION: {
        DEPOSIT_LIST: 'api/transaction/deposits',
        WITHDRAW_LIST: 'api/transaction/withdrawals',
        TRANSACTION_LIST: 'api/transaction',
    },
    BETTING: {
        BETTING_LIST: 'api/bettings',
        RECENT_LIST: 'api/bettings/list'
    }
}

type Flatten<T> = T extends string ? T :
    T extends Record<string, infer V> ? Flatten<V> : never;

export type RoutePath = Flatten<typeof ROUTES>;
