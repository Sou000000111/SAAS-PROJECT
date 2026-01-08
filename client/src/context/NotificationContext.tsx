import { createContext, useContext } from "react";

export type Message = {
  id: number;
  sender: string;
  title: string;
  time: string;
  unread: boolean;
};

export type NotificationContextType = {
  messages: Message[];
  unreadCount: number;
  markAllAsRead: () => void;
  markAsRead: (id: number) => void;
};

export const NotificationContext =
  createContext<NotificationContextType | null>(null);

export const useNotifications = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error("useNotifications must be used inside NotificationProvider");
  }
  return ctx;
};
