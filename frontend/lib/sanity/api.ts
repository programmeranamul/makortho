import { client } from "./client";
import { defineQuery } from "next-sanity";
import { cache } from "react";
import type { ArbitraryTypedObject, PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url";

type SanityImage = SanityImageSource & { alt?: string };

export type PostDetails = {
  _id: string;
  title: string;
  coverImage?: SanityImage;
  content?: Array<PortableTextBlock | ArbitraryTypedObject>;
  category?: { _id: string; name: string; slug?: { current?: string } };
  publishedAt?: string;
  date?: string;
  read?: string;
  author?: string;
  updated?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: SanityImage;
  };
};

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

const RECENT_POSTS_QUERY = defineQuery(`*[
  _type == "post" &&
  defined(slug.current) &&
  _id != $currentPostId
] | order(publishedAt desc)[0...4] {
  _id,
  title,
  "slug": slug.current,
  "imageUrl": coverImage.asset->url,
  "imageAlt": coalesce(coverImage.alt, title),
  "category": category->name,
  publishedAt
}`);

export async function getRecentPosts(currentPostId: string) {
  return client.fetch(RECENT_POSTS_QUERY, { currentPostId });
}

const SIDEBAR_CATEGORIES_QUERY = defineQuery(`*[
  _type == "category" &&
  defined(slug.current)
] | order(name asc) {
  _id,
  name,
  "slug": slug.current,
  "postCount": count(*[_type == "post" && category._ref == ^._id])
}`);

export async function getSidebarCategories() {
  return client.fetch(SIDEBAR_CATEGORIES_QUERY);
}

const RELATED_POSTS_QUERY = defineQuery(`*[
  _type == "post" &&
  defined(slug.current) &&
  _id != $currentPostId &&
  category._ref == $categoryId
] | order(publishedAt desc)[0...3] {
  _id,
  title,
  "slug": slug.current,
  "imageUrl": coverImage.asset->url,
  "imageAlt": coalesce(coverImage.alt, title),
  "category": category->name,
  publishedAt
}`);

export async function getRelatedPosts(
  currentPostId: string,
  categoryId?: string,
) {
  if (!categoryId) {
    return [];
  }

  return client.fetch(RELATED_POSTS_QUERY, { currentPostId, categoryId });
}

const ADJACENT_POSTS_QUERY = defineQuery(`{
  "previous": *[
    _type == "post" &&
    defined(slug.current) &&
    defined(publishedAt) &&
    (publishedAt < $publishedAt ||
      (publishedAt == $publishedAt && _id < $currentPostId))
  ] | order(publishedAt desc, _id desc)[0] {
    _id,
    title,
    "slug": slug.current
  },
  "next": *[
    _type == "post" &&
    defined(slug.current) &&
    defined(publishedAt) &&
    (publishedAt > $publishedAt ||
      (publishedAt == $publishedAt && _id > $currentPostId))
  ] | order(publishedAt asc, _id asc)[0] {
    _id,
    title,
    "slug": slug.current
  }
}`);

export async function getAdjacentPosts(
  currentPostId: string,
  publishedAt?: string,
) {
  if (!publishedAt) {
    return { previous: null, next: null };
  }

  return client.fetch(ADJACENT_POSTS_QUERY, { currentPostId, publishedAt });
}

//blog page
const POST_QUERY = defineQuery(`*[
  _type == "post" &&
  slug.current == $slug
][0] {_id,title,slug,coverImage, content, category-> { _id, name, slug, description },
  publishedAt,featured, seo {
    metaTitle,
    metaDescription,
    ogImage
  }
}`);

export const getPostDetails = cache(async (slug: string) =>
  client.fetch<PostDetails | null>(POST_QUERY, { slug }),
);
