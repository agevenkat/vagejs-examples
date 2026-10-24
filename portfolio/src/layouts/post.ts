import { escapeHtml, html, raw, type Layout } from "vagejs";
import { shell } from "./shell.ts";

// A blog post: date and author under the title, then the text.
const layout: Layout = (props) => {
  const fm = props.page.frontmatter;
  const date = typeof fm.datePublished === "string" ? new Date(`${fm.datePublished}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }) : "";
  const body = props.content.replace(/^\s*(<h1[^>]*>[\s\S]*?<\/h1>)/, (h1) => `${h1}<p class="byline"><time datetime="${escapeHtml(String(fm.datePublished))}">${escapeHtml(date)}</time> · ${escapeHtml(String(fm.author ?? ""))}</p>`);
  return shell(props, String(html`<article class="prose page post"><p class="eyebrow"><a href="/blog/">Writing</a></p>${raw(body)}</article>`));
};

export default layout;
