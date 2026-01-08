import { useContext } from "react";
import { NotificationContext } from "./NotificationContext";
import type { NotificationContextType } from "./NotificationContext";

export const useNotifications = (): NotificationContextType => {
  const ctx = useContext(NotificationContext);

  if (!ctx) {
    throw new Error(
      "useNotifications must be used inside NotificationProvider"
    );
  }

  return ctx;
};
