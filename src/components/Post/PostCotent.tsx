interface PostContentProps {
  content: string;
}

const PostContent = ({ content }: PostContentProps) => (
  <div dangerouslySetInnerHTML={{ __html: content }} />
);

export default PostContent;
