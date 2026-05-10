import Image from "next/image";
import { Link } from "@/i18n/navigation";

type Props = {
  href: string;
  src: string;
  alt: string;
};
export default function SlotCard({ href, src, alt }: Props) {
  return (
    <Link
      href={href}
      className="relative rounded-xl overflow-hidden bg-red-500"
      style={{ aspectRatio: 163 / 190 }}
    >
      <Image
        src={src}
        className="h-full object-cover object-center"
        width={163}
        height={190}
        alt={alt}
      />
    </Link>
  );
}
