import { GetBettingListAction } from "@/actions/user.actions";
import BetHistoryFilter from "@/components/filter/betHistoryFilter";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TabWrapper from "@/components/wrapper/tabWrapper";
import { validLimits } from "@/constants/common";
import {
  getPaginationItems,
} from "@/helpers/pagination.helpers";
import { formatDate } from "@/lib/utils";
import { BettingItem } from "@/types/betting.types";
import { getTranslations } from "next-intl/server";

type Props = {
  searchParams: Promise<{
    page?: string;
    type?: string;
    limit?: string;
    startDate?: string;
    endDate?: string;
    gameName?: string;
  }>;
};

export default async function Page({ searchParams }: Props) {
  const t = await getTranslations('bet_history_page');
  const query = await searchParams;

  const gameName = query.gameName || undefined;
  const activePage = Number(query.page) || 1;
  const type = query.type;
  const limit = validLimits.includes(query.limit || "")
    ? Number(query.limit)
    : 25;
  const startDate = query.startDate || undefined;
  const endDate = query.endDate || undefined;

  const { data: bettings, pagination } = await GetBettingListAction(
    activePage,
    type,
    limit,
    startDate,
    endDate,
    gameName
  );

  return (
    <TabWrapper title={t('page_title')} className="grid">
      <BetHistoryFilter />

      <Table>
        <TableHeader>
          <TableRow className="!bg-transparent">
            <TableHead>{t('table_headers.game')}</TableHead>
            <TableHead>{t('table_headers.order_id')}</TableHead>
            <TableHead>{t('table_headers.date')}</TableHead>
            <TableHead>{t('table_headers.type')}</TableHead>
            <TableHead>{t('table_headers.bet')}</TableHead>
            <TableHead>{t('table_headers.win')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bettings.map((item: BettingItem, index: number) => (
            <TableRow key={index}>
              <TableCell>{item.game.name}</TableCell>
              <TableCell>{item.txnId}</TableCell>
              <TableCell>{formatDate(item.updatedAt)}</TableCell>
              <TableCell>{item.game.casino_type}</TableCell>
              <TableCell>{item.money.betMoney}</TableCell>
              <TableCell>{item.money.winMoney}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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
                  disabled={activePage === pagination.totalPages}
                  page={pagination.nextPage}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </>
      )}
    </TabWrapper>
  );
}
