import React from "react";
import { WALLET_MENU } from "@/constants/asideMenu";
import TabPageLayout from "@/components/layout/tabPageLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <TabPageLayout title="Wallet" titleKey="balance" asideNav={WALLET_MENU} labelNamespace="aside_menu">
      {children}
    </TabPageLayout>
  );
}
