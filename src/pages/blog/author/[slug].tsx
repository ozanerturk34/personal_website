import type { GetStaticPaths, GetStaticProps } from "next";
import type { ParsedUrlQuery } from "querystring";
import { Col, Row } from "react-bootstrap";

import {
  getAllAuthorSlugs,
  getAuthorBySlug,
  getPostsForAuthor,
} from "@lib/api";

import PageLayout from "@components/PageLayout";
import AuthorCard from "@components/Author/AuthorCard";
import PostList from "@components/Post/PostList";

import type { Author } from "@models/Author";
import type { PostForCard } from "@models/Post";

interface AuthorPageProps {
  author: Author;
  posts: PostForCard[];
}

const AuthorPage = ({ author, posts }: AuthorPageProps) => {
  console.log("posts", posts);
  return (
    <PageLayout>
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <AuthorCard author={author} />
          <hr />
          <PostList posts={posts} />
        </Col>
      </Row>
    </PageLayout>
  );
};

interface AuthorPageParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths<AuthorPageParams> = async () => {
  const authors = await getAllAuthorSlugs();
  const paths = authors.map((author) => ({
    params: {
      slug: author.slug,
    },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<
  AuthorPageProps,
  AuthorPageParams
> = async ({ params }) => {
  if (!params?.slug) {
    // TODO: Add error handling
    throw new Error("WTF?");
  }

  const author: Author = await getAuthorBySlug(params.slug);
  if (!author) {
    // TODO: Add error handling
    throw new Error("WTF?");
  }
  console.log(author);
  const posts: PostForCard[] = await getPostsForAuthor(params.slug);
  if (!posts) {
    // TODO: Add error handling
    throw new Error("WTF?");
  }
  return {
    props: {
      author,
      posts,
    },
  };
};

export default AuthorPage;
