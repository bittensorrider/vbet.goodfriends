import type { Metadata } from "next";

import ClaimBonusDropForm from "@/components/forms/settings/claimBonusDropForm";
import WelcomeOfferForm from "@/components/forms/settings/welcomeOfferForm";
import TabWrapper from "@/components/wrapper/tabWrapper";

export const metadata: Metadata = {
  title: "Offers | GoodFriends",
  description: "Manage your offers and bonuses",
};

export default function Page() {
  return (
    <>
      <TabWrapper
        title="Welcome Offer"
        description="To claim your welcome offer, please enter your code within 24 hours of signing up."
      >
        <WelcomeOfferForm />
      </TabWrapper>

      <TabWrapper
        title="Claim Bonus Drop"
        description="Find bonus drop codes on our social media's such as x.com (Twitter) & Telegram."
      >
        <ClaimBonusDropForm />
      </TabWrapper>
    </>
  );
}
