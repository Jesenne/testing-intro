function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function validateQuantity(quantity) {
  if (!(quantity > 0))
    throw new RangeError('Количество товара должно быть больше 0');
}

function validateStock(quantity, stock) {
  if (stock < quantity) {
    throw new RangeError('Недостаточно товара на складе');
  }
}

function addToCart(cart, product, quantity) {
  validateQuantity(quantity);

  const productExists = cart.find((item) => item.id === product.id);
  const newQuantity = (productExists ? productExists.quantity : 0) + quantity;

  validateStock(newQuantity, product.stock);

  if (productExists) {
    return cart.map((item) =>
      item.id === product.id ? { ...item, quantity: newQuantity } : item
    );
  }

  return [...cart, { ...product, quantity: newQuantity }];
}

function changeQuantity() { return notImplemented(); }
function removeFromCart() { return notImplemented(); }
function calculateCartSubtotal() { return notImplemented(); }
function calculateOrderTotal() { return notImplemented(); }

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
