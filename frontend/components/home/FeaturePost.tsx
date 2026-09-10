import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getExcerpt, getReadingTime } from "@/lib/article";
import { formatDate } from "@/lib/formateDateTime";
import { urlFor } from "@/lib/sanity/image";

type FeaturePostItem = {
  _id: string;
  title: string;
  slug?: {
    current?: string;
  };
  coverImage?: SanityImageSource;
  content?: PortableTextBlock[];
  publishedAt?: string;
};

type FeaturePostProps = {
  posts: FeaturePostItem[];
};

export default function FeaturePost({ posts }: FeaturePostProps) {
  return (
    <section className="featured-section page-width">
      <div className="section-kicker">
        <span>Start here</span>
        <span className="rule" />
      </div>

      {posts.map((post: FeaturePostItem) => {
        const excerpt = getExcerpt(post.content ?? []);
        const readingTime = getReadingTime(post.content ?? []);

        return (
          <article key={post._id} className="featured">
            <Image
              src={post.coverImage ? urlFor(post.coverImage).width(1000).url() : "/"}
              alt={post.title}
              width={1000}
              height={600}
              className="..."
            />
            <div className="featured-content">
              <span className="eyebrow">Featured article</span>
              <h2>{post.title}</h2>
              <p>{excerpt}</p>
              <div className="post-meta">
                <span>{formatDate(post.publishedAt ?? "")}</span>
                <span>{readingTime}</span>
              </div>
              <Link className="text-link" href={`/posts/${post.slug?.current ?? ""}`}>
                Read article <ArrowUpRight size={16} />
              </Link>
            </div>
          </article>
        );
      })}
    </section>
  );
}