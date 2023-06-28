import Image from "next/image";
import Link from "next/link";

import type { Post } from "@models/Post";

interface CardProps {
  post: Post;
}

const Card = ({ post }: CardProps) => {
  const { content, id, thumbnail, title } = post;
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

export default Card;
