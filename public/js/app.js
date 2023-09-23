class ShoppingApp {
    productsEl = document.querySelector('.products');
    cartItemsEl = document.querySelector('.cart .items');
    itemTotalEl = document.querySelector('.item-total');
    cartDiscountEl = document.querySelector('.cart-discount');
    grandTotalEl = document.querySelector('.grand-total');
    totalSavingslEl = document.querySelector('.total-savings');
    loaderEl = document.querySelector('.loader');
    productTemplate = document.getElementById('tmpl-product');
    cartItemTemplate = document.getElementById('tmpl-cart-item');

    products = [];
    cart = {
        items: [],
        cartDiscount: 0,
        totalDiscount: 0,
        preDiscountTotal: 0,
        postDiscountTotal: 0,
    };

    showLoader = () => {
        this.loaderEl.classList.remove('hide');
    };
    hideLoader = () => {
        this.loaderEl.classList.add('hide');
    };

    addProductToCart = async (product) => {
        this.showLoader();
        const response = await fetch(`/api/cart/add/${product.name}`);
        this.handleCartData(await response.json());
        this.hideLoader();
    };
    emptyCart = async () => {
        this.showLoader();
        const response = await fetch(`/api/cart/empty`);
        this.handleCartData(await response.json());
        this.hideLoader();
    };

    loadProducts = async () => {
        this.showLoader();
        const response = await fetch('/api/products');
        this.handleProducts(await response.json());
        this.hideLoader();
    };

    loadCart = async () => {
        this.showLoader();
        const response = await fetch('/api/cart');
        this.handleCartData(await response.json());
        this.hideLoader();
    };
    init = async () => {
        await this.loadProducts();
        await this.loadCart();

        document.querySelector('.empty-cart').addEventListener('click', () => {
            this.emptyCart();
        });
    };

    handleProducts = (products) => {
        this.products = products || [];
        while (this.productsEl.firstElementChild) {
            this.productsEl.firstElementChild.remove();
        }
        this.products.forEach((p) => {
            let productRow = this.productTemplate.content.cloneNode(true);
            productRow.querySelector('.name').textContent = p.name;
            productRow.querySelector(
                '.price',
            ).textContent = p.unitPrice.toFixed(2);
            productRow.querySelector('button').addEventListener('click', () => {
                this.addProductToCart(p);
            });
            this.productsEl.appendChild(productRow);
        });
    };
    handleCartData = (cartData) => {
        if (!cartData) cartData = {};
        this.cart.items = cartData.items || [];
        this.cart.cartDiscount = cartData.cartDiscount || 0;
        this.cart.totalDiscount = cartData.totalDiscount || 0;
        this.cart.preDiscountTotal = cartData.preDiscountTotal || 0;
        this.cart.postDiscountTotal = cartData.postDiscountTotal || 0;
        while (this.cartItemsEl.firstElementChild) {
            this.cartItemsEl.firstElementChild.remove();
        }
        let cartRow = this.cartItemTemplate.content.cloneNode(true);
        cartRow.firstElementChild.classList.add('header-row');
        this.cartItemsEl.appendChild(cartRow);
        let prodTotal = 0.0;
        this.cart.items.forEach((ci) => {
            cartRow = this.cartItemTemplate.content.cloneNode(true);
            cartRow.querySelector('.name').textContent = ci.name;
            cartRow.querySelector('.price').textContent = ci.unitPrice.toFixed(
                2,
            );
            cartRow.querySelector('.quantity').textContent = ci.quantity;
            cartRow.querySelector(
                '.discount',
            ).textContent = ci.totalDiscount.toFixed(2);
            let total = ci.unitPrice * ci.quantity - ci.totalDiscount;
            prodTotal += total;
            cartRow.querySelector('.item-total').textContent = total.toFixed(2);

            this.cartItemsEl.appendChild(cartRow);
        });

        this.itemTotalEl.textContent = prodTotal.toFixed(2);

        this.cartDiscountEl.textContent = this.cart.cartDiscount.toFixed(2);

        this.grandTotalEl.textContent = this.cart.postDiscountTotal.toFixed(2);
        this.totalSavingslEl.textContent = `You are saving ${this.cart.totalDiscount.toFixed(
            2,
        )} in this order`;
    };
}
let app = new ShoppingApp();
app.init();
