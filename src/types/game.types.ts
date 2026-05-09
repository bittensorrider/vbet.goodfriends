export type GameResponseType = {
    list: GameItem[];
    pagination: PaginationType;
    providers: []
}

export type GameItem = {
    _id: string;
    game_code: string;
    game_name: string;
    banner: string;
    status: number;
    provider_code: string;
    type: string;
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