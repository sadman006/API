"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEdit, FaShare, FaTrash } from "react-icons/fa";
import { IoLogoFacebook } from "react-icons/io5";
import { FaWhatsapp, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Post() {
  const [posts, setPosts] = useState([]);
  const [activePost, setActivePost] = useState(null);
  const [editData, setEditData] = useState({ title: "", body: "" });
  const [loading, setLoading] = useState(false);

  const [commentsMap, setCommentsMap] = useState({});
  const [newComments, setNewComments] = useState({});

  // Add Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", body: "" });
  const [openMenuId, setOpenMenuId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [sharePost, setSharePost] = useState(null);

  // Fetch Posts
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
        );
        setPosts(res.data.slice(0, 5));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const handleClick = () => setOpenMenuId(null);
    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, []);

  // Select Post
  const handleSelect = async (post) => {
    setActivePost(post);
    setEditData({ title: post.title, body: post.body });

    if (!commentsMap[post.id]) {
      // If there is no comment in it then it will fetch form api
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`,
      );
      setCommentsMap((prev) => ({ ...prev, [post.id]: res.data }));
    }
  };

  //  Edit Change
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Update Post
  const handleUpdate = async () => {
    if (!activePost) return;

    setLoading(true);

    try {
      const updatedPayload = {
        ...activePost, // keep other fields
        ...editData, // override edited fields
      };

      const res = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${activePost.id}`,
        updatedPayload,
      );

      console.log("Updated Response:", res.data);

      // Update UI
      setPosts((prev) =>
        prev.map((p) => (p.id === activePost.id ? { ...p, ...editData } : p)),
      );

      setActivePost(null);
    } catch (err) {
      console.log("Update error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Add Comment
  const handleAddComment = async (postId) => {
    const text = newComments[postId];
    if (!text) return;

    try {
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/comments",
        {
          postId,
          body: text,
        },
      );

      setCommentsMap((prev) => ({
        ...prev,
        [postId]: [...(prev[postId] || []), res.data],
      }));

      setNewComments((prev) => ({ ...prev, [postId]: "" }));
    } catch (err) {
      console.log(err);
    }
  };

  // Delete Comment
  const handleDeleteComment = (postId, commentId) => {
    const updated = commentsMap[postId].filter((c) => c.id !== commentId);

    setCommentsMap((prev) => ({
      ...prev,
      [postId]: updated,
    }));
  };

  // New Post Change
  const handleNewPostChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  // Add Post
  const handleAddPost = async () => {
    if (!newPost.title || !newPost.body) return;

    try {
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        newPost,
      );

      const createdPost = {
        ...res.data,
        id: Date.now(), // unique fake id
      };

      setPosts((prev) => [createdPost, ...prev]);

      setNewPost({ title: "", body: "" });
      setIsAddModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (post) => {
    setActivePost(post);
    setEditData({ title: post.title, body: post.body });
    setOpenMenuId(null);
  };

  //   const handleShare = async (post) => {
  //   try {
  //     if (navigator.share) {
  //       await navigator.share({
  //         title: post.title,
  //         text: post.body,
  //         url: `https://yourwebsite.com/posts/${post.id}`, // change this
  //       });
  //     } else {
  //       alert("Sharing not supported on this browser");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleShare = (post) => {
    setSharePost(post);
    setOpenMenuId(null);
    console.log("Share", post);
  };

  const getShareLinks = (post) => {
    const url = `https://yourwebsite.com/posts/${post.id}`;
    const text = post.title;

    return {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      whatsapp: `https://wa.me/?text=${text} ${url}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setOpenMenuId(null);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `https://jsonplaceholder.typicode.com/posts/${deleteId}`,
      );
      setPosts((prev) => prev.filter((post) => post.id !== deleteId));
      setDeleteId(null);
    } catch (err) {
      console.log(err);
    }
  };
  // const confirmDelete = () => {
  //   const updatedPosts = posts.filter((p) => p.id !== deleteId);
  //   setPosts(updatedPosts);
  //   setDeleteId(null);
  // };

  const cancelDelete = () => {
    setDeleteId(null);
  };

  return (
    <div className="min-h-screen bg-gray-600 p-6 text-white">
      {/* Loading */}
      {loading && <p className="text-center">Loading...</p>}

      {/* ✅ Add Button */}
      <div className="max-w-2xl mx-auto mb-4 flex justify-start">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-green-500 text-white px-3 py-2 rounded cursor-pointer"
        >
          + Add Post
        </button>
      </div>

      {/* Posts */}
      <div className="grid gap-4 max-w-2xl mx-auto">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white text-black p-4 rounded-xl relative hover:shadow-lg transition"
          >
            {/* 3 dot button */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // card click prevent
                setOpenMenuId(openMenuId === post.id ? null : post.id);
              }}
              className="absolute top-3 right-3 cursor-pointer text-gray-600 hover:text-black"
            >
              <BsThreeDotsVertical />
            </button>

            {/* Dropdown Menu */}
            {openMenuId === post.id && (
              <div className="absolute top-10 right-3 bg-white border rounded-lg shadow-md w-32 z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(post);
                  }}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 w-full"
                >
                  <FaEdit /> Edit
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShare(post);
                  }}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 w-full"
                >
                  <FaShare /> Share
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(post.id);
                  }}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-red-100 text-red-500 w-full"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            )}

            {/* Card content */}
            <div onClick={() => handleSelect(post)}>
              <h2 className="font-bold">{post.title}</h2>
              <p>{post.body}</p>
            </div>
          </div>
        ))}
      </div>

      {/*  Edit Modal */}
      <AnimatePresence>
        {activePost && (
          <motion.div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <motion.div className="bg-white text-black p-6 rounded-xl w-125 max-h-[90vh] overflow-y-auto relative">
              <button
                onClick={() => setActivePost(null)}
                className="absolute cursor-pointer top-5 right-3"
              >
                <RxCross2 />
              </button>

              <h2 className="text-xl font-bold mb-4">Edit Post</h2>

              <input
                type="text"
                name="title"
                value={editData.title}
                onChange={handleChange}
                className="w-full border p-2 mb-3"
              />

              <textarea
                name="body"
                value={editData.body}
                onChange={handleChange}
                className="w-full min-h-32 border p-2 mb-3"
              />

              <div className="flex justify-between mb-4">
                <button
                  onClick={handleUpdate}
                  disabled={loading}
                  className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded"
                >
                  {loading ? "Updating..." : "Save"}
                </button>

                <button
                  onClick={() => setActivePost(null)}
                  className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded"
                >
                  Close
                </button>
              </div>

              {/* Comments */}
              <div className="border-t pt-3">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={newComments[activePost.id] || ""}
                  onChange={(e) =>
                    setNewComments({
                      ...newComments,
                      [activePost.id]: e.target.value,
                    })
                  }
                  className="w-full border p-2 mb-2"
                />

                <button
                  onClick={() => handleAddComment(activePost.id)}
                  className="bg-purple-600 text-white px-3 py-1 rounded mb-3"
                >
                  Add Comment
                </button>

                {(commentsMap[activePost.id] || []).map((c) => (
                  <div key={c.id} className="bg-gray-200 p-2 mb-2 rounded">
                    <p className="font-bold">User #{c.id}</p>
                    <p>{c.body}</p>

                    <button
                      onClick={() => handleDeleteComment(activePost.id, c.id)}
                      className="bg-red-500 text-white cursor-pointer text-sm px-2 py-1 rounded mt-1"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ Add Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <motion.div className="bg-white text-black p-6 rounded-xl w-125 relative">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute cursor-pointer top-3 right-3"
              >
                <RxCross2 />
              </button>

              <h2 className="text-xl font-bold mb-4">Add New Post</h2>

              <input
                type="text"
                name="title"
                placeholder="Title"
                value={newPost.title}
                onChange={handleNewPostChange}
                className="w-full border p-2 mb-3"
              />

              <textarea
                name="body"
                placeholder="Body"
                value={newPost.body}
                onChange={handleNewPostChange}
                className="w-full min-h-32 border p-2 mb-3"
              />

              <button
                onClick={handleAddPost}
                className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded"
              >
                Save Post
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* ✅ Delete Confirmation */}
      <AnimatePresence>
        {deleteId && (
          <motion.div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white text-black p-6 rounded-xl w-80 text-center"
            >
              <h2 className="text-xl font-semibold mb-4">
                Are you sure you want to delete?
              </h2>

              <div className="flex justify-center gap-4">
                <button
                  onClick={confirmDelete}
                  className="bg-red-500 cursor-pointer text-white px-4 py-1.5 rounded-md"
                >
                  Yes
                </button>

                <button
                  onClick={cancelDelete}
                  className="bg-green-500 cursor-pointer text-white px-4 py-1.5 rounded-md"
                >
                  No
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {sharePost && (
          <motion.div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white text-black p-6 rounded-xl w-80 text-center relative"
            >
              <button
                onClick={() => setSharePost(null)}
                className="absolute top-4 right-3 text-gray-600 cursor-pointer transition hover:text-black"
              >
                <RxCross2 size={20} />
              </button>
              <h2 className="text-xl font-semibold mb-4">Share this post on</h2>

              {(() => {
                const links = getShareLinks(sharePost);
                return (
                  <div className="flex justify-around items-center gap-3">
                    <a
                      href={links.facebook}
                      target="_blank"
                      className="hover:text-blue-600 transition text-2xl cursor-pointer py-2 rounded"
                    >
                      <IoLogoFacebook />
                    </a>

                    <a
                      href={links.whatsapp}
                      target="_blank"
                      className="hover:text-green-500 transition text-2xl cursor-pointer py-2 rounded"
                    >
                      <FaWhatsapp />
                    </a>

                    <a
                      href={links.twitter}
                      target="_blank"
                      className="hover:text-blue-500 transition text-2xl cursor-pointer py-2 rounded"
                    >
                      <FaTwitter />
                    </a>

                    <a
                      href={links.linkedin}
                      target="_blank"
                      className="hover:text-blue-700 text-2xl py-2 transition cursor-pointer rounded"
                    >
                      <FaLinkedin />
                    </a>
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
