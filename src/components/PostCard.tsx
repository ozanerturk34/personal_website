import Image from "next/image";
import Link from "next/link";

import type { PostForCard } from "@models/Blog/Post";
import { Card } from "react-bootstrap";

interface PostCardProps {
  post: PostForCard;
}

const PostCard = ({
  post: {
    slug,
    title,
    date,
    thumbnail: { url: thumbnailUrl, alt: thumbnailAlt },
    author: {
      name,
      avatar: { url: avatarUrl, alt: avatarAlt },
    },
  },
}: PostCardProps) => {
  return (
    <Link href={`/blog/${slug}`}>
      <Card>
        <Card.Header>
          <Image
            src={avatarUrl}
            className="rounded-circle mr-3"
            height={50}
            width={50}
            alt={avatarAlt}
          />
          <Card.Title className="font-weight-bold mb-1">{name}</Card.Title>
          <Card.Text className="card-date">{date}</Card.Text>
        </Card.Header>
        <Card.Body>
          <Card.Title className="card-main-title">
            {title.length > 40 ? title.slice(0, 40) + "..." : title}
          </Card.Title>
          <Image
            src={thumbnailUrl}
            alt={thumbnailAlt}
            width={300}
            height={300}
          />
        </Card.Body>
      </Card>
    </Link>
  );
};

export default PostCard;
