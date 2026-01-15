"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

/* =====================
   1. TYPES
===================== */

// API success response
interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

// API error response
interface ErrorResponse {
  message: string;
}

const ChangePasswordPage: React.FC = () => {
  const { email } = useParams() as { email: string }; // type email param
  const router = useRouter();

  /* =====================
     2. STATE
  ====================== */
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  /* =====================
     3. HANDLE INPUT CHANGE
  ====================== */
  const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setConfirmPassword(e.target.value);
  };

  /* =====================
     4. HANDLE FORM SUBMIT
  ====================== */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post<ChangePasswordResponse>(
        `http://localhost:4000/api/v1/change-password/${email}`,
        { newPassword, confirmPassword }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        router.push("/login");
      }
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      const errorMessage = error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  /* =====================
     5. JSX
  ====================== */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Change Password
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            className="w-full mb-4 px-4 py-2 border rounded"
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="w-full mb-4 px-4 py-2 border rounded"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Updating..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
