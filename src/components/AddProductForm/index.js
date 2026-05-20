"use client";
import { useState } from "react";
import Image from "next/image";
export default function AddProductForm({ onAdd, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "Mobile",
    stock: "in",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image upload
  // const handleImageChange = (e) => {
  //   const file = e.target.file[0];

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setFormData({
  //         ...formData,
  //         image: reader.result,
  //       });
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const allowedTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/jfif",
      ];

      if (!allowedTypes.includes(file.type)) {
        alert("Only PNG, JPG, JPEG, JFIF files are allowed");
        return;
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: reader.result,
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    // basic validation
    if (!formData.title.trim() || !formData.price) return;

    onAdd({
      title: formData.title.trim(),
      price: parseFloat(formData.price),
      category: formData.category,
      stock: formData.stock,
      image: formData.image,
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
            <option>Vehicle</option>
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

      {/* Image Upload */}
      <div className="col-span-2">
        <label className="text-xs text-gray-500 mb-1 block">
          Product Image
        </label>
        <input
          type="file"
          accept=".png, .jpg, .jpeg, .jfif"
          onChange={handleImageChange}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm cursor-pointer"
        />
      </div>

      {/* Preview */}
      {formData.image && (
        <div className="col-span-2">
          <Image
            src={formData.image}
            alt="Preview"
            width={100}
            height={100}
            className="object-cover rounded-lg border"
          />
        </div>
      )}
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
