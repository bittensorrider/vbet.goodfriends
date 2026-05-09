import NoticeCard from "@/components/cards/notice-card/NoticeCard";
import NoResults from "@/components/common/page/NoResults";
import PageTitle from "@/components/common/page/pageTitle";
import TabFilter from "@/components/filter/tabFilter";
import ContentLoader from "@/components/loader/contentLoder";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getNoticeData, NOTICE_LIMIT_PER_PAGE } from "@/helpers/notice.helpers";
import { getPaginationItems } from "@/helpers/pagination.helpers";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";

interface Props {
  searchParams: Promise<{
    filter?: string;
    page?: string;
  }>;
}

const filterValidValues = ["all", "active", "inactive"];

export default async function Page({ searchParams }: Props) {
  const t = await getTranslations('notices_page');
  const queryParams = await searchParams;
  const activeFilter = filterValidValues.includes(queryParams.filter || "")
    ? queryParams.filter!
    : "all";
  const currentPage = Number(queryParams.page) || 1;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2.5">
        <PageTitle>{t('page_title')}</PageTitle>
        <div className="flex md:w-[443px]">
          <TabFilter
            tabs={filterValidValues}
            value={activeFilter}
            searchParam="filter"
            namespace="notices_page.filters"
          />
        </div>
      </div>
      <Suspense
        key={`${currentPage}-${activeFilter}`}
        fallback={<ContentLoader className="h-[120px]" />}
      >
        <DynamicContent page={currentPage} activeFilter={activeFilter} />
      </Suspense>
    </div>
  );
}

const DynamicContent = async ({
  page,
  activeFilter,
}: {
  page: number;
  activeFilter: string;
}) => {
  const t = await getTranslations('notices_page');
  const { data: notices, pagination } = await getNoticeData(
    activeFilter,
    "notice",
    page,
    NOTICE_LIMIT_PER_PAGE
  );

  return (
    <div className="space-y-2 md:space-y-4">
      {notices?.length > 0 ? (
        notices.map((item) => (
          <NoticeCard
            key={item._id}
            title={item.title}
            date={new Date(item.createdAt).toLocaleString()}
            status={item.isUse}
            description={item.content}
          />
        ))
      ) : (
        <NoResults className="py-28">
          <p className="text-foreground/60 max-w-[178px] text-center">
            {t('no_results', { filter: activeFilter })}
          </p>
        </NoResults>
      )}

      {pagination && pagination.totalPages >= 1 && (
        <>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  disabled={page === 1}
                  className="bg-transparent"
                  page={pagination.prevPage}
                />
              </PaginationItem>

              {getPaginationItems(
                pagination.currentPage,
                pagination.totalPages
              ).map((item, index) => (
                <PaginationItem key={index}>
                  {typeof item === "string" ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      isActive={item === pagination.currentPage}
                      page={item}
                    >
                      {item}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  className="bg-transparent"
                  disabled={page === pagination.totalPages}
                  page={pagination.nextPage}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}
    </div>
  );
};
