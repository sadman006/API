// COMPONENT
"use client";
import Link from "next/link";
export default function ProductCard({ product, onSelect }) {
  // OBJECT DESTRUCTURING
  const { title, price, category } = product;

  return (
    <div className="border p-5 rounded-xl">
      <h2 className="text-xl font-semibold">{title}</h2>

      <p>Category: {category}</p>

      <p>Price: ${price}</p>

      <div className="flex gap-2">
        <button
          onClick={() => onSelect(product)}
          className="mt-3 bg-[#2c64be] hover:bg-[#306dcf] text-white px-4 py-1 transition-all cursor-pointer rounded-lg"
        >
          Select Product
        </button>

        <button
          onClick={() => setSelectedProduct(product)}
          className="mt-3 bg-[#275eb6] hover:bg-[#2f69c5] text-white px-4 py-1 transition-all cursor-pointer rounded-lg"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
