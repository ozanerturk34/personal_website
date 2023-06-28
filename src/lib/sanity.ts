import { type ClientConfig, createClient } from "@sanity/client";

const config: ClientConfig = {
  dataset: process.env.SANITY_DATASET_NAME,
  projectId: process.env.SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === "production",
};

const sanityClient = createClient(config);

export default sanityClient;
