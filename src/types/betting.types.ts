export type BettingResponseType = {
    list: BettingItem[];
    pagination: PaginationType;
}

export type BettingItem = {
    _id: string;
    memberId: string;
    member: {
        info: {
            nickname: string;
        }
    }
    txnId: string;
    createdAt: Date;
    updatedAt: Date;
    game: {
        code: string;
        name: string;
        game_type: string;
        provider: string;
        casino_type: string;
    };
    money: {
        balance: number;
        betMoney: number;
        winMoney: number;
    };
    status: string;
};

export type PaginationType = {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    nextPage: number | null;
    prevPage: number | null;
};