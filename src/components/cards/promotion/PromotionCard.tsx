import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type Status = string;

type Props = {
  id: string;
  src: string;
  title: string;
  endDate: string;
  status: Status;
  searchParams: URLSearchParams;
};

export default function PromotionCard({
  id,
  src,
  title,
  endDate,
  status,
  searchParams,
}: Props) {
  const params = new URLSearchParams(searchParams.toString());
  params.set("promotionId", id);
  params.set("modal", "promotion")
  const href = `?${params.toString()}`
  return (
    <Link
      href={href}
      role="button"
      tabIndex={0}
      className="group w-full flex flex-col rounded-2xl bg-foreground/5"
      aria-label={`View details of ${title} promotion`}
    >
      <div
        className="relative w-full rounded-2xl overflow-hidden"
        style={{ aspectRatio: 377 / 163 }}
      >
        <Image
          src={src}
          alt={title}
          fill
          className="group-hover:scale-110 duration-500 object-cover transition-all"
        />
      </div>
      <PromotionInfo title={title} endDate={endDate} status={status} />
    </Link>
  );
}

export const PromotionInfo = ({
  title,
  endDate,
  status,
}: Omit<Props, "src" | "id" | "searchParams">) => {
  // Check if status indicates progress (not ended)
  const isInProgress = !status.toLowerCase().includes("ended") && !status.toLowerCase().includes("kết thúc");
  const t = useTranslations('promotions_page');

  // Map status to translation key
  let statusKey = 'in_progress';
  if (status.toLowerCase().includes('ended') || status.toLowerCase().includes('kết thúc')) {
    statusKey = 'ended';
  }

  return (
    <div className="flex items-center justify-between p-3">
      <div className="grid gap-1">
        <h6 className="text-sm font-semibold truncate">{title}</h6>
        <p className="text-xs text-foreground/60 truncate">{endDate}</p>
      </div>
      <Button
        size={`sm`}
        variant={isInProgress ? "success_ghost" : "danger_ghost"}
        className="rounded-xl text-xs font-semibold"
      >
        {t(statusKey)}
      </Button>
    </div>
  );
};
