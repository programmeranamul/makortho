import { toPlainText } from "@portabletext/toolkit";

type PortableTextBlock = {
  _type: string;
  children?: {
    _type: string;
    text?: string;
  }[];
};

export function getExcerpt(
  content: PortableTextBlock[],
  wordLimit = 30
): string {
  if (!content || !Array.isArray(content)) {
    return "";
  }

  const plainText = toPlainText(content);

  const words = plainText.trim().split(/\s+/);

  if (words.length <= wordLimit) {
    return plainText.trim();
  }

  return `${words.slice(0, wordLimit).join(" ")}...`;
}

export function getReadingTime(
  content: PortableTextBlock[],
  wordsPerMinute = 200
): string {
  if (!content || !Array.isArray(content)) {
    return "1 min read";
  }

  const plainText = toPlainText(content).trim();

  if (!plainText) {
    return "1 min read";
  }

  const wordCount = plainText.split(/\s+/).length;

  const minutes = Math.max(
    1,
    Math.ceil(wordCount / wordsPerMinute)
  );

  return `${minutes} min read`;
}