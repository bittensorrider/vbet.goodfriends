"use client";
import InfoCard from "@/components/cards/info/statInfoCard";
// import ProgressBar from "@/components/progress/ProgressBar";
import TabWrapper from "@/components/wrapper/tabWrapper";
import { userSelectors } from "@/store/user.store";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations('info_card');
  const user = userSelectors.use.user();
  return (
    user && (
      <>
        <TabWrapper
        // title="Statistic"
        // className="grid md:grid-cols-2 lg:grid-cols-2 gap-3 space-y-0"
        >
          <InfoCard
            title={t('amount_held')}
            description={user.wallets.balance.toString()}
          // className="h-[120px] md:h-[146px] justify-between"
          />

          {/* <InfoCard
            title={t('progress')}
            titleDesc={t('progress_desc')}
          >
            <ProgressBar
              value={(user.info.exp / user.info.needExp) * 100}
              header={{
                leftText: `${user.info.exp} Exp`,
                rightText: `${user.info.needExp} Exp`,
              }}
              footer={{
                rightText: `Level ${user.info.level} - Level ${
                  user.info.level + 1
                }`,
              }}
            />
          </InfoCard> */}

          {/* <InfoCard title={t('bonus')} className="h-[120px] md:h-[146px] justify-between">
          <div className="w-full">
            <div className="w-full flex items-center justify-between">
              <p className="text-danger text-sm">{t('locked')}</p>
              <h6 className="font-bold">10,000 {t('bonus_amount')}</h6>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-success text-sm">{t('unlocked')}</p>
              <h6 className="font-bold">0 {t('bonus_amount')}</h6>
            </div>
          </div>
        </InfoCard> */}

          {/* <InfoCard
          title={t('referrer')}
          titleDesc={t('referrer_desc')}
          className="md:col-span-2 lg:col-span-1 h-[120px] md:h-[146px] justify-between"
        >
          <Button
            variant={`success`}
            size={`sm`}
            className="md:w-max rounded-lg text-xs h-[30px] min-h-auto"
          >
            {t('register_referrer')}
          </Button>
        </InfoCard> */}

          {/* <div className="md:col-span-2 lg:col-span-3 grid lg:grid-cols-2 gap-3">
          <InfoCard
            title={t('level_up_event')}
            className="h-[120px] md:h-[146px] justify-between"
          >
            <div>
              <div className="h-11 flex items-center justify-between">
                <p className="text-sm font-normal leading-[130%]">
                  {t('next_level_reward')}
                </p>
                <h6 className="text-lg font-bold">{t('bonus_amount')}</h6>
              </div>
              <Button
                variant={`success`}
                size={`sm`}
                className="w-full md:w-max rounded-lg text-xs h-[30px] min-h-auto"
              >
                {t('go_to_casino')}
              </Button>
            </div>
          </InfoCard>
        </div> */}
        </TabWrapper>

        {/* <TabWrapper
        startContent={
          <IconBase icon={ICONS.ADD_CIRCLE} className="size-5 text-success" />
        }
        title={t('balance')}
      >
        <PageSearch placeholder={t('search_by_currency')} />
        <div className="rounded-xl overflow-hidden bg-foreground/5">
          {Array.from({ length: 5 }).map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 hover:bg-foreground/5 transition-all"
            >
              <div className="flex items-center gap-2">
                <Image
                  src={`/imgs/coins/btc.svg`}
                  alt="bitcoin"
                  width={24}
                  height={24}
                  className="size-6"
                />
                <div className="flex flex-col">
                  <h6 className="text-sm font-medium">BTC</h6>
                  <p className="text-sm font-normal text-success">0.00$</p>
                </div>
              </div>
              <div className="flex items-center">
                <Button size={`sm`} className="bg-transparent text-foreground border-transparent rounded-xl">
                  {t('withdraw')}
                </Button>
                <Button size={`sm`} className="rounded-xl" variant={`success`}>{t('deposit')}</Button>
              </div>
            </div>
          ))}
        </div>
      </TabWrapper> */}
      </>
    )
  );
}
