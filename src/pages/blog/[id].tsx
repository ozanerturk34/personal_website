import Image from "next/image";
import type { GetStaticPaths, GetStaticProps } from "next";
import dynamic from "next/dynamic";
import type { ParsedUrlQuery } from "querystring";

import { Post } from "@models/Post";

interface PostProps {
  post: Post;
}

interface PostParams extends ParsedUrlQuery {
  slug: string;
}

const ArticlePage = ({ post }: PostProps) => {
  const { title, content, createdAt, slug } = post;
  return (
    <>
      <div>
        <h1>{title}</h1>
        {content}
        <p>{createdAt}</p>
        {/* <Image
          src={thumbnail}
          alt={`${title} Thumbnail`}
          width={30}
          height={30}
        /> */}
      </div>
    </>
  );
};

// This function gets called at build time
export const getStaticPaths: GetStaticPaths<PostParams> = async () => {
  // // Call sanity to get available posts
  // const res = await fetch('https://.../posts')
  // const posts = await res.json()

  // Get the paths we want to pre-render based on posts

  const posts: Post[] = [];
  const paths = posts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<PostProps, PostParams> = async ({
  params,
}) => {
  // // Call sanity for specific article data
  // const res = await fetch('https://.../posts')
  // const posts = await res.json()

  if (!params?.id) {
    // TODO: Add error handling
    throw new Error("WTF?");
  }

  const post: Post = {
    title: "Test Post",
    content: "<p>Test</p>",
    createdAt: "12 Jan 2021",
    slug: "test_post",
  };

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

export default ArticlePage;
