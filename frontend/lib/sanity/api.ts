import { client } from "./client";

const POSTS_QUERY = `*[
  _type == "post"
] | order(publishedAt desc) {
  _id,
  title,
  slug,
  coverImage,
  content,
  publishedAt,
  featured,
  category-> {
    _id,
    name,
    slug
  }
}`;

export async function getPosts() {
  return client.fetch(POSTS_QUERY);
}

const FEATURED_POST_QUERY = `*[
  _type == "post" &&
  featured == true
] | order(publishedAt desc)[0...3] {
  _id,
  title,
  slug,
  coverImage,
  content,
  category-> {
    _id,
    name,
    slug
  },
  publishedAt
}`;

export async function getFeaturedPost() {
  return client.fetch(FEATURED_POST_QUERY);
}

const CATEGORIES_QUERY = `*[_type == "category"]{ _id, name, slug }`;

export async function getCategories() {
  return client.fetch(CATEGORIES_QUERY);
}
