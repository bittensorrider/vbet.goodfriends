import { ModalControls } from "@/hooks/useModal";
import ModalLayout from "./modalLayout";
import Logo from "../common/brand/logo";
import { useEffect, useState } from "react";
import TabFilter from "../filter/tabFilter";
import DepositForm from "../forms/wallet/depositForm";
import WithdrawalForm from "../forms/wallet/withdrawalForm";
import Image from "next/image";
import ProgressBar from "../progress/ProgressBar";
import { WalletModalTab } from "@/types/modal.types";
import { GetCurrencyListAction } from "@/actions/wallet.actions";
import { useTranslations } from "next-intl";

type Props = ModalControls<"wallet">;

const CurrentRolling = () => {
  const t = useTranslations("wallet_modal");

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span>{t("currency_label")}</span>
        <div className="relative flex items-center gap-[6px]">
          <Image
            src={`/imgs/coins/btc.svg`}
            className="size-6 rounded-full"
            width={24}
            height={24}
            alt="BTC (Bitcoin)"
          />
          <span className="text-foreground text-base font-medium">
            BTC (Bitcoin)
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-6 pr-1 max-h-[calc(100vh-300px)] overflow-auto custom-scrollbar">
        <div className="p-4 flex flex-col gap-4 bg-foreground/5 rounded-xl">
          <div className="flex flex-col text-sm gap-0.5">
            <p className="font-bold text-foreground/70">
              {t("deposit_money")}{" "}
              <span className="text-foreground">10,000</span>
            </p>
            <p className="font-bold text-foreground/70">
              {t("creation_date")}{" "}
              <span className="text-foreground">2024-02-10 10:12:51</span>
            </p>
            <p className="font-bold text-foreground/70">
              {t("withdrawable")} <span className="text-foreground">595</span>
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <ProgressBar
              value={60}
              header={{
                leftText: t("set_rolling"),
                rightText: t("sports_betting"),
              }}
              footer={{
                rightText: "0 - 50,000",
              }}
            />
            <ProgressBar
              value={10}
              header={{
                leftText: t("set_rolling"),
                rightText: t("casino_betting"),
              }}
              footer={{
                rightText: "0 - 50,000",
              }}
            />
            <ProgressBar
              value={10}
              header={{
                leftText: t("set_rolling"),
                rightText: t("slot_betting"),
              }}
              footer={{
                rightText: "0 - 50,000",
              }}
            />
            <ProgressBar
              value={100}
              header={{
                leftText: t("set_rolling"),
                rightText: t("holdem_betting"),
              }}
              footer={{
                rightText: "50,000 - 50,000",
              }}
            />
            <ProgressBar
              value={100}
              header={{
                leftText: t("set_rolling"),
                rightText: t("minigame_betting"),
              }}
              footer={{
                rightText: "50,000 - 50,000",
              }}
            />
          </div>
        </div>

        <div className="p-4 flex flex-col gap-4 bg-foreground/5 rounded-xl">
          <div className="flex flex-col text-sm gap-0.5">
            <p className="font-bold text-foreground/70">
              Deposit Money: <span className="text-foreground">10,000</span>
            </p>
            <p className="font-bold text-foreground/70">
              Creation Date:{" "}
              <span className="text-foreground">2024-02-10 10:12:51</span>
            </p>
            <p className="font-bold text-foreground/70">
              Withdrawable: <span className="text-foreground">595</span>
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <ProgressBar
              value={60}
              header={{
                leftText: "Set Rolling: 500%",
                rightText: "Sports Betting",
              }}
              footer={{
                rightText: "0 - 50,000",
              }}
            />
            <ProgressBar
              value={10}
              header={{
                leftText: "Set Rolling: 500%",
                rightText: "Casino Betting",
              }}
              footer={{
                rightText: "0 - 50,000",
              }}
            />
            <ProgressBar
              value={10}
              header={{
                leftText: "Set Rolling: 500%",
                rightText: "Slot Betting",
              }}
              footer={{
                rightText: "0 - 50,000",
              }}
            />
            <ProgressBar
              value={100}
              header={{
                leftText: "Set Rolling: 500%",
                rightText: "Hold'em Betting",
              }}
              footer={{
                rightText: "50,000 - 50,000",
              }}
            />
            <ProgressBar
              value={100}
              header={{
                leftText: "Set Rolling: 500%",
                rightText: "Minigame Betting",
              }}
              footer={{
                rightText: "50,000 - 50,000",
              }}
            />
          </div>
        </div>

        <div className="p-4 flex flex-col gap-4 bg-foreground/5 rounded-xl">
          <div className="flex flex-col text-sm gap-0.5">
            <p className="font-bold text-foreground/70">
              Deposit Money: <span className="text-foreground">10,000</span>
            </p>
            <p className="font-bold text-foreground/70">
              Creation Date:{" "}
              <span className="text-foreground">2024-02-10 10:12:51</span>
            </p>
            <p className="font-bold text-foreground/70">
              Withdrawable: <span className="text-foreground">595</span>
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <ProgressBar
              value={60}
              header={{
                leftText: "Set Rolling: 500%",
                rightText: "Sports Betting",
              }}
              footer={{
                rightText: "0 - 50,000",
              }}
            />
            <ProgressBar
              value={10}
              header={{
                leftText: "Set Rolling: 500%",
                rightText: "Casino Betting",
              }}
              footer={{
                rightText: "0 - 50,000",
              }}
            />
            <ProgressBar
              value={10}
              header={{
                leftText: "Set Rolling: 500%",
                rightText: "Slot Betting",
              }}
              footer={{
                rightText: "0 - 50,000",
              }}
            />
            <ProgressBar
              value={100}
              header={{
                leftText: "Set Rolling: 500%",
                rightText: "Hold'em Betting",
              }}
              footer={{
                rightText: "50,000 - 50,000",
              }}
            />
            <ProgressBar
              value={100}
              header={{
                leftText: "Set Rolling: 500%",
                rightText: "Minigame Betting",
              }}
              footer={{
                rightText: "50,000 - 50,000",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// that was fault you cant use async in client component
export default function WalletModal({
  isOpen,
  onClose,
  setParam,
  getParam,
}: Props) {
  const t = useTranslations("wallet_modal");
  const [activeTab, setActiveTab] = useState<WalletModalTab>(
    getParam("tab", "deposit"),
  );

  const [currencies, setCurrencies] = useState<any>([]);

  useEffect(() => {
    setActiveTab(getParam("tab", "deposit"));
  }, [getParam]);

  useEffect(() => {
    const getCurrencyList = async () => {
      const currencies = await GetCurrencyListAction();
      setCurrencies(currencies);
    };
    getCurrencyList();
  }, []);

  const onTabChange = (tab: WalletModalTab) => {
    setParam("tab", tab);
  };

  const getTitle = () => {
    switch (activeTab) {
      case "deposit":
        return t("manage_wallet_title");
      case "withdraw":
        return t("manage_wallet_title");
      default:
        return t("current_rolling_title");
    }
  };

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={onClose}
      hasPrevBtn={activeTab === "current-rolling"}
      onPrevBtn={() => onTabChange("withdraw")}
      ariaLabel={activeTab}
    >
      <div className="flex flex-col items-center gap-1">
        <div className="flex flex-col items-center gap-2">
          <Logo withTitle={false} className="w-[40px] h-[35px]" />
          <h6 className="text-xl font-semibold text-foreground">
            {getTitle()}
          </h6>
        </div>
      </div>

      {(activeTab === "deposit" || activeTab === "withdraw") && (
        <TabFilter
          value={activeTab}
          onValueChange={onTabChange}
          tabs={["deposit", "withdraw"]}
        />
      )}

      {activeTab === "deposit" ? (
        <DepositForm currencies={currencies} />
      ) : activeTab === "withdraw" ? (
        <WithdrawalForm currencies={currencies} />
      ) : (
        <CurrentRolling />
      )}
    </ModalLayout>
  );
}
