import { breadcrumbList, breadcrumbs, escapeHtml as e, flatten, jsonLdScript, neighbors, tree, type Layout, type PageSummary } from "vagejs";

/**
 * Kettlemark docs: one layout for every page.
 * - Home ("/") gets a hero and no sidebar.
 * - Everything else gets breadcrumbs, a film-strip sidebar built from the pages'
 *   `order` and `navTitle` (tree + flatten), and previous/next links (neighbors).
 * The page's own content comes first in the HTML, so phones show it before the menu.
 */

const VERSION = "1.4.0";
const RELEASED = "2026-09-30";

/** "2026-09-30" -> "'26 09 30", the way film cameras printed dates on photos. */
const stamp = (iso: string) => `'${iso.slice(2, 4)} ${iso.slice(5, 7)} ${iso.slice(8, 10)}`;

/** Docs pages in reading order: the docs overview, then each section and its pages. */
function docsOrder(pages: readonly PageSummary[]): PageSummary[] {
  const overview = pages.find((p) => p.route === "/docs/");
  return [...(overview ? [overview] : []), ...flatten(tree(pages, "/docs/"))];
}

/** The sidebar: every docs page as a frame on a film strip, numbered in reading order. */
function sidebar(pages: readonly PageSummary[], route: string): string {
  const frame = new Map(docsOrder(pages).map((p, i) => [p.route, String(i + 1).padStart(2, "0")]));
  const item = (p: PageSummary, nested: boolean) =>
    `<li${nested ? ' class="nested"' : ""}><a href="${e(p.route)}"${p.route === route ? ' aria-current="page"' : ""}><span class="frame" aria-hidden="true">${frame.get(p.route) ?? ""}</span>${e(p.label)}</a></li>`;
  const overview = pages.find((p) => p.route === "/docs/");
  const rows = tree(pages, "/docs/").map((node) => item(node.page, false) + node.children.map((c) => item(c.page, true)).join(""));
  return `<nav class="strip" id="contents" aria-label="Documentation">
  <p class="strip-title">Contents</p>
  <ol>${overview ? item(overview, false) : ""}${rows.join("")}</ol>
</nav>`;
}

/** Gives each H2 an id from its text, so links like /docs/reference/configuration/#patterns land on it. */
function anchorHeadings(html: string): string {
  const used = new Set<string>();
  return html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, inner: string) => {
    const base = inner.replace(/<[^>]+>/g, "").toLowerCase().replace(/&[a-z#0-9]+;/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "section";
    let id = base;
    for (let n = 2; used.has(id); n++) id = `${base}-${n}`;
    used.add(id);
    return `<h2 id="${id}">${inner}</h2>`;
  });
}

/** Breadcrumb text: "Home" and "Docs" read better in a trail than the page titles. */
const crumbLabel = (p: PageSummary) => (p.route === "/" ? "Home" : p.route === "/docs/" ? "Docs" : p.label);

function pager(pages: readonly PageSummary[], route: string): string {
  const { prev, next } = neighbors(docsOrder(pages), route);
  if (!prev && !next) return "";
  return `<nav class="pager" aria-label="Previous and next page">
  ${prev ? `<a class="prev" href="${e(prev.route)}"><span>Previous</span>${e(prev.label)}</a>` : "<span></span>"}
  ${next ? `<a class="next" href="${e(next.route)}"><span>Next</span>${e(next.label)}</a>` : "<span></span>"}
</nav>`;
}

const layout: Layout = ({ content, page, site, pages }) => {
  const title = page.route === "/" ? `${site.title}: rename photos by the date they were taken` : `${page.title} | ${site.title}`;
  const isHome = page.route === "/";
  const isDocs = page.route.startsWith("/docs/");
  const trail = breadcrumbs(pages, page.route);
  const origin = site.site ?? "";

  const crumbs =
    !isHome && trail.length > 1
      ? `<nav class="crumbs" aria-label="Breadcrumb"><ol>${trail
          .map((p, i) => (i === trail.length - 1 ? `<li aria-current="page">${e(crumbLabel(p))}</li>` : `<li><a href="${e(p.route)}">${e(crumbLabel(p))}</a></li>`))
          .join("")}</ol></nav>`
      : "";
  // Breadcrumbs for search engines too. Writing JSON-LD here turns off vagejs's automatic JSON-LD for the page.
  const head = !isHome && trail.length > 1 ? jsonLdScript([breadcrumbList(trail.map((p) => ({ name: crumbLabel(p), url: `${origin}${p.route}` })))]) : "";

  const top = [
    { href: "/docs/", label: "Docs" },
    { href: "/docs/reference/", label: "Reference" },
    { href: "/docs/faq/", label: "FAQ" },
    { href: "/changelog/", label: "Changelog" },
  ]
    .map((l) => `<a href="${l.href}"${page.route.startsWith(l.href) ? ' aria-current="page"' : ""}>${l.label}</a>`)
    .join("");

  const body = isHome
    ? `<main id="main" class="home">${content}</main>`
    : `<div class="docs${isDocs ? "" : " docs-plain"}">
  <main id="main" class="page">
    ${isDocs ? `<a class="jump" href="#contents">Contents</a>` : ""}
    ${crumbs}
    <article class="prose">${anchorHeadings(content)}</article>
    ${isDocs ? pager(pages, page.route) : ""}
  </main>
  ${isDocs ? sidebar(pages, page.route) : ""}
</div>`;

  return `<!doctype html>
<html lang="${e(site.lang)}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${e(title)}</title>
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="/styles.css" />
    ${head}
  </head>
  <body>
    <a class="skip" href="#main">Skip to content</a>
    <header class="masthead">
      <a class="brand" href="/">Kettlemark</a>
      <span class="stamp" title="Version ${VERSION}, released ${RELEASED}">v${VERSION} <time datetime="${RELEASED}">${stamp(RELEASED)}</time></span>
      <nav class="top" aria-label="Main">${top}</nav>
    </header>
    ${body}
    <footer class="foot">
      <p>Example site built with <a href="https://vagejs.com">vagejs</a>. The tool documented here is fictional.</p>
    </footer>
  </body>
</html>
`;
};

export default layout;
