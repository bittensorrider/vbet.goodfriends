"use client";

import { ModalControls } from "@/hooks/useModal";
import ModalLayout from "./modalLayout";
import IconBase from "../icon/iconBase";
import { ICONS } from "@/constants/icons";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import SlotCard from "../cards/game-cards/slotCard";
import { getGameList } from "@/helpers/games.helpers";
import { GameItem } from "@/types/game.types";
import { useTranslations } from "next-intl";

type Props = ModalControls<"search">;

export default function SearchModal({ isOpen, onClose }: Props) {
  const t = useTranslations('search_modal');
  const [games, setGames] = useState<GameItem[]>([]);
  const [searchVal, setSearchVal] = useState("");
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const currentPageRef = useRef(1);

  const fetchGames = async (search = "", page = 1) => {
    if (isLoading || (!hasNextPage && page !== 1)) return;

    setIsLoading(true);

    const { data, pagination } = await getGameList("", "", search, page, 35);

    setGames((prev) => (page === 1 ? data : [...prev, ...data]));

    if (pagination) {
      currentPageRef.current = pagination.currentPage;
      setHasNextPage(pagination.hasNextPage);
    }

    setIsLoading(false);
  };

  const onSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchVal(value);
    currentPageRef.current = 1;

    if (value.trim().length >= 1) {
      setHasNextPage(true);
      await fetchGames(value, 1);
    } else {
      setGames([]);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const onScroll = () => {
      if (isLoading || !hasNextPage) return;

      const threshold = 200;
      const isBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight <
        threshold;

      if (isBottom) {
        fetchGames(searchVal, currentPageRef.current + 1);
      }
    };

    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchVal, hasNextPage, isLoading]);

  const shouldShowLoaderFirstTime = isLoading && games.length === 0;
  const shouldShowBottomLoader = isLoading && games.length > 0;

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={() => {
        setSearchVal("");
        setGames([]);
        currentPageRef.current = 1;
        setHasNextPage(true);
        onClose();
      }}
      bg="transparent"
      size="lg"
      className="!p-0 !gap-2 !mb-auto mt-0 !px-4 md:!mt-[50px] !rounded-none"
      closeBtnClassname="!top-1 !right-5 !bg-transparent"
      ariaLabel={t('search_games')}
    >
      <div className="flex items-center bg-background dark:bg-[#1A202C] rounded-xl">
        <div className="flex-1 flex items-center h-full border border-foreground/10 rounded-xl px-3 gap-3 ">
          <IconBase icon={ICONS.SEARCH} className="size-4" />
          <input
            onChange={onSearch}
            value={searchVal}
            placeholder={t('search_placeholder')}
            className="h-10 rounded-r-xl text-sm outline-none pr-8 focus:border-foreground/20 flex-1"
          />
        </div>
      </div>

      <div className="flex bg-background dark:bg-[#1A202C] rounded-xl p-[10px] min-h-[200px]">
        {searchVal.trim().length === 0 ? (
          <div className="w-full flex flex-col h-full">
            <div className="flex w-full h-full items-center justify-center text-xs font-medium text-foreground/60">
              <p>{t('search_min_chars')}</p>
            </div>
          </div>
        ) : (
          <div
            ref={scrollRef}
            className="w-full max-h-[calc(100vh-300px)] overflow-auto custom-scrollbar pr-1"
          >
            {shouldShowLoaderFirstTime ? (
              <div className="flex items-center justify-center py-24">
                <IconBase
                  icon={ICONS.SPINNER}
                  className="size-6 animate-spin"
                />
              </div>
            ) : games.length > 0 ? (
              <>
                <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-3">
                  {games.map((item, index) => (
                    <SlotCard
                      key={index}
                      href={`/games/${item.type}/${item.game_code}`}
                      src={item.banner}
                      title={item.game_name}
                      style={{ aspectRatio: 100 / 100 }}
                    />
                  ))}
                </div>

                {shouldShowBottomLoader && (
                                  <div className="flex flex-col items-center gap-1 py-[18px] mt-4">
                  <IconBase
                    icon={ICONS.SPINNER}
                    className="size-6 animate-spin"
                  />
                  <span className="text-xs font-normal">{t('loading_more')}</span>
                </div>
                )}
              </>
            ) : (
              <div className="h-full flex items-center justify-center text-center  text-xs font-medium text-foreground/60">
                {t('no_games_found')}
              </div>
            )}
          </div>
        )}
      </div>
    </ModalLayout>
  );
}
