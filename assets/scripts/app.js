class Product {
    /*title = 'DEFAULT';
    imageUrl = ''
    description = '';
    prcie = 0;*/
  
    constructor(title, image, desc, price) {
      this.title = title;
      this.imageUrl = image;
      this.description = desc;
      this.price = price;
    }
  }
  
  class ElementAttribute {
    constructor(attrName, attrValue) {
      this.name = attrName;
      this.value = attrValue;
    }
  }
  
  class Component {
    constructor(renderHookId, shouldRender = true) {
      this.hookId = renderHookId;
      if(shouldRender) {
        this.render();
      }
    }
  
    render() {}
  
    createRootElement(tag, cssClasses, attributes) {
      const rootElement = document.createElement(tag);
      if (cssClasses) {
        rootElement.className = cssClasses;
      }
      if (attributes && attributes.length > 0) {
        for (const attr of attributes) {
          rootElement.setAttribute(attr.name, attr.value);
        }
      }
      document.getElementById(this.hookId).append(rootElement);
      return rootElement;
    }
  }
  
  class ShoppingCart extends Component {
    items = [];
  
    set cartItems(value) {
      this.items = value;
      this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(2)}</h2>`;
    }
  
    get totalAmount() {
      const sum = this.items.reduce((prevValue, currentItem) => {
        return prevValue + currentItem.price;
      }, 0);
      return sum;
    }
  
    constructor(renderHookId) {
      super(renderHookId);
    }
  
    addProduct(product) {
      const updatedItems = [...this.items];
      updatedItems.push(product);
      this.cartItems = updatedItems;
    }
  
    orderProducts() {
      console.log('Ordering: ' + this.items);
    }
  
    render() {
      const cartEl = this.createRootElement('section', 'cart',);
      cartEl.innerHTML = `
        <h2>Total: \$${0}</h2>
        <button>Order now!</button>
        `;
        const orderButton = cartEl.querySelector('button');
        orderButton.addEventListener('click', this.orderProducts.bind(this));
        this.totalOutput = cartEl.querySelector('h2');
    }
  }
  
  class ProductItem extends Component {
    constructor(product, renderHookId) {
      super(renderHookId, false);
      this.product = product;
      this.render();
    }
  
    addToCart() {
      App.addProductToCart(this.product);
    }
  
    render() {
      const prodEl = this.createRootElement('li', 'product-item',);
        prodEl.innerHTML = `
        <div>
          <img src="${this.product.imageUrl}" alt="${this.product.title}"> 
          <div class="product-item__content">
            <h2>${this.product.title}</h2>
            <h3>\$${this.product.price}</h3>
            <p>${this.product.description}</p>
            <button>Add to Cart</button>
          </div>
        </div>`;
        const addCartButton = prodEl.querySelector('button');
        addCartButton.addEventListener('click', this.addToCart.bind(this));
    }
  }
  
  class ProductList extends Component {
    #products = [];
  
    constructor(renderHookId) {
      super(renderHookId);
      this.render();
      this.fetchProducts();
    }
  
    fetchProducts() {
      this.#products = [
        new Product('An anime poster 1', 'https://i.etsystatic.com/27390177/r/il/542f02/4356010459/il_1140xN.4356010459_5ioo.jpg', 'A chainsaw man poster.', 9.99),
        new Product('An anime poster 2', 'https://i.etsystatic.com/27390177/r/il/e52662/3917953368/il_1140xN.3917953368_2pab.jpg', 'A spy x family poster.', 10.99),
        new Product('An anime poster 3', 'https://i.etsystatic.com/27390177/r/il/e33247/3596426645/il_1140xN.3596426645_97td.jpg', 'A demon slayer poster.', 10.99),
        new Product('An anime poster 4', 'https://i.etsystatic.com/27390177/r/il/c71578/3596426075/il_1140xN.3596426075_srbv.jpg', 'A my hero academia poster.', 15.99),
        new Product('An anime poster 5', 'https://i.etsystatic.com/27390177/r/il/f8f234/4308616594/il_1140xN.4308616594_8w2l.jpg', 'A jujutsu kaisen poster.', 12.99),
        new Product('An anime poster 6', 'https://i.etsystatic.com/27390177/r/il/f11a0e/4308617006/il_1140xN.4308617006_hmve.jpg', 'A death note poster.', 16.99),
        new Product('An anime poster 7', 'https://i.etsystatic.com/27390177/r/il/5e7977/4308616992/il_1140xN.4308616992_rn4h.jpg', 'A banana fish poster.', 15.99)
      ];
      this.renderProducts();
    }
  
    renderProducts() {
      for (const prod of this.#products) {
        const productItem = new ProductItem(prod, 'prod-list');
      }
    }
  
    render() {
      const prodList = this.createRootElement('ul', 'product-list', [new ElementAttribute('id', 'prod-list')]);
      if (this.product && this.#products.length > 0) {
        this.renderProducts();
      }
    }
  }
  
  class Shop {
  
    constructor() {
      this.render();
    }
  
    render() {
      this.cart = new ShoppingCart('app');
      new ProductList('app');
    }
  }
  
  class App {
    static cart;
  
    static init() {
      const shop = new Shop();
      this.cart = shop.cart;
    }
  
    static addProductToCart(product) {
      this.cart.addProduct(product);
    }
  }
  
  App.init();