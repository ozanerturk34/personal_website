import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Refractor from "react-refractor";
import ts from "refractor/lang/typescript";
import js from "refractor/lang/javascript";
import css from "refractor/lang/css";
import html from "refractor/lang/markdown";

import SanityImage from "@components/SanityImage";

import type { SanityImageWithAlt } from "@models/Blog/Image";
import type { BlockCode } from "@models/Blog/Code";

Refractor.registerLanguage(ts);
Refractor.registerLanguage(js);
Refractor.registerLanguage(css);
Refractor.registerLanguage(html);

interface PostContentProps {
  content: any[];
}

interface ImageBlockProps {
  image: SanityImageWithAlt;
}

interface CodeBlockProps {
  code: BlockCode;
}

const ImageBlock = ({ image }: ImageBlockProps) => (
  <div className="p-2">
    <SanityImage
      image={image}
      className="blog-image"
      style={{ width: "100%", height: "auto" }}
      sizes="(max-width: 800px) 100vw, 800px"
    />

    <div className="image-alt">{image.alt}</div>
  </div>
);

const CodeBlock = ({ code: { language, code, filename } }: CodeBlockProps) => {
  const value = `// ${filename}\n${code}`;
  return <Refractor language={language} value={value} />;
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
