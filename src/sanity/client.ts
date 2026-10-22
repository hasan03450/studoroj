import { createClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "./env";

export const client = createClient({
  projectId: isSanityConfigured ? projectId : "not-configured",
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});
