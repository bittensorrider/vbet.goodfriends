import StatInfoCard from "@/components/cards/info/statInfoCard";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { Wheel } from "react-custom-roulette";
import { useTranslations } from "next-intl";

export default function LuckyWheel() {
  const t = useTranslations("info_card");
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(1);
  const [spinEnded, setSpinEnded] = useState(false);
  const [canSpin, setCanSpin] = useState(true);

  console.log(spinEnded);
  console.log(setPrizeNumber);
  console.log(setCanSpin);

  const handleSpinClick = async () => {
    if (mustSpin) {
      return;
    }

    setMustSpin(true);
  };

  //   const prize = {
  //     id: 12,
  //     name: "70 DOGE",
  //     description: "Gift 12",
  //     wheel_type_id: 1,
  //     bonus_type_id: 1,
  //     amount: "70.000000000000000000",
  //     currency_id: 9,
  //     file_uuid: null,
  //   };

  return (
    <div className="flex flex-col gap-6 w-full overflow-hidden">
      <div className="relative  m-auto flex items-center justify-center w-[90vw] max-w-[412px] max-h-[412px] h-[90vw] rounded-full">
        <Image
          src={`/imgs/wheels/wheel-new.svg`}
          className="!w-[100%] !h-[100%] !left-1/2 !top-1/2 -translate-y-1/2 -translate-x-1/2 z-[9]"
          alt="Wheel New"
          fill
          priority={true}
        />

        <div
          className="relative w-[76%] max-w-[404px] h-[76%] max-h-[404px] m-auto z-[9]"
          style={{ transform: `rotate(-45deg)` }}
        >
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            onStopSpinning={() => {
              setMustSpin(false);
              setSpinEnded(true);
            }}
            backgroundColors={["#ffffff", "#9a1d38"]}
            textColors={["#000000", "#ffffff"]}
            data={[
              {
                option: "asd",
              },
              {
                option: "asd",
              },
              {
                option: "asd",
              },
              {
                option: "asd",
              },
              {
                option: "asd",
              },
              {
                option: "asd",
              },
              {
                option: "asd",
              },
              {
                option: "asd",
              },
            ]}
            outerBorderWidth={0}
            innerRadius={16}
            radiusLineColor="red"
            pointerProps={{
              src: "http://localhost:3000" + "/imgs/wheels/arrow.svg",
              style: {
                width: "13%",
                top: "14.8%",
                right: "14%",
                transform: "rotate(45deg)",
              },
            }}
            radiusLineWidth={0}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <StatInfoCard
          title={t("total_spin_bonus")}
          description={`${t("point_label")} 10,000`}
        />
        <StatInfoCard title={t("spins_remaining")} description="0" />
      </div>

      {canSpin ? (
        <Button
          onClick={handleSpinClick}
          className="w-full rounded-xl"
          variant={"primary"}
          size={"default"}
        >
          {t("spin_now")}
        </Button>
      ) : null}
    </div>
  );
}
