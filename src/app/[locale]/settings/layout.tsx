import React from "react";
import { SETTINGS_MENU } from "@/constants/asideMenu";
import TabPageLayout from "@/components/layout/tabPageLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <TabPageLayout title="Settings" titleKey="settings" asideNav={SETTINGS_MENU} labelNamespace="aside_menu">
      {children}
    </TabPageLayout>
  );
}
