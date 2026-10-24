import ReactMarkdown from "react-markdown";

/** Markdown renderer for blog posts, mapped onto the site's type and surfaces. */
export default function ArticleBody({ content }: { content: string }) {
  return (
    <div className="text-base leading-[1.5] text-silver-mist md:text-xl md:leading-[1.5]">
      <ReactMarkdown
        components={{
          h1: ({ ...props }) => (
            <h1 className="heading mt-12 mb-5" {...props} />
          ),
          h2: ({ ...props }) => (
            <h2 className="heading mt-12 mb-5 text-[1.6rem]" {...props} />
          ),
          h3: ({ ...props }) => (
            <h3 className="subheading mt-9 mb-4" {...props} />
          ),
          p: ({ ...props }) => <p className="mb-5" {...props} />,
          a: ({ ...props }) => (
            <a
              className="link-mist"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          strong: ({ ...props }) => (
            <strong className="font-medium text-liquid-mist" {...props} />
          ),
          code: ({ ...props }) => (
            <code
              className="rounded-[6px] bg-liquid-kelp px-1.5 py-0.5 font-mono text-[0.9em] text-liquid-mist"
              {...props}
            />
          ),
          pre: ({ ...props }) => (
            <pre
              className="mb-6 overflow-x-auto rounded-[6px] bg-liquid-deep p-5 text-sm leading-[1.5] [&_code]:bg-transparent [&_code]:p-0"
              {...props}
            />
          ),
          ul: ({ ...props }) => (
            <ul className="mb-5 list-disc space-y-2 pl-6 marker:text-aqua" {...props} />
          ),
          ol: ({ ...props }) => (
            <ol className="mb-5 list-decimal space-y-2 pl-6 marker:text-aqua" {...props} />
          ),
          blockquote: ({ ...props }) => (
            <blockquote
              className="my-6 border-l-2 border-aqua/60 pl-5 text-ash"
              {...props}
            />
          ),
          hr: ({ ...props }) => (
            <hr className="my-10 border-white/10" {...props} />
          ),
          img: ({ alt, ...props }) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className="my-6 w-full rounded-[6px]"
              alt={alt ?? ""}
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
