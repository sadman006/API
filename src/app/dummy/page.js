// "use client";
// import axios from "@/plugins/axios";
// import { useEffect, useState } from "react";

// export default function Dummy() {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get(`/posts`)
//       .then((data) => {
//         setPosts(data.data);
//         console.log(data.data);
//       })
//       .catch((err) => console.log(err))
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-400 p-6">
//       <h1 className="text-3xl font-bold text-green-400 text-center mb-8 mt-10">
//         All API DATA
//       </h1>

//       {loading && <p>Loading...</p>}

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {posts.map((post) => (
//           <div
//             key={post.id}
//             className="bg-white p-5 rounded-2xl  hover:shadow-xl transition duration-300"
//           >
//             <p className="text-xl text-black font-bold mb-2">
//               User ID: {post.userId}
//             </p>

//             <h2 className="text-lg font-semibold text-gray-600 mb-2 leading-tight">
//               {post.title}
//             </h2>

//             <p className="text-gray-600 text-sm line-clamp-3">{post.body}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import SelectedProductDetails from "@/components/SelectedProductDetails";
import AddProductForm from "@/components/AddProductForm";

export default function ProductPage() {
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "iPhone 15",
      category: "Mobile",
      price: 1200,
      rating: 4.6,
      buyingPercentage: 92,
      usageExperience: 8.7,
      description: "Powerful camera and smooth performance.",
      reviews: [
        {
          user: "John",
          comment: "Excellent phone!",
        },
        {
          user: "Sarah",
          comment: "Camera quality amazing.",
        },
      ],
      image: "/iphone.png",
    },

    {
      id: 2,
      title: "MacBook Pro",
      category: "Laptop",
      price: 2500,
      rating: 4.9,
      buyingPercentage: 96,
      usageExperience: 9.4,
      description: "Professional performance for developers.",
      reviews: [
        {
          user: "Alex",
          comment: "Battery life is insane.",
        },
      ],
      image: "/mac.png",
    },
    {
      id: 3,
      title: "T3 Headphone",
      price: 800,
      category: "accessory",
      rating: 5,
      buyingPercentage: 96,
      usageExperience: 9.4,
      description: "Professional performance for developers.",
      reviews: [
        {
          user: "Mike",
          comment: "Excellent Sound Performance",
        },
      ],
      image: "/headphone.avif",
    },
  ]);

  const [selectedProduct, setSelectedProduct] = useState([]); // Because of selecting Multiple products, if you give null then the prev function on handleSelect will not work                                                            // Handle delete will not work
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [nextId, setNextId] = useState(3);
  const [cart, setCart] = useState([]);

  // SELECT
  // const handleSelect = (product) => {
  //   setSelectedProduct((prev) => [...prev, product]);
  // };

  const handleSelect = (selectedProduct) => {
    setSelectedProduct((prev) => {
      const existingProduct = prev.find((p) => p.id === selectedProduct.id);

      if (existingProduct) {
        return prev.map((p) =>
          p.id === selectedProduct.id ? { ...p, quantity: p.quantity + 1 } : p,
        );
      }
      return [...prev, { ...selectedProduct, quantity: 1 }];
    });
  };

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // DELETE
  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
    setSelectedProduct((prev) => prev.filter((p) => p.id !== id));
    // if (selectedProduct?.id === id) setSelectedProduct(null);
  };

  // ADD NEW PRODUCT
  const handleAdd = (newProduct) => {
    const productWithId = { ...newProduct, id: nextId, rating: 3, stock: "in" };
    setProducts([...products, productWithId]);
    setNextId(nextId + 1);
    setShowAddForm(false);
  };

  // EDIT / SAVE
  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleSaveEdit = (updatedProduct) => {
    setProducts(
      products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
    );
    // also update selectedProduct if it was the one being edited
    if (selectedProduct?.id === updatedProduct.id) {
      setSelectedProduct(updatedProduct);
    }
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  // RATING TOGGLE
  const handleRate = (id) => {
    setProducts(
      products.map((p) =>
        p.id === id ? { ...p, rating: p.rating >= 5 ? 1 : p.rating + 1 } : p,
      ),
    );
    // keep selectedProduct in sync
    if (selectedProduct?.id === id) {
      setSelectedProduct((prev) => ({
        ...prev,
        rating: prev.rating >= 5 ? 1 : prev.rating + 1,
      }));
    }
  };

  // SEARCH + FILTER — derived state, no extra useState needed
  const filteredProducts = products.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = !categoryFilter || p.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-7">
      <div className="mx-auto">
        {/* HEADER */}
        <div className="flex flex-col items-center justify-around mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Electronic Accessories
            </h1>
            <p className="text-sm text-center text-gray-400 mt-1 mb-4">
              {products.length} products total
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 bg-[#22c55e] hover:bg-[#20a14f] text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer"
          >
            {showAddForm ? "✕ Cancel" : "+ Add Product"}
          </button>
        </div>
        {/* ADD FORM */}
        {showAddForm && (
          <AddProductForm
            onAdd={handleAdd}
            onCancel={() => setShowAddForm(false)}
          />
        )}
        {/* SEARCH + FILTER ROW */}
        <div className="flex justify-center items-center gap-3 mb-5">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-1/3 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-gray-400 bg-white"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-white outline-none focus:border-gray-400 cursor-pointer"
          >
            <option value="">All categories</option>
            <option value="Mobile">Mobile</option>
            <option value="Laptop">Laptop</option>
            <option value="Audio">Audio</option>
            <option value="Accessory">Accessory</option>
          </select>
        </div>
        {/* PRODUCT CARDS */}
        <div className="space-y-3">
          {filteredProducts.length === 0 && (
            <div className="text-center py-12 text-gray-400 text-sm">
              No products found.
            </div>
          )}

          <div className="grid grid-cols-3 gap-5">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                handleAddToCart={handleAddToCart}
                product={product}
                onSelect={handleSelect}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onRate={handleRate}
                onSaveEdit={handleSaveEdit}
                onCancelEdit={handleCancelEdit}
                isEditing={editingId === product.id}
                isSelected={selectedProduct?.id === product.id}
              />
            ))}
          </div>
        </div>
        {/* SELECTED PRODUCT DETAIL PANEL */}
        {selectedProduct && (
          <SelectedProductDetails
            product={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            cart={cart}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}
