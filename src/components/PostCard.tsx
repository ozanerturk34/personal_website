import Image from "next/image";
import Link from "next/link";

import type { Post } from "@models/Post";
import { Card } from "react-bootstrap";

interface PostCardProps {
  post: Post;
}

const PostCard = ({
  post: {
    slug,
    title,
    date,
    thumbnail,
    author: { name, avatar },
  },
}: PostCardProps) => {
  return (
    <Link href={`/blog/${slug}`}>
      <Card>
        <Card.Header>
          <Image
            src={avatar}
            className="rounded-circle mr-3"
            height={50}
            width={50}
            alt="avatar"
          />
          <Card.Title className="font-weight-bold mb-1">{name}</Card.Title>
          <Card.Text className="card-date">{date}</Card.Text>
        </Card.Header>
        <Card.Body>
          <Card.Title className="card-main-title">
            {title.length > 40 ? title.slice(0, 40) + "..." : title}
          </Card.Title>
          <Image
            src={thumbnail}
            alt={`${title} Thumbnail`}
            width={300}
            height={300}
          />
        </Card.Body>
      </Card>
    </Link>
  );
};

export default PostCard;
