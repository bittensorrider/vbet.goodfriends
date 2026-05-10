"use client";
import { ModalControls } from "@/hooks/useModal";
import ModalLayout from "../modalLayout";
import Image from "next/image";
import { PromotionInfo } from "@/components/cards/promotion/PromotionCard";
import { useEffect, useState } from "react";
import fetcher from "@/lib/fetcher";
import { API_ROUTES } from "@/constants/routes";
import { PromotionItem } from "@/types/promotion.types";
import ContentLoader from "@/components/loader/contentLoder";
import { format } from "date-fns";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type Props = ModalControls<"promotion">;

export default function PromotionModal({
  isOpen,
  closeWithParams,
  getParam,
}: Props) {
  const t = useTranslations("promotion_modal");
  const [promotionData, setPromotionData] = useState<PromotionItem | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(true);
  const handleClose = () => {
    closeWithParams(["promotionId"]);
  };

  useEffect(() => {
    const getPromotion = async () => {
      const res = await fetcher<PromotionItem>(
        `${API_ROUTES.SITE.PROMOTIONS.LIST}/${getParam("promotionId", "")}`,
      );
      setLoading(false);
      if (!res.success) {
        setPromotionData(null);
      } else {
        setPromotionData(res.data);
      }
    };
    getPromotion();
  }, [getParam]);

  return (
    <ModalLayout
      isOpen={isOpen}
      onClose={handleClose}
      ariaLabel={t("promotion_title")}
      closeBtnClassname="bg-black/60 rounded-full"
      className="!max-w-[596px] p-4"
    >
      {loading ? (
        <ContentLoader className="h-[400px]" />
      ) : (
        promotionData && (
          <div className="space-y-4">
            <div className="space-y-2">
              <div>
                <Image
                  src={promotionData.thumbnail}
                  className="w-full object-cover rounded-3xl"
                  width={586}
                  height={253}
                  alt={promotionData.title}
                  style={{ aspectRatio: 586 / 253 }}
                />
                <PromotionInfo
                  title={promotionData.title}
                  endDate={format(
                    new Date(promotionData.endDate),
                    "'Ends' M/d/yyyy, h:mm:ss a",
                  )}
                  status={promotionData.isUse ? "In Progress" : "Ended"}
                />
              </div>
              {promotionData.button && (
                <Link
                  href={promotionData.button.link}
                  className="flex items-center justify-center  w-full bg-primary text-white rounded-xl h-10 font-semibold text-sm active:scale-95 transition-all"
                >
                  {promotionData.button.name}
                </Link>
              )}
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: promotionData.content }}
              className="flex flex-col gap-4 text-[13px] px-1.5"
            ></div>
          </div>
        )
      )}
    </ModalLayout>
  );
}
