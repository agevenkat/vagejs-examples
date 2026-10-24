import { defineConfig } from "vagejs";

export default defineConfig({
  site: "https://docs-demo.vagejs.com",
  title: "Kettlemark",
  description: "Documentation for Kettlemark, a small command-line tool that renames photos and videos by the date they were taken. An example site built with vagejs; the tool is fictional.",
  lang: "en",

  seo: {
    markdownCopies: true,
    llmsTxt: { full: true },
  },

  // Spam protection: links to other websites must be approved in links.lock.json.
  security: { outboundLinks: "require" },

  deploy: { target: "cloudflare-workers", cloudflareWorker: "vagejs-example-docs" },
});
