export interface Post {
  slug: string;
  title: string;
  date: string;
  thumbnail: string;
  author: Author;
}

export interface Author {
  name: string;
  avatar: string;
}
