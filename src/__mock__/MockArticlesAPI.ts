import { Article, SimpleArticle } from "@/models/Article";

// TODO: Remove mock API
const LOREM_IPSUM =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum";
const ARTICLES = [
  new Article(
    1,
    "Good article 1 - Blue",
    "https://www.kasandbox.org/programming-images/avatars/leaf-blue.png",
    LOREM_IPSUM
  ),
  new Article(
    2,
    "Good article 2 - Grey",
    "https://www.kasandbox.org/programming-images/avatars/leaf-grey.png",
    LOREM_IPSUM
  ),
  new Article(
    3,
    "Good article 3 - Green",
    "https://www.kasandbox.org/programming-images/avatars/leaf-green.png",
    LOREM_IPSUM
  ),
  new Article(
    4,
    "Good article 4 - Yellow",
    "https://www.kasandbox.org/programming-images/avatars/leaf-yellow.png",
    LOREM_IPSUM
  ),
].map((article) => Article.mapToSampleArticle(article));

class MockArticlesAPI {
  private static instance: MockArticlesAPI;
  private constructor() {}

  public static getInstance(): MockArticlesAPI {
    if (!MockArticlesAPI.instance) {
      MockArticlesAPI.instance = new MockArticlesAPI();
    }
    return MockArticlesAPI.instance;
  }

  private _articles: SimpleArticle[] = ARTICLES;

  public readonly getArticles = (): SimpleArticle[] => this._articles;

  public readonly findArticleById = (id: string): SimpleArticle | undefined =>
    this._articles.find((article) => article.id === parseInt(id));
}

export default MockArticlesAPI;
