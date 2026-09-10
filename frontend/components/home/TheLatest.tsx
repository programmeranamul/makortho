"use client";

import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import PostCard from "./../PostCard";

type Category = {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
};

type Post = {
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

type TheLatestProps = {
  posts: Post[];
  categories: Category[];
  initialCategory?: string;
};

function TheLatest({ posts, categories, initialCategory = "All" }: TheLatestProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);

  const filteredPosts = useMemo(() => {
    return posts.filter((post: Post) => {
      // Category filtering
      const matchesCategory =
        category === "All" ||
        post.category?.slug?.current === category;

      // Search filtering
      const matchesSearch =
        post.title
          .toLowerCase()
          .includes(query.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [posts, category, query]);

  return (
    <section id="articles" className="articles-section page-width">

      <div className="section-heading">
        <div>
          <span className="eyebrow">The latest</span>
          <h2>From the journal</h2>
        </div>

        <div className="search-box">
          <Search size={17} />

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles"
            aria-label="Search articles"
          />
        </div>
      </div>

      <div id="categories" className="filters">

        {/* All */}
        <button
          className={
            category === "All"
              ? "filter active"
              : "filter"
          }
          onClick={() => setCategory("All")}
        >
          All
        </button>

        {/* Categories */}
        {categories.map((item: Category) => (
          <button
            key={item._id}
            className={
              category === item.slug.current
                ? "filter active"
                : "filter"
            }
            onClick={() =>
              setCategory(item.slug.current)
            }
          >
            {item.name}
          </button>
        ))}

      </div>

      {filteredPosts.length > 0 ? (
        <div className="post-grid">

          {filteredPosts.map((post: Post) => (
            <PostCard
              key={post._id}
              post={post}
            />
          ))}

        </div>
      ) : (
        <div className="empty">
          No articles found. Try a different search or category.
        </div>
      )}

    </section>
  );
}

export default TheLatest;
