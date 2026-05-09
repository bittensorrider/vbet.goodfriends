import IconBase from "@/components/icon/iconBase";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ICONS } from "@/constants/icons";
import { useTranslations } from "next-intl";

type Props = {
  title: string;
  description: string;
  date: string;
  status: boolean;
};
export default function NoticeCard({
  title,
  description,
  date,
  status,
}: Props) {
  return (
    <Accordion collapsible type="single" className="!py-0">
      <AccordionItem value="item-01"
        className="flex flex-col gap-0 w-full px-3 rounded-xl bg-foreground/5"
      >
        <AccordionTrigger className="py-0 flex items-center justify-between cursor-pointer">
          <>
            <div className="flex flex-col gap-1 md:gap-0">
              <h6 className="text-xs md:text-sm font-medium">{title}</h6>
              <span className="text-xs font-medium text-foreground/60">
                {date}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span
                className={`${status ? "text-success" : "text-danger"
                  } text-nowrap text-xs font-medium`}
              >
                {useTranslations('notices_page.filters')(status ? 'active' : 'inactive')}
              </span>
              <IconBase
                icon={ICONS.CHEVRON_LEFT}
                className="-rotate-90 group-data-[state=open]:rotate-90 size-5"
              />
            </div>
          </>
        </AccordionTrigger>
        <AccordionContent>
          <div
            className="text-xs font-normal leading-[140%] text-foreground/70 flex flex-col gap-3"
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
