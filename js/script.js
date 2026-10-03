const products = [
  {
    id: 1,
    name: "Classic White Shirt",
    price: 49,
    category: "Essential Collection",
    image: "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Slim Fit Denim",
    price: 69,
    category: "Everyday Edit",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Satin Midi Dress",
    price: 89,
    category: "Occasion Edit",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "Minimal Knitwear",
    price: 74,
    category: "Soft Essentials",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    name: "Summer Dress",
    price: 79,
    category: "Seasonal Edit",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    name: "Relaxed Blazer",
    price: 99,
    category: "Modern Tailoring",
    image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    name: "Everyday Overshirt",
    price: 65,
    category: "Modern Essentials",
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 8,
    name: "Relaxed Shirt",
    price: 55,
    category: "Daily Uniform",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 9,
    name: "Classic Blazer",
    price: 110,
    category: "Tailored Edit",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 10,
    name: "Everyday Set",
    price: 39,
    category: "Kids Essentials",
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 11,
    name: "Weekend Outfit",
    price: 45,
    category: "Weekend Edit",
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 12,
    name: "Soft Knit Set",
    price: 42,
    category: "Soft Essentials",
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 13,
    name: "Summer Outfit",
    price: 48,
    category: "Seasonal Edit",
    image: "https://images.unsplash.com/photo-1621112904887-419379ce6824?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 14,
    name: "Signature Fragrance",
    price: 59,
    category: "VogueWise Beauty",
    image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 15,
    name: "Daily Skin Set",
    price: 52,
    category: "Skin Essentials",
    image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 16,
    name: "Glow Essentials",
    price: 45,
    category: "Beauty Edit",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 17,
    name: "Hydration Set",
    price: 49,
    category: "Daily Care",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=800&q=80"
  }
];


const CART_KEY = "voguewise-cart";

let cart = JSON.parse(
  localStorage.getItem(CART_KEY)
) || [];


// =========================
// SAVE CART
// =========================

function saveCart() {
  localStorage.setItem(
    CART_KEY,
    JSON.stringify(cart)
  );

  updateCartCount();
}


// =========================
// CART COUNT
// =========================

function updateCartCount() {
  const count = document.querySelector("#cartCount");

  if (!count) return;

  const total = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  count.textContent = total;
}


// =========================
// ADD TO CART
// =========================

function addToCart(productId) {
  const product = products.find(
    item => item.id === Number(productId)
  );

  if (!product) return;

  const existing = cart.find(
    item => item.id === product.id
  );

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  saveCart();
  renderCart();
  openCart();
}


// =========================
// REMOVE
// =========================

function removeFromCart(productId) {
  cart = cart.filter(
    item => item.id !== Number(productId)
  );

  saveCart();
  renderCart();
}


// =========================
// QUANTITY
// =========================

function updateQuantity(productId, change) {
  const item = cart.find(
    product => product.id === Number(productId)
  );

  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  saveCart();
  renderCart();
}


// =========================
// TOTAL
// =========================

function getCartTotal() {
  return cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );
}


// =========================
// RENDER CART
// =========================

function renderCart() {
  const cartItems =
    document.querySelector("#cartItems");

  const cartEmpty =
    document.querySelector("#cartEmpty");

  const cartTotal =
    document.querySelector("#cartTotal");

  if (!cartItems) return;


  if (cart.length === 0) {

    cartItems.innerHTML = "";

    if (cartEmpty) {
      cartEmpty.classList.add("show");
    }

    if (cartTotal) {
      cartTotal.textContent = "$0.00";
    }

    return;
  }


  if (cartEmpty) {
    cartEmpty.classList.remove("show");
  }


  cartItems.innerHTML = "";


  cart.forEach(item => {

    const cartItem =
      document.createElement("div");

    cartItem.className = "cart-item";


    cartItem.innerHTML = `
      <div class="cart-item-image">
        <img
          src="${item.image}"
          alt="${item.name}"
        >
      </div>

      <div class="cart-item-details">

        <div class="cart-item-top">

          <div>
            <h3>${item.name}</h3>
            <p>${item.category}</p>
          </div>

          <button
            class="cart-item-remove"
            data-remove="${item.id}"
            type="button"
            aria-label="Remove ${item.name}"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>

        </div>

        <div class="cart-item-bottom">

          <div class="quantity-control">

            <button
              class="quantity-button"
              data-decrease="${item.id}"
              type="button"
              aria-label="Decrease quantity"
            >
              <i class="fa-solid fa-minus"></i>
            </button>

            <span>${item.quantity}</span>

            <button
              class="quantity-button"
              data-increase="${item.id}"
              type="button"
              aria-label="Increase quantity"
            >
              <i class="fa-solid fa-plus"></i>
            </button>

          </div>

          <strong>
            $${(
              item.price * item.quantity
            ).toFixed(2)}
          </strong>

        </div>

      </div>
    `;


    cartItems.appendChild(cartItem);
  });


  if (cartTotal) {
    cartTotal.textContent =
      `$${getCartTotal().toFixed(2)}`;
  }
}


