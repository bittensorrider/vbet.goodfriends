"use client";
import IconBase from "@/components/icon/iconBase";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ICONS } from "@/constants/icons";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function TwoFactorForm() {
  const [copied, setCopied] = useState(false);

  const form = useForm({
    defaultValues: {
      auth_app_code: "NMVGIYLOK5OX24RSMY4T6PROGJASQKBTMMSUWYTGOMSCM3Z6FZWA",
      two_fa_code: "",
    },
  });

  const onSubmit = () => {};

  const copyOnClipboard = async (textToCopy: string) => {
    if (copied) {
      return;
    }

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      alert("Cant copy");
      console.error("Failed to copy:", err);
    }
  };

  return (
    <>
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-4">
            <FormField
              control={form.control}
              name="auth_app_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Copy this code to your authenticator app
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0.000000"
                      {...field}
                      render={
                        <Button
                          type="button"
                          variant={`success`}
                          size={`icon_sm`}
                          className="right-1 text-black rounded-lg bg-[#00FF86] !absolute top-1 cursor-pointer"
                          onClick={() =>
                            copyOnClipboard(form.getValues("auth_app_code"))
                          }
                        >
                          {copied ? (
                            <IconBase
                              icon={ICONS.CHECKMARK}
                              className="size-4"
                            />
                          ) : (
                            <IconBase icon={ICONS.COPY} className="size-4" />
                          )}
                        </Button>
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <span className="text-danger/80 text-sm font-normal">
              Don’t let anyone see this
            </span>

            <div className="">
              <Image
                src={`/imgs/qr.jpg`}
                className="m-auto md:m-0 w-[154px] rounded-xl invert-100 border"
                width={75}
                height={75}
                alt="QR Code for GoodFriends"
              />
            </div>

            <FormField
              control={form.control}
              name="two_fa_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Two Factor Code</FormLabel>
                  <FormControl>
                    <Input
                      className="!bg-foreground/5"
                      placeholder="Enter two factor code"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant={`primary`} className="w-full md:w-max md:ml-auto">
              <Image
                src={"/imgs/social-platform-logos/google.svg"}
                className="w-[16px]"
                width={32}
                height={32}
                alt="Verify with Google"
              />
              Re-verify with Google
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
