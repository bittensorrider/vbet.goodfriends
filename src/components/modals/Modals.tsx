"use client";
import dynamic from "next/dynamic";

import { useModal } from "@/hooks/useModal";
import { useEffect } from "react";
import { noticeSelectors } from "@/store/notice.store";
import { shouldHideNotice } from "@/helpers/notice.helpers";
import { userSelectors } from "@/store/user.store";

const AuthModal = dynamic(() => import("@/components/modals/authModal"), {
  ssr: false,
});
const WalletModal = dynamic(() => import("@/components/modals/walletModal"), {
  ssr: false,
});
const ProfileModal = dynamic(
  () => import("@/components/modals/profile/ProfileModal"),
  { ssr: false }
);
const NoticesModal = dynamic(
  () => import("@/components/modals/notices/noticesModal"),
  { ssr: false }
);
const PromotionModal = dynamic(
  () => import("@/components/modals/promotion/PromotionModal"),
  {
    ssr: false,
  }
);
const WheelModal = dynamic(
  () => import("@/components/modals/wheel/wheelModal"),
  { ssr: false }
);
const AttendanceModal = dynamic(
  () => import("@/components/modals/attendanceModal"),
  {
    ssr: false,
  }
);

const SearchModal = dynamic(() => import("@/components/modals/searchModal"), {
  ssr: false,
});
const UnlockBonusModal = dynamic(
  () => import("@/components/modals/unlockModal"),
  { ssr: false }
);
const UpdatePasswordModal = dynamic(() => import("./updatePasswordModal"), {
  ssr: false,
});

export default function Modals() {
  const user = userSelectors.use.user();
  const notices = noticeSelectors.use.notices();
  const noticesModal = useModal("notices");
  const profileModal = useModal("profile");
  const promotionModal = useModal("promotion");
  const wheelModal = useModal("wheel");
  const authModal = useModal("auth");
  const walletModal = useModal("wallet");
  const attendanceModal = useModal("attendance");
  const searchModal = useModal("search");
  const unlockModal = useModal("unlock");
  const updatePasswordModal = useModal("update-password");

  useEffect(() => {
    const hasClosedModal = sessionStorage.getItem("modalClosedInSession");

    const onlyNotices = notices.filter((n) => n.isUse && n.type === "notice");
    const updatedNotices = onlyNotices.filter(
      (n) => n.isUse && !shouldHideNotice(n._id)
    );
    if (updatedNotices.length > 0 && !hasClosedModal) {
      noticesModal.onOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notices]);

  useEffect(() => {
    const navEntry = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming;
    if (navEntry?.type === "reload") {
      // This was a refresh
      sessionStorage.removeItem("modalClosedInSession");
    }
  }, []);

  return (
    <>
      {noticesModal.isOpen && <NoticesModal {...noticesModal} />}
      {profileModal.isOpen && <ProfileModal {...profileModal} />}
      {promotionModal.isOpen && <PromotionModal {...promotionModal} />}
      {wheelModal.isOpen && <WheelModal {...wheelModal} />}
      {authModal.isOpen && <AuthModal {...authModal} />}
      {walletModal.isOpen && user && <WalletModal {...walletModal} />}
      {attendanceModal.isOpen && <AttendanceModal {...attendanceModal} />}
      {searchModal.isOpen && <SearchModal {...searchModal} />}
      {unlockModal.isOpen && <UnlockBonusModal {...unlockModal} />}
      {updatePasswordModal.isOpen && (
        <UpdatePasswordModal {...updatePasswordModal} />
      )}
    </>
  );
}
