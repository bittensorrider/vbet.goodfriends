import IconBase from "@/components/icon/iconBase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ICONS } from "@/constants/icons";
import { LayoutState } from "@/store/layout.store";
import { noticeSelectors } from "@/store/notice.store";
import { useEffect, useMemo, useState } from "react";

export default function HelpTab({
  activeFaqId,
  toggleChat,
}: {
  activeFaqId: string | null;
  toggleChat: LayoutState["toggleChat"];
}) {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"list" | "details">("list");
  const [activeFaq, setActiveFaq] = useState<string | null>(null);
  const notices = noticeSelectors.use.notices();
  const faqs = useMemo(
    () => notices.filter((notice) => notice.type === "faq"),
    [notices]
  );
  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) =>
      faq.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [faqs, search]);

  useEffect(() => {
    if (!activeFaqId) return;
    setActiveFaq(activeFaqId);
    setTab("details");
  }, [activeFaqId]);

  return (
    <>
      <div className="w-full flex items-center justify-between px-6 pb-6 border-b border-foreground/10">
        <div className="flex items-center gap-1 mt-2">
          {tab !== "list" && (
            <Button
              onClick={() => setTab("list")}
              size={`icon_sm`}
              className="bg-transparent size-7 border-transparent rounded-xl"
            >
              <IconBase icon={ICONS.CHEVRON_LEFT} className="size-5" />
            </Button>
          )}

          <h6 className="text-xl truncate">
            {tab === "list"
              ? "Help center"
              : faqs.find((faq) => faq._id === activeFaq)?.title}
          </h6>
        </div>

        <Button onClick={toggleChat} size={`icon_sm`} className="rounded-full">
          <IconBase icon={ICONS.CLOSE_X} className="size-4" />
        </Button>
      </div>

      <div className="relative flex flex-col h-full flex-1 overflow-auto px-6 py-4 custom-scrollbar">
        {tab === "list" && (
          <Input
            type="search"
            placeholder={"Search for help..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={"bg-foreground/5"}
            autoFocus
          />
        )}

        <div className="flex flex-col mt-4">
          {tab === "list" ? (
            filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <FaqItem
                  key={index}
                  onClick={() => {
                    setTab("details");
                    setActiveFaq(faq._id);
                  }}
                  title={faq.title}
                />
              ))
            ) : (
              <p className="text-sm text-center text-foreground/50 py-10">
                No FAQs found.
              </p>
            )
          ) : (
            activeFaq && <DetailTab id={activeFaq} />
          )}
        </div>
      </div>
    </>
  );
}

export const FaqItem = ({
  title,
  onClick,
}: {
  title: string;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="group flex items-center py-2 justify-between px-2 opacity-80 hover:opacity-100 cursor-pointer"
    >
      <p className="text-sm font-medium">{title}</p>
      <IconBase
        icon={ICONS.CHEVRON_RIGHT}
        className="text-foreground group-hover:text-success size-4"
      />
    </button>
  );
};

const DetailTab = ({ id }: { id: string }) => {
  const notices = noticeSelectors.use.notices();
  const faqs = notices.filter((notice) => notice.type === "faq");
  const faq = faqs.find((faq) => faq._id === id);
  return (
    <article
      className="flex flex-col space-y-4 text-[13px] text-foreground/80"
      dangerouslySetInnerHTML={{ __html: faq?.content as string }}
    ></article>
  );
};
