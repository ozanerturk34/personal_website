import { imageFields, onlySlugField } from "./common";

const sourceFields = `
    name,
    title,
    ${imageFields("logo")},
`;
const resourcesFields = `
    link,
    source->{ ${sourceFields} }
`;
const technologiesFields = `
    name,
    ${imageFields("logo")},
`;

export const projectsFields = `
    name,
    description,
    ${onlySlugField},
    thumbnail,
    resources[]-> { ${resourcesFields} },
    technologies[]-> { ${technologiesFields} }
`;
