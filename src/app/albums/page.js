"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
export default function Albums() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    body: "",
  });
  const [posts, setPosts] = useState([]);

  const AddPost = () => {
    if (!newPost.title || !newPost.body) {
      alert("Please fill all fields");
      return;
    }

    setPosts([...posts, newPost]);

    setNewPost({
      title: "",
      body: "",
    });

    setIsAddModalOpen(false);
  };

  const handleclick = () => {
    setIsAddModalOpen(false);
  };
  return (
    <>
      <div className="min-h-screen bg-gray-900 p-6">
        <div className="flex justify-center w-fit items-center px-2 py-2 mx-auto bg-blue-500">
          <button
            className="text-white cursor-pointer text-center"
            onClick={() => setIsAddModalOpen(true)}
          >
            Click Here
          </button>
        </div>

        {/* Show Saved Posts */}
        <div className="flex flex-col justify-center items-center mt-6 space-y-4">
          {posts.map((post, index) => (
            <div key={index} className="bg-white p-6 rounded-lg">
              <h2 className="font-bold text-lg">{post.title}</h2>
              <p>{post.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <motion.div className="bg-white text-black p-6 rounded-xl w-125 relative">
              <button
                onClick={handleclick}
                className="absolute cursor-pointer top-3 right-3"
              >
                <RxCross2 />
              </button>

              <h2 className="text-xl font-bold mb-4">Add New Post</h2>

              <input
                type="text"
                placeholder="Enter title"
                value={newPost.title}
                onChange={(e) =>
                  setNewPost({ ...newPost, title: e.target.value })
                }
                className="border p-2 w-full mb-4"
              />

              <input
                type="text"
                placeholder="Enter body"
                value={newPost.body}
                onChange={(e) =>
                  setNewPost({ ...newPost, body: e.target.value })
                }
                className="border p-2 w-full mb-4"
              />

              <button
                onClick={AddPost}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save Post
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
