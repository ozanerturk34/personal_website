import Link from "next/link";

import SanityImage from "@components/SanityImage";

import { Author } from "@models/Author";

interface AuthorCardProps {
  author: Author;
}
const AuthorCard = ({
  author: { name, avatar, slug, about },
}: AuthorCardProps) => (
  <Link className="lead mb-0" href={slug}>
    <SanityImage
      image={avatar}
      className="rounded-circle mr-3"
      height={50}
      width={50}
    />
    <p>{name}</p>
    <p>{about}</p>
  </Link>
);

export default AuthorCard;
