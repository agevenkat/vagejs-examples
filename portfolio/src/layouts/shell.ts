import { html, raw, type LayoutProps } from "vagejs";

/** Shared page frame: header, main and the example-site footer. Not a layout itself. */
const NAV = [
  { label: "Work", href: "/work/" },
  { label: "About", href: "/about/" },
  { label: "Writing", href: "/blog/" },
  { label: "Contact", href: "/contact/" },
];

export function shell(props: LayoutProps, main: string, bodyClass = ""): string {
  const { page, site } = props;
  const title = page.route === "/" ? `${site.title}, product designer` : `${page.title} | ${site.title}`;
  const current = (href: string) => page.route.startsWith(href);
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
  </head>
  <body class="${bodyClass}">
    <a class="skip" href="#main">Skip to content</a>
    <header class="site-header">
      <a class="name" href="/">Mira Halden</a>
      <nav aria-label="Main">
        ${NAV.map((n) => html`<a href="${n.href}"${current(n.href) ? raw(' aria-current="page"') : ""}>${n.label}</a>`)}
      </nav>
    </header>
    <main id="main">
${raw(main)}
    </main>
    <footer class="site-footer">
      <p>Example site built with <a href="https://vagejs.com">vagejs</a>. The designer and projects are fictional.</p>
      <p class="small">No JavaScript, no tracking. <a href="/blog/feed.xml">RSS feed</a></p>
    </footer>
  </body>
</html>
`);
}
