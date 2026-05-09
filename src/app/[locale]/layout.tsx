import "./globals.css";
import HydrateNotice from "@/components/hydrate/HydrateNotices";
import HydrateUser from "@/components/hydrate/HydrateUser";
import Aside from "@/components/layout/aside/aside";
import Footer from "@/components/layout/footer/footer";
import Header from "@/components/layout/header/header";
import LiveChatBtn from "@/components/layout/live-chat/LiveChatBtn";
import Main from "@/components/layout/main/main";
import MobileNav from "@/components/layout/mobile-nav/MobileNav";
import RightPanel from "@/components/layout/rightPanel/rightPanel";
// import RightPanel from "@/components/layout/rightPanel/rightPanel";
import PageLoader from "@/components/loader/pageLoader";
import Modals from "@/components/modals/Modals";
import { Toaster } from "@/components/ui/sonner";
import { getNoticeData } from "@/helpers/notice.helpers";
import { getSession } from "@/lib/getSession";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Sen } from "next/font/google";

const fontPrimary = Sen({
  variable: "--font-sen",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();
  const session = await getSession();
  const { data: notices } = await getNoticeData("active", "", 1, 100);

  return (
    <html lang={locale} data-theme="dark">
      <body className={`${fontPrimary.className} flex antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <PageLoader />
          <div className="relative flex flex-1 overflow-hidden h-svh">
            <Aside />
            <div className="flex flex-1 flex-col custom-scrollbar overflow-auto">
              <Header />
              <Main>{children}</Main>
              <Footer />
              <LiveChatBtn />
            </div>

            <RightPanel />
            <Modals />

            <MobileNav />
            <Toaster position="top-right" />
          </div>
          <HydrateUser session={session} />
          <HydrateNotice notices={notices} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
