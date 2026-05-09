import IconBase from "@/components/icon/iconBase";
import { Button } from "@/components/ui/button";
import { ICONS } from "@/constants/icons";
import { layoutSelectors } from "@/store/layout.store";
import { HTMLAttributes } from "react";

export default function ChatBtn({
  ...props
}: HTMLAttributes<HTMLButtonElement>) {
  const isChatOpen = layoutSelectors.use.isChatOpen();
  return (
    <Button
      size={"icon_default"}
      aria-label="Toggle Chat aside"
      variant={isChatOpen ? "primary_bordered" : "default"}
      {...props}
    >
      <IconBase icon={ICONS.CHAT} />
    </Button>
  );
}
