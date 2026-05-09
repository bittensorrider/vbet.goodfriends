 "use client";
import { useModal } from "@/hooks/useModal";
import { Notice } from "@/types/notice.types";
import { useEffect } from "react";

export default function NoticeOpener({
  type,
}: {
  type: Notice["type"];
}) {
  const noticeModal = useModal("notices");

  useEffect(() => {
    noticeModal.onOpen({ type: type });
  }, [noticeModal, type]);

  return null;
}
