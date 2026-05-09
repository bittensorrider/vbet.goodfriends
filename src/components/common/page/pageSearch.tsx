"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { InputHTMLAttributes, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";

type Props = {
  queryKey: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function PageSearch({ className, queryKey, ...props }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get(queryKey) || "");

  useEffect(() => {
    if (searchParams && !searchParams.get(queryKey)) {
      setValue("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
    const params = new URLSearchParams(searchParams.toString());

    if (!value.trim()) {
      params.delete(queryKey);
    } else {
      params.set(queryKey, encodeURIComponent(value));
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <Input
      type="search"
      placeholder={props.placeholder || "Search..."}
      className={cn("bg-foreground/5", className)}
      value={value}
      onChange={handleChange}
      {...props}
    />
  );
}
