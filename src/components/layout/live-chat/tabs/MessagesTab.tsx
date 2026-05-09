import IconBase from "@/components/icon/iconBase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ICONS } from "@/constants/icons";
import { cn } from "@/lib/utils";

export default function MessagesTab({
  onClick,
  onTabChange,
}: {
  onClick: () => void;
  onTabChange: () => void;
}) {
  return (
    <>
      <div className="relative flex flex-col h-full flex-1 overflow-auto px-6 py-4 custom-scrollbar">
        <MessageFrame
          src={`/imgs/avatars/user-avatar-02.svg`}
          alt={`Brown Lin`}
          author={`Brown Lin`}
          message={`hi How are you my friend how is going.`}
          className="bg-foreground/5 px-4 py-2 rounded-xl"
          onClick={onClick}
        />
      </div>
      <button
        onClick={onTabChange}
        className="group max-w-[90%] mb-6 mx-auto flex items-center justify-between w-full bg-primary hover:bg-primary/80 border border-primary p-3 rounded-xl shadow-sm cursor-pointe transition-all cursor-pointer"
      >
        <p className="text-sm font-medium text-white">Start New live chat</p>
        <IconBase icon={ICONS.CHEVRON_RIGHT} className="size-5 text-white" />
      </button>
    </>
  );
}

export const MessageFrame = ({
  src,
  alt,
  author,
  message,
  className,
  onClick,
}: {
  src: string;
  alt: string;
  author: string;
  message: string;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`${cn(
        "w-full flex gap-1 items-center justify-between cursor-pointer",
        className
      )}`}
    >
      <div className="flex gap-1 items-center">
        <Avatar className="!size-[36px] border border-neutral/10 bg-black mt-1">
          <AvatarImage src={src} alt={alt} />
          <AvatarFallback>BR</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start gap-0.5 flex-1 p-1 overflow-hidden">
          <div className="flex items-center flex-1 gap-2">
            <h6 className="truncate flex-1 text-sm font-medium">{author}</h6>
          </div>
          <div className="text-[13px] text-foreground/90 leading-5">
            {message}
          </div>
        </div>
      </div>
      <IconBase
        icon={ICONS.CHEVRON_RIGHT}
        className="size-5 group-hover:opacity-100 opacity-60 transition-all"
      />
    </button>
  );
};
