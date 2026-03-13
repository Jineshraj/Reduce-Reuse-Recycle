/* Requirement :
1. useState named product holding all the products
2. useState named sortOption holding either "Price, ASC" for ascending order or "Price, DEC" for descending order
*/

export const sortJerseys = (products, sortOption) => {
  // making a copy of the array first using spread [...]
  return [...products].sort((a, b) => {
    if (sortOption === "Price, ASC") {
      return a.price - b.price; // Low to High
    }
    if (sortOption === "Price, DESC") {
      return b.price - a.price; // High to Low
    }
    return 0; // Default: keep original order
  });
};
