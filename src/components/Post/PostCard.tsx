import Link from "next/link";

import SanityImage from "@components/SanityImage";

import type { PostForCard } from "@models/Post";
import CategoriesLabel from "@components/Category/CategoriesLabel";
import AuthorLabel from "@components/Author/AuthorLabel";
import DateLabel from "@components/DateLabel";

interface PostCardProps {
  post: PostForCard;
}

const PostCard = ({
  post: { slug, title, publishedAt, thumbnail, author, categories },
}: PostCardProps) => (
  <div className="p-3">
    <div>
      <Link href={`/blog/${slug}`}>
        <SanityImage image={thumbnail} />
      </Link>
      <div>
        <CategoriesLabel categories={categories} />
      </div>
      <Link href={`/blog/${slug}`}>
        <h2 className="card-main-title">
          {title.length > 40 ? title.slice(0, 40) + "..." : title}
        </h2>
      </Link>
      <div>
        by <AuthorLabel author={author} /> - <DateLabel date={publishedAt} />
      </div>
    </div>
  </div>
);

export default PostCard;
