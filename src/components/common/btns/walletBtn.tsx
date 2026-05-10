import Image from "next/image";
import { Button } from "../../ui/button";
import { useModal } from "@/hooks/useModal";
import { userSelectors } from "@/store/user.store";

export default function WalletBtn() {
  const user = userSelectors.use.user();
  // const unlockWalletModal = useModal("unlock");
  const walletModal = useModal("wallet");

  const onWalletModal = () => {
    walletModal.onOpen({ tab: "deposit" });
  };

  return (
    user && (
      <>
        <div className="flex items-center justify-between bg-neutral/5 border-neutral/5 rounded-2xl h-[42px] max-w-[320px] pl-0 p-1">
          <Button
            onClick={onWalletModal}
            className="h-[36px] flex items-center gap-9 outline-none cursor-pointer pl-3 bg-transparent border-transparent pr-2"
          >
            <div className="flex items-center gap-2">
              <Image
                src={`/imgs/coins/usdt.svg`}
                className="w-5 h-5 rounded-full"
                width={20}
                height={20}
                alt="USDT"
                priority={true}
              />
              <span className="text-xs font-medium">USDT</span>
            </div>
            <span className="text-xs font-medium ml-auto">
              {user?.wallets?.balance || 0}
            </span>
          </Button>
          {/* <div className="flex items-center gap-2 h-full">
          <Button
            onClick={() => unlockWalletModal.onOpen()}
            variant={"primary"}
            className="gap-1 h-full px-2 md:px-3 min-h-full shadow-btn-primary"
          >
            <span className="text-xs font-medium md:flex hidden">
              {user.wallets.bonus.locked}
            </span>
            <IconBase icon={ICONS.LOCKED} className="!size-4" />
          </Button>
        </div> */}
        </div>
      </>
    )
  );
}
