import SanityImage from "@components/SanityImage";

import type { Project } from "@models/Project";
import TechnologiesContainer from "./TechnologiesContainer";
import ResourcesContainer from "./ResourcesContainer";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({
  project: { name, description, resources, technologies, thumbnail },
}: ProjectCardProps) => {
  return (
    <div className="p-3">
      <SanityImage image={thumbnail} />
      <h2 className="card-main-title">{name}</h2>
      <p>{description}</p>
      <TechnologiesContainer technologies={technologies} />
      <ResourcesContainer resources={resources} />
    </div>
  );
};

export default ProjectCard;
