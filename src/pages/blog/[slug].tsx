import type { GetStaticPaths, GetStaticProps } from "next";
import type { ParsedUrlQuery } from "querystring";
import { Col, Row } from "react-bootstrap";

import { Post } from "@models/Post";
import { getAllPostSlugs, getPostBySlug } from "@lib/api";
import PageLayout from "@components/PageLayout";
import PostHeader from "@components/Post/PostHeader";
import PostContent from "@components/Post/PostCotent";

interface PostProps {
  post: Post;
}

interface PostParams extends ParsedUrlQuery {
  slug: string;
}

const PostPage = ({ post }: PostProps) => {
  const content = `<h2 style="color:#2E69A8; font-family:cursive, sans-serif;">What Is Meant By Lorem Ipsum In Website?</h2>
      <p>The word Lorem Ipsum is derived from the Latin word which means “pain itself”. It is a kind of a text filler tool that is used by the webmaster on the website.</p>
      <p>Basically, this tool is used to create dummy content on the website when it’s new.</p>
      <h3 style="color:#2E69A8; font-family:cursive, sans-serif;">Why Lorem Ipsum Is Used?</h3>
          <p>It helps the designer plan where the content will sit. It helps in creating drafts of the content on the pages of the website. It originates from the Latin text but is seen as gibberish.</p>
          <p>Sometimes, the reader gets distracted while creating or working on the website. That’s why this language is important.</p>
          <p>This tool makes the work easier for the webmaster.</p>
          <h3 style="color:#2E69A8; font-family:cursive, sans-serif;">How Lorem Ipsum Can Be Used?</h3>
              <p>When using Lorem Ipsum for creating dummy content for your newly created website, you can select the text formats you want from the tool. Like, words, sentences, or paragraphs.</p>
              <p>Then, you can select whether you want HTML markup in your dummy content or not</p>
              <p>Then, you can choose the number of words and paragraphs for your dummy content and execute the plan accordingly.</p>
              <p>You can use this tool at incrementors.com for free.</p>
              <h3 style="color:#2E69A8; font-family:cursive, sans-serif;"> How Can I Use Lorem Ipsum Tool For My Website?</h3>
                  <p>You can click on the ‘item to generate’ column and select the format you want content in.</p>
                   <p>Below that, you can select if you want an HTML tag in your content or not</p>
                   <p>After that, you can choose how many paragraphs you want in the ‘how many items to generate’ column.</p>
                   <p>Then, you can choose the minimum and maximum words you want per sentence.</p>
                   <p>Later, you can select the minimum and maximum sentences you want per paragraph.</p>
                   <p>Finally, click on the button ‘generate’</p>
                   <p>Taddalaa!</p>
                   <p>You got your Lorem Ipsum content for your website.</p>`;
  return (
    <PageLayout>
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <PostHeader post={post} />
          <hr />
          <PostContent content={content} />
        </Col>
      </Row>
    </PageLayout>
  );
};

// This function gets called at build time
export const getStaticPaths: GetStaticPaths<PostParams> = async () => {
  const posts: Post[] = await getAllPostSlugs();
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
