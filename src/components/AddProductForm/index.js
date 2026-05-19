"use client";
import { useState } from "react";

export default function AddProductForm({ onAdd, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "Mobile",
    stock: "in",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // basic validation
    if (!formData.title.trim() || !formData.price) return;

    onAdd({
      title: formData.title.trim(),
      price: parseFloat(formData.price),
      category: formData.category,
      stock: formData.stock,
    });
  };

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-2xl p-5 mb-5 bg-white">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
        New Product
      </p>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Product name"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Price ($)</label>
          <input
            name="price"
            type="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="0"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:border-gray-400 cursor-pointer"
          >
            <option>Mobile</option>
            <option>Laptop</option>
            <option>Audio</option>
            <option>Accessory</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Stock</label>
          <select
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:border-gray-400 cursor-pointer"
          >
            <option value="in">In stock</option>
            <option value="low">Low stock</option>
            <option value="out">Out of stock</option>
          </select>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={handleSubmit}
          className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer"
        >
          Add product
        </button>
        <button
          onClick={onCancel}
          className="border border-gray-200 px-4 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
