class Product {
  constructor(public name: string, public price: number, public stock: number) {
    this.name = name;
    this.price = price;
    this.stock = 0;
  }

  addStock(quantity: number) {
    this.stock += quantity;
  }

  reduceStock(quantity: number) {
    if (this.stock - quantity > 0) {
      this.stock -= quantity;
    }
  }
}

class Customer {
  constructor(
    public name: string,
    public email: string,
    public cart: Product[]
  ) {
    this.cart = cart;
    this.email = email;
    this.name = name;
  }

  addToCart(product: Product) {
    if (!product) return false;
    this.cart.push(product);
    return true;
  }

  removeFromCart(product: Product) {
    if (product && "name" in product) {
      this.cart = this.cart.filter((item) => item.name !== this.name);
      return true;
    }
    return false;
  }
}
