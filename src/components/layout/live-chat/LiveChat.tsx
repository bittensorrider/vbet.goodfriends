import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LayoutState } from "@/store/layout.store";
import Logo from "@/components/common/brand/logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import IconBase from "@/components/icon/iconBase";
import { ICONS } from "@/constants/icons";
import MessagesTab from "./tabs/MessagesTab";
import HomeTab from "./tabs/HomeTab";
import HelpTab from "./tabs/HelpTab";
import ChatTab from "./tabs/ChatTab";

export type LiveChatTab = "home" | "messages" | "chat" | "help";
export default function LiveChat({
  isNotificationOpen,
  toggleChat,
}: {
  isNotificationOpen: LayoutState["isNotificationOpen"];
  toggleChat: LayoutState["toggleChat"];
}) {
  const [tab, setTab] = useState<LiveChatTab>("home");
  const [mounted, setMounted] = useState(false);
  const [activeFaqId, setActiveFaqId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onMessageClick = () => {
    setTab("chat");
  };

  useEffect(() => {
    setTab("help");
  }, [activeFaqId]);

  if (!mounted || typeof window === "undefined") return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.2, ease: "linear" }}
      className={`${
        isNotificationOpen ? "lg:right-[280px]" : "lg:right-4"
      } fixed bottom-0 lg:bottom-4 w-full lg:w-[500px] lg:max-w-[90vw] h-svh lg:h-[calc(100%-200px)] overflow-hidden bg-background border border-foreground/5 shadow-2xl lg:rounded-2xl pt-4 z-50`}
    >
      {tab !== "messages" && tab !== "chat" && tab !== "help" && (
        <LinearBackground />
      )}

      <div className="flex flex-col flex-1 h-full">
        {tab === "messages" ? (
          <MessagesHeader toggleChat={toggleChat} />
        ) : tab === "chat" ? (
          <ChatHeader
            onTabChange={() => setTab("messages")}
            toggleChat={toggleChat}
          />
        ) : tab === "help" ? null : (
          <BaseHeader toggleChat={toggleChat} />
        )}

        {tab === "home" ? (
          <HomeTab setActiveFaqId={setActiveFaqId} setTab={setTab} />
        ) : tab === "messages" ? (
          <MessagesTab
            onClick={onMessageClick}
            onTabChange={() => setTab("chat")}
          />
        ) : tab === "chat" ? (
          <ChatTab />
        ) : (
          <HelpTab activeFaqId={activeFaqId} toggleChat={toggleChat} />
        )}

        <div className="w-full flex items-center bg-foreground/5">
          <Button
            onClick={() => setTab("home")}
            className={`${
              tab === "home" ? "text-primary bg-primary/5" : "bg-transparent"
            } flex flex-col flex-1 max-h-max h-max py-3 gap-1 border-transparent rounded-none`}
          >
            <IconBase icon={ICONS.HOME} className="size-4.5" />
            <p className="text-[13px] font-semibold">Home</p>
          </Button>
          <Button
            onClick={() => setTab("messages")}
            className={`${
              tab === "messages" || tab === "chat"
                ? "text-primary bg-primary/5"
                : "bg-transparent"
            } flex flex-col flex-1 max-h-max h-max py-3 gap-1 border-y-0 border-x-foreground/5 rounded-none opacity-80`}
          >
            <IconBase icon={ICONS.CHAT} className="size-4.5" />
            <p className="text-[13px] font-semibold">Messages</p>
          </Button>
          <Button
            onClick={() => {setTab("help"); setActiveFaqId(null)}}
            className={`${
              tab === "help" ? "text-primary bg-primary/5" : "bg-transparent"
            } flex flex-col flex-1 max-h-max h-max py-3 gap-1 border-transparent rounded-none`}
          >
            <IconBase icon={ICONS.HELP_CENTER} className="size-4.5" />
            <p className="text-[13px] font-semibold">Help center</p>
          </Button>
        </div>
      </div>
    </motion.div>,
    document.body
  );
}

const LinearBackground = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-1/3 bg-linear-to-b from-[#dfcbff] dark:from-primary/60 to-background/0 z-0"></div>
  );
};

const BaseHeader = ({
  toggleChat,
}: {
  toggleChat: LayoutState["toggleChat"];
}) => {
  return (
    <div className="flex h-max flex-col px-6 z-10">
      <div className="flex items-center justify-between py-2 ">
        <Logo withTitle className="" />
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-primary/60 *:data-[slot=avatar]:bg-background">
            <Avatar>
              <AvatarImage
                src="/imgs/avatars/user-avatar-02.svg"
                alt="@leerob"
              />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage
                src="/imgs/avatars/user-avatar-01.svg"
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage
                src="/imgs/avatars/user-avatar-02.svg"
                alt="@leerob"
              />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage
                src="/imgs/avatars/user-avatar-03.svg"
                alt="@evilrabbit"
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
          </div>
          <Button
            onClick={toggleChat}
            size={`icon_sm`}
            className="rounded-full bg-[#e9e9e9] dark:bg-foreground/10"
          >
            <IconBase icon={ICONS.CLOSE_X} className="size-4" />
          </Button>
        </div>
      </div>
      <div className="flex py-4 flex-col">
        <p className="text-2xl font-medium opacity-70">Hey Brown Lin 👋</p>
        <p className="text-xl font-semibold">How We Can Help You?</p>
      </div>
    </div>
  );
};

const MessagesHeader = ({
  toggleChat,
}: {
  toggleChat: LayoutState["toggleChat"];
}) => {
  return (
    <div className="w-full flex items-center justify-between px-6 pb-6 border-b border-foreground/10">
      <h6 className="text-xl">Messages</h6>
      <Button onClick={toggleChat} size={`icon_sm`} className="rounded-full">
        <IconBase icon={ICONS.CLOSE_X} className="size-4" />
      </Button>
    </div>
  );
};

const ChatHeader = ({
  onTabChange,
  toggleChat,
}: {
  onTabChange: () => void;
  toggleChat: LayoutState["toggleChat"];
}) => {
  return (
    <div className="w-full flex items-center justify-between px-6 pb-6 border-b border-foreground/10">
      <div className="flex items-center gap-1">
        <Button
          onClick={onTabChange}
          size={`icon_sm`}
          className="bg-transparent border-transparent rounded-xl"
        >
          <IconBase icon={ICONS.CHEVRON_LEFT} className="size-5" />
        </Button>
        <div className="flex items-center gap-1.5">
          <Logo hasHref={false} />
          <div className="flex flex-col">
            <p className="text-base font-semibold">Goodfriend Support</p>
            <span className="text-[13px] font-medium opacity-70">
              The team can also help
            </span>
          </div>
        </div>
      </div>

      <Button
        onClick={toggleChat}
        size={`icon_sm`}
        className="rounded-full mt-2"
      >
        <IconBase icon={ICONS.CLOSE_X} className="size-4" />
      </Button>
    </div>
  );
};
