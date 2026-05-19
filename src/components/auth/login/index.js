"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      alert("No user found please register first.");
      return;
    }

    if (email !== storedUser.email) {
      setEmailError("Incorrect email");
      return;
    }

    if (password !== storedUser.password) {
      setPasswordError("Incorrect password");
      return;
    }
    // If correct → redirect
    router.push("/album");
  };

  return (
    <div className="min-h-screen bg-gray-400 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg space-y-4 w-120 h-fit"
      >
        <h2 className="text-xl font-bold text-center">Login Here</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full"
        />
        {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full"
          />
          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 cursor-pointer"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button
          type="submit"
          className="bg-black hover:bg-black/65 transition duration-300 text-white cursor-pointer px-4 py-2 w-full"
        >
          Login
        </button>
        <div className="flex justify-center items-center">
          <h2>
            Don&apos;t have any account?
            <Link href="/form">
              <span className="text-blue-500 font-semibold hover:underline cursor-pointer">
                {" "}
                Register
              </span>
            </Link>
          </h2>
        </div>
      </form>
    </div>
  );
}
