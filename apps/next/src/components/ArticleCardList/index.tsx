import ArticleCard from "@components/ArticleCard";

import type { Article } from "@models/Article";

interface ArticleCardListProps {
  category: string;
  title: string;
  articles: Article[];
}

const ArticleCardList = ({
  category,
  title,
  articles,
}: ArticleCardListProps) => {
  return (
    <div>
      <h1>{title}</h1>
      <h1>{category}</h1>
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};

export default ArticleCardList;
