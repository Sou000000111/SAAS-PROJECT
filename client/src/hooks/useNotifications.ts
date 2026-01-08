import { useEffect, useState } from "react";
import { io } from "socket.io-client";

type Notification = {
  message: string;
};

const socket = io("http://localhost:5000");

export default function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    socket.on("notification", (data: Notification) => {
      setNotifications((prev) => [data, ...prev]);
    });

    return () => {
      socket.off("notification");
    };
  }, []);

  return notifications;
}
