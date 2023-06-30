import Image from "next/image";
import Link from "next/link";

import type { Post } from "@models/Post";

interface CardProps {
  post: Post;
}

const Card = ({
  post: {
    slug,
    title,
    date,
    thumbnail,
    author: { name, avatar },
  },
}: CardProps) => {
  return (
    <Link href={`/blog/${slug}`}>
      <div>
        <div>
          <Image src={avatar} alt={`${name} image`} width={40} height={40} />
          <h1> Author: {name}</h1>
        </div>
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
