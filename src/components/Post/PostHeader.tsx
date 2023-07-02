import { Post } from "@models/Blog/Post";
import Image from "next/image";

interface PostHeaderProps {
  post: Post;
}
const PostHeader = ({
  post: {
    title,
    date,
    author: {
      name,
      avatar: { url: avatarUrl, alt: avatarAlt },
    },
  },
}: PostHeaderProps) => (
  <div className="blog-detail-header">
    <p className="lead mb-0">
      <Image
        src={avatarUrl}
        alt={avatarAlt}
        className="rounded-circle mr-3"
        height={50}
        width={50}
      />
      {name}
      {", "} {date}
    </p>
    <h1 className="font-weight-bold blog-detail-header-title mb-0">{title}</h1>
  </div>
);

export default PostHeader;
