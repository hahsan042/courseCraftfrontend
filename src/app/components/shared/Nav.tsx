"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    if (token) {
      setIsLoggedIn(true);
      setRole(userRole); // 'admin' অথবা 'user' সেট হবে
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setRole(null);
    window.location.href = "/";
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 sticky top-0 z-50 shadow-md">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-400">
          CourseCraft
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link href="/" className="hover:text-blue-400">Home</Link>
          <Link href="/courses" className="hover:text-blue-400">Courses</Link>
          <Link href="/about" className="hover:text-blue-400">About</Link>

          {/* ✅ কন্ডিশনাল রেন্ডারিং: রোল অনুযায়ী ভিন্ন লিঙ্ক */}
          {isLoggedIn && (
            <>
              {role === "admin" ? (
                <Link href="/dashboard" className="hover:text-blue-400 text-yellow-400 font-semibold">
                  Dashboard
                </Link>
              ) : (
                <Link href="/my-courses" className="hover:text-blue-400">
                  My Courses
                </Link>
              )}
            </>
          )}

          {/* Auth buttons */}
          {!isLoggedIn ? (
            <Link
              href="/login"
              className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-2xl">
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mt-4 flex flex-col gap-4 md:hidden border-t border-gray-700 pt-4">
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/courses" onClick={() => setMenuOpen(false)}>Courses</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>

          {/* মোবাইল মেনুতে রোল চেক */}
          {isLoggedIn && (
            role === "admin" ? (
              <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="text-yellow-400">Dashboard</Link>
            ) : (
              <Link href="/my-courses" onClick={() => setMenuOpen(false)}>My Courses</Link>
            )
          )}

          {!isLoggedIn ? (
            <Link href="/login" onClick={() => setMenuOpen(false)} className="bg-blue-500 w-fit px-4 py-1 rounded">Login</Link>
          ) : (
            <button onClick={handleLogout} className="text-left text-red-400">Logout</button>
          )}
        </div>
      )}
    </nav>
  );
}