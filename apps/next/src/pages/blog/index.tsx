import type { GetStaticProps } from "next";

import ArticleCard from "@components/ArticleCard";
import ArticleCardList from "@components/ArticleCardList";
import type { Article, ArticleList } from "@models/Article";

// TODO: Remove this
import MockArticlesAPI from "../../__mock__/MockArticlesAPI";
import useFetcher from "@hooks/useFetcher";
const mockArticlesAPI = MockArticlesAPI.getInstance();

interface BlogProps {
  featuredArticle: Article;
  articleLists: [ArticleList, ArticleList, ArticleList];
}

const Blog = ({ featuredArticle, articleLists }: BlogProps) => {
  const { data, error } = useFetcher("api/hello");
  console.log("data", data);
  return (
    <div>
      <h1>Featured Article</h1>
      <ArticleCard article={featuredArticle} />
      <h1>List of different categories of articles</h1>
      {articleLists.map(({ category, articles, title }) => (
        <ArticleCardList
          key={category}
          category={category}
          title={title}
          articles={articles}
        />
      ))}
    </div>
  );
};

export const getStaticProps: GetStaticProps<BlogProps> = () => {
  const articles = mockArticlesAPI.getArticles();
  const featuredArticle = mockArticlesAPI.findArticleById("1");
  if (!featuredArticle) {
    // TODO: Add error handling
    throw new Error("WTF?");
  }
  return {
    props: {
      featuredArticle,
      articleLists: [
        { articles, category: "learning", title: "Learn new stuff" },
        { articles, category: "job", title: "Get some money" },
        { articles, category: "book", title: "Learn books" },
      ],
    },
  };
};

export default Blog;
