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

function ArticleBody() {
  return (
    <div className="article-body">
      <p>
        Blood sugar is one of the body&apos;s most closely watched signals. It
        changes throughout the day in response to food, movement, sleep, stress,
        and medication. A single reading is useful context, but it rarely tells
        the whole story.
      </p>
      <h2 id="section-1">What blood sugar means</h2>
      <p>
        Glucose is the main sugar in your bloodstream and a primary source of
        energy for your cells. Insulin helps move glucose from your blood into
        those cells. When that system is working well, levels rise after a meal
        and gradually return toward your usual range.
      </p>
      <p>
        For many adults, the goal is not a perfectly flat line. Healthy
        variation is expected. What matters most is the pattern over time and
        how those readings fit with your symptoms, medical history, and care
        plan.
      </p>
      <blockquote>
        Numbers are clues, not a verdict. The most useful measurement is the one
        you can understand in context.
      </blockquote>
      <h2 id="section-2">When numbers matter</h2>
      <p>
        Clinicians commonly discuss fasting glucose, readings taken after meals,
        and A1C. A fasting reading reflects your body after not eating
        overnight, while an A1C estimates your average glucose over roughly
        three months.
      </p>
      <h3>Look for patterns, not isolated spikes</h3>
      <p>
        A higher reading after a meal can be normal, especially after a meal
        rich in carbohydrates. Repeated highs, unexpected lows, or a major
        change from your usual pattern are worth bringing to your clinician.
        Keep a short log with the time, meal, activity, and symptoms so the
        conversation is specific.
      </p>
      <ul>
        <li>Measure at the times recommended for your care plan.</li>
        <li>Write down anything that may have changed your reading.</li>
        <li>Bring your meter or app history to appointments.</li>
      </ul>
      <figure>
        <img
          src="https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1100&q=85"
          alt="Person checking a health measurement at home"
        />
        <figcaption>
          Tracking a few consistent details can make trends easier to see.
        </figcaption>
      </figure>
      <h2 id="section-3">Building steadier habits</h2>
      <p>
        Small, repeatable choices often support steadier blood sugar better than
        an all-or-nothing plan. Aim for meals with protein, fiber, and
        satisfying carbohydrates; take a short walk when it feels safe; and make
        sleep a regular part of your health routine.
      </p>
      <h3>A practical starting point</h3>
      <ol>
        <li>Choose one meal to make more balanced this week.</li>
        <li>Add ten minutes of comfortable movement after a meal.</li>
        <li>Review the pattern after two weeks rather than judging one day.</li>
      </ol>
      <p>
        Stress also has a place in the conversation. Stress hormones can affect
        glucose even when you are eating and moving as usual. A few minutes of
        breathing, a conversation with someone you trust, or a consistent
        bedtime can be meaningful supports.
      </p>
      <h2 id="section-4">When to call your clinician</h2>
      <p>
        Reach out if readings are repeatedly outside the range you were given,
        if medication side effects make daily life difficult, or if you are
        unsure how to respond to a reading. Seek urgent care for severe
        confusion, fainting, trouble breathing, or symptoms that feel sudden and
        serious.
      </p>
      <p>
        Your care plan should be personal. This article is a starting point for
        a thoughtful conversation, not a replacement for one.
      </p>
    </div>
  );
}

// function ShareTools() {
//   const [copied, setCopied] = useState(false);
//   const copy = async () => {
//     await navigator.clipboard?.writeText(window.location.href);
//     setCopied(true);
//     window.setTimeout(() => setCopied(false), 1800);
//   };
//   return (
//     <div className="article-share" aria-label="Share this article">
//       <span>
//         <Share2 size={15} /> Share
//       </span>
//       <button onClick={copy} aria-label="Copy article link">
//         {copied ? <Check size={15} /> : <Clipboard size={15} />}
//       </button>
//       <a
//         href="https://www.facebook.com/sharer/sharer.php"
//         target="_blank"
//         rel="noreferrer"
//         aria-label="Share on Facebook"
//       >
//         <Link2 size={15} />
//       </a>
//       <a
//         href="https://www.linkedin.com/sharing/share-offsite/"
//         target="_blank"
//         rel="noreferrer"
//         aria-label="Share on LinkedIn"
//       >
//         <Link2 size={15} />
//       </a>
//       <a
//         href="https://wa.me/?text=Understanding%20Blood%20Sugar%20Levels"
//         target="_blank"
//         rel="noreferrer"
//         aria-label="Share on WhatsApp"
//       >
//         <Mail size={15} />
//       </a>
//     </div>
//   );
// }

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
              {/* <ArticleBody /> */}
              {/* <PortableText value={article.content} /> */}
              <div className="">
                <PortableText
                  value={article.content}
                  components={portableTextComponents}
                />
              </div>

              {/* <ShareTools /> */}
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
