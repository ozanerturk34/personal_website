import AuthorLabel from "@components/Author/AuthorLabel";
import CategoriesLabel from "@components/Category/CategoriesLabel";

import type { Post } from "@models/Post";

interface PostHeaderProps {
  post: Post;
}
const PostHeader = ({
  post: { title, publishedAt, author, categories },
}: PostHeaderProps) => {
  return (
    <div className="blog-detail-header">
      <div>
        <h1 className="font-weight-bold blog-detail-header-title mb-0">
          {title}
        </h1>
      </div>
      <div>
        <p>
          by <AuthorLabel author={author} />
        </p>
        <span> - </span>
        <CategoriesLabel categories={categories} />
      </div>
      <div>
        <p>{publishedAt}</p>
      </div>
    </div>
  );
};
export default PostHeader;
