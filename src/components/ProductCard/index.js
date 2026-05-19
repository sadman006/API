// COMPONENT
"use client";
import Image from "next/image";
export default function ProductCard({ product, onSelect }) {
  // OBJECT DESTRUCTURING
  const { title, price, category, image } = product;

  return (
    <div className="border border-[#ced7de] p-5 rounded-xl">
      <h2 className="text-xl font-semibold">{title}</h2>

      <p>Category: {category}</p>

      <p>Price: ${price}</p>

      <div className="mt-3">
        <Image
          src={image}
          alt="image"
          width={800}
          height={800}
          className="rounded-2xl"
        />
      </div>

      <div className="flex justify-center items-center w-fit gap-2">
        <button
          onClick={() => onSelect(product)}
          className="mt-3 bg-[#2c64be] hover:bg-[#306dcf] text-white px-4 py-1 transition-all cursor-pointer rounded-lg"
        >
          Add to Cart
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
