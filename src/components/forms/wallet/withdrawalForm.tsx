import { WithdrawalAction } from "@/actions/wallet.actions";
import IconBase from "@/components/icon/iconBase";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toastDanger } from "@/components/ui/sonner";
import { ICONS } from "@/constants/icons";
import { useSelect } from "@/hooks/useSelect";
import { calcDecimals } from "@/lib/utils";
import { userSelectors } from "@/store/user.store";
import { copyOnClipboard } from "@/utils/clipboard.utils";
import {
  withdrawalCryptoSchema,
  WithdrawalCryptoSchema,
  // withdrawalFiatSchema,
  // WithdrawalFiatSchema,
} from "@/validations/wallet.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

type Props = {
  currencies: any;
};

export default function WithdrawalForm({ currencies }: Props) {
  const t = useTranslations("wallet_forms");
  const [copied, setCopied] = useState(false);
  const currencySelect = useSelect();
  const networkSelect = useSelect();
  const [networks, setNetworks] = useState<any>([]);
  const hasInitialized = useRef(false);
  const user = userSelectors.use.user();
  const [selectedNetwork, setSelectedNetwork] = useState<any>(null);

  const form = useForm<WithdrawalCryptoSchema>({
    resolver: zodResolver(withdrawalCryptoSchema),
    defaultValues: {
      network: "",
      currency: "USDT",
      amount: "",
    },
  });

  const onSubmit = async (values: WithdrawalCryptoSchema) => {
    const result = await WithdrawalAction({
      currency: values.currency,
      network: values.network,
      amount: parseFloat(values.amount) ?? 0,
      toAddress: values.address,
    });

    if (!result.success) return toastDanger(result.message);
    toastDanger(result.message ?? "Success");
  };

  const onCurrencyChange = useCallback(
    (selectedCurrency: string) => {
      const currencyData = currencies.find(
        (c: any) => c.symbol === selectedCurrency,
      );
      form.setValue("currency", selectedCurrency);

      const availableNetworks = currencyData?.network
        ? [{ network: currencyData.network }]
        : currencyData?.networkList || [];

      setNetworks(availableNetworks);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currencies],
  );

  useEffect(() => {
    if (!hasInitialized.current && currencies.length > 0) {
      onCurrencyChange("USDT");
      hasInitialized.current = true;
    }
  }, [currencies, onCurrencyChange]);

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-4">
          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("currency")}</FormLabel>
                <Select
                  {...currencySelect}
                  onValueChange={(value: any) => {
                    onCurrencyChange(value);
                    field.onChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="relative">
                      <SelectValue placeholder={t("select_currency")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-w-full">
                    {currencies
                      .filter((currency: any) => currency.symbol == "USDT")
                      .map((currency: any, index: any) => (
                        <SelectItem
                          value={currency.symbol}
                          className="flex items-center gap-[6px]"
                          key={index}
                        >
                          <Image
                            src={`/imgs/coins/${currency.symbol}.svg`}
                            className="w-5 h-5 rounded-full"
                            width={20}
                            height={20}
                            alt={currency.symbol}
                            priority={true}
                          />
                          <span>{currency.symbol}</span>
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="network"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("network")}</FormLabel>
                <Select
                  {...networkSelect}
                  onValueChange={(value: string) => {
                    if (value !== "") {
                      field.onChange(value);
                      setSelectedNetwork(
                        networks.find((item: any) => item.network == value),
                      );
                    }
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t("select_network")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-w-full">
                    {networks.map((network: any, index: any) => (
                      <SelectItem
                        value={network.network}
                        className="flex items-center gap-[6px]"
                        key={index}
                      >
                        <span>{network.network}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("address")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("amount_placeholder")}
                    {...field}
                    render={
                      <Button
                        type="button"
                        variant={`success`}
                        size={`icon_sm`}
                        className="right-1 text-black rounded-lg bg-[#00FF86] !absolute top-1 cursor-pointer"
                        onClick={() =>
                          copyOnClipboard(form.getValues("address"), setCopied)
                        }
                      >
                        {copied ? (
                          <IconBase icon={ICONS.CHECKMARK} className="size-4" />
                        ) : (
                          <IconBase icon={ICONS.COPY} className="size-4" />
                        )}
                      </Button>
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("amount")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("amount_placeholder")}
                    {...field}
                    render={
                      <Button
                        type="button"
                        variant="primary"
                        size={"sm"}
                        className="rounded-lg text-xs !absolute right-1 top-1/2 -translate-y-1/2 !h-[20px] !min-h-[32px]"
                        onClick={() => {
                          if (!selectedNetwork) return;
                          const balance = user?.wallets.balance ?? 0;
                          if (
                            balance >=
                            selectedNetwork.withdrawMin +
                              selectedNetwork.withdrawFee
                          )
                            form.setValue(
                              "amount",
                              calcDecimals(
                                balance,
                                selectedNetwork.withdrawFee,
                                "-",
                              ).toString() ?? "",
                            );
                        }}
                      >
                        {t("max")}
                      </Button>
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button className="w-full rounded-xl" variant={"primary"} size={"sm"}>
          {t("withdrawal")}
        </Button>

        {selectedNetwork && (
          <div className="w-full flex flex-col gap-2 bg-foreground/5 p-3 rounded-xl">
            <div className="flex items-center justify-between w-full text-[13px]">
              <span className="text-foreground/60">
                {t("minimum_withdrawal")}
              </span>
              <div className="flex items-center gap-1">
                {selectedNetwork?.withdrawMin}
                <Image
                  src={`/imgs/coins/${form.getValues("currency")}.svg`}
                  className="w-5 h-5 rounded-full"
                  width={20}
                  height={20}
                  alt={form.getValues("currency")}
                  priority={true}
                />
              </div>
            </div>
            <div className="flex items-center justify-between w-full text-[13px]">
              <span className="text-foreground/60">{t("transaction_fee")}</span>
              <div className="flex items-center gap-1">
                {selectedNetwork?.withdrawFee}
                <Image
                  src={`/imgs/coins/${form.getValues("currency")}.svg`}
                  className="w-5 h-5 rounded-full"
                  width={20}
                  height={20}
                  alt={form.getValues("currency")}
                  priority={true}
                />
              </div>
            </div>
          </div>
        )}
      </form>
    </Form>
  );
}
