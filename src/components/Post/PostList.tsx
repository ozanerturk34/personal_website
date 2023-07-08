import type { PostForCard } from "@models/Post";
import PostCard from "./PostCard";

interface PostListProps {
  posts: PostForCard[];
}

const PostList = ({ posts }: PostListProps) => {
  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post) => <PostCard key={post.slug} post={post} />)
      ) : (
        <h1>No Posts</h1>
      )}
    </div>
  );
};

export default PostList;
