"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Loader2Icon } from "lucide-react";
import { toggleFollow } from "@/actions/user.action";
import toast from "react-hot-toast";


function FollowButton({ userId, initialIsFollowing }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

    const handleFollow = async () => {
        setIsLoading(true);
        try {
            await toggleFollow(userId);
            setIsFollowing((prev) => !prev);
            toast.success(isFollowing ? "Unfollowed successfully" : "Followed successfully");
        } catch (error) {
            toast.error("Failed to update follow status");            
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <Button
    size={"sm"}
    variant={isFollowing ? "outline" : "secondary"}
    onClick={handleFollow}
    disabled={isLoading}
    className="w-20"
    >
        {isLoading ? (
            <Loader2Icon className="size-4 animate-spin" />
        ) : isFollowing ? "Unfollow" : "Follow"}
    </Button>
  )
}

export default FollowButton