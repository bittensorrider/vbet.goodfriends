export type Notice = PageNoticeItem;

export type PageNoticeType = {
  list: PageNoticeItem[];
  pagination: PageNoticePagination;
}

export type PageNoticeItem = {
  _id: string;
  isUse: boolean;
  title: string;
  views: number;
  content: string;
  createdAt: string; // ISO date string
  updatedAt: string;
  __v: number;
  type: "notice" | "rule" | "faq";
};

export type PageNoticePagination = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
};