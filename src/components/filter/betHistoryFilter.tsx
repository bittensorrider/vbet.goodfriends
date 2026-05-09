"use client";
import { useSelect } from "@/hooks/useSelect";
import PageSearch from "../common/page/pageSearch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import React from "react";
import { FormItem } from "../ui/form";
import { Label } from "../ui/label";
import IconBase from "../icon/iconBase";
import { ICONS } from "@/constants/icons";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import { validLimits } from "@/constants/common";
import { useTranslations } from "next-intl";

export default function BetHistoryFilter() {
  const t = useTranslations('bet_history_page.filters');
  const typeSelect = useSelect();
  const maxSelect = useSelect();
  const startDateSelect = useSelect();
  const endDateSelect = useSelect();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedType, setSelectedType] = React.useState<string | undefined>(
    searchParams.get("type") || ""
  );

  const [selectedLimit, setSelectedLimit] = React.useState<number>(
    validLimits.includes(searchParams.get("limit") || "")
      ? Number(searchParams.get("limit"))
      : 25
  );

  const [startDate, setStartDate] = React.useState<Date | undefined>(() => {
    const param = searchParams.get("startDate");
    return param ? new Date(param) : undefined;
  });

  const [endDate, setEndDate] = React.useState<Date | undefined>(() => {
    const param = searchParams.get("endDate");
    return param ? new Date(param) : undefined;
  });

  // const updateQueryParam = (key: string, value: string) => {
  //   const params = new URLSearchParams(searchParams.toString());
  //   if (value === "all") {
  //     params.delete(key);
  //   } else {
  //     params.set(key, value);
  //   }
  //   router.push(`?${params.toString()}`);
  // };

  const updateQueryParams = (updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === "" || value == "all") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="grid md:grid-cols-2 gap-1.5">
        <PageSearch queryKey="gameName" placeholder={t('search_placeholder')} />
        <div className="grid grid-cols-2 gap-1.5">
          <Select
            open={typeSelect.isOpen}
            value={selectedType}
            onOpenChange={typeSelect.onOpenChange}
            onValueChange={(value) => {
              updateQueryParams({ type: value, page: "1" });
              setSelectedType(value === "all" ? "" : value);
            }}
          >
            <SelectTrigger className="bg-foreground/5">
              <SelectValue placeholder={t('select_type_placeholder')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('all')}</SelectItem>
              <SelectItem value="live">{t('live')}</SelectItem>
              <SelectItem value="slot">{t('slot')}</SelectItem>
            </SelectContent>
          </Select>

          <Select
            open={maxSelect.isOpen}
            onOpenChange={maxSelect.onOpenChange}
            value={selectedLimit.toString()}
            onValueChange={(value) => {
              updateQueryParams({ limit: value, page: "1" });
              setSelectedLimit(Number(value));
            }}
          >
            <SelectTrigger className="bg-foreground/5">
              <SelectValue placeholder={t('select_max_placeholder')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">{t('max_10')}</SelectItem>
              <SelectItem value="25">{t('max_25')}</SelectItem>
              <SelectItem value="50">{t('max_50')}</SelectItem>
              <SelectItem value="100">{t('max_100')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-[1fr_1fr_auto] items-end gap-1.5">
        <FormItem>
          <Label className="px-1 text-xs text-foreground/80">{t('start_date')}</Label>
          <Popover
            open={startDateSelect.isOpen}
            onOpenChange={startDateSelect.onOpenChange}
          >
            <PopoverTrigger asChild>
              <Button
                variant="default"
                id="date"
                className="w-full text-[13px] justify-between font-normal"
              >
                {startDate ? startDate.toLocaleDateString() : t('date_placeholder')}

                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={startDate}
                captionLayout="dropdown"
                onSelect={(date) => {
                  if (!date) return;
                  setStartDate(date);
                  updateQueryParams({
                    startDate: date.toISOString().split("T")[0], // Format as YYYY-MM-DD,
                    page: "1"
                  });
                  startDateSelect.onClose();
                }}
              />
            </PopoverContent>
          </Popover>
        </FormItem>

        <FormItem>
          <Label className="px-1 text-xs text-foreground/80">{t('end_date')}</Label>
          <Popover
            open={endDateSelect.isOpen}
            onOpenChange={endDateSelect.onOpenChange}
          >
            <PopoverTrigger asChild>
              <Button
                variant="default"
                id="date"
                className="w-full text-[13px] justify-between font-normal"
              >
                {endDate ? endDate.toLocaleDateString() : t('date_placeholder')}

                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={endDate}
                captionLayout="dropdown"
                onSelect={(date) => {
                  if (!date) return;
                  setEndDate(date);
                  updateQueryParams({
                    endDate: date.toISOString().split("T")[0],
                    page: "1"
                  });
                  endDateSelect.onClose();
                }}
              />
            </PopoverContent>
          </Popover>
        </FormItem>

        <div className="flex items-center gap-1.5 col-span-2 md:col-span-1 justify-end">
          <Button
            variant="default"
            onClick={() => {
              updateQueryParams({
                startDate: undefined,
                endDate: undefined,
                type: undefined,
                limit: undefined,
                gameName: undefined,
                page: "1"
              });

              setStartDate(undefined);
              setEndDate(undefined);
              setSelectedType("");
              setSelectedLimit(25);
            }}
          >
            <IconBase icon={ICONS.RESET} />
            {t('reset_filter')}
          </Button>
        </div>
      </div>
    </div>
  );
}
