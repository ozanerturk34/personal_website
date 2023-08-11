import Link from "next/link";

import SanityImage from "@components/SanityImage";
import CategoriesLabel from "@components/Category/CategoriesLabel";
import AuthorLabel from "@components/Author/AuthorLabel";
import DateLabel from "@components/DateLabel";

import type { PostForCard } from "@models/Post";

interface PostCardProps {
  post: PostForCard;
  spotlight?: boolean;
  inCategory?: boolean;
}

const PostCard = ({
  post: { slug, title, publishedAt, thumbnail, author, categories },
  spotlight = false,
  inCategory = false,
}: PostCardProps) => (
  <div className="p-3">
    <div className="flex justify-center content-center overflow-hidden aspect-video scale">
      <Link href={`/blog/${slug}`}>
        <SanityImage
          image={thumbnail}
          width={1280}
          height={780}
          className="transition ease-in-out delay-75 hover:scale-105"
        />
      </Link>
    </div>
    {!inCategory && (
      <CategoriesLabel categories={categories} spotlight={spotlight} />
    )}
    <Link href={`/blog/${slug}`}>
      <h2 className={`${spotlight ? "text-3xl" : "text-xl"}`}>{title}</h2>
    </Link>
    <span className={`${spotlight ? "text-base" : "text-sm"} my-1`}>
      by <AuthorLabel author={author} /> - <DateLabel date={publishedAt} />
    </span>
  </div>
);

export default PostCard;
