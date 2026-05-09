import PrivateInfoForm from "@/components/forms/settings/privateInfoForm";
import TwoFactorForm from "@/components/forms/settings/twoFactorForm";
import TabWrapper from "@/components/wrapper/tabWrapper";

export default function Page() {
  return (
    <>
      <TabWrapper title="Private Info">
        <PrivateInfoForm />
      </TabWrapper>

      <TabWrapper
        title="Two Factor"
        description="To keep your account extra secure leave a two factor authentication enabled."
      >
        <TwoFactorForm />
      </TabWrapper>
    </>
  );
}
