"use server";

import prisma from "@/lib/prisma";
import { getDBUserId } from "./user.action";

export async function getNotifications() {
  try {
    const userId = await getDBUserId();
    if (!userId) return [];

    const notifications = await prisma.notification.findMany({
      where: {
        userId,
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
        post: {
          select: {
            id: true,
            content: true,
            image: true,
          },
        },
        comment: {
          select: {
            id: true,
            content: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return notifications;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw new Error("Failed to fetch notifications (action)");
  }
}

export async function markNotificationsAsRead(notificationIds) {
  try {
    await prisma.notification.updateMany({
      where: {
        id: {
          in: notificationIds,
        },
      },
      data: {
        read: true,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error marking notifications as read:", error);
    return { success: false };
  }
}