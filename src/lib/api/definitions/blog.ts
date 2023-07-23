import { imageFields, onlySlugField } from "./common";

export const authorFields = `
    name, 
    ${imageFields("avatar")},
    ${onlySlugField},
    about
`;

const categoryBaseFields = `
    title,
    ${onlySlugField}
`;

export const categoryFields = `
    ${categoryBaseFields},
    description
`;

const basePostFields = `
  title,
  publishedAt,
  author->{ ${authorFields} },
  categories[]->{ ${categoryBaseFields} }
`;

export const postCardFields = `
  ${basePostFields},
  ${imageFields("thumbnail")},
  ${onlySlugField}
`;

export const categoryWithPostsFields = `
  ${categoryBaseFields},
  'posts': *[_type=='post' && references(^._id)] { ${postCardFields} }
`;

export const postDetailFields = `
  ${basePostFields},
  content[]{ ..., asset-> }
`;
