import { Button } from "@/components/ui/button";
import IconBase from "@/components/icon/iconBase";
import { ICONS } from "@/constants/icons";
import { useModal } from "@/hooks/useModal";
import { HTMLAttributes } from "react";

export default function HeaderSearchBtn({
  ...props
}: HTMLAttributes<HTMLButtonElement>) {
  const searchModal = useModal("search");

  return (
    <Button
      onClick={() => searchModal.onOpen()}
      size={"icon_default"}
      {...props}
    >
      <IconBase icon={ICONS.SEARCH} />
    </Button>
  );
}
