/**
 * Abstract drawings of each project's interface, as inline SVG (no images to load).
 * Shapes only: no logos, no real brands.
 */
const ART: Record<string, string> = {
  // A tram ticketing app: a route line with stops, and a ticket card.
  transit: `<svg viewBox="0 0 480 300" role="img" aria-label="Drawing of a tram ticket app: a route line with stops and a ticket card">
  <rect x="0" y="0" width="480" height="300" fill="#dde3f2"/>
  <rect x="150" y="22" width="180" height="256" rx="22" fill="#17201c"/>
  <rect x="160" y="34" width="160" height="232" rx="14" fill="#f4f7f5"/>
  <path d="M182 70 C 230 70, 230 130, 270 130 S 300 190, 250 214" fill="none" stroke="#2f4bd8" stroke-width="6" stroke-linecap="round"/>
  <circle cx="182" cy="70" r="8" fill="#f4f7f5" stroke="#2f4bd8" stroke-width="4"/>
  <circle cx="270" cy="130" r="8" fill="#f4f7f5" stroke="#2f4bd8" stroke-width="4"/>
  <circle cx="250" cy="214" r="9" fill="#e5899f"/>
  <rect x="172" y="230" width="136" height="24" rx="12" fill="#2f4bd8"/>
  <rect x="40" y="96" width="92" height="56" rx="10" fill="#f4f7f5"/>
  <rect x="52" y="110" width="44" height="7" rx="3.5" fill="#17201c"/>
  <rect x="52" y="126" width="64" height="7" rx="3.5" fill="#9aa8a0"/>
  <rect x="350" y="150" width="96" height="70" rx="10" fill="#e5899f"/>
  <rect x="364" y="168" width="40" height="8" rx="4" fill="#17201c"/>
  <rect x="364" y="186" width="66" height="8" rx="4" fill="#17201c" opacity=".35"/>
</svg>`,
  // A shared household budget: stacked bars and a split circle.
  ledger: `<svg viewBox="0 0 480 300" role="img" aria-label="Drawing of a household budgeting tool: monthly bars and a shared split">
  <rect x="0" y="0" width="480" height="300" fill="#e7e2ee"/>
  <rect x="44" y="40" width="392" height="220" rx="16" fill="#f7f5fa"/>
  <rect x="68" y="64" width="120" height="10" rx="5" fill="#17201c"/>
  <g fill="#2f4bd8">
    <rect x="72" y="176" width="26" height="58" rx="5"/><rect x="112" y="150" width="26" height="84" rx="5"/>
    <rect x="152" y="164" width="26" height="70" rx="5"/><rect x="192" y="124" width="26" height="110" rx="5"/>
    <rect x="232" y="140" width="26" height="94" rx="5"/>
  </g>
  <g fill="#e5899f">
    <rect x="72" y="150" width="26" height="22" rx="5"/><rect x="112" y="126" width="26" height="20" rx="5"/>
    <rect x="152" y="140" width="26" height="20" rx="5"/><rect x="192" y="100" width="26" height="20" rx="5"/>
    <rect x="232" y="116" width="26" height="20" rx="5"/>
  </g>
  <circle cx="352" cy="150" r="56" fill="#2f4bd8"/>
  <path d="M352 94 A 56 56 0 0 1 400 178 L 352 150 Z" fill="#e5899f"/>
  <circle cx="352" cy="150" r="30" fill="#f7f5fa"/>
</svg>`,
  // A plant-care reminder app: leaf shapes and a weekly watering row.
  garden: `<svg viewBox="0 0 480 300" role="img" aria-label="Drawing of a plant care app: leaves and a row of watering days">
  <rect x="0" y="0" width="480" height="300" fill="#e3ead9"/>
  <path d="M120 230 C 90 160, 140 90, 210 70 C 220 150, 180 210, 120 230 Z" fill="#3d7a52"/>
  <path d="M120 230 C 170 190, 190 140, 205 80" fill="none" stroke="#e3ead9" stroke-width="4"/>
  <path d="M150 238 C 190 190, 260 180, 300 200 C 260 250, 200 260, 150 238 Z" fill="#7fb08a"/>
  <rect x="300" y="60" width="140" height="180" rx="16" fill="#f6f8f2"/>
  <g fill="#2f4bd8">
    <circle cx="326" cy="200" r="9"/><circle cx="352" cy="200" r="9" opacity=".25"/><circle cx="378" cy="200" r="9"/>
    <circle cx="404" cy="200" r="9" opacity=".25"/>
  </g>
  <rect x="318" y="84" width="96" height="10" rx="5" fill="#17201c"/>
  <rect x="318" y="106" width="70" height="8" rx="4" fill="#9aa8a0"/>
  <rect x="318" y="140" width="104" height="34" rx="10" fill="#e5899f"/>
</svg>`,
};

export function art(kind: unknown): string {
  return typeof kind === "string" && ART[kind] ? ART[kind]! : "";
}
