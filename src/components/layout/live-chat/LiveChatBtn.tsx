"use client";
// import IconBase from "@/components/icon/iconBase";
// import { Button } from "@/components/ui/button";
// import { ICONS } from "@/constants/icons";
import { layoutSelectors } from "@/store/layout.store";
import { AnimatePresence} from "framer-motion";
import LiveChat from "./LiveChat";

export default function LiveChatBtn() {
  const isNotificationOpen = layoutSelectors.use.isNotificationOpen();
  const isChatOpen = layoutSelectors.use.isChatOpen();
  const toggleChat = layoutSelectors.use.toggleChat();
  
  return (
    <>
      {/* <Button
        onClick={toggleChat}
        variant={`primary`}
        className={`${
          isNotificationOpen ? "right-74" : "right-6"
        } !fixed size-12 rounded-full bottom-4 z-50 shadow-2xl transition-all lg:flex hidden`}
      >
        <IconBase icon={ICONS.HEADPHONES} className="size-5" />
      </Button> */}

      <AnimatePresence>
        {isChatOpen && (
          <LiveChat
            key={`chat-iframe`}
            isNotificationOpen={isNotificationOpen}
            toggleChat={toggleChat}
          />
        )}
      </AnimatePresence>
    </>
  );
}
