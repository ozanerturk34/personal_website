import type { SanityImageWithAlt } from "./Image";
import type { SlugObject } from "./shared";

export interface Author extends SlugObject {
  name: string;
  avatar: SanityImageWithAlt;
  about: string;
}
