import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

type AdjacentPost = {
  _id: string;
  title: string;
  slug: string;
};

export default function ArticleNavigation({
  previous,
  next,
}: {
  previous?: AdjacentPost | null;
  next?: AdjacentPost | null;
}) {
  if (!previous && !next) {
    return null;
  }

  return (
    <nav className="article-nav" aria-label="Article navigation">
      {previous ? (
        <Link href={`/posts/${previous.slug}`}>
          <small>
            <ArrowLeft size={14} /> Previous article
          </small>
          <b>{previous.title}</b>
        </Link>
      ) : (
        <span />
      )}

      {next ? (
        <Link href={`/posts/${next.slug}`}>
          <small>
            Next article <ArrowRight size={14} />
          </small>
          <b>{next.title}</b>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
