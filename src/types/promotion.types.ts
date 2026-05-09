
export type PromotionResponseType = {
    list: PromotionItem[];
    pagination: PaginationType;
}

export type PromotionItem = {
    _id: string;
    title: string;
    content: string;
    thumbnail: string;
    isUse: boolean;
    views: number;
    endDate: string; // ISO date string
    button: {
        name: string;
        link: string;
    };
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