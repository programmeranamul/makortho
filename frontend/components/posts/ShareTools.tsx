"use client"

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clipboard,
  Link2,
  Mail,
  Share2,
} from "lucide-react";

export default function ShareTools() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };
  return (
    <div className="article-share" aria-label="Share this article">
      <span>
        <Share2 size={15} /> Share
      </span>
      <button onClick={copy} aria-label="Copy article link">
        {copied ? <Check size={15} /> : <Clipboard size={15} />}
      </button>
      <a
        href="https://www.facebook.com/sharer/sharer.php"
        target="_blank"
        rel="noreferrer"
        aria-label="Share on Facebook"
      >
        <Link2 size={15} />
      </a>
      <a
        href="https://www.linkedin.com/sharing/share-offsite/"
        target="_blank"
        rel="noreferrer"
        aria-label="Share on LinkedIn"
      >
        <Link2 size={15} />
      </a>
      <a
        href="https://wa.me/?text=Understanding%20Blood%20Sugar%20Levels"
        target="_blank"
        rel="noreferrer"
        aria-label="Share on WhatsApp"
      >
        <Mail size={15} />
      </a>
    </div>
  );
}