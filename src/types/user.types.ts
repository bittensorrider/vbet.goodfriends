export type User = {
    _id: string;
    loginId: string;
    pw: string;
    site: {
        id: string;
    };
    agency: {
        id: string;
    };
    recommender: null;
    userCode: string;
    info: UserInfo;
    favorites: Favorite[];
    wallets: Wallet;
    setting: UserSettings;
    attendance: UserAttendance;
    rolling: Rolling;
    jti: string | null;
    memo: [];
    created_at: string;
    updated_at: string;
    relationShip: string;
}

export type UserInfo = {
    avatar: string;
    nickname: string;
    telecom: string;
    phone: string;
    email: string;
    transaction: UserTransaction;
    level: number;
    exp: number;
    needExp: number;
    spin: number;
    ip: string | null;
    isUse: boolean;
    isApprove: "application" | string;
    isInterested: boolean;
    isDormant: boolean;
}

export type UserTransaction = {
    realname: string;
    withdrawalType: string;
    bank: string;
    bankNumber: string;
    pw: string;
}

export type Favorite = { id: string };

export type Wallet = {
    balance: number;
}

export type UserSettings = {
    useFirstDeposit: boolean
    useNewDayDeposit: boolean
    useEverytimeDeposit: boolean
    useLiveCashback: boolean
    useWeeklyCashback: boolean
    useMonthlyCashback: boolean
    liveChatBan: boolean
    noteBan: boolean
}

export type UserAttendance = {
    list: string[];
    ids: string[];
}
export type Rolling = {
    inUse: boolean;
    sports: number;
    casino: number;
    slot: number;
    holdem: number;
    minigame: number;
    virtual: number;
}