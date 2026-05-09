// Props
import { ReactNode } from "react";
// Components
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ModalControls } from "@/hooks/useModal";
import IconBase from "../icon/iconBase";
import { ICONS } from "@/constants/icons";
import { cn } from "@/lib/utils";

// Props
type Props = {
  size?: "default" | "md" | "lg";
  bg?: "default" | "transparent";
  children: ReactNode;
  ariaLabel: string;
  className?: string;
  closeBtnClassname?: string;
  hasPrevBtn?: boolean;
  disableCloseBtn?: boolean;
  onPrevBtn?: () => void;
} & Partial<ModalControls>;

const ModalLayout = ({
  size = "default",
  bg = "default",
  className = "",
  closeBtnClassname = "",
  ariaLabel,
  children,
  isOpen,
  onOpen,
  onClose,
  hasPrevBtn = false,
  onPrevBtn,
}: // disableCloseBtn = false,
Props) => {
  const width =
    size === "default"
      ? "sm:!max-w-[460px]"
      : size === "md"
      ? "sm:!max-w-[578px]"
      : size === "lg"
      ? "sm:!max-w-[1024px]"
      : "";
  const bgColor = bg === "default" ? "linear-background" : "bg-transparent";
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (open && onOpen) {
          onOpen();
        } else if (onClose) {
          onClose();
        }
      }}
    >
      <DialogTrigger asChild>{""}</DialogTrigger>

      <DialogContent
        className={cn(
          `${width} ${bgColor} relative custom-scrollbar-height p-6 gap-6 rounded-t-4xl md:rounded-4xl z-50 w-full border-none`,
          className
        )}
      >
        {hasPrevBtn && (
          <button
            onClick={onPrevBtn}
            className={`absolute left-5 top-5 cursor-pointer z-10`}
          >
            <div className="w-9 h-9 rounded-full bg-neutral/5 hover:bg-neutral/10 grid place-content-center cursor-pointer">
              <IconBase icon={ICONS.CHEVRON_LEFT} className="size-5" />
            </div>
          </button>
        )}
        <DialogClose
          className={`${closeBtnClassname} absolute right-5 top-5 z-10 cursor-pointer`}
        >
          <div className="w-8 h-8 rounded-full bg-neutral/5 hover:bg-neutral/10 grid place-content-center">
            <IconBase icon={ICONS.CLOSE_X} className="size-4" />
          </div>
        </DialogClose>
        <DialogHeader className="hidden">
          <DialogTitle>{ariaLabel}</DialogTitle>
        </DialogHeader>
        {children}
        {/* <div className="w-full flex flex-col gap-4 max-h-[calc(100vh-200px)] overflow-auto">
          </div> */}
      </DialogContent>
    </Dialog>
  );
};

export default ModalLayout;
