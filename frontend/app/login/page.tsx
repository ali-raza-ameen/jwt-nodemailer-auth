"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

/* =====================
   1. TYPES & INTERFACES
===================== */

// Form Data Type
interface LoginFormData {
  email: string;
  password: string;
}

// API Success Response Type
interface LoginResponse {
  success: boolean;
  message: string;
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

// API Error Response Type
interface ErrorResponse {
  message: string;
}

const Login: React.FC = () => {
  const router = useRouter();

  /* =====================
     2. STATE WITH TYPES
  ====================== */
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState<boolean>(false);

  /* =====================
     3. HANDLE INPUT CHANGE
  ====================== */
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  /* =====================
     4. HANDLE FORM SUBMIT
  ====================== */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post<LoginResponse>(
        "http://localhost:4000/api/v1/login",
        formData
      );

      if (res.data.success) {
        // Save token and user info in localStorage
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        toast.success(res.data.message || "Login successful");
        router.push("/"); // Redirect to homepage
      }
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      const errorMessage =
        err.response?.data?.message || err.message || "Login failed";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  /* =====================
     5. JSX
  ====================== */
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-2">
            <label htmlFor="password" className="block mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Forgot Password */}
          <p className="text-sm text-blue-600 mb-4 text-right hover:underline cursor-pointer">
            <a href="/forgotPassword">Forgot Password?</a>
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Signup Link */}
        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
