const products = require('../../src/data/products');
const { sortProductsByPrice } = require('../../src/catalog');

function getProductsByIds(products, ids) {
  const idsSet = new Set(ids);
  return products.filter((product) => idsSet.has(product.id));
}

describe('sortProductsByPrice', () => {
  describe('По возрастанию', () => {
    test("все товары c 'asc' сортируются как [3, 6, 5, 4, 2, 1]", () => {
      expect(sortProductsByPrice(products, 'asc').map(item => item.id)).toEqual([3, 6, 5, 4, 2, 1]);
    });
    test('все товары без направления сортируются как [3, 6, 5, 4, 2, 1]', () => {
      expect(sortProductsByPrice(products).map(item => item.id)).toEqual([3, 6, 5, 4, 2, 1]);
    });
    test("товары [1, 3, 4] c 'asc' сортируются как [3, 4, 1]", () => {
      expect(sortProductsByPrice(getProductsByIds(products, [1, 3, 4]), 'asc').map(item => item.id)).toEqual([3, 4, 1]);
    });
  });

  describe('По убыванию', () => {
    test("все товары c 'desc' сортируются как [1, 2, 4, 5, 6, 3]", () => {
      expect(sortProductsByPrice(products, 'desc').map(item => item.id)).toEqual([1, 2, 4, 5, 6, 3]);
    });
    test("товары [3, 1, 4] c 'desc' сортируются как [1, 4, 3]", () => {
      expect(sortProductsByPrice(getProductsByIds(products, [3, 1, 4]), 'desc').map(item => item.id)).toEqual([1, 4, 3]);
    });
    test("товары [5, 2, 6] c 'desc' сортируются как [2, 5, 6]", () => {
      expect(sortProductsByPrice(getProductsByIds(products, [5, 2, 6]), 'desc').map(item => item.id)).toEqual([2, 5, 6]);
    });
  });

  describe('Исходный массив не меняется', () => {
    test("'asc' не меняет исходный массив [1, 3, 4]", () => {
      filtredProducts = getProductsByIds(products, [1, 3, 4]);
      sortProductsByPrice(filtredProducts, 'asc')
      expect(filtredProducts.map(item => item.id)).toEqual([1, 3, 4]);
    });
    test("'desc' не меняет исходный массив [1, 3, 4]", () => {
      filtredProducts = getProductsByIds(products, [1, 3, 4]);
      sortProductsByPrice(filtredProducts, 'desc')
      expect(filtredProducts.map(item => item.id)).toEqual([1, 3, 4]);
    });
    test('направление по умолчанию не меняет исходный массив всех товаров', () => {
      sortProductsByPrice(products)
      expect(products.map(item => item.id)).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });
});
