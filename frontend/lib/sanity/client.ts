
import { createClient } from "next-sanity";

export const client = createClient({
  // projectId: "6pndmy7w",
  // dataset: "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2026-05-15",
  useCdn: false,
});