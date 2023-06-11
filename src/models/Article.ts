export interface Article {
  id: number;
  title: string;
  thumbnail: string;
  content: string;
}

export type ArticleCategory = "learning" | "job" | "book";

export interface ArticleList {
  articles: Article[];
  category: ArticleCategory;
  title: string;
}

export class ArticleBuilder {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly thumbnail: string,
    private _content: string,
    public readonly categories: ArticleCategory[] = []
  ) {}

  // TODO: modify to content handling
  public readonly getContent = () => {
    return this._content;
  };

  static readonly mapToArticleBuilder = (article: Article): ArticleBuilder => {
    const { id, title, thumbnail, content } = article;
    return new ArticleBuilder(id, title, thumbnail, content);
  };

  // TODO: remove when mock is removed
  static readonly mapToArticle = (article: ArticleBuilder): Article => ({
    id: article.id,
    title: article.title,
    thumbnail: article.thumbnail,
    content: article.getContent(),
  });
}
