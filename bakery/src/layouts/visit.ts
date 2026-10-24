import { html, raw, type Layout } from "vagejs";
import { BAKERY, clock } from "./bakery.ts";
import { frame, split } from "./default.ts";

/** Visit page: the hours and address come from bakery.ts, the directions from the Markdown. */
const layout: Layout = (props) => {
  const { heading, body } = split(props.content);
  return frame(
    props,
    String(html`<article class="page">
  <header class="page-head"><h1>${raw(heading)}</h1><p class="lede">We're a five-minute walk from Sampige Road. Bring a bag for the bread.</p></header>
  <div class="visit-grid">
    <section class="address-card" aria-labelledby="where">
      <h2 id="where">Where we are</h2>
      <address>${BAKERY.name}<br />${BAKERY.street}<br />${BAKERY.area}, ${BAKERY.city} ${BAKERY.postcode}</address>
      <p>Phone: <span class="mono">${BAKERY.phone}</span> <small>(${BAKERY.phoneNote})</small></p>
    </section>
    <section class="hours" aria-labelledby="when">
      <h2 id="when">When we're open</h2>
      <table>
        <tbody>
          ${BAKERY.hours.map((h) => html`<tr><th scope="row">${h.days}</th><td>${h.open ? `${clock(h.open)} to ${clock(h.close)}` : "Closed"}</td></tr>`)}
        </tbody>
      </table>
    </section>
  </div>
  <div class="prose">${raw(body)}</div>
</article>`),
  );
};

export default layout;
