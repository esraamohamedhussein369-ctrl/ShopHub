"use client";

import Image from "next/image";
import Link from "next/link";
import { FiShoppingBag } from "react-icons/fi";
import { useApp } from "@/context/AppContext";

export default function ProductCard({ product }) {
  const { addToCart } = useApp();

  return (
    <article className="card group flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/product/${product.id}`} className="relative block aspect-[4/3] overflow-hidden bg-gray-100">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 text-sm font-semibold text-ink dark:text-gray-100">
          <Link
            href={`/product/${product.id}`}
            className="hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {product.title}
          </Link>
        </h3>
        <p className="text-lg font-bold text-primary">${product.price.toFixed(2)}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{product.seller.name}</p>
        <button
          type="button"
          className="btn-secondary mt-auto w-full"
          onClick={() => addToCart(product)}
        >
          <FiShoppingBag className="h-4 w-4" aria-hidden />
          Add to Cart
        </button>
      </div>
    </article>
  );
}
