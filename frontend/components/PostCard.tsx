import Image from "next/image";
import React from "react";
import { urlFor } from "@/lib/sanity/image";
import { getExcerpt, getReadingTime } from "@/lib/article";
import { formatDate } from "@/lib/formateDateTime";
import Link from "next/link";

function PostCard({ post }) {
  const excerpt = getExcerpt(post.content);
  const readingTime = getReadingTime(post.content);

  return (
    <article className="post-card">
      <Link href={`/posts/${post.slug?.current}`}>
        <Image
          src={urlFor(post.coverImage).width(800).url()}
          alt={post.title}
          width={800}
          height={500}
        />

        <div className="post-body">
          <span className="eyebrow">{post.category?.name}</span>

          <h3>{post.title}</h3>

          <p>{excerpt}</p>

          <div className="post-meta">
            <span>{formatDate(post.publishedAt)}</span>
            <span>{readingTime}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default PostCard;
