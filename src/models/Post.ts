export interface Post {
  slug: string;
  title: string;
  createdAt: string;
}

interface RawPostSlug {
  _type: "slug";
  current: string;
}
export interface RawPost {
  _type: "blog";
  _rev: string;
  _id: string;
  _updatedAt: string;
  _createdAt: string;
  title: string;
  slug: RawPostSlug;
}
