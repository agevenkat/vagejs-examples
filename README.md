# vagejs examples

Three example websites built with [vagejs](https://vagejs.com), the free static site generator built for AI coding assistants. Each folder is a complete vagejs project you can copy.

| Example | Live | What it shows |
| --- | --- | --- |
| [portfolio](portfolio/) | [portfolio.vagejs.com](https://portfolio.vagejs.com) | A designer's portfolio: case studies, a writing section with an RSS feed, drawn SVG artwork. |
| [docs-site](docs-site/) | [docs-demo.vagejs.com](https://docs-demo.vagejs.com) | Documentation for a command-line tool: a sidebar built from page order, breadcrumbs, previous and next links. |
| [bakery](bakery/) | [bakery.vagejs.com](https://bakery.vagejs.com) | A neighborhood bakery: menu with prices, opening hours, local-business structured data, a news feed. |

The people, products and businesses in these examples are fictional.

All three send no JavaScript to visitors and pass `vage check` and `vage audit` with no errors or warnings.

## Try one

You need Node.js 22.12 or newer.

```bash
git clone https://github.com/agevenkat/vagejs-examples.git
cd vagejs-examples/bakery
npm install
npm start
```

To start your own site from scratch instead: `npm create vagejs@latest my-site`.

## License

MIT. Use these as a starting point for your own sites.
