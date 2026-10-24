import { defineConfig } from "vagejs";

export default defineConfig({
  site: "https://bakery.vagejs.com",
  title: "Example Street Bakehouse",
  description: "A fictional neighbourhood bakery in Bengaluru: ragi sourdough, cardamom buns and filter-coffee cake, baked before sunrise. An example site built with vagejs.",
  lang: "en-IN",

  seo: {
    sitemap: true,
    llmsTxt: { full: false },
    feeds: [{ under: "/news/" }],
    markdownCopies: true,
  },

  // Spam protection: links to other websites must be approved in links.lock.json.
  security: { outboundLinks: "require" },

  // Served by the Cloudflare Worker below; wrangler.jsonc attaches bakery.vagejs.com.
  deploy: { target: "cloudflare-workers", cloudflareWorker: "vagejs-example-bakery" },
});
