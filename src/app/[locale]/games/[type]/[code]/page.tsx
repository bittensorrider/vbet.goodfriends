import PageBreadcrumb from "@/components/common/breadCrumb";
import GameDetails from "@/components/game-details/GameDetails";
import { getGameLaunch } from "@/helpers/games.helpers";
import { getSession } from "@/lib/getSession";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{
    type: string;
    code: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { type, code } = await params;
  const user = await getSession();
  let launchData = { url: null, name: null };
  if (user.user) {
    const res = await getGameLaunch(code);
    if (res.success) launchData = res.data
  }

  // Translation (SSR)
  const tCommon = await getTranslations('common');
  const tTab = await getTranslations('tab_filter');

  return (
    <>
      <div className="space-y-2">
        <PageBreadcrumb
          data={[
            {
              to: "/",
              label: tCommon('home'),
            },
            {
              to: `/games?type=${type}&page=1`,
              label: type == "live" ? tTab('live') : tTab('slot'),
            },
            {
              label: launchData.name ?? code,
            },
          ]}
        />
        <GameDetails iframeUrl={launchData.url} />
      </div>

      {/* <GamesSliderSection /> */}
    </>
  );
}