// =========================
// OPEN CART
// =========================

function openCart() {
  const drawer =
    document.querySelector("#cartDrawer");

  const overlay =
    document.querySelector("#cartOverlay");

  if (!drawer) return;

  drawer.classList.add("open");

  if (overlay) {
    overlay.classList.add("open");
  }

  drawer.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.style.overflow = "hidden";
}


// =========================
// CLOSE CART
// =========================

function closeCart() {
  const drawer =
    document.querySelector("#cartDrawer");

  const overlay =
    document.querySelector("#cartOverlay");

  if (!drawer) return;

  drawer.classList.remove("open");

  if (overlay) {
    overlay.classList.remove("open");
  }

  drawer.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.style.overflow = "";
}


// =========================
// QUICK ADD
// =========================

function setupQuickAdd() {
  const buttons = document.querySelectorAll(".quick-add");

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const productId = Number(button.dataset.productId);

      if (!productId) return;

      addToCart(productId);
    });
  });
}

// =========================
// CART EVENTS
// =========================

function setupCart() {

  const cartButton =
    document.querySelector("#cartButton");

  const cartClose =
    document.querySelector("#cartClose");

  const overlay =
    document.querySelector("#cartOverlay");

  const cartItems =
    document.querySelector("#cartItems");


  if (cartButton) {
    cartButton.addEventListener(
      "click",
      openCart
    );
  }


  if (cartClose) {
    cartClose.addEventListener(
      "click",
      closeCart
    );
  }


  if (overlay) {
    overlay.addEventListener(
      "click",
      closeCart
    );
  }


  if (cartItems) {

    cartItems.addEventListener(
      "click",
      event => {

        const remove =
          event.target.closest(
            "[data-remove]"
          );

        const decrease =
          event.target.closest(
            "[data-decrease]"
          );

        const increase =
          event.target.closest(
            "[data-increase]"
          );


        if (remove) {
          removeFromCart(
            remove.dataset.remove
          );
          return;
        }


        if (decrease) {
          updateQuantity(
            decrease.dataset.decrease,
            -1
          );
          return;
        }


        if (increase) {
          updateQuantity(
            increase.dataset.increase,
            1
          );
        }

      }
    );

  }


  const continueShopping =
    document.querySelector(
      "#continueShopping"
    );

  if (continueShopping) {
    continueShopping.addEventListener(
      "click",
      closeCart
    );
  }
}


// =========================
// CHECKOUT
// =========================

function setupCheckout() {

  const button =
    document.querySelector(
      ".checkout-button"
    );

  if (!button) return;


  button.addEventListener(
    "click",
    () => {

      if (cart.length === 0) {
        return;
      }

      window.location.href =
        "checkout.html";
    }
  );
}


// =========================
// MOBILE MENU
// =========================

function setupMobileMenu() {

  const toggle =
    document.querySelector(
      "#menuToggle"
    );

  const nav =
    document.querySelector(
      ".nav-links"
    );

  if (!toggle || !nav) return;


  toggle.addEventListener(
    "click",
    () => {

      nav.classList.toggle("open");

      const isOpen =
        nav.classList.contains("open");

      toggle.setAttribute(
        "aria-expanded",
        isOpen
      );

    }
  );


  nav.querySelectorAll("a")
    .forEach(link => {

      link.addEventListener(
        "click",
        () => {
          nav.classList.remove("open");

          toggle.setAttribute(
            "aria-expanded",
            "false"
          );
        }
      );

    });
}


// =========================
// ESCAPE
// =========================

function setupEscapeKey() {

  document.addEventListener(
    "keydown",
    event => {

      if (event.key === "Escape") {
        closeCart();
      }

    }
  );
}


// =========================
// INIT
// =========================

document.addEventListener(
  "DOMContentLoaded",
  () => {

    updateCartCount();

    renderCart();

    setupQuickAdd();

    setupCart();

    setupCheckout();

    setupMobileMenu();

    setupEscapeKey();

  }
);