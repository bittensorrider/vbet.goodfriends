import type { Metadata } from "next";

import IconBase from "@/components/icon/iconBase";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TabWrapper from "@/components/wrapper/tabWrapper";
import { ICONS } from "@/constants/icons";
import { getNoticeData } from "@/helpers/notice.helpers";

export const metadata: Metadata = {
  title: "FAQ | GoodFriends",
  description: "Frequently asked questions",
};

export default async function Page() {
  const { data: notices } = await getNoticeData("active", "faq", 1, 100);

  return (
    <TabWrapper>
      <Accordion type="single" collapsible className="divide-foreground/10">
        {notices.map((data) => (
          <AccordionItem value={data._id.toString()} key={data._id}>
            <AccordionTrigger>
              <div className="flex items-center gap-1.5">
                <IconBase
                  icon={ICONS.CHEVRON_LEFT}
                  className="-rotate-180 group-data-[state=open]:-rotate-90 size-5"
                />
                <h6 className="text-base font-medium">{data.title}</h6>
              </div>
            </AccordionTrigger>

            <AccordionContent>
              <div
                dangerouslySetInnerHTML={{ __html: data.content }}
                className="flex flex-col gap-3 text-xs text-foreground/70"
              ></div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </TabWrapper>
  );
}
