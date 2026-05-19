"use client";
export default function Button({
  text,
  onClick,
  bgColor = "bg-blue-600",
  textColor = "text-white",
  width = "w-auto",
  padding = "px-4 py-2",
}) {
  return (
    <button
      onClick={onClick}
      className={`${bgColor} ${textColor} ${width} ${padding} rounded-lg hover:opacity-90 transition duration-300`}
    >
      {text}
    </button>
  );
}
