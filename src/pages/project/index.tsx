import type { GetStaticProps } from "next";

import { getAllProjects } from "@lib/api";

import type { Project } from "@models/Project";
import PageLayout from "@components/PageLayout";
import ProjectCard from "@components/Project/ProjectCard";

interface ProjectsProps {
  projects: Project[];
}

const Projects = ({ projects }: ProjectsProps) => {
  return (
    <PageLayout>
      <ul>
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </ul>
    </PageLayout>
  );
};

export const getStaticProps: GetStaticProps<ProjectsProps> = async () => {
  try {
    const projects = await getAllProjects();
    return {
      props: {
        projects,
      },
    };
  } catch (error) {
    console.error(error, "TODO error loggingss");
    return { notFound: true };
  }
};

export default Projects;
