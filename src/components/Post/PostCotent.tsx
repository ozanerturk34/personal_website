import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import Refractor from "react-refractor";
import ts from "refractor/lang/typescript";

import sanityClient from "@lib/sanity";
import { type BlockImage } from "@models/Blog/Image";
import { BlockCode } from "@models/Blog/Code";

Refractor.registerLanguage(ts);

interface PostContentProps {
  content: any[];
}

interface ImageBlockProps {
  image: BlockImage;
}

interface CodeBlockProps {
  code: BlockCode;
}

const ImageBlock = ({ image }: ImageBlockProps) => {
  const imageProps = useNextSanityImage(sanityClient, image);
  return (
    <Image
      {...imageProps}
      alt={image.alt}
      style={{ width: "100%", height: "auto" }}
      sizes="(max-width: 800px) 100vw, 800px"
    />
  );
};

const CodeBlock = ({ code }: CodeBlockProps) => {
  return <Refractor language={code.language} value={code.code} />;
};

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => <ImageBlock image={value} />,
    code: ({ value }) => <CodeBlock code={value} />,
  },
};

const PostContent = ({ content }: PostContentProps) => (
  <PortableText
    value={content}
    components={components}
    onMissingComponent={(message, options) => {
      console.log(message, {
        nodeType: options.nodeType,
        type: options.type,
      });
    }}
  />
);

export default PostContent;
