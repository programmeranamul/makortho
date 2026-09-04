"use client"

import { useState } from "react";
import { Check, Clipboard, Link2, Mail, Share2 } from "lucide-react";

export default function ShareTools({ articleTitle }: { articleTitle: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const openShareWindow = (network: "facebook" | "linkedin" | "whatsapp") => {
    const shareUrl = window.location.href;
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedMessage = encodeURIComponent(`${articleTitle} ${shareUrl}`);
    const destination = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${encodedMessage}`,
    }[network];

    window.open(destination, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="article-share" aria-label="Share this article">
      <span>
        <Share2 size={15} /> Share
      </span>
      <button onClick={copy} aria-label="Copy article link">
        {copied ? <Check size={15} /> : <Clipboard size={15} />}
      </button>
      <button
        type="button"
        onClick={() => openShareWindow("facebook")}
        aria-label="Share on Facebook"
      >
        <Link2 size={15} />
      </button>
      <button
        type="button"
        onClick={() => openShareWindow("linkedin")}
        aria-label="Share on LinkedIn"
      >
        <Link2 size={15} />
      </button>
      <button
        type="button"
        onClick={() => openShareWindow("whatsapp")}
        aria-label="Share on WhatsApp"
      >
        <Mail size={15} />
      </button>
    </div>
  );
}
