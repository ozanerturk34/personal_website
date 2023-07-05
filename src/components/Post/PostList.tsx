import type { PostForCard } from "@models/Post";
import PostCard from "./PostCard";

interface PostListProps {
  posts: PostForCard[];
}

const PostList = ({ posts }: PostListProps) => {
  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
};

export default PostList;
