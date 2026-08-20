"use server";

import { submitContactFormAction } from "@/app/actions/contact";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitContactMessage(data: {
  name: string;
  email: string;
  subject: string;
  telegram?: string;
  message: string;
  website_hp?: string;
}) {
  return await submitContactFormAction(data);
}

export async function getMessages() {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: "desc" },
    });
    return messages.map((m) => ({
      ...m,
      id: m.id.toString(),
    }));
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
}

export async function toggleMessageReadStatus(id: string, isRead: boolean) {
  try {
    const updated = await prisma.message.update({
      where: { id },
      data: { isRead },
    });
    revalidatePath("/admin/messages");
    return { success: true, message: updated };
  } catch (error: any) {
    console.error("Error updating message status:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteMessage(id: string) {
  try {
    await prisma.message.delete({
      where: { id },
    });
    revalidatePath("/admin/messages");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting message:", error);
    return { success: false, error: error.message };
  }
}
