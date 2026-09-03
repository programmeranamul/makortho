import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity/image";
import { getPostDetails } from "@/lib/sanity/api";
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

const recent = [
  {
    title: "How to Maintain a Healthy Heart",
    date: "Aug 08, 2026",
    category: "Cardiology",
    image:
      "https://images.unsplash.com/photo-1628348070889-cb656235b4eb?auto=format&fit=crop&w=240&q=80",
    slug: "healthy-heart",
  },
  {
    title: "Healthy Eating Habits for Adults",
    date: "Jul 29, 2026",
    category: "Nutrition",
    image:
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=240&q=80",
    slug: "healthy-eating",
  },
  {
    title: "When Should You Check Your Blood Pressure?",
    date: "Jul 18, 2026",
    category: "Preventive Care",
    image:
      "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=240&q=80",
    slug: "check-blood-pressure",
  },
  {
    title: "Understanding Common Seasonal Illnesses",
    date: "Jul 06, 2026",
    category: "General Medicine",
    image:
      "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=240&q=80",
    slug: "seasonal-illnesses",
  },
];
const categories = [
  ["Diabetes", "8"],
  ["Cardiology", "6"],
  ["Nutrition", "5"],
  ["General Medicine", "4"],
  ["Preventive Care", "3"],
];
const sections = [
  "What blood sugar means",
  "When numbers matter",
  "Building steadier habits",
  "When to call your clinician",
];
const related = [
  {
    title: "Diabetes and Exercise",
    category: "Diabetes",
    date: "Jun 30, 2026",
    image:
      "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=700&q=82",
    slug: "diabetes-and-exercise",
  },
  {
    title: "Healthy Eating for Blood Sugar",
    category: "Nutrition",
    date: "Jun 22, 2026",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=82",
    slug: "healthy-eating-blood-sugar",
  },
  {
    title: "Understanding Blood Pressure",
    category: "Preventive Care",
    date: "Jun 12, 2026",
    image:
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=700&q=82",
    slug: "understanding-blood-pressure",
  },
];





export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;

  const article = await getPostDetails(resolvedParams.slug);
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
              </div>

              <ShareTools />
              <div className="medical-disclaimer">
                <strong>Medical disclaimer</strong>
                <span>
                  This article is for general educational purposes only and does
                  not replace professional medical advice.
                </span>
              </div>
            </div>
            <section className="related-section">
              <div className="section-kicker">
                <span>Keep reading</span>
                <span className="rule" />
              </div>
              <h2>Related articles</h2>
              <div className="related-grid">
                {related.map((post) => (
                  <a
                    className="related-card"
                    href={`/post/${post.slug}`}
                    key={post.slug}
                  >
                    <img src={post.image} alt="" />
                    <span className="eyebrow">{post.category}</span>
                    <h3>{post.title}</h3>
                    <small>{post.date}</small>
                  </a>
                ))}
              </div>
            </section>
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
            <a className="back-blog" href="/#articles">
              <Link2 size={15} /> Back to all articles
            </a>
          </article>
          {/* <div className="desktop-sidebar">
            <Sidebar active={active} />
          </div> */}
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
