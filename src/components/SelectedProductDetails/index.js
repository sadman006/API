"use client";
import { AiFillDelete } from "react-icons/ai";

export default function SelectedProductDetails({
  product,
  setSelectedProduct,
}) {
  // DELETE SINGLE PRODUCT
  const handleDelete = (id) => {
    const remainingProducts = product.filter((p) => p.id !== id);
    setSelectedProduct(remainingProducts);
  };

  return (
    <div className="bg-gray-100 p-5 rounded-xl mt-6 space-y-4">
      <h2 className="text-2xl font-bold">Selected Products</h2>
      {product.map((p) => (
        <div
          key={p.id}
          className="flex justify-between items-center bg-white p-4 rounded-lg"
        >
          <div>
            <p>Title: {p.title}</p>

            <p>Category: {p.category}</p>

            <p>Price: ${p.price}</p>
            <p>Add to Cart: +{p.quantity}</p>
          </div>

          <AiFillDelete
            onClick={() => handleDelete(p.id)}
            className="text-red-500 text-[30px] cursor-pointer"
          />
        </div>
      ))}
    </div>
  );
}
