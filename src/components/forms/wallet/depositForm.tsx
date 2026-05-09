"use client";
import { QRCodeSVG } from "qrcode.react";
import { GetWalletAddressAction } from "@/actions/wallet.actions";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICONS } from "@/constants/icons";
import { useSelect } from "@/hooks/useSelect";
import { copyOnClipboard } from "@/utils/clipboard.utils";
import {
  depositCryptoSchema,
  DepositCryptoSchema,
} from "@/validations/wallet.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState, useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

type Props = {
  currencies: any[];
};

export default function DepositForm({ currencies }: Props) {
  const t = useTranslations('wallet_forms');
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);
  const [address, setAddress] = useState("");
  const [networks, setNetworks] = useState<any[]>([]);
  const [selectedNetwork, setSelectedNetwork] = useState<any>(null);
  const hasInitialized = useRef(false);

  const currencySelect = useSelect();
  const networkSelect = useSelect();

  const form = useForm<DepositCryptoSchema>({
    resolver: zodResolver(depositCryptoSchema),
    defaultValues: {
      currency: "USDT",
      network: "",
    },
  });

  const onNetworkChange = async (selectedNetwork: string) => {
    const selectedCurrency = form.getValues("currency");
    if (selectedNetwork && selectedNetwork != "") {
      setSelectedNetwork(
        networks.find((item: any) => item.network == selectedNetwork)
      );
    }
    if (!selectedCurrency || !selectedNetwork) return;

    setLoading(true);
    const wallet = await GetWalletAddressAction(
      selectedCurrency,
      selectedNetwork
    );
    setAddress(wallet ?? "");
    setLoading(false);
  };

  const onCurrencyChange = useCallback(
    (selectedCurrency: string) => {
      const currencyData = currencies.find(
        (c) => c.symbol === selectedCurrency
      );
      form.setValue("currency", selectedCurrency);

      const availableNetworks = currencyData?.network
        ? [{ ...currencyData }]
        : currencyData?.networkList || [];

      setNetworks(availableNetworks);

      let defaultNetwork = "";

      if (currencyData?.network) {
        defaultNetwork = currencyData.network;
      } else if (
        currencyData?.networkList &&
        currencyData.networkList.length === 1
      ) {
        defaultNetwork = currencyData.networkList[0].network;
      }

      form.setValue("network", defaultNetwork);
      if (defaultNetwork) {
        onNetworkChange(defaultNetwork);
        setSelectedNetwork(
          availableNetworks.find((item: any) => item.network == defaultNetwork)
        );
      } else {
        setAddress(""); // reset if no network
        setSelectedNetwork(null);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currencies]
  );

  useEffect(() => {
    if (!hasInitialized.current && currencies.length > 0) {
      onCurrencyChange("USDT");
      hasInitialized.current = true;
    }
  }, [currencies, onCurrencyChange]);

  return (
    <Form {...form}>
      <form className="space-y-6">
        <div className="flex flex-col space-y-4">
          {/* Currency Field */}
          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('currency')}</FormLabel>
                <Select
                  {...currencySelect}
                  value={field.value}
                  onValueChange={(value: string) => {
                    field.onChange(value);
                    onCurrencyChange(value);
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('select_currency')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-w-full">
                    {currencies.map((currency: any, index: number) => (
                      <SelectItem
                        key={index}
                        value={currency.symbol}
                        className="flex items-center gap-2"
                      >
                        <Image
                          src={`/imgs/coins/${currency.symbol}.svg`}
                          alt={currency.symbol}
                          width={20}
                          height={20}
                          className="w-5 h-5 rounded-full"
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

          {/* Network Field */}
          <FormField
            control={form.control}
            name="network"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('network')}</FormLabel>
                <Select
                  {...networkSelect}
                  value={field.value}
                  onValueChange={(value: string) => {
                    if (value !== "") {
                      field.onChange(value);
                    }

                    onNetworkChange(value);
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t('select_network')} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-w-full">
                    {networks.map((network: any, index: number) => (
                      <SelectItem
                        key={index}
                        value={network.network}
                        className="flex items-center gap-2"
                      >
                        {network.network}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address Display */}
          {form.getValues("network") && (
            <div className="grid grid-cols-[auto_1fr] items-start gap-3">
              {loading ? (
                <div className="w-[110px] h-[110px] bg-foreground/5 grid place-content-center rounded-2xl border border-foreground/5">
                  <IconBase
                    icon={ICONS.SPINNER}
                    className="animate-spin opacity-50"
                  />
                </div>
              ) : (
                <QRCodeSVG
                  value={address}
                  className="rounded-xl max-w-[110px] border border-foreground/10 p-0.5"
                  width={110}
                  height={110}
                />
              )}

              <div className="flex break-all items-start h-full pr-16 bg-foreground/5 border border-foreground/5 rounded-xl p-3 text-wrap relative text-[13px]">
                {!loading && address}
                {loading && (
                  <IconBase
                    icon={ICONS.SPINNER}
                    className="animate-spin opacity-50 m-auto mr-16"
                  />
                )}
                <Button
                  type="button"
                  variant="success"
                  size="icon_sm"
                  className="right-1 text-black rounded-lg bg-[#00FF86] !absolute top-1 cursor-pointer"
                  onClick={() => copyOnClipboard(address, setCopied)}
                >
                  {copied ? (
                    <IconBase icon={ICONS.CHECKMARK} className="size-4" />
                  ) : (
                    <IconBase icon={ICONS.COPY} className="size-4" />
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* <Button className="w-full rounded-xl" variant="primary" size="sm">
          {t('deposit_now')}
        </Button> */}

        {selectedNetwork && (
          <div className="w-full flex flex-col gap-2 bg-foreground/5 p-3 rounded-xl">
            <div className="flex items-center justify-between w-full text-[13px]">
              <span className="text-foreground/60">{t('minimum_deposit')}</span>
              <div className="flex items-center gap-1">
                {selectedNetwork?.depositMin}
                <Image
                  src={`/imgs/coins/${form.getValues('currency')}.svg`}
                  alt={form.getValues('currency')}
                  width={20}
                  height={20}
                  className="w-5 h-5 rounded-full"
                  priority={true}
                />
              </div>
            </div>
            <div className="flex items-center justify-between w-full text-[13px]">
              <span className="text-foreground/60">{t('credited')}</span>
              <div className="flex items-center gap-1">
                {selectedNetwork?.minConfirm} {t('confirmation')}
              </div>
            </div>
          </div>
        )}
      </form>
    </Form>
  );
}
