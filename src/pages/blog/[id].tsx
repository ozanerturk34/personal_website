import Image from "next/image";
import type { GetStaticPaths, GetStaticProps } from "next";
import dynamic from "next/dynamic";
import type { ParsedUrlQuery } from "querystring";

import { ArticleBuilder, type Article } from "@models/Article";

// TODO: Remove this
import MockArticlesAPI from "../../__mock__/MockArticlesAPI";
const mockArticlesAPI = MockArticlesAPI.getInstance();

interface ArticleProps {
  article: Article;
}

interface ArticleParams extends ParsedUrlQuery {
  id: string;
}

const ArticlePage = ({ article: simpleArticle }: ArticleProps) => {
  const { getContent, thumbnail, title } =
    ArticleBuilder.mapToArticleBuilder(simpleArticle);
  return (
    <>
      <div>
        <h1>{title}</h1>
        <p>{getContent()}</p>
        <Image
          src={thumbnail}
          alt={`${title} Thumbnail`}
          width={30}
          height={30}
        />
      </div>
    </>
  );
};

// This function gets called at build time
export const getStaticPaths: GetStaticPaths<ArticleParams> = async () => {
  // // Call strapi CMS for available articles
  // const res = await fetch('https://.../posts')
  // const posts = await res.json()

  // Get the paths we want to pre-render based on posts

  // TODO: Remove mock API
  const articles = mockArticlesAPI.getArticles();
  const paths = articles.map((article) => ({
    params: {
      id: article.id.toString(),
    },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<
  ArticleProps,
  ArticleParams
> = async ({ params }) => {
  // // Call strapi CMS for specific article data
  // const res = await fetch('https://.../posts')
  // const posts = await res.json()

  if (!params?.id) {
    // TODO: Add error handling
    throw new Error("WTF?");
  }

  const article = mockArticlesAPI.findArticleById(params.id);

  if (!article) {
    // TODO: Add error handling
    throw new Error("WTF?");
  }

  return {
    props: {
      article,
    },
  };
};

export default ArticlePage;
