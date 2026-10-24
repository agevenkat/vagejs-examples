/**
 * The bakery's facts in one place, so the header, footer, visit page and structured
 * data always agree. Everything here is fictional: this is an example site.
 */
export const BAKERY = {
  name: "Example Street Bakehouse",
  street: "12 Example Street, Off 8th Cross",
  area: "Malleshwaram",
  city: "Bengaluru",
  postcode: "560003",
  phone: "080 0000 0000",
  phoneNote: "an example number, not a real line",
  hours: [
    { days: "Tuesday to Friday", open: "06:30", close: "19:30", schema: ["Tuesday", "Wednesday", "Thursday", "Friday"] },
    { days: "Saturday and Sunday", open: "06:00", close: "20:00", schema: ["Saturday", "Sunday"] },
    { days: "Monday", open: "", close: "", schema: [] },
  ],
};

/** "06:30" -> "6:30 am" */
export function clock(t: string): string {
  const [h, m] = t.split(":").map(Number) as [number, number];
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "am" : "pm"}`;
}

/** "2026-10-21" -> "21 October 2026" */
export function day(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number) as [number, number, number];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return `${d} ${months[m - 1]} ${y}`;
}
