import { useState } from "react";
import {
  NotificationContext
} from "./NotificationContext";
import type{ Message } from "./NotificationContext";

const initialMessages: Message[] = [
  {
    id: 1,
    sender: "Admin",
    title: "System maintenance tonight",
    time: "2h ago",
    unread: true,
  },
  {
    id: 2,
    sender: "Support",
    title: "New ticket assigned to you",
    time: "Yesterday",
    unread: false,
  },
];

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const unreadCount = messages.filter((m) => m.unread).length;

  const markAllAsRead = () => {
    setMessages((prev) =>
      prev.map((m) => ({ ...m, unread: false }))
    );
  };

  const markAsRead = (id: number) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, unread: false } : m
      )
    );
  };

  return (
    <NotificationContext.Provider
      value={{
        messages,
        unreadCount,
        markAllAsRead,
        markAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
