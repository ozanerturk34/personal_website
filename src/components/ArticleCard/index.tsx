import Image from "next/image";
import Link from "next/link";

import type { Article } from "@models/Article";

interface ArticleCardProps {
  article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  const { content, id, thumbnail, title } = article;
  return (
    <Link href={`/blog/${id}`}>
      <div>
        <h1>{title}</h1>
        <p>{content}</p>
        <Image
          src={thumbnail}
          alt={`${title} Thumbnail`}
          width={30}
          height={30}
        />
      </div>
    </Link>
  );
};

export default ArticleCard;
