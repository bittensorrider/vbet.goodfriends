import { ModalControls } from "@/hooks/useModal";
import ModalLayout from "../modalLayout";
import Logo from "@/components/common/brand/logo";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselIndicator,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import IconBase from "@/components/icon/iconBase";
import { ICONS } from "@/constants/icons";
import React from "react";
import { noticeSelectors } from "@/store/notice.store";
import { AnimatePresence, motion } from "framer-motion";
import { addDontShowNotice, shouldHideNotice } from "@/helpers/notice.helpers";
import { useTranslations } from "next-intl";

type Props = ModalControls<"notices">;


const Notice = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col gap-2 w-full overflow-hidden">
      <h6 className="text-sm md:text-lg font-semibold text-foreground/90">
        {title}
      </h6>
      <div
        dangerouslySetInnerHTML={{ __html: description }}
        className="notification-block flex flex-col gap-2 text-xs font-normal text-foreground/70 break-words"
      />
    </div>
  );
};

export default function NoticesModal({ isOpen, onClose }: Props) {
  const t = useTranslations('notices_modal');
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [markedIds, setMarkedIds] = React.useState<string[]>([]);
  const [isLastNotice, setIsLastNotice] = React.useState(false);
  const notices = noticeSelectors.use.notices();
  const updatedNotices = notices.filter(
    (n) =>
      n.isUse &&
      n.type === "notice" &&
      !shouldHideNotice(n._id)
  );

  React.useEffect(()=> {
    if(updatedNotices.length === 0) {
      onClose()
    }
  }, [updatedNotices, onClose])

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      const index = api.selectedScrollSnap();
      setCurrentIndex(index);
      setIsLastNotice(index === updatedNotices.length - 1);
    };

    onSelect();
    api.on("select", onSelect);
    api.on("slidesChanged", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("slidesChanged", onSelect);
    };
  }, [api, updatedNotices.length]);

  const onMarkAndDontShow = () => {
    const currentId = updatedNotices[currentIndex]?._id;
    if (!currentId) return;

    if (!markedIds.includes(currentId)) {
      setMarkedIds([...markedIds, currentId]);
    }

    if (currentId) addDontShowNotice(currentId);
  };
  
  return updatedNotices.length > 0 && (
    <ModalLayout
      isOpen={isOpen}
      onClose={() => {
        if (!isLastNotice) {
          return;
        }
        sessionStorage.setItem("modalClosedInSession", "true");
        onClose();
      }}
      closeBtnClassname={
        !isLastNotice ? "opacity-30 cursor-not-allowed pointer-events-none" : ""
      }
      ariaLabel={t('notice_title')}
      className="pb-0 max-h-[560px]"
    >
      <div className="flex flex-col items-center gap-1 px-4">
        <div className="flex flex-col items-center gap-2">
          <Logo withTitle={false} className="w-[40px] h-[35px]" />
        </div>
      </div>

      <Carousel setApi={setApi}>
        <CarouselContent>
          <AnimatePresence mode="wait">
            {updatedNotices.map((notification, i) => (
              <CarouselItem key={notification._id} className="overflow-hidden">
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{
                    height: currentIndex === i ? "auto" : "400px",
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden grid"
                >
                  <Notice
                    title={notification.title}
                    description={notification.content}
                  />
                </motion.div>
              </CarouselItem>
            ))}
          </AnimatePresence>
        </CarouselContent>
        {updatedNotices.length > 0 && (
          <div className="linear-background flex items-center justify-between mt-4 bg-background sticky bottom-0 pb-4 pt-2">
            <button
              onClick={onMarkAndDontShow}
              className={`${
                updatedNotices[currentIndex]?._id && markedIds.includes(updatedNotices[currentIndex]._id)
                  ? "text-success"
                  : "text-foreground/80"
              } flex items-center gap-1 cursor-pointer active:scale-95 transition-all`}
            >
              <IconBase icon={ICONS.DOUBLE_CHECK} className="size-5" />
              <span className="text-xs font-medium">
                Don`t show again in 24hr - ({currentIndex + 1})
              </span>
            </button>
            <div className="flex items-center gap-3">
              <CarouselIndicator />
              <div className="flex items-center gap-3">
                <CarouselPrevious className="relative translate-0 left-0 size-8">
                  <IconBase icon={ICONS.CHEVRON_LEFT} className="size-4 " />
                </CarouselPrevious>
                <CarouselNext className="relative translate-0 left-0 size-8">
                  <IconBase
                    icon={ICONS.CHEVRON_LEFT}
                    className="size-4 rotate-180"
                  />
                </CarouselNext>
              </div>
            </div>
          </div>
        )}
      </Carousel>
    </ModalLayout>
  );
}
