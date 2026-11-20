/** fmt("Card {n}", { n: 3 }) -> "Card 3" */
export function fmt(template, values = {}) {
  return template.replace(/\{(\w+)\}/g, (match, key) => (key in values ? String(values[key]) : match));
}
