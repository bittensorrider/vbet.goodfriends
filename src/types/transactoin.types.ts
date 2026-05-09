export type TransactionResponseType = {
    list: TransactionItem[];
    pagination: PaginationType;
}

export type TransactionItem = {
    _id: string;
    memberId: string;
    currency: {
        name: string;
        symbol: string;
        network: string;
        amount: number;
    };
    amount: number;
    status: string;
    fromAddress: string;
    toAddress: string;
    trackId: string;
    type: string;
    createdAt: Date;
    updatedAt: Date;
    txID: string;
    scanUrl: string;
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