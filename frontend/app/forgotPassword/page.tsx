"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

/* 
   1. TYPES
 */

// API success response
interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

// API error response
interface ErrorResponse {
  message: string;
}

const ForgotPassword: React.FC = () => {
  const router = useRouter();

  /* 
     2. STATE
   */
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  /* =====================
     3. HANDLE INPUT CHANGE
  ====================== */
  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  /* 
     4. HANDLE FORM SUBMIT
   */
  const handleForgotPassword = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post<ForgotPasswordResponse>(
        "http://localhost:4000/api/v1/forgot-password",
        { email }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        router.push(`/otpVerify/${email}`);
      }
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      const errorMessage = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  /* 
     5. JSX
   */
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleForgotPassword}
        className="bg-white p-6 rounded shadow-md w-[350px]"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">
          Forgot Password
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 border rounded mb-4"
          value={email}
          onChange={handleEmailChange}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
