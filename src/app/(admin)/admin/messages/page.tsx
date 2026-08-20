"use client";

import { useState, useEffect } from "react";
import { getMessages, toggleMessageReadStatus, deleteMessage } from "@/actions/messageActions";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog } from "@/components/ui/dialog";
import { formatDate } from "@/lib/utils";
import { MessageSquare, Mail, Trash2, Eye, CheckCircle2, Circle, Loader2 } from "lucide-react";

export default function VisitorMessagesManager() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeMessage, setActiveMessage] = useState<any | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchMessagesData = async () => {
    setLoading(true);
    try {
      const data = await getMessages();
      setMessages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessagesData();
  }, []);

  const handleOpenMessage = async (msg: any) => {
    setActiveMessage(msg);
    if (!msg.isRead) {
      try {
        await toggleMessageReadStatus(msg.id, true);
        setMessages((prev) =>
          prev.map((m) => (m.id === msg.id ? { ...m, isRead: true } : m))
        );
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDeleteMessage = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await deleteMessage(id);
      if (res.success) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        if (activeMessage?.id === id) setActiveMessage(null);
      } else {
        alert(res.error || "Failed to delete message.");
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Visitor Messages Manager</h1>
          <p className="text-xs text-slate-400">
            Read, filter, and delete visitor contact inquiries saved in MongoDB
          </p>
        </div>
        <Badge variant="gradient" className="font-mono text-xs">
          Total Inquiries: {messages.length}
        </Badge>
      </div>

      {/* Messages Table */}
      {loading ? (
        <div className="p-12 text-center text-slate-400 space-y-3 glass-card rounded-2xl">
          <Loader2 className="h-6 w-6 animate-spin mx-auto text-cyan-400" />
          <p className="text-xs font-mono">Fetching Visitor Messages...</p>
        </div>
      ) : messages.length === 0 ? (
        <div className="p-12 text-center text-slate-400 space-y-3 glass-card rounded-2xl">
          <MessageSquare className="h-8 w-8 text-slate-600 mx-auto" />
          <p className="text-sm font-semibold">No visitor messages received yet.</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Visitor Name</TableHead>
              <TableHead>Email &amp; Telegram</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Date Received</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((msg) => (
              <TableRow key={msg.id} className={!msg.isRead ? "bg-cyan-500/5 font-medium" : ""}>
                <TableCell>
                  {msg.isRead ? (
                    <Badge variant="secondary" className="gap-1 text-[10px]">
                      <CheckCircle2 className="h-3 w-3 text-slate-400" /> Read
                    </Badge>
                  ) : (
                    <Badge variant="default" className="gap-1 text-[10px] bg-cyan-500/20 text-cyan-300 border-cyan-500/40">
                      <Circle className="h-2 w-2 fill-cyan-400 text-cyan-400 animate-pulse" /> New Unread
                    </Badge>
                  )}
                </TableCell>

                <TableCell className="font-semibold text-white">
                  {msg.name}
                </TableCell>

                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-xs text-cyan-300 font-mono">{msg.email}</span>
                    {msg.telegram && (
                      <span className="text-[10px] text-slate-400 font-mono">Telegram: {msg.telegram}</span>
                    )}
                  </div>
                </TableCell>

                <TableCell className="max-w-xs truncate text-xs text-slate-300">
                  {msg.subject}
                </TableCell>

                <TableCell className="text-xs font-mono text-slate-400">
                  {formatDate(msg.createdAt)}
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenMessage(msg)}
                      className="h-8 px-2.5 gap-1.5 text-xs"
                    >
                      <Eye className="h-3.5 w-3.5 text-cyan-400" />
                      <span>Read</span>
                    </Button>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteMessage(msg.id)}
                      disabled={deletingId === msg.id}
                      className="h-8 px-2.5 gap-1.5 text-xs"
                    >
                      {deletingId === msg.id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" />
                      )}
                      <span>Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Message Modal Dialog */}
      <Dialog
        isOpen={!!activeMessage}
        onClose={() => setActiveMessage(null)}
        title="Visitor Contact Message"
      >
        {activeMessage && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
              <div>
                <span className="text-slate-500 block font-mono">From:</span>
                <span className="font-bold text-white text-sm">{activeMessage.name}</span>
                <span className="block text-cyan-400 font-mono">{activeMessage.email}</span>
                {activeMessage.telegram && (
                  <span className="block text-slate-400">Telegram: {activeMessage.telegram}</span>
                )}
              </div>
              <div>
                <span className="text-slate-500 block font-mono">Date Received:</span>
                <span className="text-slate-300 font-mono">{formatDate(activeMessage.createdAt)}</span>
                <span className="text-slate-500 block font-mono mt-2">Subject:</span>
                <span className="font-semibold text-slate-200">{activeMessage.subject}</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase">Full Message Content:</span>
              <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 text-slate-200 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                {activeMessage.message}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDeleteMessage(activeMessage.id)}
                className="gap-2"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete Message</span>
              </Button>

              <Button variant="outline" size="sm" onClick={() => setActiveMessage(null)}>
                Close Modal
              </Button>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}
