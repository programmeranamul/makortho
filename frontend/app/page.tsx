import Image from "next/image";

import { client } from "@/lib/sanity/client";
import { getPosts, getFeaturedPost, getCategories } from "@/lib/sanity/api";
import { SanityDocument } from "next-sanity";
import Link from "next/link";

import Hero from "@/components/home/Hero";
import FeaturePost from "@/components/home/FeaturePost";
import TheLatest from "@/components/home/TheLatest";
import About from "@/components/home/About";
import NewsLatter from "@/components/home/NewsLatter";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: initialCategory } = await searchParams;
  const [posts, categories] = await Promise.all([getPosts(), getCategories()]);

  const featuredPost = await getFeaturedPost();
  return (
    <>
    <main>
      <Hero />

      <FeaturePost posts={featuredPost} />
      <TheLatest
        posts={posts}
        categories={categories}
        initialCategory={
          categories.some(
            (category: { slug?: { current?: string } }) =>
              category.slug?.current === initialCategory,
          )
            ? initialCategory
            : "All"
        }
      />
      <About />
      <NewsLatter />      
    </main>
    </>
  );
}
