import Link from "next/link";

import SanityImage from "@components/SanityImage";

import type { Resource } from "@models/Project";

interface ResourceLabelProps {
  resource: Resource;
}

const ResourceLabel = ({ resource }: ResourceLabelProps) => {
  return (
    <div>
      <SanityImage image={resource.source.logo} />
      <p>
        Link: <Link href={resource.link}>{resource.link}</Link>
      </p>
      <p>{resource.source.title}</p>
    </div>
  );
};

export default ResourceLabel;
