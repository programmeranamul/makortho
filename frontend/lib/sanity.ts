
import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "6pndmy7w",
  dataset: "production",
  apiVersion: "2026-05-15",
  useCdn: false,
});