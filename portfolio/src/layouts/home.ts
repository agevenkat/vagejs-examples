import { collection, html, raw, type Layout } from "vagejs";
import { art } from "./art.ts";
import { shell } from "./shell.ts";

/** Home and the work index: an intro, then every case study as an artboard. */
const layout: Layout = (props) => {
  const work = collection(props.pages, { under: "/work/", sort: "order" });
  const posts = collection(props.pages, { under: "/blog/", sort: "date" }).slice(0, 2);
  const isHome = props.page.route === "/";
  const main = html`<section class="intro prose">${raw(props.content)}</section>
<section class="work" aria-labelledby="work-title">
  <h2 id="work-title" class="eyebrow">Selected work</h2>
  <ul class="boards">
    ${work.map(
      (p) => html`<li>
      <a class="board" href="${p.route}">
        <figure class="artboard"><span class="size" aria-hidden="true">1440 × 900</span>${raw(art(p.frontmatter.art))}</figure>
        <span class="board-meta"><span class="board-title">${p.title}</span><span class="board-sub">${String(p.frontmatter.summary ?? "")}</span></span>
      </a>
    </li>`,
    )}
  </ul>
</section>
${isHome && posts.length
  ? html`<section class="writing" aria-labelledby="writing-title">
  <h2 id="writing-title" class="eyebrow">Writing</h2>
  <ul class="posts">${posts.map((p) => html`<li><a href="${p.route}">${p.title}</a><span>${String(p.frontmatter.description ?? "")}</span></li>`)}</ul>
</section>`
  : ""}`;
  return shell(props, String(main), isHome ? "is-home" : "");
};

export default layout;
