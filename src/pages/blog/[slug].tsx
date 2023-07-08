import type { GetStaticPaths, GetStaticProps } from "next";
import type { ParsedUrlQuery } from "querystring";
import { Col, Row } from "react-bootstrap";

import { getAllPostSlugs, getPostBySlug } from "@lib/api";

import PageLayout from "@components/PageLayout";
import PostHeader from "@components/Post/PostHeader";
import PostContent from "@components/Post/PostContent";
import PostFooter from "@components/Post/PostFooter";

import type { Post } from "@models/Post";

interface PostPageProps {
  post: Post;
}

const PostPage = ({ post }: PostPageProps) => (
  <PageLayout>
    <Row>
      <Col md={{ span: 10, offset: 1 }}>
        <PostHeader post={post} />
        <hr />
        <PostContent content={post.content} />
        <hr />
        <PostFooter post={post} />
      </Col>
    </Row>
  </PageLayout>
);

interface PostPageParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths<PostPageParams> = async () => {
  const posts = await getAllPostSlugs();
  const paths = posts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<
  PostPageProps,
  PostPageParams
> = async ({ params }) => {
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
