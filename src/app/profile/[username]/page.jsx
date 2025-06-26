import { getProfileByUsername, getUserLikedPosts, getUserPosts, isFollowing } from "@/actions/profile.action"
import { notFound } from "next/navigation";
import ProfilePageClient from "./ProfilePageClient";

export async function generateMetadata({ params }) {
    const user = await getProfileByUsername(params.username);    
    if (!user) return;

    return {
        title: `${user.name ?? user.username} - Profile`,
        description: `Profile page of ${user.name ?? user.username}`,
        openGraph: {
            title: `${user.name ?? user.username} - Profile`,
            description: `Profile page of ${user.name ?? user.username}`,
            url: `/profile/${params.username}`,
            images: [
                {
                    url: user.profilePicture || '/default-profile.png',
                    alt: `${user.name}'s profile picture`
                }
            ]
        }
    }
}

async function ProfilePage({ params }) {
    const user = await getProfileByUsername(params.username);

    if (!user) notFound();

    const [posts, likedPosts, isCurrentUserFollowing] = await Promise.all([
        getUserPosts(user.id),
        getUserLikedPosts(user.id),
        isFollowing(user.id),
    ])

    return (
        <ProfilePageClient
            user={user}
            posts={posts}
            likedPosts={likedPosts}
            isFollowing={isCurrentUserFollowing}
        />
    )
}

export default ProfilePage