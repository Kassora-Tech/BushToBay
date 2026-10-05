import { Fragment } from "react";

// Renders a post caption with #hashtags and @mentions picked out in the brand colour.
export function Caption({ text, className }: { text: string; className?: string }) {
  // Split on whitespace but keep it, so line breaks and spacing survive.
  const tokens = text.split(/(\s+)/);
  return (
    <p className={className}>
      {tokens.map((token, i) => {
        const tag = /^([#@][\w.]*\w)(.*)$/.exec(token);
        if (!tag) return <Fragment key={i}>{token}</Fragment>;
        return (
          <Fragment key={i}>
            <span className="font-medium text-bush-600 dark:text-bush-400">{tag[1]}</span>
            {tag[2]}
          </Fragment>
        );
      })}
    </p>
  );
}
