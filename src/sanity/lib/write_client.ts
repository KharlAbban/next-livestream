import "server-only";

import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, token } from "../env";

export const sanityWriteClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
});

if (!sanityWriteClient.config().token) {
  throw new Error("The SANITY_WRITE_TOKEN environment variable is not set");
}
