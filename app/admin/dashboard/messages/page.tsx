"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ContactMessage } from "@/types";
import { Mail, MailOpen, Trash2, Calendar, User } from "lucide-react";

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "read" | "unread">("all");

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleRead = async (message: ContactMessage) => {
    try {
      const { error } = await supabase
        .from("contact_messages")
        .update({ read: !message.read })
        .eq("id", message.id);

      if (error) throw error;

      setMessages(
        messages.map((m) => (m.id === message.id ? { ...m, read: !m.read } : m))
      );
    } catch (error) {
      console.error("Error updating message:", error);
      alert("Failed to update message");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    setDeleting(id);
    try {
      const { error } = await supabase
        .from("contact_messages")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setMessages(messages.filter((message) => message.id !== id));
    } catch (error) {
      console.error("Error deleting message:", error);
      alert("Failed to delete message");
    } finally {
      setDeleting(null);
    }
  };

  const markAllAsRead = async () => {
    try {
      const unreadIds = messages.filter((m) => !m.read).map((m) => m.id);

      if (unreadIds.length === 0) {
        alert("All messages are already read");
        return;
      }

      const { error } = await supabase
        .from("contact_messages")
        .update({ read: true })
        .in("id", unreadIds);

      if (error) throw error;

      setMessages(messages.map((m) => ({ ...m, read: true })));
    } catch (error) {
      console.error("Error marking all as read:", error);
      alert("Failed to mark all as read");
    }
  };

  const filteredMessages = messages.filter((message) => {
    if (filter === "read") return message.read;
    if (filter === "unread") return !message.read;
    return true;
  });

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text mb-2">
            Contact Messages
            {unreadCount > 0 && (
              <span className="ml-3 px-3 py-1 bg-primary text-white text-sm rounded-full">
                {unreadCount} new
              </span>
            )}
          </h1>
          <p className="text-text-secondary">
            View and manage contact form submissions
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="inline-flex items-center gap-2 bg-bg-light hover:bg-bg-lighter text-text font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            <MailOpen size={20} />
            Mark All as Read
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {(["all", "unread", "read"] as const).map((filterOption) => (
          <button
            key={filterOption}
            onClick={() => setFilter(filterOption)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === filterOption
                ? "bg-primary text-white"
                : "bg-bg-light text-text-secondary hover:bg-bg-lighter"
            }`}
          >
            {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
            {filterOption === "unread" && unreadCount > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-bg-light rounded-xl p-6 h-32 animate-pulse"
            />
          ))}
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="text-center py-12 bg-bg-light rounded-xl">
          <Mail className="mx-auto mb-4 text-text-secondary" size={48} />
          <p className="text-text-secondary">
            {filter === "all" ? "No messages yet" : `No ${filter} messages`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMessages.map((message) => (
            <div
              key={message.id}
              className={`rounded-xl p-6 transition-all duration-200 ${
                message.read
                  ? "bg-bg-light hover:bg-bg-lighter"
                  : "bg-bg-light border-2 border-primary/20 hover:border-primary/40"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`p-2 rounded-lg ${
                        message.read
                          ? "bg-bg-dark text-text-secondary"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      {message.read ? (
                        <MailOpen size={20} />
                      ) : (
                        <Mail size={20} />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-text flex items-center gap-2">
                        <User size={16} className="text-text-secondary" />
                        {message.name}
                      </h3>
                      <a
                        href={`mailto:${message.email || ""}`}
                        className="text-primary hover:underline text-sm"
                      >
                        {message.email || "No email"}
                      </a>
                    </div>
                  </div>

                  <p className="text-text-secondary mb-3 whitespace-pre-wrap">
                    {message.message}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Calendar size={14} />
                    {message.created_at
                      ? new Date(message.created_at).toLocaleString()
                      : "N/A"}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => toggleRead(message)}
                    className="p-2 text-text-secondary hover:text-primary hover:bg-bg-dark rounded-lg transition-colors"
                    title={message.read ? "Mark as unread" : "Mark as read"}
                  >
                    {message.read ? <Mail size={20} /> : <MailOpen size={20} />}
                  </button>
                  <button
                    onClick={() => message.id && handleDelete(message.id)}
                    disabled={deleting === message.id}
                    className="p-2 text-text-secondary hover:text-red-500 hover:bg-bg-dark rounded-lg transition-colors disabled:opacity-50"
                    title="Delete message"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
