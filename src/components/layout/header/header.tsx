"use client";
import HeaderSearchBtn from "@/components/layout/header/headerSearch";
import { userSelectors } from "@/store/user.store";
import HeaderGuest from "@/components/layout/header/headerGuest";
import HeaderLoggedIn from "@/components/layout/header/headerLoggedIn";
import { layoutSelectors } from "@/store/layout.store";
import Logo from "@/components/common/brand/logo";

export default function Header() {
  const user = userSelectors.use.user();
  const cleanUser = userSelectors.use.clearUser();

  const toggleChat = layoutSelectors.use.toggleChat();
  const setNotificationOpen = layoutSelectors.use.setNotificationOpen();

  return (
    <header className="sticky top-0 z-40 w-full min-h-[70px] border-b border-neutral/5 header-linear-background shadow-header">
      <div className="container--main flex h-full items-center justify-between">
        <Logo parentClassName="lg:hidden flex" />
        <HeaderSearchBtn className="lg:flex hidden" />
        {!user ? (
          <HeaderGuest />
        ) : (
          <HeaderLoggedIn
            user={user}
            clearUser={cleanUser}
            toggleChat={toggleChat}
            setNotificationOpen={setNotificationOpen}
          />
        )}
      </div>
    </header>
  );
}
