export class Article {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly image: string,
    private _content: string
  ) {}

  public readonly getContent = () => {
    return this._content;
  };

  static readonly mapToArticle = (article: SimpleArticle): Article => {
    const { id, title, image, content } = article;
    return new Article(id, title, image, content);
  };

  static readonly mapToSampleArticle = (article: Article): SimpleArticle => ({
    id: article.id,
    title: article.title,
    image: article.image,
    content: article.getContent(),
  });
}

export interface SimpleArticle {
  id: number;
  title: string;
  image: string;
  content: string;
}
