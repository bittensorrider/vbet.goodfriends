import type { Metadata } from "next";

import AccountInformationForm from "@/components/forms/settings/accountInformationForm";
import TabWrapper from "@/components/wrapper/tabWrapper";

export const metadata: Metadata = {
  title: "General Settings | GoodFriends",
  description: "Manage your general settings",
};

export default function Page() {
  return (
    <TabWrapper>
      <AccountInformationForm />
    </TabWrapper>
  );
}
