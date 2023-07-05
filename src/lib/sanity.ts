import { type ClientConfig, createClient } from "@sanity/client";

const config: ClientConfig = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET_NAME,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  perspective: "published",
};

const sanityClient = createClient(config);

export default sanityClient;
