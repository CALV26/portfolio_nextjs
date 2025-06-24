"use server";

import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

 // This file contains server-side actions related to user management.

export async function syncUser() {
  try {
    const { userId } = await auth()
    const user = await currentUser();

    if (!userId || !user) return;

    // Check if the user already exists in the database
    const existingUser = await prisma.user.findUnique({
      where: { clerkId: userId }
    });

    if (existingUser) return existingUser

    const dbUser = await prisma.user.create({
      data: {
        clerkId: userId,
        name: `${user.firstName || ""} ${user.lastName || ""}`,
        username: user.username ?? user.emailAddresses[0].emailAddress.split("@")[0],
        email: user.emailAddresses[0].emailAddress,
        image: user.imageUrl,
      }
    })
    
    return dbUser;

  } catch (error) {
    console.log("Error syncing user:", error);
  }
}

export async function getUserByClerkId(clerkId) {
  return prisma.user.findUnique({
    where: { 
      clerkId,
    }, 
    include: {
      _count: {
        select: {
          followers: true,
          following: true,
          posts: true,
        }
      }
    }
  })
}

export async function getDBUserId() {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthorized");

  const user = await getUserByClerkId(clerkId);

  if (!user) throw new Error("User not found");

  return user.id
}

export async function getRandomUsers() {
  try {
    const userId = await getDBUserId();

    // get 3 random users excluding the current user & users that the current user is following
    const randomUsers = await prisma.user.findMany({
      where: {
        AND: [
          {NOT: { id: userId } }, // Exclude current user
          {NOT: {
            followers: {
              some: {
                followerId: userId
              }
            }
          }},
        ]
      },
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        _count: { 
          select: {
            followers: true
          }
        }
      },
      take: 3,
    })

    return randomUsers;

  } catch (error) {
    console.error("Failed to get random users:", error);
    return [];
  }
}

export async function toggleFollow(targetUserId) {
  try {
    const userId = await getDBUserId();
    
    if (userId === targetUserId) {
      throw new Error("You cannot follow yourself");
    };

    const existingFollow = await prisma.follows.findUnique({
      where: {
        followerId_followingId: {
          followerId: userId,
          followingId: targetUserId,
        }
      }
    });

    if (existingFollow) {
      // Unfollow the user
      await prisma.follows.delete({
        // baru sampai sini 2:20:21
      });
    }

  } catch (error) {
    
  }
}