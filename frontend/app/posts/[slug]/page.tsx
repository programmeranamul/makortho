import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";
import {
  getPostDetails,
  getRelatedPosts,
  getRecentPosts,
  getSidebarCategories,
} from "@/lib/sanity/api";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clipboard,
  Link2,
  Mail,
  Share2,
} from "lucide-react";
import { portableTextComponents } from "@/components/posts/PortableTextComponents";
import ShareTools from "@/components/posts/ShareTools";
import BlogPageSidebar from "@/components/posts/Sitebar";
import MedicalDisclaimer from "@/components/posts/MedicalDisclaimer";
import RelatedPosts from "@/components/posts/RelatedPosts";



export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;

  const article = await getPostDetails(resolvedParams.slug);
  const [recentPosts, sidebarCategories, relatedPosts] = await Promise.all([
    getRecentPosts(article._id),
    getSidebarCategories(),
    getRelatedPosts(article._id, article.category?._id),
  ]);
  const sections = (article.content ?? [])
    .filter((block: { _type?: string; style?: string; _key?: string }) =>
      block._type === "block" && block.style === "h2" && Boolean(block._key),
    )
    .map((block: { _key: string; children?: { text?: string }[] }) => ({
      id: `section-${block._key}`,
      title: (block.children ?? []).map((child) => child.text ?? "").join(""),
    }))
    .filter((section: { title: string }) => Boolean(section.title));
  console.log("article", article);

  const articleImageUrl = urlFor(article.coverImage).width(550).url()
  return (
    <>
      <main className="article-page page-width">
        <div className="article-layout">
          <article>
            <header className="article-header">
              <span className="eyebrow">{article.category.name}</span>
              <h1>{article.title}</h1>
              <div className="article-byline">
                <span>{article.date}</span>
                <span>{article.read}</span>
                <span>{article.author}</span>
              </div>
              <p className="updated">Updated {article.updated}</p>
            </header>
            <Image
              priority
              src={articleImageUrl}
              alt={article.coverImage.alt || article.title}
              className="aspect-video rounded-xl"
              width="550"
              height="310"
            />

            <div className="article-reading">
              <div className="">
                <PortableText
                  value={article.content}
                  components={portableTextComponents}
                />
       ``       </div>

              <ShareTools />
              <MedicalDisclaimer />
              
            </div>
            <RelatedPosts relatedPosts={relatedPosts} />
            <nav className="article-nav" aria-label="Article navigation">
              <a href="/post/seasonal-illnesses">
                <small>
                  <ArrowLeft size={14} /> Previous article
                </small>
                <b>Understanding common seasonal illnesses</b>
              </a>
              <a href="/post/healthy-heart">
                <small>
                  Next article <ArrowRight size={14} />
                </small>
                <b>How to maintain a healthy heart</b>
              </a>
            </nav>
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

      {/* <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <Link href="/" className="hover:underline">
        ← Back to posts
      </Link>
      {postImageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <Image
          src={postImageUrl}
          alt={post.title}
          className="aspect-video rounded-xl"
          width="550"
          height="310"
        />
      )}
      <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
      <div className="prose">
        <p>Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
        {Array.isArray(post.body) && <PortableText value={post.body} />}
      </div>
    </main> */}
    </>
  );
}
