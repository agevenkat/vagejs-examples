import { collection, html, raw, type Layout } from "vagejs";
import { day } from "./bakery.ts";
import { frame, split } from "./default.ts";

/** The news index: every post under /news/, newest first. New posts appear here by themselves. */
const layout: Layout = (props) => {
  const { heading, body } = split(props.content);
  const posts = collection(props.pages, { under: "/news/", sort: "date" });
  return frame(
    props,
    String(html`<article class="page">
  <header class="page-head"><h1>${raw(heading)}</h1></header>
  <div class="prose">${raw(body)}</div>
  <ul class="post-list">
    ${posts.map((p) => html`<li><a href="${p.route}"><span class="post-title">${p.title}</span>${p.frontmatter.description ? html`<span class="post-desc">${p.frontmatter.description}</span>` : ""}</a>${p.frontmatter.datePublished ? html`<time datetime="${p.frontmatter.datePublished}">${day(String(p.frontmatter.datePublished))}</time>` : ""}</li>`)}
  </ul>
</article>`),
  );
};

export default layout;
