import BannerWrapper from "@/components/banners/BannerWrapper";
import PromotionCard from "@/components/cards/promotion/PromotionCard";
import PageTitle from "@/components/common/page/pageTitle";
import TabFilter from "@/components/filter/tabFilter";
import ContentLoader from "@/components/loader/contentLoder";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getPaginationItems } from "@/helpers/pagination.helpers";
import {
  getPromotionsData,
  PAGINATION_LIMIT_PER_PAGE,
} from "@/helpers/promotions.helpers";
import { Link } from "@/i18n/navigation";
import { generateModalPath } from "@/lib/modal";
import { format } from "date-fns";
import Image from "next/image";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";

type Props = {
  searchParams: Promise<{
    filter?: string;
    promotionId?: string;
    page?: string;
  }>;
};

export default async function Page({ searchParams }: Props) {
  const t = await getTranslations('promotions_page');
  const queryFilters = await searchParams;
  const currentQueryFilters = new URLSearchParams(queryFilters);
  const filter = queryFilters.filter || "all";
  const page = Number(queryFilters.page) || 1;

  const depositModalLink = generateModalPath(currentQueryFilters, "wallet", {
    tab: "deposit",
  });

  return (
    <>
      <div className="space-y-4">
        <PageTitle>{t('page_title')}</PageTitle>

        <BannerWrapper className="h-[179px] md:px-9 px-4 md:h-[280px] pr-4 text-white from-primary/80">
          <div className="flex flex-col gap-1 md:gap-3 min-w-max">
            <p className="text-sm md:text-lg font-medium max-w-[203px]">
              {t('banner_subtitle')}
            </p>
            <h1 className="text-[28px] md:text-4xl font-extrabold">
              {t('banner_title')}
            </h1>
            <Link href={depositModalLink}>
              <Button className="w-max" variant={`primary`}>
                {t('deposit_now')}
              </Button>
            </Link>
          </div>
          <Image
            src={`/imgs/promotion-banner.svg`}
            alt="promotion-banner"
            width={608}
            height={232}
            className="absolute right-4 md:-right-9 md:relative w-full max-w-[40%] md:max-w-[60%] h-auto"
          />
        </BannerWrapper>

        <TabFilter
          value={filter}
          tabs={["all", "ended"]}
          searchParam="filter"
          className="w-full md:max-w-[307px] bg-foreground/5"
        />

        <Suspense
          key={`${page}-${filter}`}
          fallback={<ContentLoader className="h-[120px]" />}
        >
          <DynamicContent
            page={page}
            filter={filter}
            searchParams={currentQueryFilters}
          />
        </Suspense>
      </div>
    </>
  );
}

const DynamicContent = async ({
  page,
  filter,
  searchParams,
}: {
  page: number;
  filter: string;
  searchParams: URLSearchParams;
}) => {
  const t = await getTranslations('promotions_page');
  const { data: promotions, pagination } = await getPromotionsData(
    filter as "all" | "ended",
    page,
    PAGINATION_LIMIT_PER_PAGE
  );

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {promotions.map((promotion) => (
          <PromotionCard
            id={promotion._id}
            key={promotion._id}
            src={promotion.thumbnail}
            title={promotion.title}
            endDate={t('ends', {
              date: format(new Date(promotion.endDate), "M/d/yyyy, h:mm:ss a")
            })}
            status={promotion.isUse ? t('in_progress') : t('ended')}
            searchParams={searchParams}
          />
        ))}
      </div>

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
    </>
  );
};
