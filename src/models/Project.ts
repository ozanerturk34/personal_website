import { SanityImageWithAlt } from "./Image";

export interface Project {
  name: string;
  slug: string;
  description: string;
  thumbnail: SanityImageWithAlt;
  resources: Resource[];
  technologies: Technology[];
}

export interface Resource {
  link: string;
  source: Source;
}

export interface Source {
  name: string;
  title: string;
  logo: SanityImageWithAlt;
}

export interface Technology {
  name: string;
  logo: SanityImageWithAlt;
}
