// SmartMathJax.tsx
import React from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";

/**
 * parseMath - splits input into text/math parts. Math delimiters:
 * $$ ... $$, \[ ... \], $ ... $, \( ... \)
 */
function parseMath(input: string) {
  const parts: Array<{
    type: "text" | "math";
    content: string;
    display?: boolean;
  }> = [];
  let i = 0;
  const len = input.length;

  const findNextDelimiter = (from: number) => {
    const candidates = [
      { delim: "$$", idx: input.indexOf("$$", from) },
      { delim: "\\[", idx: input.indexOf("\\[", from) },
      { delim: "\\(", idx: input.indexOf("\\(", from) },
      // single $: must be not escaped
      {
        delim: "$",
        idx: (() => {
          let idx = input.indexOf("$", from);
          while (idx !== -1 && idx > 0 && input[idx - 1] === "\\") {
            idx = input.indexOf("$", idx + 1);
          }
          return idx;
        })(),
      },
    ].filter((c) => c.idx !== -1);
    if (candidates.length === 0) return null;
    candidates.sort((a, b) => a.idx - b.idx);
    return candidates[0];
  };

  while (i < len) {
    const next = findNextDelimiter(i);
    if (!next) {
      parts.push({ type: "text", content: input.slice(i) });
      break;
    }

    if (next.idx > i) {
      parts.push({ type: "text", content: input.slice(i, next.idx) });
    }

    const start = next.idx;
    if (next.delim === "$$") {
      const end = input.indexOf("$$", start + 2);
      if (end === -1) {
        // no closing, treat remainder as text
        parts.push({ type: "text", content: input.slice(start) });
        break;
      }
      const content = input.slice(start + 2, end);
      parts.push({ type: "math", content, display: true });
      i = end + 2;
      continue;
    }

    if (next.delim === "\\[") {
      const end = input.indexOf("\\]", start + 2);
      if (end === -1) {
        parts.push({ type: "text", content: input.slice(start) });
        break;
      }
      const content = input.slice(start + 2, end);
      parts.push({ type: "math", content, display: true });
      i = end + 2;
      continue;
    }

    if (next.delim === "\\(") {
      const end = input.indexOf("\\)", start + 2);
      if (end === -1) {
        parts.push({ type: "text", content: input.slice(start) });
        break;
      }
      const content = input.slice(start + 2, end);
      parts.push({ type: "math", content, display: false });
      i = end + 2;
      continue;
    }

    // single $ (inline)
    if (next.delim === "$") {
      // find next unescaped $
      let end = input.indexOf("$", start + 1);
      while (end !== -1 && input[end - 1] === "\\") {
        end = input.indexOf("$", end + 1);
      }
      if (end === -1) {
        parts.push({ type: "text", content: input.slice(start) });
        break;
      }
      const content = input.slice(start + 1, end);
      parts.push({ type: "math", content, display: false });
      i = end + 1;
      continue;
    }

    // fallback
    parts.push({ type: "text", content: input.slice(start) });
    break;
  }

  return parts;
}

/** simple html-escape to avoid injecting HTML */
function escapeHtml(str: string) {
  return str;
}

/** render plain text safely preserving newlines */
function RenderText({ text }: { text: string }) {
  const safe = escapeHtml(text).replace(/\\\$/g, "$"); // unescape escaped dollar if teacher typed \$
  // split by newline to render <br/>
  const lines = safe.split("\n");
  return (
    <>
      {lines.map((line, idx) => (
        <React.Fragment key={idx}>
          {line}
          {idx < lines.length - 1 && <br />}
        </React.Fragment>
      ))}
    </>
  );
}

const mathJaxConfig = {
  loader: {
    load: ["input/tex", "output/chtml"],
  },
  options: {
    enableMenu: false, // disables menu
    renderActions: {
      addMenu: [], // removes menu completely
    },
    a11y: {
      speech: false,
      braille: false,
    },
  },
  startup: {
    typeset: true,
  },
};

export default function SmartMathJax({ text }: { text: string }) {
  const parts = React.useMemo(() => parseMath(text), [text]);

  // Put MathJaxContext at top-level of your app if you prefer
  return (
    <MathJaxContext config={mathJaxConfig}>
      {parts.map((p, i) =>
        p.type === "text" ? (
          <span key={i}>
            <RenderText text={p.content} />
          </span>
        ) : (
          // Wrap math content in LaTeX delimiters again so MathJax knows how to typeset
          <MathJax inline key={i}>
            {p.display ? `\\[${p.content}\\]` : `\\(${p.content}\\)`}
          </MathJax>
        ),
      )}
    </MathJaxContext>
  );
}
