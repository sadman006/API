"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function DemoPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
    if (!email || !password) {
      alert("Please fill all the fields");
      return;
    }
    setEmail("");
    setPassword("");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-400 flex justify-center items-center">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col bg-white p-5">
          <h1 className="text-black pb-3 font-bold">This is a Demo Page</h1>
          <div className="pb-2">
            <h1 className="text-gray-500 pb-1">Email</h1>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-400 px-2 py-2 focus:outline-none w-full"
            />
          </div>
          <div>
            <h1 className="text-gray-500 pb-1">Password</h1>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-400 px-2 py-2 focus:outline-none w-full"
            />
          </div>
          <div className="pt-4">
            <button
              type="submit"
              className="bg-black cursor-pointer text-white px-4 py-2 mt-4 w-full"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
