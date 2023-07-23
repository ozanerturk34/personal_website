import SanityImage from "@components/SanityImage";

import type { Technology } from "@models/Project";

interface TechnologyLabelProps {
  technology: Technology;
}

const TechnologyLabel = ({ technology }: TechnologyLabelProps) => {
  return (
    <div>
      <SanityImage image={technology.logo} />
    </div>
  );
};

export default TechnologyLabel;
