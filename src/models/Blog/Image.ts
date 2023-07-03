import type { SanityImageObjectStub } from "@sanity/asset-utils";

export interface SanityImageWithAlt extends SanityImageObjectStub {
  alt: string;
}
