import type { SlugObject } from "./shared";

export interface CategoryBase extends SlugObject {
  title: string;
}

export interface Category extends CategoryBase {
  description: string;
}
