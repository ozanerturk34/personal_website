import type { PostForCard } from "@models/Post";
import PostCard from "./PostCard";

interface PostListProps {
  posts: PostForCard[];
  horizontal?: boolean;
  inCategory?: boolean;
}

const PostList = ({
  posts,
  horizontal = false,
  inCategory = false,
}: PostListProps) => {
  return (
    <div className={horizontal ? "grid grid-cols-2" : "flex flex-col"}>
      {posts.length > 0 ? (
        (horizontal ? posts.slice(0, 4) : posts).map((post) => (
          <PostCard key={post.slug} post={post} inCategory={inCategory} />
        ))
      ) : (
        <h1>No Posts</h1>
      )}
    </div>
  );
};

export default PostList;
