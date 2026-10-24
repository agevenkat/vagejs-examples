import { html, jsonLdScript, raw, z, type Layout, type LayoutProps } from "vagejs";
import { BAKERY } from "./bakery.ts";

/** `lede` (optional) is a short line shown under the page heading. */
export const frontmatter = z.object({ lede: z.string().optional() });

const NAV = [
  { href: "/", label: "Home" },
  { href: "/menu/", label: "Menu" },
  { href: "/order/", label: "Order" },
  { href: "/visit/", label: "Visit" },
  { href: "/about/", label: "Our story" },
  { href: "/news/", label: "News" },
];

/** A loaf with a scored top: the bakehouse's mark. */
export const LOAF = `<svg class="loaf" viewBox="0 0 48 32" aria-hidden="true"><path d="M4 22c0-9 9-16 20-16s20 7 20 16v4H4z" fill="currentColor"/><path d="M14 12l5 6M22 10l5 7M30 11l5 6" stroke="var(--paper)" stroke-width="2.5" stroke-linecap="round"/></svg>`;

/** LocalBusiness (Bakery) structured data, marked as fictional in its description. */
function bakerySchema(site: LayoutProps["site"]): string {
  const days = BAKERY.hours.filter((h) => h.open);
  return jsonLdScript({
    "@type": "Bakery",
    name: BAKERY.name,
    description: `${site.description} This bakery is fictional.`,
    url: `${site.site}/`,
    telephone: BAKERY.phone,
    address: { "@type": "PostalAddress", streetAddress: BAKERY.street, addressLocality: `${BAKERY.area}, ${BAKERY.city}`, postalCode: BAKERY.postcode, addressCountry: "IN" },
    openingHoursSpecification: days.map((h) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: h.schema, opens: h.open, closes: h.close })),
    servesCuisine: "Bakery",
    priceRange: "₹₹",
  });
}

/** The page frame every layout shares: header, main, footer. */
export function frame(props: LayoutProps, main: string, bodyClass = ""): string {
  const { page, site } = props;
  const title = page.route === "/" ? `${site.title}: fresh bread in ${BAKERY.area}` : `${page.title} | ${site.title}`;
  const schema = page.route === "/" || page.route === "/visit/" ? bakerySchema(site) : "";
  return String(html`<!doctype html>
<html lang="${site.lang}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <link rel="icon" href="/favicon.ico" sizes="32x32" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="stylesheet" href="/styles.css" />
    ${raw(schema)}
  </head>
  <body class="${bodyClass}">
    <a class="skip" href="#main">Skip to content</a>
    <header class="site-head">
      <a class="brand" href="/">${raw(LOAF)}<span>Example Street<br /><small>Bakehouse</small></span></a>
      <nav aria-label="Main">
        ${NAV.map((n) => html`<a href="${n.href}"${page.route === n.href ? raw(' aria-current="page"') : ""}>${n.label}</a>`)}
      </nav>
    </header>
    <main id="main">
${raw(main)}
    </main>
    <footer class="site-foot">
      <div>
        <p class="foot-name">${BAKERY.name}</p>
        <p>${BAKERY.street}, ${BAKERY.area}, ${BAKERY.city}<br />Open every day except Monday, from 6:30 am</p>
      </div>
      <p class="disclaimer">Example site built with <a href="https://vagejs.com">vagejs</a>. This bakery is fictional.</p>
    </footer>
  </body>
</html>
`);
}

/** Lifts the first heading out of the page so it can sit in the page header. */
export function split(content: string): { heading: string; body: string } {
  const m = /^\s*<h1[^>]*>([\s\S]*?)<\/h1>/.exec(content);
  return m ? { heading: m[1]!, body: content.slice(m[0].length) } : { heading: "", body: content };
}

const layout: Layout = (props) => {
  const { heading, body } = split(props.content);
  const lede = typeof props.page.frontmatter.lede === "string" ? props.page.frontmatter.lede : "";
  return frame(
    props,
    String(html`<article class="page">
  <header class="page-head"><h1>${raw(heading)}</h1>${lede ? html`<p class="lede">${lede}</p>` : ""}</header>
  <div class="prose">${raw(body)}</div>
</article>`),
  );
};

export default layout;
