"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  coupons,
  matchesPriceRange,
  products as catalog,
  sampleUser,
} from "@/data/mockData";

const AppContext = createContext(null);

const STORAGE_KEYS = {
  cart: "shophub_cart_v2",
  wishlist: "shophub_wishlist_v2",
  recentlyViewed: "shophub_recently_viewed_v2",
  theme: "shophub_theme_v2",
  user: "shophub_user_v2",
  coupon: "shophub_coupon_v2",
};

export function AppProvider({ children }) {
  // --- States ---
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Filters & Search
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [onlyBestSellers, setOnlyBestSellers] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals & Drawers
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Theme & Auth
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(sampleUser);
  const [cartPulse, setCartPulse] = useState(0);
  const [toasts, setToasts] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  // --- Initial Hydration from localStorage ---
  useEffect(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem(STORAGE_KEYS.cart) || "[]");
      const savedWishlist = JSON.parse(localStorage.getItem(STORAGE_KEYS.wishlist) || "[]");
      const savedRecent = JSON.parse(localStorage.getItem(STORAGE_KEYS.recentlyViewed) || "[]");
      const savedUser = JSON.parse(localStorage.getItem(STORAGE_KEYS.user) || "null");
      const savedCoupon = JSON.parse(localStorage.getItem(STORAGE_KEYS.coupon) || "null");
      const savedTheme = localStorage.getItem(STORAGE_KEYS.theme);

      setCart(Array.isArray(savedCart) ? savedCart : []);
      setWishlist(Array.isArray(savedWishlist) ? savedWishlist : ["p1", "p7", "p21"]);
      setRecentlyViewed(Array.isArray(savedRecent) ? savedRecent : catalog.slice(0, 4));
      setUser(savedUser || sampleUser);
      setAppliedCoupon(savedCoupon);

      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const isDark = savedTheme ? savedTheme === "dark" : prefersDark;
      setDarkMode(isDark);
      if (isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch (err) {
      console.error("Hydration error:", err);
      setCart([]);
    } finally {
      setHydrated(true);
    }
  }, []);

  // --- Sync to LocalStorage ---
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEYS.wishlist, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEYS.recentlyViewed, JSON.stringify(recentlyViewed));
  }, [recentlyViewed, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEYS.coupon, JSON.stringify(appliedCoupon));
  }, [appliedCoupon, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem(STORAGE_KEYS.theme, darkMode ? "dark" : "light");
  }, [darkMode, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    if (user) {
      localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.user);
    }
  }, [user, hydrated]);

  // --- Toast Manager ---
  const addToast = useCallback(({ title, message, type = "success", product = null, duration = 3500 }) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    setToasts((prev) => [...prev, { id, title, message, type, product, duration }]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // --- Cart Actions ---
  const addToCart = useCallback(
    (product, quantity = 1, options = { showToast: true }) => {
      const selectedColor = options.color || product.variants?.colors?.[0] || null;
      const selectedSize = options.size || product.variants?.sizes?.[0] || null;
      const cartItemId = `${product.id}-${selectedColor || "std"}-${selectedSize || "std"}`;

      setCart((current) => {
        const existing = current.find((item) => item.cartItemId === cartItemId);
        if (existing) {
          return current.map((item) =>
            item.cartItemId === cartItemId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [
          ...current,
          {
            ...product,
            cartItemId,
            quantity,
            selectedColor,
            selectedSize,
          },
        ];
      });

      setCartPulse((prev) => prev + 1);

      if (options.showToast !== false) {
        addToast({
          title: "Added to Cart! 🛍️",
          message: `${product.title.slice(0, 32)}... (Qty: ${quantity})`,
          type: "cart",
          product,
        });
      }
    },
    [addToast]
  );

  const removeFromCart = useCallback(
    (cartItemId) => {
      setCart((current) => current.filter((item) => item.cartItemId !== cartItemId && item.id !== cartItemId));
      addToast({
        title: "Item Removed",
        message: "Product was removed from your shopping cart.",
        type: "info",
      });
    },
    [addToast]
  );

  const updateQuantity = useCallback((cartItemId, quantity) => {
    setCart((current) => {
      if (quantity < 1) {
        return current.filter((item) => item.cartItemId !== cartItemId && item.id !== cartItemId);
      }
      return current.map((item) =>
        item.cartItemId === cartItemId || item.id === cartItemId
          ? { ...item, quantity }
          : item
      );
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // --- Wishlist Actions ---
  const toggleWishlist = useCallback(
    (productId) => {
      setWishlist((prev) => {
        const isFavorited = prev.includes(productId);
        const product = catalog.find((p) => p.id === productId);
        if (isFavorited) {
          addToast({
            title: "Removed from Favorites",
            message: product ? `${product.title.slice(0, 24)}...` : "Item removed",
            type: "info",
          });
          return prev.filter((id) => id !== productId);
        } else {
          addToast({
            title: "Saved to Wishlist! ❤️",
            message: product ? `${product.title.slice(0, 24)}...` : "Item saved",
            type: "success",
          });
          return [...prev, productId];
        }
      });
    },
    [addToast]
  );

  const isWishlisted = useCallback((productId) => wishlist.includes(productId), [wishlist]);

  // --- Recently Viewed Products ---
  const addRecentlyViewed = useCallback((product) => {
    if (!product) return;
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      return [product, ...filtered].slice(0, 8);
    });
  }, []);

  // --- Coupon Logic ---
  const applyCoupon = useCallback(
    (code) => {
      const cleanCode = code.trim().toUpperCase();
      const found = coupons.find((c) => c.code === cleanCode);
      if (found) {
        setAppliedCoupon(found);
        addToast({
          title: `Coupon Applied! 🎉`,
          message: `${found.code}: ${found.description}`,
          type: "success",
        });
        return { success: true, coupon: found };
      } else {
        addToast({
          title: "Invalid Coupon Code",
          message: "Please enter a valid promo code such as SHOP20 or WELCOME10",
          type: "error",
        });
        return { success: false, message: "Invalid code" };
      }
    },
    [addToast]
  );

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
    addToast({
      title: "Coupon Removed",
      message: "Promo discount was cleared from your order.",
      type: "info",
    });
  }, [addToast]);

  // --- Computed Cart Totals ---
  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.discountPercent) {
      return (subtotal * appliedCoupon.discountPercent) / 100;
    }
    if (appliedCoupon.discountFixed) {
      return Math.min(appliedCoupon.discountFixed, subtotal);
    }
    return 0;
  }, [subtotal, appliedCoupon]);

  const freeShippingThreshold = 50;
  const isFreeShipping = subtotal >= freeShippingThreshold || subtotal === 0;
  const shippingFee = isFreeShipping ? 0 : 9.99;
  const estimatedTax = subtotal > 0 ? (subtotal - discountAmount) * 0.08 : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee + estimatedTax);

  // --- Filter Toggles ---
  const toggleCategory = useCallback((category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  }, []);

  const togglePriceRange = useCallback((rangeId) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(rangeId)
        ? prev.filter((r) => r !== rangeId)
        : [...prev, rangeId]
    );
  }, []);

  const toggleGender = useCallback((gender) => {
    setSelectedGenders((prev) =>
      prev.includes(gender) ? prev.filter((g) => g !== gender) : [...prev, gender]
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedCategories([]);
    setSelectedPriceRanges([]);
    setSelectedGenders([]);
    setSelectedRating(null);
    setOnlyBestSellers(false);
    setInStockOnly(false);
    setSearchQuery("");
  }, []);

  const filtersActive =
    selectedCategories.length > 0 ||
    selectedPriceRanges.length > 0 ||
    selectedGenders.length > 0 ||
    selectedRating !== null ||
    onlyBestSellers ||
    inStockOnly ||
    searchQuery.trim().length > 0;

  // --- Filtered and Sorted Catalog ---
  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const filtered = catalog.filter((product) => {
      // Category
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      // Gender
      const matchesGender =
        selectedGenders.length === 0 ||
        selectedGenders.includes(product.gender) ||
        product.gender === "Both";

      // Price
      const matchesPrice =
        selectedPriceRanges.length === 0 ||
        selectedPriceRanges.some((rangeId) => matchesPriceRange(product.price, rangeId));

      // Minimum Rating
      const matchesRating =
        selectedRating === null || product.rating >= selectedRating;

      // Best Sellers
      const matchesBestSeller = !onlyBestSellers || product.isBestSeller;

      // Stock
      const matchesStock = !inStockOnly || product.stock > 0;

      // Search Query
      const matchesSearch =
        query.length === 0 ||
        product.title.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.sellerName.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);

      return (
        matchesCategory &&
        matchesGender &&
        matchesPrice &&
        matchesRating &&
        matchesBestSeller &&
        matchesStock &&
        matchesSearch
      );
    });

    // Sorting
    return [...filtered].sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "popularity") return b.reviewCount - a.reviewCount;
      // Default: featured / best seller first
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    });
  }, [
    searchQuery,
    selectedCategories,
    selectedGenders,
    selectedPriceRanges,
    selectedRating,
    onlyBestSellers,
    inStockOnly,
    sortBy,
  ]);

  // --- Auth & User State ---
  const login = useCallback(
    (email, password) => {
      const nextUser = {
        ...sampleUser,
        name: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
        email,
      };
      setUser(nextUser);
      addToast({
        title: "Welcome back! 👋",
        message: `Logged in as ${nextUser.name}`,
        type: "success",
      });
      return nextUser;
    },
    [addToast]
  );

  const register = useCallback(
    (formData) => {
      const nextUser = {
        ...sampleUser,
        id: `u_${Date.now()}`,
        name: formData.fullName || "Valued Customer",
        email: formData.email,
        phone: formData.phone || "+1 555 010 8899",
      };
      setUser(nextUser);
      addToast({
        title: "Account Created! 🎉",
        message: `Welcome to ShopHub, ${nextUser.name}!`,
        type: "success",
      });
      return nextUser;
    },
    [addToast]
  );

  const logout = useCallback(() => {
    setUser(null);
    addToast({
      title: "Logged Out",
      message: "You have safely signed out of ShopHub.",
      type: "info",
    });
  }, [addToast]);

  const value = {
    // Data
    products: catalog,
    filteredProducts,
    cart,
    wishlist,
    recentlyViewed,
    cartCount,
    wishlistCount: wishlist.length,
    subtotal,
    discountAmount,
    shippingFee,
    isFreeShipping,
    freeShippingThreshold,
    estimatedTax,
    finalTotal,
    appliedCoupon,
    cartPulse,
    toasts,

    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleWishlist,
    isWishlisted,
    addRecentlyViewed,
    applyCoupon,
    removeCoupon,
    addToast,
    removeToast,

    // Filter controls
    selectedCategories,
    selectedPriceRanges,
    selectedGenders,
    selectedRating,
    onlyBestSellers,
    inStockOnly,
    sortBy,
    viewMode,
    searchQuery,
    filtersActive,
    toggleCategory,
    togglePriceRange,
    toggleGender,
    setSelectedRating,
    setOnlyBestSellers,
    setInStockOnly,
    setSortBy,
    setViewMode,
    setSearchQuery,
    clearFilters,

    // Modals & Navigation
    searchOpen,
    setSearchOpen,
    mobileNavOpen,
    setMobileNavOpen,
    sidebarOpen,
    setSidebarOpen,
    quickViewProduct,
    setQuickViewProduct,

    // Theme & Auth
    darkMode,
    setDarkMode,
    user,
    login,
    register,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
