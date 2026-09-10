import Link from "next/link";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer>
      <div className="footer-wrap page-width">
        <Link href="/" className="brand">
          <span className="brand-mark">MC</span>
          <span>
            <strong>Dr. Maya Chen</strong>
            <small>Medical education for everyday life.</small>
          </span>
        </Link>
        <div className="footer-links">
          <Link href="/#articles">Blog</Link>
          <Link href="/#about">About</Link>
          <Link href="/#categories">Categories</Link>
          <a href="mailto:hello@drmayachen.com">Contact</a>
        </div>
        <div className="socials">
          <a href="mailto:hello@drmayachen.com" aria-label="Email Dr. Chen">
            <Mail size={17} />
          </a>
        </div>
      </div>
      <div className="copyright page-width">
        © 2026 Maya Chen, MD. For educational purposes only.
      </div>
    </footer>
  );
}