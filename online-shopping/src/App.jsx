import React, { useEffect, useState } from "react";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 1499,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 1999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    rating: 4.2,
  },
  {
    id: 3,
    name: "Running Shoes",
    price: 2499,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    rating: 4.6,
  },
  {
    id: 4,
    name: "Backpack",
    price: 899,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    rating: 4.3,
  },
  {
    id: 5,
    name: "Camera",
    price: 15999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
    rating: 4.8,
  },
  {
    id: 6,
    name: "Sunglasses",
    price: 599,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500",
    rating: 4.1,
  },
  {
    id: 7,
    name: "T-Shirt",
    price: 499,
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    rating: 4.0,
  },
  {
    id: 8,
    name: "Laptop",
    price: 45999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
    rating: 4.7,
  },
];

function App() {
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("shoppingCart")) || [];
  });

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
  }, [cart]);

  // Add product to cart
  const addToCart = (product) => {
    setCart((previous) => {
      const existing = previous.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return previous.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previous, { ...product, quantity: 1 }];
    });
  };

  // Increase or decrease quantity
  const changeQuantity = (id, amount) => {
    setCart((previous) =>
      previous
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove product
  const removeItem = (id) => {
    setCart((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  // Calculate total
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // Search and filter
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo">ShopEasy</h2>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#products">Products</a>

          <button
            className="cart-button"
            onClick={() => setShowCart(!showCart)}
          >
            🛒 Cart ({cartCount})
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div>
          <h1>Welcome to ShopEasy</h1>
          <p>
            Discover amazing products at affordable prices.
          </p>
          <a href="#products" className="shop-button">
            Shop Now
          </a>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section" id="products">
        <h2>Our Products</h2>
        <p className="subtitle">
          Find your favourite products here
        </p>

        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          className="search-box"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Category Filter */}
        <div className="categories">
          {["All", "Electronics", "Fashion", "Accessories"].map(
            (cat) => (
              <button
                key={cat}
                className={category === cat ? "active" : ""}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            )
          )}
        </div>

        {/* Product Cards */}
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />

              <div className="product-info">
                <span className="product-category">
                  {product.category}
                </span>

                <h3>{product.name}</h3>

                <p className="rating">
                  ⭐ {product.rating}
                </p>

                <h3 className="price">
                  ₹{product.price.toLocaleString("en-IN")}
                </h3>

                <button
                  className="add-button"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="empty-message">
            No products found!
          </p>
        )}
      </section>

      {/* Shopping Cart */}
      {showCart && (
        <section className="cart-section">
          <div className="cart-heading">
            <h2>🛒 Shopping Cart</h2>
            <button onClick={() => setShowCart(false)}>
              ✕
            </button>
          </div>

          {cart.length === 0 ? (
            <p className="empty-message">
              Your cart is empty!
            </p>
          ) : (
            <>
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />

                  <div className="cart-details">
                    <h3>{item.name}</h3>
                    <p>₹{item.price.toLocaleString("en-IN")}</p>

                    <div className="quantity">
                      <button
                        onClick={() =>
                          changeQuantity(item.id, -1)
                        }
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          changeQuantity(item.id, 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    className="remove-button"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}

              <div className="cart-total">
                <h3>
                  Total: ₹{total.toLocaleString("en-IN")}
                </h3>
                <button
                  className="checkout-button"
                  onClick={() =>
                    alert("Demo project: Checkout successful!")
                  }
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </section>
      )}

      {/* Footer */}
      <footer>
        <h2>ShopEasy</h2>
        <p>
          Your favourite online shopping destination.
        </p>
        <p>© 2026 ShopEasy. College Mini Project.</p>
      </footer>
    </div>
  );
}

export default App;