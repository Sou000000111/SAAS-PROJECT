import { motion } from "framer-motion";
import { Bell, Trash2, CheckCircle } from "lucide-react";
import { useState } from "react";

type Message = {
  id: number;
  sender: string;
  title: string;
  time: string;
  unread: boolean;
};

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

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const markAsRead = (id: number) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, unread: false } : msg
      )
    );
  };

  const deleteMessage = (id: number) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  return (
    <div className="p-6 min-h-screen bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors space-y-6">

      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Messages</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            System alerts & internal notifications
          </p>
        </div>

        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
          <Bell className="h-5 w-5" />
          <span className="text-sm font-medium">
            {messages.filter((m) => m.unread).length} Unread
          </span>
        </div>
      </div>

      {/* ================= MESSAGE LIST ================= */}
      <div className="space-y-4">
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 text-slate-500 dark:text-slate-400"
          >
            <Bell className="mx-auto mb-3 h-10 w-10 opacity-50" />
            <p>No new messages</p>
          </motion.div>
        ) : (
          messages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`
                group flex items-center justify-between rounded-2xl p-5
                bg-white dark:bg-slate-800
                border shadow-sm hover:shadow-md transition
                ${
                  msg.unread
                    ? "border-indigo-300 dark:border-indigo-500"
                    : "border-slate-200 dark:border-slate-700"
                }
              `}
            >
              {/* LEFT */}
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold">
                  {msg.sender.charAt(0)}
                </div>

                {/* Text */}
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{msg.sender}</p>
                    {msg.unread && (
                      <span className="h-2 w-2 rounded-full bg-indigo-600" />
                    )}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {msg.title}
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  {msg.time}
                </span>

                {/* Actions */}
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                  {msg.unread && (
                    <button
                      onClick={() => markAsRead(msg.id)}
                      className="p-2 rounded-lg
                        text-indigo-600 dark:text-indigo-400
                        hover:bg-indigo-50 dark:hover:bg-indigo-900/40"
                      title="Mark as read"
                    >
                      <CheckCircle className="h-4 w-4" />
                    </button>
                  )}

                  <button
                    onClick={() => deleteMessage(msg.id)}
                    className="p-2 rounded-lg
                      text-red-500
                      hover:bg-red-50 dark:hover:bg-red-900/40"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
