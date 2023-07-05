import type { GetStaticPaths, GetStaticProps } from "next";
import type { ParsedUrlQuery } from "querystring";
import { Col, Row } from "react-bootstrap";

import { getAllPostSlugs, getPostBySlug } from "@lib/api";

import PageLayout from "@components/PageLayout";
import PostHeader from "@components/Post/PostHeader";
import PostContent from "@components/Post/PostCotent";

import type { Post } from "@models/Post";

interface PostProps {
  post: Post;
}

interface PostParams extends ParsedUrlQuery {
  slug: string;
}

const PostPage = ({ post }: PostProps) => (
  <PageLayout>
    <Row>
      <Col md={{ span: 10, offset: 1 }}>
        <PostHeader post={post} />
        <hr />
        <PostContent content={post.content} />
      </Col>
    </Row>
  </PageLayout>
);

export const getStaticPaths: GetStaticPaths<PostParams> = async () => {
  const posts = await getAllPostSlugs();
  // TODO add logging during build
  const paths = posts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<PostProps, PostParams> = async ({
  params,
}) => {
  if (!params?.slug) {
    // TODO: Add error handling
    throw new Error("WTF?");
  }

  const post: Post = await getPostBySlug(params.slug);
  if (!post) {
    // TODO: Add error handling
    throw new Error("WTF?");
  }

  return {
    props: {
      post,
    },
  };
};

export default PostPage;
