import React from 'react'
import {getRelatedPosts} from "@/lib/sanity/api";
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from "@/lib/formateDateTime";


type RelatedPost = {
  _id: string;
  title: string;
  slug: string;
  imageUrl?: string;
  imageAlt?: string;
  category?: string;
  publishedAt: string;
};

function RelatedPosts({ relatedPosts }: { relatedPosts: RelatedPost[] }   ) {
  return (
    <>
      {relatedPosts.length > 0 && (
              <section className="related-section">
                <div className="section-kicker">
                  <span>Keep reading</span>
                  <span className="rule" />
                </div>
                <h2>Related articles</h2>
                <div className="related-grid">
                  {relatedPosts.map((post: RelatedPost) => (
                    <Link
                      className="related-card"
                      href={`/posts/${post.slug}`}
                      key={post._id}
                    >
                      {post.imageUrl && (
                        <Image
                          src={post.imageUrl}
                          alt={post.imageAlt || post.title}
                          width={700}
                          height={450}
                        />
                      )}
                      <span className="eyebrow">{post.category}</span>
                      <h3>{post.title}</h3>
                      <small>{formatDate(post.publishedAt)}</small>
                    </Link>
                  ))}
                </div>
              </section>
            )}
    </>
  )
}

export default RelatedPosts
