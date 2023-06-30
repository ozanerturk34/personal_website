import Image from "next/image";
import type { GetStaticPaths, GetStaticProps } from "next";
import type { ParsedUrlQuery } from "querystring";

import { Post } from "@models/Post";
import { getAllPostSlugs, getPostBySlug } from "@lib/api";

interface PostProps {
  post: Post;
}

interface PostParams extends ParsedUrlQuery {
  slug: string;
}

const PostPage = ({
  post: {
    title,
    thumbnail,
    date,
    slug,
    author: { name, avatar },
  },
}: PostProps) => {
  return (
    <div>
      <div>
        <Image src={avatar} alt={`${name} image`} width={40} height={40} />
        <h1> Author: {name}</h1>
      </div>
      <h1>{title}</h1>
      <p>{date}</p>
      <p>{slug}</p>
      <Image
        src={thumbnail}
        alt={`${title} Thumbnail`}
        width={300}
        height={300}
      />
    </div>
  );
};

// This function gets called at build time
export const getStaticPaths: GetStaticPaths<PostParams> = async () => {
  const posts: Post[] = await getAllPostSlugs();
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
