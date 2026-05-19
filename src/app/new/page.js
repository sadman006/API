"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import { PiDotsThreeCircleVertical } from "react-icons/pi";
import { FaEdit, FaShare, FaTrash } from "react-icons/fa";
import { FaWhatsapp, FaTwitter, FaLinkedin } from "react-icons/fa";
import { IoLogoFacebook } from "react-icons/io5";

export default function NewPage() {
  const [loading, setLoading] = useState(false);

  const [posts, setPosts] = useState([]);
  const [commentsMap, setCommentsMap] = useState({});
  const [newComments, setNewComments] = useState({});

  const [openMenuId, setOpenMenuId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [sharePost, setSharePost] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [selectedPostId, setSelectedPostId] = useState(null);
  const [editData, setEditData] = useState({ title: "", body: "" });
  const [editPostId, setEditPostId] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    body: "",
  });

  const handleEdit = (post) => {
    setOpenMenuId(null);
  };

  // Fetch Posts + Comments
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

    const fetchComments = async () => {
      try {
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/comments",
        );

        const grouped = {};
        res.data.forEach((c) => {
          if (!grouped[c.postId]) grouped[c.postId] = [];
          grouped[c.postId].push(c);
        });

        setCommentsMap(grouped);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPosts();
    fetchComments();
  }, []);

  useEffect(() => {
    const handleClick = () => setOpenMenuId(null);
    window.addEventListener("click", handleClick);

    return () => window.removeEventListener("click", handleClick);
  }, []);

  // Edit Change
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleShare = (post) => {
    setOpenMenuId(null);
    setSharePost(post);
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

  const cancelDelete = () => {
    setDeleteId(null);
  };

  // 🔥 Add Post
  const handleAddPost = async () => {
    if (!newPost.title || !newPost.body) return;

    try {
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        newPost,
      );

      const createdPost = {
        ...res.data,
        id: Date.now(),
      };

      setPosts((prev) => [createdPost, ...prev]);
      setNewPost({ title: "", body: "" });
      setModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdatePost = () => {
    setPosts((prev) =>
      prev.map((p) => (p.id === editPostId ? { ...p, ...editData } : p)),
    );

    setEditModal(false);
  };

  // 🔥 Add Comment
  const handleAddComment = async () => {
    const text = newComments[selectedPostId]?.trim();
    if (!text) return;

    try {
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/comments",
        {
          postId: selectedPostId,
          body: text,
        },
      );

      const newComment = {
        ...res.data,
        id: Date.now(),
      };

      setCommentsMap((prev) => ({
        ...prev,
        [selectedPostId]: [...(prev[selectedPostId] || []), newComment],
      }));

      setNewComments((prev) => ({
        ...prev,
        [selectedPostId]: "",
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-800 p-6 text-white">
      {/* 🔹 Add Post Button */}
      <div className="flex justify-center max-w-2xl mx-auto mb-4">
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-400 cursor-pointer px-3 py-2 rounded"
        >
          + Add new
        </button>
      </div>

      {/* 🔹 Posts */}
      <div className="max-w-2xl mx-auto space-y-2">
        {posts.map((post) => (
          <div
            key={post.id}
            className="relative bg-white text-black p-4 rounded"
          >
            <h1 className="font-bold">{post.title}</h1>
            <p>{post.body}</p>

            {/* ✅ Comment Button */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSelectedPostId(post.id);
                  setCommentModalOpen(true);
                }}
                className="mt-2 bg-purple-500 text-white px-3 py-1 rounded"
              >
                Comments
              </button>
              <button
                onClick={() => {
                  setEditData({ title: post.title, body: post.body });
                  setEditPostId(post.id);
                  setEditModal(true);
                }}
                className="mt-2 bg-yellow-500 text-white px-2 py-1 rounded"
              >
                Edit
              </button>
            </div>
            <div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenuId((prev) => (prev === post.id ? null : post.id));
                }}
                className="absolute top-2 right-2 text-2xl"
              >
                <PiDotsThreeCircleVertical />
              </button>
            </div>
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
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editModal && (
          <motion.div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <motion.div className="bg-white text-black p-6 rounded w-100 relative">
              <button
                onClick={() => setEditModal(false)}
                className="absolute cursor-pointer top-2 right-2"
              >
                {" "}
                <RxCross2 />{" "}
              </button>
              <h1 className="text-black font-bold mb-2">Edit Post</h1>

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
              <button
                onClick={handleUpdatePost}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Update
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* 🔹 Add Post Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <motion.div className="bg-white text-black p-6 rounded w-100 relative">
              <button
                onClick={() => setModalOpen(false)}
                className="absolute cursor-pointer top-2 right-2"
              >
                <RxCross2 />
              </button>

              <h2 className="font-bold mb-3">Add Post</h2>

              <input
                type="text"
                placeholder="Title"
                value={newPost.title}
                onChange={(e) =>
                  setNewPost({ ...newPost, title: e.target.value })
                }
                className="w-full border p-2 mb-2"
              />

              <textarea
                placeholder="Body"
                value={newPost.body}
                onChange={(e) =>
                  setNewPost({ ...newPost, body: e.target.value })
                }
                className="w-full border p-2 mb-2"
              />

              <button
                onClick={handleAddPost}
                className="bg-blue-500 cursor-pointer text-white px-3 py-1 rounded"
              >
                Save
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔹 Comment Modal */}
      <AnimatePresence>
        {commentModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex justify-center items-center"
            onClick={() => {
              setCommentModalOpen(false);
              setSelectedPostId(null);
            }}
          >
            <motion.div
              className="bg-white text-black p-5 rounded w-100"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="font-bold mb-3">Comments</h2>

              {/* Input */}
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  placeholder="Write comment..."
                  value={newComments[selectedPostId] || ""}
                  onChange={(e) =>
                    setNewComments((prev) => ({
                      ...prev,
                      [selectedPostId]: e.target.value,
                    }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddComment();
                  }}
                  className="border p-2 flex-1"
                />

                <button
                  onClick={handleAddComment}
                  className="bg-green-500 text-white px-3 rounded"
                >
                  Add
                </button>
              </div>

              {/* Comments List */}
              <div className="space-y-2 max-h-62.5 overflow-y-auto">
                {(commentsMap[selectedPostId] || []).length > 0 ? (
                  commentsMap[selectedPostId].map((c) => (
                    <div key={c.id} className="bg-gray-200 p-2 rounded text-sm">
                      {c.body}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No comments yet</p>
                )}
              </div>

              {/* Close */}
              <button
                onClick={() => {
                  setCommentModalOpen(false);
                  setSelectedPostId(null);
                }}
                className="mt-3 text-red-500"
              >
                Close
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
      {/* Share Post */}
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

      {/* Loading */}
      {loading && <p className="text-center mt-4 text-white">Loading...</p>}
    </div>
  );
}
