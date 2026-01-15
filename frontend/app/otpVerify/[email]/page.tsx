"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

/* =====================
   1. TYPES
===================== */

// API success response
interface VerifyOtpResponse {
  success: boolean;
  message: string;
}

// API error response
interface ErrorResponse {
  message: string;
}

const VerifyOtp: React.FC = () => {
  const { email } = useParams() as { email: string }; // type the email param
  const router = useRouter();

  /* =====================
     2. STATE
  ====================== */
  const [otp, setOtp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  /* =====================
     3. HANDLE INPUT CHANGE
  ====================== */
  const handleOtpChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setOtp(e.target.value);
  };

  /* =====================
     4. HANDLE FORM SUBMIT
  ====================== */
  const handleVerifyOtp = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!otp) {
      toast.error("OTP is required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post<VerifyOtpResponse>(
        `http://localhost:4000/api/v1/verify-otp/${email}`,
        { otp }
      );

      if (res.data.success) {
        toast.success(res.data.message);

        // Redirect to reset password page
        router.push(`/changePassword/${email}`);
      }
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      const errorMessage = error.response?.data?.message || error.message || "OTP verification failed";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  /* =====================
     5. JSX
  ====================== */
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleVerifyOtp}
        className="bg-white p-6 rounded shadow-md w-[350px]"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">
          Verify OTP
        </h2>

        <p className="text-sm text-gray-600 mb-3 text-center">
          OTP sent to <b>{email}</b>
        </p>

        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          className="w-full p-2 border rounded mb-4 text-center tracking-widest"
          value={otp}
          onChange={handleOtpChange}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;
