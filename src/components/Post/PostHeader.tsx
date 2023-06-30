import { Post } from "@models/Post";
import Image from "next/image";

interface PostHeaderProps {
  post: Post;
}
const PostHeader = ({
  post: {
    title,
    thumbnail,
    date,
    author: { name, avatar },
  },
}: PostHeaderProps) => (
  <div className="blog-detail-header">
    <p className="lead mb-0">
      <Image
        src={avatar}
        className="rounded-circle mr-3"
        height={50}
        width={50}
        alt="avatar"
      />
      {name}
      {", "} {date}
    </p>
    <h1 className="font-weight-bold blog-detail-header-title mb-0">{title}</h1>
    <Image
      className="img-fluid rounded"
      src={thumbnail}
      height={500}
      width={500}
      alt="TODO: provide alt"
    />
  </div>
);

export default PostHeader;
