import Link from "next/link";
import { Card } from "react-bootstrap";

import SanityImage from "@components/SanityImage";

import type { PostForCard } from "@models/Post";

interface PostCardProps {
  post: PostForCard;
}

const PostCard = ({
  post: {
    slug,
    title,
    date,
    thumbnail,
    author: { name, avatar },
  },
}: PostCardProps) => (
  <Link href={`/blog/${slug}`}>
    <Card>
      <Card.Header>
        <SanityImage
          image={avatar}
          className="rounded-circle mr-3"
          height={50}
          width={50}
        />
        <Card.Title className="font-weight-bold mb-1">{name}</Card.Title>
        <Card.Text className="card-date">{date}</Card.Text>
      </Card.Header>
      <Card.Body>
        <Card.Title className="card-main-title">
          {title.length > 40 ? title.slice(0, 40) + "..." : title}
        </Card.Title>
        <SanityImage image={thumbnail} />
      </Card.Body>
    </Card>
  </Link>
);

export default PostCard;
