import { useNextSanityImage } from "next-sanity-image";
import Image, { type ImageProps } from "next/image";

import sanityClient from "@lib/sanity";

import type { SanityImageWithAlt } from "@models/Image";

interface SanityImageProps extends Omit<ImageProps, "src" | "alt"> {
  image: SanityImageWithAlt;
}

const SanityImage = ({ image, ...props }: SanityImageProps) => {
  const imageProps = useNextSanityImage(sanityClient, image);

  return <Image {...imageProps} {...props} alt={image.alt} />;
};

export default SanityImage;
