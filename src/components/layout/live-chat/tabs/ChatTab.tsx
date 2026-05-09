import IconBase from "@/components/icon/iconBase";
import { Button } from "@/components/ui/button";
import { ICONS } from "@/constants/icons";
import Image from "next/image";
import { ChangeEvent, FormEvent, useRef, useState } from "react";

export default function ChatTab() {
  return (
    <>
      <div className="relative flex flex-col gap-4 h-full flex-1 overflow-auto px-6 py-4 custom-scrollbar">
        <Message
          src={`/imgs/avatars/user-avatar-03.svg`}
          alt="avatar-01"
          author="Brown Lin"
          date="2 days ago"
          message="Hi Jack225! We noticed that you recently contacted our Customer with the assistance you received, using the buttons below: 12:15 pm Service team. Please take a few seconds to tell us how satisfied you are"
          by="support"
        />

        <Message
          src={`/imgs/avatars/user-avatar-02.svg`}
          alt="avatar-01"
          author="Brown Lin"
          date="2 days ago"
          message="Hi there, how i can withdraw money?"
          by="user"
        />
        <Message
          src={`/imgs/avatars/user-avatar-03.svg`}
          alt="avatar-02"
          author="Support Team"
          date="2 days ago"
          message="Sure! You can withdraw money by visiting the Wallet section and selecting 'Withdraw'."
          by="support"
        />

        <Message
          src={`/imgs/avatars/user-avatar-01.svg`}
          alt="avatar-03"
          author="Brown Lin"
          date="1 day ago"
          message="Is there any fee for withdrawals?"
          by="user"
        />

        <Message
          src={`/imgs/avatars/user-avatar-03.svg`}
          alt="avatar-02"
          author="Support Team"
          date="1 day ago"
          message="Yes, there may be a small processing fee depending on the method selected."
          by="support"
        />

        <Message
          src={`/imgs/avatars/user-avatar-01.svg`}
          alt="avatar-03"
          author="Brown Lin"
          date="1 day ago"
          message="Okay, thanks! Also, is there a minimum limit?"
          by="user"
        />

        <Message
          src={`/imgs/avatars/user-avatar-03.svg`}
          alt="avatar-02"
          author="Support Team"
          date="1 day ago"
          message="Yes, the minimum withdrawal is $10. Let us know if you need help!"
          by="support"
        />

        <Message
          src={`/imgs/avatars/user-avatar-01.svg`}
          alt="avatar-03"
          author="Brown Lin"
          date="20 hours ago"
          message="Can I cancel a withdrawal after initiating it?"
          by="user"
        />

        <Message
          src={`/imgs/avatars/user-avatar-03.svg`}
          alt="avatar-02"
          author="Support Team"
          date="20 hours ago"
          message="If the transaction hasn't been processed yet, yes. Please contact support quickly."
          by="support"
        />

        <Message
          src={`/imgs/avatars/user-avatar-01.svg`}
          alt="avatar-03"
          author="Brown Lin"
          date="18 hours ago"
          message="Understood. Appreciate your quick help 🙏"
          by="user"
        />
      </div>
      <div>
        <ChatInput />
      </div>
    </>
  );
}

export const Message = ({
  src,
  alt,
  author,
  date,
  message,
  by,
}: {
  src: string;
  alt: string;
  author: string;
  date: string;
  message: string;
  by: "support" | "user";
}) => {
  return (
    <div
      className={`${
        by === "support"
          ? "bg-foreground/5 max-w-[90%] rounded-t-2xl rounded-r-2xl"
          : "bg-primary/80 text-white ml-auto max-w-[90%] rounded-t-2xl rounded-l-2xl"
      } flex flex-col gap-2 w-max p-4`}
    >
      {by === "support" && (
        <div className="flex items-center gap-2">
          <Image
            src={src}
            alt={alt}
            width={50}
            height={50}
            className="size-8"
            priority={true}
          />
          <p className="text-sm font-bold">{author}</p>
          <p className="ml-auto text-xs font-semibold">{date}</p>
        </div>
      )}
      <p
        className={`${
          by === "support" ? "text-foreground/80" : ""
        } text-[13px] leading-[140%]`}
      >
        {message}
      </p>
    </div>
  );
};

const ChatInput = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [message, setMessage] = useState<string>("");

  const autoResize = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim()) return;

    // 🔥 Your submit logic here
    alert(`Submitted message: ${message}`);

    setMessage("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex" id="livechat-form">
      <textarea
        ref={textareaRef}
        value={message}
        autoFocus
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
          setMessage(e.target.value);
          autoResize();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            (
              document.getElementById("livechat-form") as HTMLFormElement
            )?.requestSubmit();
          }
        }}
        placeholder="Write message..."
        className="w-full min-h-12 max-h-[120px] border border-neutral/10 rounded-none bg-transparent px-3 py-[15px] text-xs font-medium outline-none focus:border-neutral/15 pr-12 text-foreground placeholder:text-foreground/40 resize-none"
        rows={1}
      />
      <Button
        type="submit"
        className="!absolute right-2 top-1/2 -translate-y-1/2 bg-transparent border-none rounded-full w-8 h-8 p-0 min-w-0 min-h-0"
      >
        <IconBase icon={ICONS.SEND_MESSAGE} className="size-4" />
      </Button>
    </form>
  );
};
