"use client";
import React, { useState, useEffect, useRef } from "react";
// import { IoMdNotifications } from 'react-icons/io';
import { FiChevronDown } from "react-icons/fi";
import { LuUserPen } from "react-icons/lu";
import { FiLogOut } from "react-icons/fi";
// import { RiSearch2Line } from 'react-icons/ri';
// import { useUser } from "@/contexts/UserContext";
import { clearTokens } from "@/lib/tokenActions";
import { useRouter, usePathname } from "next/navigation";
import { useMenuItems } from "@/hooks/useMenuItems";
// import Modal from "@/components/Modal/Modal";

export default function Navbar({
  sidebarOpen,
  isMobile,
  setNotifyOpen,
  notifyOpen,
  setSidebarOpen,
}) {
  const [logoutModal, setLogoutModal] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  // const { user, setUser } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const MENU_ITEMS = useMenuItems();

  // Function to get menu label based on pathname
  const getMenuLabel = () => {
    // Check if pathname matches root
    if (pathname === "/" || pathname === "") {
      return "Dashboard";
    }

    // Check for profile route
    if (pathname === "/profile" || pathname.startsWith("/profile")) {
      return "Profile";
    }

    let exactMatch = null;
    let prefixMatch = null;

    // Check main menu items with href and subRoutes
    for (const item of MENU_ITEMS) {
      // Check main menu href
      if (item.href && item.href !== "/") {
        if (pathname === item.href) {
          exactMatch = item.label;
        } else if (pathname.startsWith(item.href) && !prefixMatch) {
          prefixMatch = item.label;
        }
      }

      // Check subRoutes - prioritize exact matches
      if (item.subRoutes && item.subRoutes.length > 0) {
        for (const subRoute of item.subRoutes) {
          if (subRoute.href) {
            if (pathname === subRoute.href) {
              exactMatch = subRoute.label;
            } else if (
              pathname.startsWith(subRoute.href) &&
              !exactMatch &&
              !prefixMatch
            ) {
              prefixMatch = subRoute.label;
            }
          }
        }
      }
    }

    // Return exact match first, then prefix match, then fallback
    return (
      exactMatch ||
      prefixMatch ||
      pathname.split("/").filter(Boolean).pop().replace(/-/g, " ")
    );
  };

  const handleLogout = async () => {
    setTimeout(() => {
      router.push("/auth/login");
    }, 500);
    await clearTokens();
    setUser(null);
  };

  // Click outside detection for profile dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    if (profileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileOpen]);

  return (
    <div
      className={`fixed top-0 right-0 z-50 h-20 flex items-center px-4 md:px-6 lg:px-14 border-b border-[#F1F4F4] bg-white ${isMobile ? "left-0" : sidebarOpen ? "left-[300px]" : "left-[78px]"}`}
      id="navbar"
    >
      <div className="flex justify-between items-center w-full">
        {/* MOBILE MENU BUTTON */}
        {isMobile && (
          <button
            onClick={() => setSidebarOpen(true)}
            className=" mr-2 text-gray-600 cursor-pointer"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        )}

        <div className="flex-1 flex items-center">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
            {getMenuLabel()}
          </h1>
        </div>

        {/* SEARCH BAR */}
        {/* <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Tap to search..."
            className="w-full rounded-full py-2 pl-10 sm:pl-12 pr-4 bg-[#E7F4F4] placeholder:text-text-primary-pastel-green placeholder:text-[14px] md:placeholder:text-[16px] outline-none focus:outline-none focus:ring-0 focus:border-transparent"
          />
          <RiSearch2Line className="absolute left-3 top-1/2 -translate-y-1/2 text-[#314242] text-xl md:text-2xl" />
        </div> */}

        {/* NOTIFY + PROFILE */}
        <div className="flex items-center gap-2 md:gap-4 ml-2 md:ml-0">
          {/* <button
            onClick={() => setNotifyOpen(!notifyOpen)}
            className="relative p-2.5 bg-[#E8F7F7] rounded-full text-lg md:text-xl cursor-pointer"
          >
            <IoMdNotifications />
            <span className="absolute -top-px -right-px size-2 bg-red-500 rounded-full">
              <span className="absolute inset-0 rounded-full bg-red-500 opacity-70 animate-ping"></span>
            </span>
          </button> */}

          {/* PROFILE DROPDOWN */}
          <div
            className="relative bg-[#E7F4F4] rounded-full p-0 md:p-1.5"
            ref={profileRef}
          >
            <button
              onClick={() => setProfileOpen((prev) => !prev)}
              className="flex items-center gap-1 md:gap-2 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-full bg-linear-to-r from-[#39995B] to-[#15803D] flex items-center justify-center text-white font-semibold text-sm">
                {getFirmInitials(user?.firmProfile?.firmName)}
              </div>

              {!isMobile && (
                <>
                  <span className="text-sm font-medium text-[#15803D] hidden sm:block">
                    {user?.firmProfile?.firmName}
                  </span>
                  <FiChevronDown className="text-[#15803D] text-lg md:text-xl" />
                </>
              )}
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-5 w-48 md:w-50 border border-gray-300 bg-white shadow-lg rounded-md z-50">
                <ul className="flex flex-col gap-4 px-4 py-4">
                  <li
                    onClick={() => {
                      router.push("/profile");
                      setProfileOpen(false);
                    }}
                    className="flex items-center gap-2.5 text-sm font-medium text-[#464545] hover:text-primary-pastel-green cursor-pointer"
                  >
                    <LuUserPen size={17} /> Edit Profile
                  </li>
                  {/* <li className="flex items-center gap-3 text-sm font-medium text-[#464545] hover:text-primary-pastel-green cursor-pointer">
                    <LiaUserEditSolid size={16} /> Edit Profile
                  </li> */}
                  {/* <li className="flex items-center gap-3 text-sm font-medium text-[#464545] hover:text-primary-pastel-green cursor-pointer">
                    <MdHistory size={16} /> Subscription History
                  </li> */}
                  <li
                    onClick={() => {
                      setLogoutModal(true);
                      setProfileOpen(false);
                    }}
                    className="flex items-center gap-3 text-sm font-medium text-[#464545] hover:text-primary-pastel-green cursor-pointer"
                  >
                    <FiLogOut size={16} /> Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Get initials from firm name
 * @param {string} firmName - The firm name
 * @returns {string} - Two-letter initials
 */
const getFirmInitials = (firmName) => {
  if (!firmName) return "U";

  const words = firmName
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);

  if (words.length === 1) {
    // Single word: take first 2 letters
    return words[0].substring(0, 2).toUpperCase();
  } else {
    // Multiple words: take first letter of first two words
    return words
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  }
};
