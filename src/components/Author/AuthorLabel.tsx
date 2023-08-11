import type { Author } from "@models/Author";
import Link from "next/link";

interface AuthorLabelProps {
  author: Author;
}

const AuthorLabel = ({ author: { slug, name } }: AuthorLabelProps) => {
  return (
    <Link
      href={`/blog/author/${slug}`}
      className="inline text-green-800 dark:text-green-700 font-semibold"
    >
      {name}
    </Link>
  );
};

export default AuthorLabel;
