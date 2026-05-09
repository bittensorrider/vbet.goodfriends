"use client";

import { useEffect, useRef } from "react";
import { User } from "@/types/user.types";
import { userSelectors } from "@/store/user.store";
import { GetSessionType } from "@/lib/getSession";
import { revalidatePathAction } from "@/actions/revalidatePath.action";
import { LoginSuccessAction, RefreshAction } from "@/actions/auth.actions";
import { initOnlineSocket } from "@/lib/socket/online";
import { v4 as uuidv4 } from "uuid";
import socket from "@/lib/socket/socket";

export default function HydrateUser({ session }: { session: GetSessionType }) {
  const setUser = userSelectors.use.setUser();
  const user = userSelectors.use.user();
  const updateUser = userSelectors.use.updateUser();
  const prevUserIdRef = useRef<string | null>(null);

  useEffect(() => {
    const hydrate = async () => {
      if (session.needRefresh) {
        try {
          await RefreshAction();

          const res_success = await LoginSuccessAction();

          if (!res_success.success) {
            console.log("❌ Cannot refresh, logging out...");
            setUser(null);
          } else {
            const user = res_success.data as User;
            setUser(user);
            revalidatePathAction("game-launch");
          }
        } catch (err) {
          console.error("Refresh error", err);
          setUser(null);
        }
      } else if (session.user) {
        setUser(session.user);
        console.log("✅ Access valid");
      } else {
        // 🚫 Don't join guest here yet — wait for user state first
        setUser(null);
      }
    };

    hydrate();
  }, [session, setUser]);

  useEffect(() => {
    const currentUserId = user?._id ?? null;
    const prevUserId = prevUserIdRef.current;

    // 🔓 User just logged in
    if (currentUserId && prevUserId !== currentUserId) {
      console.log("🔗 Joining as logged-in user...", currentUserId);
      initOnlineSocket(currentUserId);

      const onBalanceUpdate = (data: { balance: number }) => {
        updateUser({
          wallets: {
            balance: data.balance,
          },
        });
        console.log("💰 Balance updated:", data.balance);
      };

      socket.on("user.balance.update", onBalanceUpdate);

      // 🔁 Update ref to current user ID
      prevUserIdRef.current = currentUserId;

      return () => {
        socket.off("user.balance.update", onBalanceUpdate);
      };
    }

    // ❌ User just logged out
    if (
      !currentUserId &&
      prevUserId !== null &&
      session.user === null &&
      session.needRefresh === false
    ) {
      let guestId = localStorage.getItem("guestId");
      if (!guestId) {
        guestId = uuidv4();
        localStorage.setItem("guestId", guestId);
      }

      console.log("👤 Joining as guest...");
      socket.connect();
      socket.emit("join guest", { guestId });

      prevUserIdRef.current = null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id, session.user, session.needRefresh]);
  return null;
}
