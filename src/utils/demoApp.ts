/** Returns deterministic HTML used by the portfolio tests. */
export function buildDemoAppHtml(): string {
  return `<!doctype html><html lang="en"><head><meta charset="UTF-8"><title>AI Shop Demo</title></head>
  <body>
    <header>
      <a href="#home" role="link">AI Shop</a>
      <button data-testid="cart-button">Cart <span data-testid="cart-badge">0</span></button>
      <span data-testid="user-avatar" hidden>QA</span>
    </header>
    <main>
      <section data-testid="login-page">
        <h1>Sign in</h1>
        <label>Email<input data-testid="email-input" type="email"></label>
        <label>Password<input data-testid="password-input" type="password"></label>
        <label><input data-testid="remember-me" type="checkbox">Remember me</label>
        <button data-testid="login-button">Sign in</button>
        <p role="alert" data-testid="login-error" hidden>Invalid email or password</p>
      </section>
      <section data-testid="home-page" hidden>
        <h1>Welcome, QA User</h1>
        <button data-testid="logout-button">Log out</button>
      </section>
      <section data-testid="search-page">
        <h2>Search products</h2>
        <label>Search<input data-testid="search-input"></label>
        <button data-testid="search-button">Search</button>
        <button data-testid="filter-under-100">Under $100</button>
        <div role="list" data-testid="results">
          <article data-testid="result-item" data-name="Trail Backpack" data-price="79"><h3>Trail Backpack</h3><span data-testid="result-price">$79</span><button data-testid="select-product">View Trail Backpack</button></article>
          <article data-testid="result-item" data-name="Steel Bottle" data-price="24"><h3>Steel Bottle</h3><span data-testid="result-price">$24</span><button data-testid="select-product">View Steel Bottle</button></article>
        </div>
      </section>
      <section data-testid="product-page" hidden>
        <h2 data-testid="product-title">Trail Backpack</h2>
        <p data-testid="product-price">$79</p>
        <button data-testid="add-to-cart">Add to cart</button>
        <p role="status" data-testid="cart-status" hidden>Added to cart</p>
      </section>
      <section data-testid="cart-page" hidden>
        <h2>Your cart</h2>
        <div data-testid="cart-item">Trail Backpack</div>
        <span data-testid="cart-total">$79</span>
        <button data-testid="checkout-button">Checkout</button>
      </section>
      <section data-testid="checkout-page" hidden>
        <h2>Checkout</h2>
        <label>Full name<input data-testid="shipping-name"></label>
        <label>Address<input data-testid="shipping-address"></label>
        <label>Card number<input data-testid="card-number"></label>
        <span data-testid="checkout-total">$79</span>
        <button data-testid="place-order">Place order</button>
        <p role="status" data-testid="order-status" hidden>Order placed</p>
      </section>
    </main>
    <script>
      const show = id => document.querySelectorAll('main > section').forEach(s => s.hidden = s.dataset.testid !== id);
      document.querySelector('[data-testid="login-button"]').addEventListener('click', () => {
        const email = document.querySelector('[data-testid="email-input"]').value;
        const pwd = document.querySelector('[data-testid="password-input"]').value;
        if (email === 'qa.user@example.com' && pwd === 'Password123!') { document.querySelector('[data-testid="user-avatar"]').hidden = false; history.pushState({}, '', '/home'); show('home-page'); }
        else { document.querySelector('[data-testid="login-error"]').hidden = false; }
      });
      document.querySelector('[data-testid="logout-button"]').addEventListener('click', () => { document.querySelector('[data-testid="user-avatar"]').hidden = true; history.pushState({}, '', '/login'); show('login-page'); });
      document.querySelector('[data-testid="search-button"]').addEventListener('click', () => document.querySelector('[data-testid="results"]').hidden = false);
      document.querySelector('[data-testid="filter-under-100"]').addEventListener('click', () => document.querySelectorAll('[data-testid="result-item"]').forEach(i => i.hidden = Number(i.dataset.price) >= 100));
      document.querySelector('[data-testid="select-product"]').addEventListener('click', () => { history.pushState({}, '', '/product/trail-backpack'); show('product-page'); });
      document.querySelector('[data-testid="add-to-cart"]').addEventListener('click', () => { document.querySelector('[data-testid="cart-badge"]').textContent = '1'; document.querySelector('[data-testid="cart-status"]').hidden = false; });
      document.querySelector('[data-testid="cart-button"]').addEventListener('click', () => { history.pushState({}, '', '/cart'); show('cart-page'); });
      document.querySelector('[data-testid="checkout-button"]').addEventListener('click', () => { history.pushState({}, '', '/checkout'); show('checkout-page'); });
      document.querySelector('[data-testid="place-order"]').addEventListener('click', () => document.querySelector('[data-testid="order-status"]').hidden = false);
      history.replaceState({}, '', '/login'); show('login-page');
    </script>
  </body></html>`;
}
