import PageSearch from "@/components/common/page/pageSearch";
import IconBase from "@/components/icon/iconBase";
import { ICONS } from "@/constants/icons";
import { MessageFrame } from "./MessagesTab";
import { FaqItem } from "./HelpTab";
import { noticeSelectors } from "@/store/notice.store";
import { LiveChatTab } from "../LiveChat";
import fetcher from "@/lib/fetcher";
import { API_ROUTES } from "@/constants/routes";

export default function HomeTab({
  setTab,
  setActiveFaqId,
}: {
  setTab: (tab: LiveChatTab) => void;
  setActiveFaqId: (id: string) => void;
}) {
  const notices = noticeSelectors.use.notices();
  const faqs = notices.filter((notice) => notice.type === "faq");

  const onStartNewChat = async () => {
    const res = await fetcher(API_ROUTES.CHAT.CREATE_SESSION, {
      method: "POST",
    });
    console.log(res);

    return;
    setTab("messages");
  };
  return (
    <div className="relative flex flex-col h-full flex-1 overflow-auto px-6 py-4 custom-scrollbar">
      <div className="flex flex-col gap-2 w-full max-w-[94%] mx-auto">
        <div className="group flex flex-col items-start w-full p-3 bg-[#e9e9e9] dark:bg-[#172235] dark:hover:bg-[#17223580] border border-neutral/10 rounded-2xl dark:shadow-xl dark:shadow-gray-700/5 transition-all cursor-pointer">
          <p className="text-xs font-bold">Recent messages</p>
          <MessageFrame
            src={`/imgs/avatars/user-avatar-02.svg`}
            alt={`Brown Lin`}
            author={`Brown Lin`}
            message={`hi How are you my friend how is going.`}
          />
        </div>
        <button
          onClick={onStartNewChat}
          className="group flex items-center justify-between w-full bg-[#e9e9e9] dark:bg-[#172235] dark:hover:bg-[#17223580] border border-neutral/10 p-3 rounded-xl dark:shadow-sm cursor-pointe transition-all cursor-pointer"
        >
          <p className="text-sm font-medium">Start live chat</p>
          <IconBase
            icon={ICONS.CHEVRON_RIGHT}
            className="size-5 opacity-60 group-hover:opacity-100"
          />
        </button>
      </div>

      <div className="flex flex-col gap-2 w-full max-w-[94%] mx-auto mt-4 p-2 bg-[#e9e9e9] dark:bg-[#172235] rounded-2xl border border-neutral/10">
        <PageSearch queryKey="" placeholder="What you need?" />
        <div className="flex flex-col">
          {faqs.map((faq) => (
            <FaqItem
              key={faq._id}
              title={faq.title}
              onClick={() => setActiveFaqId(faq._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
