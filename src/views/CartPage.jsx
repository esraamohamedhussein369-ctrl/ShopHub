"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiArrowLeft,
  FiCheck,
  FiCheckCircle,
  FiCreditCard,
  FiLock,
  FiMinus,
  FiPlus,
  FiRotateCcw,
  FiShield,
  FiShoppingBag,
  FiTag,
  FiTrash2,
  FiTruck,
  FiX,
} from "react-icons/fi";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Toast from "@/components/common/Toast";
import ScrollToTop from "@/components/common/ScrollToTop";
import { useApp } from "@/context/AppContext";

export default function CartPage() {
  const {
    cart,
    cartCount,
    subtotal,
    discountAmount,
    shippingFee,
    isFreeShipping,
    freeShippingThreshold,
    estimatedTax,
    finalTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    updateQuantity,
    removeFromCart,
    clearCart,
    user,
    addToast,
  } = useApp();

  const [promoInput, setPromoInput] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Free shipping progress calculation
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    applyCoupon(promoInput.trim());
    setPromoInput("");
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderPlaced(true);
      clearCart();
      addToast({
        title: "Order Placed Successfully! 📦🎉",
        message: "Thank you for supporting independent marketplace sellers!",
        type: "success",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB] dark:bg-[#0B0F19] text-[#1F2937] dark:text-[#F3F4F6] transition-colors duration-200">
      <Header />

      <main className="mx-auto max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400"
          >
            <FiArrowLeft className="h-4 w-4" />
            <span>Continue Shopping</span>
          </Link>

          {cart.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="text-xs font-semibold text-gray-400 hover:text-rose-600 transition"
            >
              Clear Cart
            </button>
          )}
        </div>

        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-white">
            Shopping Cart ({cartCount} {cartCount === 1 ? "Item" : "Items"})
          </h1>
        </div>

        {orderPlaced ? (
          /* Order Confirmed Screen */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="my-10 rounded-3xl border border-emerald-200 bg-emerald-50/60 p-8 sm:p-14 text-center dark:border-emerald-900/50 dark:bg-emerald-950/20"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 text-2xl">
              <FiCheckCircle className="h-8 w-8" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-emerald-950 dark:text-emerald-200">
              Order Confirmed & Placed!
            </h2>
            <p className="mt-2 text-sm text-emerald-800 dark:text-emerald-300 max-w-md mx-auto">
              Your order confirmation and tracking details have been dispatched to{" "}
              <span className="font-bold">{user?.email || "your registered email"}</span>.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/dashboard?tab=orders" className="btn-secondary !px-6 !py-3">
                View Order Status
              </Link>
              <Link href="/" className="btn-ghost !px-6 !py-3">
                Return to Shop
              </Link>
            </div>
          </motion.div>
        ) : cart.length === 0 ? (
          /* Empty Cart State */
          <div className="my-12 flex flex-col items-center justify-center rounded-3xl border border-gray-100 bg-white p-10 sm:p-16 text-center shadow-xs dark:border-gray-800 dark:bg-gray-900">
            <div className="relative mb-4 flex h-24 w-24 items-center justify-center rounded-3xl bg-purple-50 text-5xl dark:bg-purple-950/40">
              <span>🛒</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
              Your cart is empty 🛒
            </h2>
            <p className="mt-2 max-w-sm text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Looks like you haven&apos;t added anything to your cart yet. Explore the marketplace for top deals!
            </p>
            <Link
              href="/"
              className="btn-primary mt-6 !px-8 !py-3.5 !text-sm !font-bold"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          /* Cart Items & Summary Grid */
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
            {/* Left Items Column (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              {/* Free Shipping Progress Meter */}
              <div className="rounded-3xl border border-purple-100 bg-purple-50/70 p-4 sm:p-5 dark:border-purple-900/40 dark:bg-purple-950/30">
                <div className="flex items-center justify-between text-xs font-bold text-purple-900 dark:text-purple-200">
                  <span className="flex items-center gap-1.5">
                    <FiTruck className="h-4 w-4 text-purple-600" />
                    {isFreeShipping ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">
                        🎉 Congratulations! You have qualified for FREE Shipping!
                      </span>
                    ) : (
                      <span>
                        Add{" "}
                        <span className="font-extrabold text-purple-700 dark:text-purple-300">
                          ${amountToFreeShipping.toFixed(2)}
                        </span>{" "}
                        more to qualify for FREE Express Shipping!
                      </span>
                    )}
                  </span>
                  <span className="text-[11px]">{Math.round(freeShippingProgress)}%</span>
                </div>
                <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-purple-200/80 dark:bg-purple-900/50">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${freeShippingProgress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-purple-600 to-pink-500 rounded-full"
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="divide-y divide-gray-100 rounded-3xl border border-gray-100 bg-white shadow-xs dark:divide-gray-800 dark:border-gray-800 dark:bg-gray-900 overflow-hidden">
                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.div
                      key={item.cartItemId || item.id}
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0, x: -50 }}
                      transition={{ duration: 0.25 }}
                      className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
                    >
                      {/* Item Image */}
                      <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                          {item.category} • Sold by {item.sellerName || "ShopHub Store"}
                        </span>
                        <h3 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-1 dark:text-white">
                          <Link href={`/product/${item.id}`} className="hover:underline">
                            {item.title}
                          </Link>
                        </h3>

                        {/* Selected Variants */}
                        {(item.selectedColor || item.selectedSize) && (
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            {item.selectedColor && (
                              <span>Color: {item.selectedColor}</span>
                            )}
                            {item.selectedColor && item.selectedSize && <span>•</span>}
                            {item.selectedSize && (
                              <span>Size: {item.selectedSize}</span>
                            )}
                          </div>
                        )}

                        <p className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>

                      {/* Quantity Modifier & Total Price */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-2 sm:pt-0">
                        <span className="text-base sm:text-lg font-black text-gray-900 dark:text-white">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>

                        <div className="flex items-center gap-2">
                          {/* Stepper */}
                          <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 p-0.5 dark:border-gray-700 dark:bg-gray-800">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.cartItemId || item.id, item.quantity - 1)
                              }
                              className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-600 hover:bg-white hover:shadow-2xs dark:text-gray-300 dark:hover:bg-gray-700"
                              aria-label="Decrease quantity"
                            >
                              <FiMinus className="h-3 w-3" />
                            </button>
                            <span className="w-8 text-center text-xs font-bold">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.cartItemId || item.id, item.quantity + 1)
                              }
                              className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-600 hover:bg-white hover:shadow-2xs dark:text-gray-300 dark:hover:bg-gray-700"
                              aria-label="Increase quantity"
                            >
                              <FiPlus className="h-3 w-3" />
                            </button>
                          </div>

                          {/* Delete Item */}
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.cartItemId || item.id)}
                            className="flex h-8 w-8 items-center justify-center rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                            aria-label="Remove item"
                          >
                            <FiTrash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Right Summary Column (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              {/* Order Summary Card */}
              <div className="sticky top-28 rounded-3xl border border-gray-100 bg-white p-6 shadow-xs dark:border-gray-800 dark:bg-gray-900 space-y-4">
                <h2 className="text-base font-black uppercase tracking-wider text-gray-900 dark:text-white">
                  Order Summary
                </h2>

                {/* Promo Code Input */}
                <div>
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <div className="relative flex-1">
                      <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="Coupon (e.g. SHOP20)"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-9 pr-3 py-2 text-xs font-semibold outline-none transition focus:border-purple-500 focus:bg-white dark:border-gray-700 dark:bg-gray-800 uppercase"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn-primary !px-3.5 !py-2 !text-xs !rounded-xl"
                    >
                      Apply
                    </button>
                  </form>

                  {/* Applied Coupon Chip */}
                  {appliedCoupon && (
                    <div className="mt-2.5 flex items-center justify-between rounded-xl bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                      <span className="flex items-center gap-1.5">
                        <FiCheck className="h-3.5 w-3.5" />
                        <span>
                          {appliedCoupon.code} (-${discountAmount.toFixed(2)})
                        </span>
                      </span>
                      <button
                        type="button"
                        onClick={removeCoupon}
                        className="text-rose-600 hover:text-rose-800"
                        aria-label="Remove coupon"
                      >
                        <FiX className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2.5 border-t border-gray-100 pt-4 text-xs sm:text-sm dark:border-gray-800">
                  <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex items-center justify-between text-rose-600 font-semibold">
                      <span>Promo Discount</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <span>Estimated Shipping</span>
                      {isFreeShipping && (
                        <span className="rounded-md bg-emerald-100 px-1.5 py-0.2 text-[10px] font-extrabold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                          FREE
                        </span>
                      )}
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {isFreeShipping ? "$0.00" : `$${shippingFee.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
                    <span>Estimated Tax (8%)</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ${estimatedTax.toFixed(2)}
                    </span>
                  </div>

                  {/* Final Total */}
                  <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-base sm:text-lg font-black text-gray-900 dark:text-white dark:border-gray-800">
                    <span>Total Amount</span>
                    <span className="text-xl sm:text-2xl text-purple-600 dark:text-purple-400">
                      ${finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  type="button"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="btn-primary w-full py-4 text-sm sm:text-base font-black !rounded-2xl shadow-xl shadow-purple-500/30 tracking-wide"
                >
                  {isCheckingOut ? (
                    <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <span className="flex items-center gap-2">
                      <FiLock className="h-4 w-4" />
                      <span>Proceed to Checkout</span>
                    </span>
                  )}
                </button>

                {/* Trust Footer */}
                <div className="text-center pt-1 text-[11px] text-gray-400 flex items-center justify-center gap-2">
                  <FiShield className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Guaranteed Safe & Secure Checkout</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Toast />
      <ScrollToTop />
      <Footer />
    </div>
  );
}
