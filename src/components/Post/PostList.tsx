import type { PostForCard } from "@models/Post";
import PostCard from "./PostCard";

interface PostListProps {
  posts: PostForCard[];
  horizontal?: boolean;
}

const PostList = ({ posts, horizontal = false }: PostListProps) => {
  return (
    <div className={`d-flex ${horizontal ? "flex-row" : "flex-column"}`}>
      {posts.length > 0 ? (
        posts.map((post) => <PostCard key={post.slug} post={post} />)
      ) : (
        <h1>No Posts</h1>
      )}
    </div>
  );
};

export default PostList;
