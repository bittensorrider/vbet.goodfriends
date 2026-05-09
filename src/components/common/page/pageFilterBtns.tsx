"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ProviderItem } from "@/types/provider.types";
import { useSearchParams } from "next/navigation";
import { HTMLAttributes, useEffect, useRef, useState } from "react";

type Props = {
  activeValue: ProviderItem["code"];
  data: ProviderItem[];
} & HTMLAttributes<HTMLDivElement>;

const ScrollOverlay = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "absolute top-0 w-12 h-full z-10 pointer-events-none",
        className
      )}
      {...props}
    ></div>
  );
};

export default function PageFilterBtns({
  activeValue,
  data,
  className,
  ...props
}: Props) {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftOverlay, setShowLeftOverlay] = useState(true);
  const [showRightOverlay, setShowRightOverlay] = useState(false);
  const searchParams = useSearchParams();

  const createProviderUrl = (providerCode: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("provider", providerCode);
    return `?${params.toString()}`;
  };

  useEffect(() => {
    const el = scrollRef.current;

    if (!el) return;

    const checkScroll = () => {
      const isAtStart = el.scrollLeft <= 1;
      const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;

      setShowLeftOverlay(!isAtStart);
      setShowRightOverlay(!isAtEnd);
    };

    checkScroll();

    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  return (
    <div className="group relative grid">
      {showLeftOverlay && (
        <ScrollOverlay
          className="left-0"
          style={{
            background: "linear-gradient(90deg, var(--background), #00000000)",
          }}
        />
      )}

      <div
        ref={scrollRef}
        className={cn(
          "flex items-center gap-1.5 pb-3 overflow-x-scroll group-hover:pb-1.5 custom-scrollbar hover-scroll",
          className
        )}
        style={{ scrollbarGutter: "stable" }}
        {...props}
      >
        {data.map((btn) => (
          <Button
            onMouseDown={()=> router.replace(createProviderUrl(btn.code))}
            key={btn.code}
            variant={btn.code === activeValue ? "primary" : "default"}
            className="text-[13px]"
          >
            {btn.name}
          </Button>
        ))}
      </div>

      {showRightOverlay && (
        <ScrollOverlay
          className="right-0"
          style={{
            background: "linear-gradient(280deg, var(--background), #00000000)",
          }}
        />
      )}
    </div>
  );
}
