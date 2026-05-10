import Image from "next/image";
import Marquee from "react-fast-marquee";
export default function ProvidersMarque() {
  return (
    <Marquee
      speed={50}
      gradient={false}
      className="h-[66px] rounded-2xl bg-foreground/5 border border-foreground/5"
    >
      <div className="flex items-center gap-[34px]">
        <Image
          src={`/imgs/provider-footer/footer-image-10.svg`}
          className="w-full max-w-[100px] object-contain"
          width={100}
          alt="Provider - OG"
          height={60}
        />
        <Image
          src={`/imgs/provider-footer/footer-image-1.svg`}
          className="w-full max-w-[100px] object-contain"
          width={100}
          height={60}
          alt="Provider - Asia Gaming"
        />
        <Image
          src={`/imgs/provider-footer/footer-image-5.svg`}
          className="w-full max-w-[100px] object-contain"
          width={100}
          height={60}
          alt="Provider - BigGaming"
        />
        <Image
          src={`/imgs/provider-footer/footer-image-11.svg`}
          className="w-full max-w-[100px] object-contain"
          width={100}
          height={60}
          alt="Provider - AllBet"
        />
        <Image
          src={`/imgs/provider-footer/footer-image-2.svg`}
          className="w-full max-w-[100px] object-contain"
          width={100}
          height={60}
          alt="Provider - Microgaming"
        />
        <Image
          src={`/imgs/provider-footer/footer-image-12.svg`}
          className="w-full max-w-[100px] object-contain"
          width={100}
          height={60}
          alt="Provider - DreamGaming"
        />
        <Image
          src={`/imgs/provider-footer/footer-image-7.svg`}
          className="w-full max-w-[100px] object-contain"
          width={100}
          height={60}
          alt="Provider - betrader"
        />
        <Image
          src={`/imgs/provider-footer/footer-image-3.svg`}
          className="w-full max-w-[100px] object-contain"
          width={100}
          height={60}
          alt="Provider - Pragmatic Play"
        />
        <Image
          src={`/imgs/provider-footer/footer-image-18.svg`}
          className="w-full max-w-[100px] object-contain"
          width={100}
          height={60}
          alt="Provider - Habanero"
        />
        <Image
          src={`/imgs/provider-footer/footer-image-8.svg`}
          className="w-full max-w-[100px] object-contain"
          width={100}
          height={60}
          alt="Provider - Ameba"
        />
        <Image
          src={`/imgs/provider-footer/footer-image-4.svg`}
          className="w-full max-w-[100px] object-contain"
          width={100}
          height={60}
          alt="Provider - Pocket Games Soft"
        />
        <Image
          src={`/imgs/provider-footer/footer-image-9.svg`}
          className="w-full max-w-[100px] object-contain"
          width={100}
          height={60}
          alt="Provider - WM"
        />
      </div>
    </Marquee>
  );
}
