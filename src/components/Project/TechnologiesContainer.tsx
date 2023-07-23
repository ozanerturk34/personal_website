import type { Technology } from "@models/Project";
import TechnologyLabel from "./TechnologyLabel";

interface TechnologiesContainerProps {
  technologies: Technology[];
}

const TechnologiesContainer = ({
  technologies,
}: TechnologiesContainerProps) => {
  return (
    <div>
      {technologies.map((technology) => (
        <TechnologyLabel technology={technology} key={technology.name} />
      ))}
    </div>
  );
};

export default TechnologiesContainer;
