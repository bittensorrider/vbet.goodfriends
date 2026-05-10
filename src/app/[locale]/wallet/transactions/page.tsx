import type { Metadata } from "next";

import { GetTransactionListAction } from "@/actions/user.actions";
import TransactionsFilter from "@/components/filter/transactionsFileter";
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
import { getPaginationItems } from "@/helpers/pagination.helpers";
import { formatDate } from "@/lib/utils";
import { TransactionItem } from "@/types/transactoin.types";
import { getTranslations } from "next-intl/server";

type Props = {
  searchParams: Promise<{
    page?: string;
    type?: string;
    limit?: string;
    txID?: string;
    startDate?: string;
    endDate?: string;
  }>;
};

export const metadata: Metadata = {
  title: "Transactions | GoodFriends",
  description: "View your transaction history",
};

export default async function Page({ searchParams }: Props) {
  const t = await getTranslations("transactions_page");
  const query = await searchParams;
  const activePage = Number(query.page) || 1;
  const limit = validLimits.includes(query.limit || "")
    ? Number(query.limit)
    : 25;
  const startDate = query.startDate || undefined;
  const endDate = query.endDate || undefined;
  const type = query.type;
  const txID = query.txID;

  const { data: transactions, pagination } = await GetTransactionListAction(
    txID,
    activePage,
    type,
    limit,
    startDate,
    endDate,
  );

  return (
    <TabWrapper title={t("page_title")} className="grid">
      <TransactionsFilter />

      <Table className="overflow-auto">
        <TableHeader>
          <TableRow className="!bg-transparent">
            <TableHead>{t("table_headers.type")}</TableHead>
            <TableHead>{t("table_headers.date")}</TableHead>
            <TableHead>{t("table_headers.status")}</TableHead>
            <TableHead>{t("table_headers.view")}</TableHead>
            <TableHead>{t("table_headers.amount")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((item: TransactionItem, index: number) => (
            <TableRow key={index}>
              <TableCell>
                {item.type == "deposit"
                  ? t("transaction_types.deposit")
                  : t("transaction_types.withdraw")}
              </TableCell>
              <TableCell>{formatDate(item.updatedAt)}</TableCell>
              <TableCell variant="success">
                {item.status == "Paid" || item.status == "Complete"
                  ? t("status.confirmed")
                  : ""}
              </TableCell>
              <TableCell>
                <a href={item.scanUrl} target="_blank">
                  {t("view_link")}
                </a>
              </TableCell>
              <TableCell>{item.amount}</TableCell>
              {/* <TableCell>{`0->1 Level up`}</TableCell> */}
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
    </TabWrapper>
  );
}
