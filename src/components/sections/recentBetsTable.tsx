import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import SectionTitle from "./sectionTitle";
import { useTranslations } from "next-intl";
import { BettingItem } from "@/types/betting.types";
import { formatDate } from "@/lib/utils";

export default function RecentBetsTable({ data }: { data: BettingItem[] }) {
  const t = useTranslations('recent_bets_table');

  return (
    <div className="flex flex-col gap-2">
      <SectionTitle>{t('section_title')}</SectionTitle>
      <Table>
        <TableHeader>
          <TableRow className="!bg-transparent">
            <TableHead>{t('game')}</TableHead>
            <TableHead className="hidden min-[480px]:table-cell">
              {t('user')}
            </TableHead>
            <TableHead className="hidden md:table-cell">{t('time')}</TableHead>
            <TableHead className="hidden md:table-cell">{t('bet_amount')}</TableHead>
            <TableHead className="hidden md:table-cell">{t('multiplier')}</TableHead>
            <TableHead>{t('payout')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item: BettingItem, index: number) => (
            <TableRow key={index}>
              <TableCell>
                <div className="flex items-center gap-2">
                  {/* <Image
                    src={`/imgs/slots/slot2.svg`}
                    alt="slot-title"
                    width={20}
                    height={20}
                    className="size-5 rounded-full"
                  /> */}
                  <p className="truncate">{item.game.name}</p>
                </div>
              </TableCell>
              <TableCell className="hidden min-[480px]:table-cell">{item.member.info.nickname}</TableCell>
              <TableCell className="hidden md:table-cell">{formatDate(item.createdAt)}</TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex items-center gap-2">
                  <Image
                    src={`/imgs/coins/usdt.svg`}
                    alt="slot-title"
                    width={20}
                    height={20}
                    className="size-5 rounded-full"
                  />
                  <p className="truncate">{item.money.betMoney}</p>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell" >{item.money.winMoney / item.money.betMoney}</TableCell>
              <TableCell variant={item.money.winMoney >= item.money.betMoney ? "success" : "danger"}>
                <div className="flex items-center gap-2">
                  <Image
                    src={`/imgs/coins/usdt.svg`}
                    alt="slot-title"
                    width={20}
                    height={20}
                    className="size-5 rounded-full"
                  />
                  <p className="truncate">{item.money.winMoney}</p>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
