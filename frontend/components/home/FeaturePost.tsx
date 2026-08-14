import Image from "next/image"
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image"

import { ArrowUpRight} from "lucide-react";
import {formatDate} from "@/lib/formateDateTime"
import {
  getExcerpt,
  getReadingTime,
} from "@/lib/article";

export default function FeaturePost ({posts}) {
    return (
        <>
        <section className="featured-section page-width">
          <div className="section-kicker">
            <span>Start here</span>
            <span className="rule" />
          </div>
          {
            posts.map(post => {
                 const excerpt = getExcerpt(post.content);
  const readingTime = getReadingTime(post.content);
                return(<article key={post._id} className="featured">
            <Image
  src={urlFor(post.coverImage).width(1000).url()}
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
                <span>{formatDate(post.publishedAt)}</span>
                <span>{readingTime}</span>
              </div>
              <Link className="text-link" href={`/posts/${post.slug?.current}`} >
                Read article <ArrowUpRight size={16} />
              </Link>
            </div>
          </article>)})
          }
          
        </section>
        </>
    )
}