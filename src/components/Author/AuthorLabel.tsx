import type { Author } from "@models/Author";
import Link from "next/link";

interface AuthorLabelProps {
  author: Author;
}

const AuthorLabel = ({ author: { slug, name } }: AuthorLabelProps) => {
  return (
    <Link href={`/blog/author/${slug}`}>
      <p className="inline text-green-800 font-semibold ">{name}</p>
    </Link>
  );
};

export default AuthorLabel;
