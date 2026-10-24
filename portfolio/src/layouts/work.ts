import { collection, html, raw, z, type Layout } from "vagejs";
import { art } from "./art.ts";
import { shell } from "./shell.ts";

/** A case study: the facts strip (role, year, length), the drawing, then the story. */
export const frontmatter = z.object({
  summary: z.string(),
  role: z.string(),
  year: z.string(),
  length: z.string(),
  art: z.enum(["transit", "ledger", "garden"]),
});

const layout: Layout = (props) => {
  const fm = props.page.frontmatter as unknown as z.infer<typeof frontmatter>;
  const others = collection(props.pages, { under: "/work/", sort: "order" }).filter((p) => p.route !== props.page.route);
  const main = html`<article class="case">
  <p class="eyebrow"><a href="/work/">Work</a></p>
  <header class="case-head">
    <h1>${props.page.title}</h1>
    <p class="case-summary">${fm.summary}</p>
    <dl class="facts">
      <div><dt>Role</dt><dd>${fm.role}</dd></div>
      <div><dt>Year</dt><dd>${fm.year}</dd></div>
      <div><dt>Length</dt><dd>${fm.length}</dd></div>
    </dl>
  </header>
  <figure class="artboard artboard-wide"><span class="size" aria-hidden="true">1440 × 900</span>${raw(art(fm.art))}</figure>
  <div class="prose">${raw(props.content.replace(/^\s*<h1[^>]*>[\s\S]*?<\/h1>/, ""))}</div>
  <nav class="next" aria-label="More work">
    <p class="eyebrow">More work</p>
    <ul>${others.map((p) => html`<li><a href="${p.route}">${p.title}</a></li>`)}</ul>
  </nav>
</article>`;
  return shell(props, String(main), "is-case");
};

export default layout;
