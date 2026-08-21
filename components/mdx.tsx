import type { ComponentType, ReactNode } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";

/*
  Shared MDX rendering with the site's prose styles. Section headings render
  as the same mono margin-label style used across the site; <R> wraps a
  measured value so numbers read as instrument readings, in mono and amber.
*/

const link =
  "underline underline-offset-4 decoration-line-strong hover:decoration-ink";

const baseComponents = {
  h2: (props: { children?: ReactNode }) => (
    <h2 className="label mt-12 mb-4">{props.children}</h2>
  ),
  h3: (props: { children?: ReactNode }) => (
    <h3 className="mt-8 mb-3 font-semibold">{props.children}</h3>
  ),
  p: (props: { children?: ReactNode }) => (
    <p className="mb-4 leading-relaxed">{props.children}</p>
  ),
  ul: (props: { children?: ReactNode }) => (
    <ul className="mb-4 flex flex-col gap-2.5 pl-5 list-disc marker:text-line-strong">
      {props.children}
    </ul>
  ),
  ol: (props: { children?: ReactNode }) => (
    <ol className="mb-4 flex flex-col gap-2.5 pl-5 list-decimal marker:text-slate">
      {props.children}
    </ol>
  ),
  li: (props: { children?: ReactNode }) => (
    <li className="leading-relaxed">{props.children}</li>
  ),
  a: (props: { children?: ReactNode; href?: string }) => (
    <a href={props.href} className={link}>
      {props.children}
    </a>
  ),
  blockquote: (props: { children?: ReactNode }) => (
    <blockquote className="mb-4 border-l-2 border-line-strong pl-4 text-slate">
      {props.children}
    </blockquote>
  ),
  pre: (props: { children?: ReactNode }) => (
    <pre className="mb-4 overflow-x-auto border border-line-strong bg-panel p-4 text-[0.85rem] leading-relaxed [&_code]:text-ink">
      {props.children}
    </pre>
  ),
  code: (props: { children?: ReactNode }) => (
    <code className="reading text-[0.9em]">{props.children}</code>
  ),
  R: (props: { children?: ReactNode }) => (
    <span className="reading text-[0.92em] text-signal">{props.children}</span>
  ),
};

export function Mdx({
  source,
  components = {},
}: {
  source: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  components?: Record<string, ComponentType<any>>;
}) {
  return (
    <MDXRemote source={source} components={{ ...baseComponents, ...components }} />
  );
}
