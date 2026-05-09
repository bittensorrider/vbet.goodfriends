
import socket from "./socket";

export const initOnlineSocket = (userId: string) => {
  if (!socket.connected) socket.connect();

  socket.emit("join online", { memberId: userId });

  socket.on("disconnect", () => {
    console.log("🔌 Disconnected from online socket");
  });

  socket.on("connect", () => {
    console.log("✅ Connected to online socket:", socket.id);
  });
};

export const leaveOnlineSocket = () => {
  socket.emit("out online");
};
