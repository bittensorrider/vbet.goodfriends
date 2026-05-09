"use client";

import { useEffect } from "react";
import { noticeSelectors } from "@/store/notice.store";
import { PageNoticeItem } from "@/types/notice.types";

export default function HydrateNotification({
  notices,
}: {
  notices: PageNoticeItem[];
}) {
  const setNotices = noticeSelectors.use.setNotices();

  useEffect(() => {
    if (notices?.length) {
      setNotices(notices);
    }
  }, [notices, setNotices]);

  return null;
}
