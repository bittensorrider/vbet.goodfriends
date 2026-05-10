import type { Metadata } from "next";

import Card from "@/components/cards/game-cards/slotCard";
import SlotGridContainer from "@/components/common/containers/slotGridContainer";
import NoResults from "@/components/common/page/NoResults";
import PageFilterBtns from "@/components/common/page/pageFilterBtns";
import PageTitle from "@/components/common/page/pageTitle";
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
import { getGameList } from "@/helpers/games.helpers";
import { getPaginationItems } from "@/helpers/pagination.helpers";
import { GameItem } from "@/types/game.types";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";

type Props = {
  searchParams: Promise<{
    type?: string;
    category?: string;
    provider?: string;
    page?: string;
  }>;
};

export const metadata: Metadata = {
  title: "Games | GoodFriends",
  description: "Browse our collection of games",
};

export default async function Page({ searchParams }: Props) {
  const t = await getTranslations("games_page");
  const activeType = (await searchParams).type || "all";
  const activeProvider = (await searchParams).provider || "";
  const activePage = Number((await searchParams).page) || 1;
  const { pagination, providers } = await getGameList(
    activeType,
    activeProvider,
    "",
    activePage,
    25,
  );

  return (
    <>
      <div className="flex flex-col gap-2.5">
        <PageTitle>
          {activeType == "live" ? t("page_title_casino") : t("page_title_slot")}
        </PageTitle>
        <PageFilterBtns
          data={[
            { _id: "", code: "", name: t("filter_all"), type: "", status: 1 },
            ...providers,
          ]}
          activeValue={activeProvider}
        />
      </div>

      {activeType === "baccarat" ? (
        <NoResults className="py-28">
          <p className="text-foreground/60 max-w-[178px] text-center">
            {t("no_results_found_in", { type: activeType })}
          </p>
        </NoResults>
      ) : (
        <Suspense
          key={`${activePage}-${activeProvider}-${activeType}`}
          fallback={<ContentLoader className="w-full h-[68svh]" />}
        >
          <DynamicContent
            activePage={activePage}
            activeProvider={activeProvider}
            activeType={activeType}
          />
        </Suspense>
      )}

      {pagination && pagination.totalPages >= 1 && (
        <>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  disabled={activePage === 1}
                  className="bg-transparent"
                  page={pagination.prevPage}
                />
              </PaginationItem>

              {getPaginationItems(
                pagination.currentPage,
                pagination.totalPages,
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
                  disabled={activePage === pagination.totalPages}
                  page={pagination.nextPage}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}
    </>
  );
}

const DynamicContent = async ({
  activeType,
  activeProvider,
  activePage,
}: {
  activeType: string;
  activeProvider: string;
  activePage: number;
}) => {
  const { data: games } = await getGameList(
    activeType,
    activeProvider,
    "",
    activePage,
    25,
  );

  return (
    <SlotGridContainer>
      {games.map((game: GameItem, index: number) => (
        <Card
          key={index}
          href={`/games/${game.type}/${game.game_code}`}
          src={game.banner}
          title={game.game_name}
          priority={true}
        />
      ))}
    </SlotGridContainer>
  );
};
