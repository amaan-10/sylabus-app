export function parseMath(input: string) {
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
