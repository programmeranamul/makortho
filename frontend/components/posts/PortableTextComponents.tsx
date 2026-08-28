import Image from "next/image";
import Link from "next/link";
import type { PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/lib/sanity/image";
export const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-3 text-base leading-7 text-foreground/85 md:text-[17px]">
        {" "}
        {children}{" "}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="!mt-10 !mb-4 text-2xl font-bold  md:text-3xl">
        {" "}
        {children}{" "}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="!mt-8 !mb-3 text-xl font-semibold md:text-2xl">
        {" "}
        {children}{" "}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="!mt-7 !mb-3 text-lg font-semibold"> {children} </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-7 border-l-4 pl-5 text-lg italic leading-8 text-muted-foreground">
        {" "}
        {children}{" "}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-5 list-disc space-y-2 pl-7 text-base leading-7 md:text-[17px]">
        {" "}
        {children}{" "}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-5 list-decimal space-y-2 pl-7 text-base leading-7 md:text-[17px]">
        {" "}
        {children}{" "}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-1">{children}</li>,
    number: ({ children }) => <li className="pl-1">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em]">
        {" "}
        {children}{" "}
      </code>
    ),
    link: ({ children, value }) => {
      const href = value?.href;
      if (!href) {
        return <>{children}</>;
      }
      const isExternal =
        href.startsWith("http://") || href.startsWith("https://");
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 hover:opacity-70"
          >
            {" "}
            {children}{" "}
          </a>
        );
      }
      return (
        <Link
          href={href}
          className="font-medium underline underline-offset-4 hover:opacity-70"
        >
          {" "}
          {children}{" "}
        </Link>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) {
        return null;
      }
      const imageUrl = urlFor(value).width(1200).quality(90).url();
      return (
        <figure className="my-8">
          {" "}
          <div className="overflow-hidden rounded-xl border bg-muted">
            {" "}
            <Image
              src={imageUrl}
              alt={value.alt || "Article image"}
              width={1200}
              height={800}
              className="h-auto w-full object-cover"
            />{" "}
          </div>{" "}
          {value.caption && (
            <figcaption className="mt-3 text-center text-sm leading-6 text-muted-foreground">
              {" "}
              {value.caption}{" "}
            </figcaption>
          )}{" "}
        </figure>
      );
    },
    code: ({ value }) => {
      if (!value?.code) {
        return null;
      }
      return (
        <div className="my-8 overflow-hidden rounded-xl border bg-muted">
          {" "}
          {value.filename && (
            <div className="border-b px-4 py-2 text-sm text-muted-foreground">
              {" "}
              {value.filename}{" "}
            </div>
          )}{" "}
          <pre className="overflow-x-auto p-5 text-sm leading-7">
            {" "}
            <code>{value.code}</code>{" "}
          </pre>{" "}
        </div>
      );
    },
  },
};
