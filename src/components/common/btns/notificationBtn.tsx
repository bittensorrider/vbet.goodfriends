import IconBase from "@/components/icon/iconBase";
import { Button } from "@/components/ui/button";
import { ICONS } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { layoutSelectors } from "@/store/layout.store";
import { noticeSelectors } from "@/store/notice.store";
import { HTMLAttributes } from "react";

export default function NotificationBtn({
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const isNotificationOpen = layoutSelectors.use.isNotificationOpen();
  const toggleNotification = layoutSelectors.use.toggleNotification();

  const notifications = noticeSelectors.use.notices();

  return (
    <div className={cn("relative", props.className)} {...props}>
      {notifications.length > 0 && (
        <div className="absolute -top-1 -right-1 z-10 flex items-center justify-center text-xs font-semibold w-4.5 h-4.5 rounded-full bg-primary text-white">
          {notifications.length > 9 ? "9+" : notifications.length}
        </div>
      )}

      <Button
        onClick={toggleNotification}
        size={"icon_default"}
        variant={isNotificationOpen ? "primary_bordered" : "default"}
      >
        <IconBase icon={ICONS.NOTICE_BELL} />
      </Button>
    </div>
  );
}
