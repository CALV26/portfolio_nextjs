"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";

// type Posts = Awaited<ReturnType<typeof getPosts>>

function PostCard({ post, dbUserId }) {
    const { user } = useUser();
    const [newComment, setNewComment] = useState("");
    const [isCommenting, setIsCommenting] = useState(false);
    const [isLiking, setIsLiking] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [hasLiked, setHasLiked] = useState(false);
    const [Likes, setLikes] = useState(post._count.likes); //sampai di sini 2:40:41 bikin type post sendiri, tapi itu buat typescript????

    return <div>PostCard</div>
}

export default PostCard