import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Sen } from "next/font/google";
import type { Metadata } from "next";

import HydrateNotice from "@/components/hydrate/HydrateNotices";
import HydrateUser from "@/components/hydrate/HydrateUser";
import Aside from "@/components/layout/aside/aside";
import Footer from "@/components/layout/footer/footer";
import Header from "@/components/layout/header/header";
import LiveChatBtn from "@/components/layout/live-chat/LiveChatBtn";
import Main from "@/components/layout/main/main";
import MobileNav from "@/components/layout/mobile-nav/MobileNav";
import RightPanel from "@/components/layout/rightPanel/rightPanel";
import PageLoader from "@/components/loader/pageLoader";
import Modals from "@/components/modals/Modals";
import { Toaster } from "@/components/ui/sonner";
import { getNoticeData } from "@/helpers/notice.helpers";
import { getSession } from "@/lib/getSession";

import "./globals.css";

const fontPrimary = Sen({
  variable: "--font-sen",
  subsets: ["latin"],
});

// SEO
export const metadata: Metadata = {
  metadataBase: new URL("https://vbet-goodfriends.vercel.app"),
  title: {
    default: "GoodFriends",
    template: "%s | GoodFriends",
  },
  description: "Vietnamese No.1 Online Casino Platform, Guaranteed Wins 100%",
  keywords: [
    "casino",
    "online",
    "vietnam",
    "games",
    "entertainment",
    "gaming",
    "betting",
    "slots",
    "blackjack",
    "poker",
    "money",
    "mahjong",
    "lucky",
    "professional",
    "black friday",
    "flash sale",
    "roulette",
    "spaceman",
  ],
  openGraph: {
    title: "GoodFriends",
    description: "Vietnamese No.1 Online Casino Platform, Guaranteed Wins 100%",
    url: "https://vbet-goodfriends.vercel.app",
    siteName: "GoodFriends",
    images: [
      {
        url: "/og.png",
        width: 1920,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GoodFriends",
    description: "Vietnamese No.1 Online Casino Platform, Guaranteed Wins 100%",
    images: [
      {
        url: "/og.png",
        width: 1920,
        height: 600,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "GoodFriends",
              url: "https://vbet-goodfriends.vercel.app",
            }),
          }}
        />
      </body>
    </html>
  );
}
