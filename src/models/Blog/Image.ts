import { SanityImageObjectStub } from "@sanity/asset-utils";

export interface Avatar {
  url: string;
  alt: string;
}

export interface Thumbnail extends Avatar {}

export interface BlockImage extends SanityImageObjectStub {
  alt: string;
}
