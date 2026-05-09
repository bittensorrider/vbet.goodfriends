import IconBase from "@/components/icon/iconBase";
import { ICONS } from "@/constants/icons";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { HTMLAttributes } from "react";

type Props = {
  href: string;
  src: string;
  priority?: boolean;
  title: string;
} & HTMLAttributes<HTMLDivElement>;

export default function Card({
  href,
  src,
  title,
  priority = false,
  ...props
}: Props) {
  return (
    <Link href={href} className="w-full flex flex-col">
      <div
        className="group relative w-full rounded-t-2xl overflow-hidden"
        style={{ aspectRatio: props.style?.aspectRatio ? props.style.aspectRatio : 150 / 185 }}
      >
        <Image
          src={src}
          alt={title}
          width={150}
          height={185}
          priority={priority}
          className="relative z-10 w-full h-full object-cover group-hover:scale-105 duration-400 transition-all"
        />

        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <IconBase icon={ICONS.SPINNER} className="animate-spin" />
        </div>

        <div className="absolute top-0 left-0 w-full h-full bg-black/0 group-hover:bg-black/70 duration-400 grid place-content-center transition-all">
          <div className="size-11 grid place-content-center bg-primary/50 rounded-full group-hover:scale-100 scale-0 transition-all">
            <IconBase icon={ICONS.PLAY} className="size-6 text-white" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2.5 p-2 bg-foreground/5">
        <h6 className="truncate text-xs font-medium">{title}</h6>
        {/* <button>
          <IconBase icon={ICONS.HEART} className="size-4.5 text-foreground/60" />
        </button> */}
      </div>
    </Link>
  );
}
