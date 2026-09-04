import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "@/lib/sanity/image";
import {
  getAdjacentPosts,
  getPostDetails,
  getRelatedPosts,
  getRecentPosts,
  getSidebarCategories,
} from "@/lib/sanity/api";
import { Link2 } from "lucide-react";
import { portableTextComponents } from "@/components/posts/PortableTextComponents";
import ShareTools from "@/components/posts/ShareTools";
import BlogPageSidebar from "@/components/posts/Sitebar";
import MedicalDisclaimer from "@/components/posts/MedicalDisclaimer";
import RelatedPosts from "@/components/posts/RelatedPosts";
import ArticleNavigation from "@/components/posts/ArticleNavigation";

function getImageUrl(
  image: SanityImageSource | undefined,
  width: number,
  height?: number,
) {
  if (!image) {
    return undefined;
  }

  const builder = urlFor(image).width(width);
  return height ? builder.height(height).fit("crop").url() : builder.url();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPostDetails(slug);

  if (!article) {
    return {};
  }

  const title = article.seo?.metaTitle || article.title;
  const description = article.seo?.metaDescription;
  const socialImage = getImageUrl(
    article.seo?.ogImage || article.coverImage,
    1200,
    630,
  );

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: article.publishedAt,
      images: socialImage ? [{ url: socialImage }] : undefined,
    },
  };
}



export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;

  const article = await getPostDetails(resolvedParams.slug);
  if (!article) {
    notFound();
  }

  const [recentPosts, sidebarCategories, relatedPosts, adjacentPosts] = await Promise.all([
    getRecentPosts(article._id).catch(() => []),
    getSidebarCategories().catch(() => []),
    getRelatedPosts(article._id, article.category?._id).catch(() => []),
    getAdjacentPosts(article._id, article.publishedAt).catch(() => ({
      previous: null,
      next: null,
    })),
  ]);
  const sections = (article.content ?? [])
    .filter(
      (block) =>
        block._type === "block" &&
        block.style === "h2" &&
        typeof block._key === "string",
    )
    .map((block) => {
      const children = Array.isArray(block.children) ? block.children : [];
      return {
        id: `section-${block._key}`,
        title: children
          .map((child) =>
            typeof child === "object" &&
            child !== null &&
            "text" in child &&
            typeof child.text === "string"
              ? child.text
              : "",
          )
          .join(""),
      };
    })
    .filter((section: { title: string }) => Boolean(section.title));
  const articleImageUrl = getImageUrl(article.coverImage, 550, 310);
  return (
    <>
      <main className="article-page page-width">
        <div className="article-layout">
          <article>
            <header className="article-header">
              <span className="eyebrow">
                {article.category?.name || "Uncategorized"}
              </span>
              <h1>{article.title}</h1>
              <div className="article-byline">
                <span>{article.date}</span>
                <span>{article.read}</span>
                <span>{article.author}</span>
              </div>
              <p className="updated">Updated {article.updated}</p>
            </header>
            {articleImageUrl && (
              <Image
                priority
                src={articleImageUrl}
                alt={article.coverImage?.alt || article.title}
                className="w-full h-auto object-cover rounded-xl"
                width={550}
                height={310}
              />
            )}

            <div className="article-reading">
              <div className="">
                <PortableText
                  value={article.content}
                  components={portableTextComponents}
                />
             </div>

              <ShareTools articleTitle={article.title} />
              <MedicalDisclaimer />
              
            </div>
            <RelatedPosts relatedPosts={relatedPosts} />
            <ArticleNavigation
              previous={adjacentPosts.previous}
              next={adjacentPosts.next}
            />
            <Link className="back-blog" href="/#articles">
              <Link2 size={15} /> Back to all articles
            </Link>
          </article>
          <BlogPageSidebar
            sections={sections}
            recentPosts={recentPosts}
            categories={sidebarCategories}
          />
        </div>
      </main>

    </>
  );
}
