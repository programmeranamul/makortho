import Image from "next/image";

import { client } from "@/lib/sanity";
import { SanityDocument } from "next-sanity";
import Link from "next/link";

// const POSTS_QUERY = `*[
//   _type == "post"
//   && defined(slug.current)
// ]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;
const POSTS_QUERY = `*[_type == "post"]{ _id, title , slug}`;

const options = { next: { revalidate: 30 } };

export default async function Home() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);
  console.log("", posts)
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {
        posts.map((post) => (
          <div key={post._id} className="p-4 m-2 bg-white rounded shadow dark:bg-zinc-800">
            <Link href={`/posts/${post.slug?.current}`} className="text-lg font-bold text-gray-900 dark:text-white">
              {post.title}
            </Link>
          </div>
        ))
      }
    </div>
  );
}
