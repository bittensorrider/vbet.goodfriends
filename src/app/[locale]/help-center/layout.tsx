import { HELP_CENTER_MENU } from "@/constants/asideMenu";
import TabPageLayout from "@/components/layout/tabPageLayout";

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <TabPageLayout title="Help Center" titleKey="helpCenter" asideNav={HELP_CENTER_MENU} labelNamespace="aside_menu">
      {children}
    </TabPageLayout>
  );
}
