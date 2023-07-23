export const onlySlugField = `
  'slug': slug.current
`;

export const imageFields = (field: string) =>
  `'${field}': { 'alt': ${field}.alt, 'asset': ${field}.asset-> }`;
