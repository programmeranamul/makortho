import Image from "next/image";

import { client } from "@/lib/sanity/client";
import { getPosts, getFeaturedPost, getCategories } from "@/lib/sanity/api";
import { SanityDocument } from "next-sanity";
import Link from "next/link";

import Hero from "@/components/home/Hero";
import FeaturePost from "@/components/home/FeaturePost";
import TheLatest from "@/components/home/TheLatest";

export default async function Home() {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()]);

  const featuredPost = await getFeaturedPost();
  return (
    <>
      <Hero />

      <FeaturePost posts={featuredPost} />
      <TheLatest posts={posts} categories={categories} />
      <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        {posts.map((post) => (
          <div
            key={post._id}
            className="p-4 m-2 bg-white rounded shadow dark:bg-zinc-800"
          >
            <Link
              href={`/posts/${post.slug?.current}`}
              className="text-lg font-bold text-gray-900 dark:text-white"
            >
              {post.title}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
