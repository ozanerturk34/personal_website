import { readClient } from "@lib/sanity";

import { projectsFields } from "./definitions";

import type { Project } from "@models/Project";

export const getAllProjects = () =>
  readClient.fetch<Project[]>(`*[_type=='project']{ ${projectsFields} }`);
