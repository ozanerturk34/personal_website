import Image from "next/image";
import Link from "next/link";

import type { Post } from "@models/Post";

interface CardProps {
  post: Post;
}

const Card = ({ post }: CardProps) => {
  const { slug, title, date, thumbnail } = post;
  return (
    <Link href={`/blog/${slug}`}>
      <div>
        <h1>{title}</h1>
        <p>{date}</p>
        <p>{slug}</p>
        <Image
          src={thumbnail}
          alt={`${title} Thumbnail`}
          width={300}
          height={300}
        />
      </div>
    </Link>
  );
};

export default Card;
