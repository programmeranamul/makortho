import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url";
import Image from "next/image";
import Link from "next/link";
import { getExcerpt, getReadingTime } from "@/lib/article";
import { formatDate } from "@/lib/formateDateTime";
import { urlFor } from "@/lib/sanity/image";

type PostCardProps = {
  post: {
    _id: string;
    title: string;
    slug?: {
      current?: string;
    };
    coverImage?: SanityImageSource;
    content?: PortableTextBlock[];
    category?: {
      _id?: string;
      name?: string;
      slug?: {
        current?: string;
      };
    };
    publishedAt?: string;
  };
};

function PostCard({ post }: PostCardProps) {
  const excerpt = getExcerpt(post.content ?? []);
  const readingTime = getReadingTime(post.content ?? []);

  return (
    <article className="post-card">
      <Link href={`/posts/${post.slug?.current ?? ""}`}>
        <Image
          src={post.coverImage ? urlFor(post.coverImage).width(800).url() : "/"}
          alt={post.title}
          width={800}
          height={500}
        />

        <div className="post-body">
          <span className="eyebrow">{post.category?.name}</span>

          <h3>{post.title}</h3>

          <p>{excerpt}</p>

          <div className="post-meta">
            <span>{formatDate(post.publishedAt ?? "")}</span>
            <span>{readingTime}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default PostCard;
