export function groupByCategory<E extends { category?: string }>(
  elems: E[]
): [category: string, elems: E[]][] {
  const results: [category: string, elems: E[]][] = [];

  const categories = new Set([""]);

  for (const e of elems) {
    categories.add(e.category ?? "");
  }

  for (const category of categories) {
    results.push([
      category,
      elems.filter((e) => category === (e.category ?? "")),
    ]);
  }

  return results;
}
