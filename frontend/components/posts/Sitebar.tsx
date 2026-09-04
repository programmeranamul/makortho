"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { formatDate } from "@/lib/formateDateTime";

type Section = { id: string; title: string };
type RecentPost = {
  _id: string;
  title: string;
  slug: string;
  imageUrl?: string;
  imageAlt?: string;
  category?: string;
  publishedAt: string;
};
type Category = { _id: string; name: string; slug: string; postCount: number };

function Sidebar({
  active,
  sections,
  recentPosts,
  categories,
}: {
  active: string;
  sections: Section[];
  recentPosts: RecentPost[];
  categories: Category[];
}) {
  return (
    <aside className="article-sidebar">
      {sections.length > 0 && (
        <div className="toc">
          <span className="eyebrow">On this page</span>
          {sections.map((section) => (
            <a
              className={active === section.id ? "active" : ""}
              key={section.id}
              href={`#${section.id}`}
            >
              {section.title}
            </a>
          ))}
        </div>
      )}

      {recentPosts.length > 0 && (
        <div className="sidebar-block">
          <div className="section-kicker">
            <span>Recent articles</span>
            <span className="rule" />
          </div>
          <div className="recent-list">
            {recentPosts.map((post) => (
              <Link
                className="recent-item"
                href={`/posts/${post.slug}`}
                key={post._id}
              >
                {post.imageUrl && (
                  <Image
                    src={post.imageUrl}
                    alt={post.imageAlt || ""}
                    width={96}
                    height={72}
                  />
                )}
                <span>
                  <b>{post.title}</b>
                  <small>
                    {post.category} · {formatDate(post.publishedAt)}
                  </small>
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {categories.length > 0 && (
        <div className="sidebar-block">
          <div className="section-kicker">
            <span>Categories</span>
            <span className="rule" />
          </div>
          <div className="category-list">
            {categories.map((category) => (
              <Link href={`/?category=${category.slug}#articles`} key={category._id}>
                <span>{category.name}</span>
                <small>{category.postCount}</small>
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}

export default function BlogPageSidebar({
  sections,
  recentPosts,
  categories,
}: {
  sections: Section[];
  recentPosts: RecentPost[];
  categories: Category[];
}) {
  const [active, setActive] = useState(sections[0]?.id ?? "");
  const headings = useMemo(
    () => sections.map((section) => section.id),
    [sections],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (entry) => entry.isIntersecting && setActive(entry.target.id),
        ),
      { rootMargin: "-18% 0px -65% 0px" },
    );

    headings.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  return (
    <div className="desktop-sidebar">
      <Sidebar
        active={active}
        sections={sections}
        recentPosts={recentPosts}
        categories={categories}
      />
    </div>
  );
}
