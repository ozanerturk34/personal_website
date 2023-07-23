import { Resource } from "@models/Project";
import ResourceLabel from "./ResourceLabel";

interface ResourcesContainerProps {
  resources: Resource[];
}

const ResourcesContainer = ({ resources }: ResourcesContainerProps) => {
  return (
    <div>
      {resources.map((resource) => (
        <ResourceLabel key={resource.link} resource={resource} />
      ))}
    </div>
  );
};

export default ResourcesContainer;
