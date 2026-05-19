"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function RegistrationForm() {
  // const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    localStorage.setItem("user", JSON.stringify(userData));
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen bg-gray-400 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg space-y-4 w-120 h-fit"
      >
        <h2 className="text-xl font-bold text-center">Registration Form</h2>

        {/* <input
          type="text"
          placeholder="Write Name...."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full"
          required
        /> */}

        <input
          type="email"
          placeholder="Create Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full"
          required
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full"
            required
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 cursor-pointer"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button
          type="submit"
          className="bg-black text-white cursor-pointer px-4 py-2 w-full"
        >
          Confirm Registration
        </button>
      </form>
    </div>
  );
}
