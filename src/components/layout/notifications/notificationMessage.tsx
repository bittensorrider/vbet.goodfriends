import { ROUTES } from "@/constants/routes";
import { NoticeState } from "@/store/notice.store";
import { Notice } from "@/types/notice.types";
import { Link } from "@/i18n/navigation";
import { useState } from "react";

type StoreActionProps = Pick<NoticeState, "removeNotice">;

type Props = {
  notice: Notice;
  index: number;
} & StoreActionProps;

export default function NoticeMessage({
  notice: { title, content, createdAt },
}: Props) {
  const [isExpanded] = useState(false);

  // Strip HTML and check length
  const plainText = content.replace(/<[^>]+>/g, "").trim();
  const isLong = plainText.length > 260;
  const previewText = plainText.slice(0, 260) + "...";

  return (
    <div className="flex flex-col p-2 bg-neutral/5 rounded-xl">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-foreground/60">
            {new Date(createdAt).toLocaleString()}
          </span>
          <h6 className="text-sm font-medium">{title}</h6>
        </div>

        <div
          className="flex flex-col gap-3 text-[13px] font-normal text-foreground/60"
          dangerouslySetInnerHTML={{
            __html: isLong && !isExpanded ? previewText : content,
          }}
        ></div>

        {isLong && !isExpanded && (
          <Link
            href={ROUTES.NOTICES + "?filter=all&page=1"}
            className="outline-none text-primary hover:underline w-fit ml-auto text-xs font-medium"
          >
            View Details
          </Link>
        )}
      </div>
    </div>
  );
}
