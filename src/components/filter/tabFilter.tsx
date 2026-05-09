"use client";
import { useRouter } from "@/i18n/navigation";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export type TabFilterProps = {
  value: any;
  onValueChange?: (value: any) => void;
  tabs: string[];
  searchParam?: string;
  className?: string;
  namespace?: string; // optional namespace for translations
}

export default function TabFilter({
  value,
  onValueChange,
  tabs,
  searchParam,
  className,
  namespace = 'tab_filter'
}: TabFilterProps) {
  const router = useRouter();
  const t = useTranslations(namespace);

  return (
    <Tabs
      className={cn("w-full p-1 rounded-2xl border border-neutral/5", className)}
      value={value}
      onValueChange={onValueChange}
    >
      <TabsList className="w-full rounded-none p-0">
        {tabs.map((item) => {
          // Try to translate, fallback to item if not found
          const label = t(item, { default: item.split("-").join(" ") });
          return (
            <TabsTrigger
              onClick={() => {
                if (searchParam) {
                  router.push(`?${searchParam}=${item}`);
                }
              }}
              className={`${
                value === item ? "!bg-foreground/5" : ""
              } capitalize cursor-pointer h-full rounded-xl text-xs text-foreground`}
              key={item}
              value={item}
            >
              {label}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
}
