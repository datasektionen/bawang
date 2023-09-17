// function for comparing two index tree nodes, used for sorting them in navigation tools (navbar/sidebar)
// if an explicit ordering is defined, that is used, otherwise the title of the pages are used
// a node with an ordering index is always prioritized over one without it.
export const comparePages = (a, b) => {
  if (a.sort === b.sort) {
    if (a.title === b.title) return 0
    if (a.title === undefined) return 1;
    if (b.title === undefined) return -1;

    return a.title.localeCompare(b.title) // the comparison ignores case
  }

  if (a.sort === undefined) return 1;
  if (b.sort === undefined) return -1;

  return a.sort - b.sort;
}