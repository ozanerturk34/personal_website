import CategoryLabel from "@components/Category/CategoryLabel";
import SanityImage from "@components/SanityImage";

import type { Post } from "@models/Post";

interface PostHeaderProps {
  post: Post;
}
const PostHeader = ({
  post: {
    title,
    date,
    author: { name, avatar },
    categories,
  },
}: PostHeaderProps) => {
  return (
    <div className="blog-detail-header">
      <p className="lead mb-0">
        <SanityImage
          image={avatar}
          className="rounded-circle mr-3"
          height={50}
          width={50}
        />
        {name}
        {", "} {date}
      </p>
      <h1 className="font-weight-bold blog-detail-header-title mb-0">
        {title}
      </h1>
      <div>
        {categories.map((category) => (
          <CategoryLabel key={category.slug} category={category} />
        ))}
      </div>
    </div>
  );
};
export default PostHeader;
