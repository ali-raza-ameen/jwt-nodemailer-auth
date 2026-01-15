import React from "react";

// Using React.FC for functional component typing
const VerifyEmail: React.FC = () => {
  return (
    <div className="flex h-screen items-center justify-center text-center w-full bg-gray-200">
      <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          Verify Your Email
        </h1>
        <p className="text-gray-600 mt-3">
          Please check your email and click on the verification link to activate
          your account.
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
