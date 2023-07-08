import AuthorCard from "@components/Author/AuthorCard";
import type { Post } from "@models/Post";

interface PostFooterProps {
  post: Post;
}

const PostFooter = ({ post: { author } }: PostFooterProps) => {
  return (
    <div>
      <AuthorCard author={author} />
    </div>
  );
};

export default PostFooter;
