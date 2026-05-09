"use client";
import IconBase from "@/components/icon/iconBase";
import { Button } from "@/components/ui/button";
import { ICONS } from "@/constants/icons";
import { LayoutState } from "@/store/layout.store";
import { useRef } from "react";
import NotificationMessage from "./notificationMessage";
import { noticeSelectors } from "@/store/notice.store";

type Props = Pick<LayoutState, "toggleNotification">;

export default function Notifications({ toggleNotification }: Props) {
  const notifications = noticeSelectors.use.notices();
  const removeNotification = noticeSelectors.use.removeNotice();

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  return (
    <aside className="flex flex-col w-full shrink-0 ">
      <div className="w-full h-[70px] border-b border-neutral/10 flex items-center justify-between pl-4 pr-2">
        <div className="flex flex-col">
          <p className="text-base font-semibold">Notifications</p>
          <span className="text-xs font-medium opacity-80">12 new</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1"></div>
          <Button
            onClick={toggleNotification}
            size={`icon_sm`}
            className="rounded-full border-none"
          >
            <IconBase icon={ICONS.CLOSE_X} />
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-auto custom-scrollbar flex flex-col gap-3 p-2" ref={scrollContainerRef}>
        {notifications.length > 0 ? (
          notifications.map((notification, i) => (
            <NotificationMessage
              key={notification._id}
              notice={notification}
              removeNotice={removeNotification}
              index={i}
            />
          ))
        ) : (
          <div className="h-full flex items-center justify-center">
            <span className="text-foreground/50 m-auto">
              No Notifications to show
            </span>
          </div>
        )}
      </div>
    </aside>
  );
}
