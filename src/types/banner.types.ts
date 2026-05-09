
export type BannerResponseType = {
    list: BannerItem[];
    pagination: PaginationType;
}

export type BannerItem = {
    _id: string;
    thumbnail: string;
    mobileThumbnail: string;
    title: string;
    link: string;
    isUse: boolean;
    pageName: string;
    pageComponent?: string;
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