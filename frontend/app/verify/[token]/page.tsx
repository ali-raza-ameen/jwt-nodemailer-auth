"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const VerifyPage = () => {
  const { token } = useParams();
  const router = useRouter();
  const [status, setStatus] = useState("Verifying your email...");

  useEffect(() => {
    const emailVerify = async () => {
      if (!token) return;

      try {
        const res = await axios.get(`http://localhost:4000/api/v1/verify/${token}`);

        if (res.data.success) {
          setStatus("✅ Email verified successfully!");
          setTimeout(() => router.push("/login"), 3000);
        }
      } catch (err: any) {
        console.error(err);
        setStatus(err.response?.data?.message || "❌ Verification failed.");
      }
    };

    emailVerify();
  }, [token, router]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-200">
      <div className="rounded-lg bg-white p-6 shadow-md text-center">
        <h1 className="text-2xl font-semibold text-gray-800">{status}</h1>
      </div>
    </div>
  );
};

export default VerifyPage;
