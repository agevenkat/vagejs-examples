import { collection, html, raw, type Layout } from "vagejs";
import { shell } from "./shell.ts";

// Writing index: every post under /blog/, newest first. New posts appear here automatically.
const layout: Layout = (props) => {
  const posts = collection(props.pages, { under: "/blog/", sort: "date" });
  const fmt = (d: unknown) => (typeof d === "string" ? new Date(`${d}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }) : "");
  const main = html`<section class="prose page">${raw(props.content)}</section>
<ul class="posts posts-index">
  ${posts.map((p) => html`<li><a href="${p.route}">${p.title}</a><span>${p.frontmatter.datePublished ? html`<time datetime="${p.frontmatter.datePublished}">${fmt(p.frontmatter.datePublished)}</time> · ` : ""}${String(p.frontmatter.description ?? "")}</span></li>`)}
</ul>`;
  return shell(props, String(main));
};

export default layout;
