"use client";
import axios from "@/plugins/axios";
import { useEffect, useState } from "react";
import { FaRegComment } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";

export default function PostForm() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [localPosts, setLocalPosts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [editId, setEditId] = useState(null);

  const updatePost = async () => {
    if (!editId) return;

    try {
      const res = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${editId}`,
        {
          id: editId,
          title,
          body,
        },
      );

      console.log("Updated:", res.data);

      // update UI locally
      setLocalPosts((prev) =>
        prev.map((item) =>
          item.id === editId ? { ...item, title, body } : item,
        ),
      );

      // reset
      setEditId(null);
      setTitle("");
      setBody("");
      setId("");
    } catch (err) {
      console.log(err);
    }
  };

  //   const updatePost = async () => {
  //   if (!editId) return;

  //   try {
  //     const res = await axios.put(
  //       `https://jsonplaceholder.typicode.com/posts/${editId}`,
  //       {
  //         id: editId,
  //         title,
  //         body,
  //       }
  //     );

  //     console.log("Updated:", res.data);

  //     // update UI locally
  //     setLocalPosts((prev) =>
  //       prev.map((item) =>
  //         item.id === editId ? { ...item, title, body } : item
  //       )
  //     );

  //     // reset
  //     setEditId(null);
  //     setTitle("");
  //     setBody("");
  //     setId("");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    axios
      .get(`/post`) // Api end point in the get
      .then((res) => {
        // then e alws response data boshbe
        setPosts(res.data.data);
        console.log("Data only:", res.data.data);
      })
      .catch((err) => console.log(err)) // catch is for error
      .finally(() => setLoading(false)); // finally is for setting the loading
  }, []);

  const handleDelete = (indexToDelete) => {
    const updated = localPosts.filter((_, index) => index !== indexToDelete);
    setLocalPosts(updated);
  };

  const PostsApi = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setPosts(res.data.slice(0, 10));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const CommentsApi = () => {
    setCommentsLoading(true);
    axios
      .get("https://jsonplaceholder.typicode.com/comments")
      .then((res) => setComments(res.data.slice(0, 10)))
      .catch((err) => console.log(err))
      .finally(() => setCommentsLoading(false));
  };

  // LOAD from localStorage
  // useEffect(() => {
  //   const data = localStorage.getItem("myPosts");
  //   if (data) setLocalPosts(JSON.parse(data));
  // }, []);

  // SAVE to localStorage
  useEffect(() => {
    localStorage.setItem("myPosts", JSON.stringify(localPosts));
  }, [localPosts]);

  // SUBMIT FUNCTION
  const handleSubmit = () => {
    if (!id || !title || !body) return;

    const newPost = {
      id,
      title,
      body,
    };

    setLocalPosts((prev) => [...prev, newPost]);

    // reset fields
    setId("");
    setTitle("");
    setBody("");
  };

  return (
    <div className="min-h-screen bg-gray-600 p-6">
      <h1 className="text-3xl font-bold text-white text-center mb-8 mt-10">
        Posting Data
      </h1>

      <div className="flex flex-col gap-6 max-w-2xl mx-auto">
        <div className="p-6 rounded-2xl bg-white ">
          <h2 className="text-gray-600 text-lg mb-2">ID:</h2>
          <input
            type="number"
            placeholder="Enter ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-full px-3 py-3 p-2 placeholder:text-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />

          <h2 className="text-gray-600 text-lg mt-2 mb-2">Title:</h2>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-3 p-2 placeholder:text-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />

          <h2 className="text-gray-600 text-lg mt-2 mb-2">Body:</h2>
          <input
            type="text"
            placeholder="Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full px-3 py-3 p-2 placeholder:text-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />

          <div className="flex justify-end items-center mt-2 gap-2">
            {/* <div> */}
            <button
              type="button"
              onClick={() => {
                setShowCommentsModal(true);
                CommentsApi();
              }}
              className="px-6 py-2 border cursor-pointer text-white transition bg-red-500 hover:bg-red-700 rounded-xl"
            >
              Comments
            </button>

            <p className="text-white bg-green-600 hover:bg-green-700 transiton cursor-pointer rounded px-3 py-2">
              Body
            </p>
            {/* </div> */}
            {/* OPEN POPUP */}
            <FaRegComment
              onClick={() => setShowPopup(true)}
              className="text-[20px] hover:text-blue-700 transition cursor-pointer"
            />

            <button
              onClick={handleSubmit}
              className="px-3 py-2 cursor-pointer bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
            >
              Submit
            </button>
          </div>
        </div>

        {/* POPUP */}
        {showPopup && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-40 flex justify-center items-center">
            <div className="bg-white p-6 rounded-xl w-1/3 relative">
              <h2 className="text-lg font-bold mb-4">Stored Data</h2>

              {localPosts.length === 0 ? (
                <p>No Data Found</p>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {localPosts.map((item) => (
                    <div
                      key={item.id}
                      className="border border-gray-300 p-3 rounded flex justify-between items-start"
                    >
                      {/* LEFT SIDE (TEXT) */}
                      <div>
                        {/* <p>
                          <b>ID:</b> {item.id}
                        </p> */}
                        <p>
                          <b>Title:</b> {item.title}
                        </p>
                        <p>
                          <b>Body:</b> {item.body}
                        </p>
                      </div>

                      {/* RIGHT SIDE (DELETE ICON) */}
                      <AiFillDelete
                        size={20}
                        onClick={() => handleDelete(index)}
                        className="text-red-500 cursor-pointer hover:text-red-700 mt-1"
                      />
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={() => setShowPopup(false)}
                className="absolute cursor-pointer top-2 right-3"
              >
                <RxCross2 />
              </button>
            </div>
          </div>
        )}

        {showCommentsModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white w-[90%] max-w-2xl max-h-[80vh] overflow-y-auto p-5 rounded-xl relative">
              <button
                onClick={() => setShowCommentsModal(false)}
                className="absolute top-2 right-3 text-red-500 text-xl"
              >
                ✕
              </button>
              <h2 className="text-2xl font-bold mb-4 text-center">
                Comments List
              </h2>
              {commentsLoading ? (
                <p className="text-center">Loading...</p>
              ) : (
                <div className="grid gap-3">
                  {comments.map((item) => (
                    <div
                      key={item.id}
                      className="border p-3 rounded-lg bg-purple-100"
                    >
                      <p className="text-sm text-gray-500">
                        Post ID: {item.postId}
                      </p>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-blue-500">{item.email}</p>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {item.body}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Main & second Main div end */}
      </div>
    </div>
  );
}
