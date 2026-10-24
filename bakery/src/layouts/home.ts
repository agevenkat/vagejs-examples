import { collection, html, raw, z, type Layout } from "vagejs";
import { BAKERY, clock, day } from "./bakery.ts";
import { frame, split } from "./default.ts";

/** The home page's fields: the oven board (what comes out when) and this week's highlights. */
export const frontmatter = z.object({
  lede: z.string(),
  oven: z.array(z.object({ time: z.string().regex(/^\d\d:\d\d$/), item: z.string(), note: z.string() })).min(1),
  highlights: z.array(z.object({ name: z.string(), text: z.string(), price: z.number().int().positive() })).min(1),
});

const layout: Layout = (props) => {
  const fm = props.page.frontmatter as unknown as z.infer<typeof frontmatter>;
  const { heading, body } = split(props.content);
  const news = collection(props.pages, { under: "/news/", sort: "date" }).slice(0, 2);
  const open = BAKERY.hours.filter((h) => h.open);
  return frame(
    props,
    String(html`<section class="hero">
  <div class="hero-copy">
    <p class="eyebrow">${BAKERY.area}, ${BAKERY.city}</p>
    <h1>${raw(heading)}</h1>
    <p class="lede">${fm.lede}</p>
    <p class="actions"><a class="btn" href="/menu/">See the menu</a><a class="btn btn-quiet" href="/visit/">Find us</a></p>
  </div>
  <aside class="oven" aria-labelledby="oven-title">
    <h2 id="oven-title">Out of the oven today</h2>
    <ol>
      ${fm.oven.map((o) => html`<li><time datetime="${o.time}">${clock(o.time)}</time><span><strong>${o.item}</strong>${o.note}</span></li>`)}
    </ol>
    <p class="oven-foot">Come early for the sourdough. It's usually gone by eleven.</p>
  </aside>
</section>

<section class="band">
  <div class="prose intro">${raw(body)}</div>
</section>

<section class="highlights" aria-labelledby="hl-title">
  <h2 id="hl-title">This week's favourites</h2>
  <ul class="cards">
    ${fm.highlights.map((h) => html`<li><h3>${h.name}</h3><p>${h.text}</p><p class="price">₹${h.price}</p></li>`)}
  </ul>
  <p><a href="/menu/">The full menu, with every bread, pastry and cake</a></p>
</section>

<section class="split">
  <div class="hours" aria-labelledby="hours-title">
    <h2 id="hours-title">Opening hours</h2>
    <table>
      <tbody>
        ${BAKERY.hours.map((h) => html`<tr><th scope="row">${h.days}</th><td>${h.open ? `${clock(h.open)} to ${clock(h.close)}` : "Closed (we bake for the week)"}</td></tr>`)}
      </tbody>
    </table>
    <p>${BAKERY.street}, ${BAKERY.area}. <a href="/visit/">How to find us</a></p>
  </div>
  <div class="latest" aria-labelledby="news-title">
    <h2 id="news-title">From the bakehouse</h2>
    <ul>
      ${news.map((n) => html`<li><a href="${n.route}">${n.title}</a>${n.frontmatter.datePublished ? html`<time datetime="${n.frontmatter.datePublished}">${day(String(n.frontmatter.datePublished))}</time>` : ""}</li>`)}
    </ul>
    <p><a href="/news/">All news</a></p>
  </div>
</section>`),
    "home",
  );
};

export default layout;
