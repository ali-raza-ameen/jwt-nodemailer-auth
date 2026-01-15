"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";

const Topbar = () => {
  const router = useRouter();
  const [token, setToken] = useState(null);

  useEffect(() => {
    // ✅ Read token from localStorage on client-side
    const savedToken = localStorage.getItem("token");
    setToken(savedToken);
  }, []);

  const handleLogout = async () => {
    if (!token) {
      toast.error("You are not logged in!");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success(res.data.message);
        setToken(null); // ✅ update state
        router.push("/login");
      }
    } catch (err) {
      console.error(err);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.error(err.response?.data?.message || "Logout failed");
      setToken(null); // ✅ update state
      router.push("/login");
    }
  };

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-xl font-bold text-blue-600">MyApp</h1>
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <Link href="/dashboard/add-product" className="hover:text-blue-600">Add product</Link>
            <Link href="/" className="hover:text-blue-600">Contact</Link>
          </div>
          {/* ✅ Conditional rendering based on login status */}
          {token ? (
            <button
              onClick={handleLogout}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleLoginRedirect}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
