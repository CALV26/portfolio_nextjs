"use server"

import prisma from "@/lib/prisma";
import { getDBUserId } from "./user.action"
import { revalidatePath } from "next/cache";

export async function createPost(content, image) {
    try {
        const userId = await getDBUserId();

        if (!userId) return;

        const post = await prisma.post.create({
            data: {
                content,
                image,
                authorId: userId,
            },
        })
        
        revalidatePath("/");
        return { success: true, post };
    } catch (error) {
        console.error("Failed to create post:", error);
        return { success: false, error: "Failed to create post" };
    }
}

export async function getPosts() {
    try {
        const posts = await prisma.post.findMany({
            orderBy: {
                createdAt: "desc"
            },
            include: {
                author: {
                    select: {
                        name: true,
                        image: true,
                        username: true
                    }
                },
                comments: {
                    orderBy: {
                        createdAt: "asc"
                    },
                    include: {
                        author: {
                            select: {
                                id: true,
                                username: true,
                                image: true,
                                name: true
                            }
                        }
                    }
                },
                likes: {
                    select: {
                        userId: true
                    }
                },
                _count: {
                    select: {
                        likes: true,
                        comments: true
                    }
                }
            }
        });

        return posts;
    } catch (error) {
        console.log("Error in getPost", error);
        throw new Error("Failed to fetch posts");
    }
}