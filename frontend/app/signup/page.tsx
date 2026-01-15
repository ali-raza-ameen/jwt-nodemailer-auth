'use client'

import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import axios, { AxiosError } from 'axios';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

/* 
   1. DEFINE TYPES */

// Form data structure
type SignupFormData = {
  name: string;
  email: string;
  password: string;
};

// API success response
type SignupResponse = {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
};

// API error response
type ErrorResponse = {
  message: string;
};

const Signup: React.FC = () => {
  const router = useRouter();

  /* 
     2. STATE WITH TYPES
   */

  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: ""
  });

  /* 
     3. HANDLE INPUT CHANGE
  */

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

    try {
      const response = await axios.post<SignupResponse>(
        "http://localhost:4000/api/v1/register",
        formData
      );

      if (response.data.success) {
        toast.success(response.data.message);
        router.push("/verifyEmail");
      }
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      const errorMessage =
        error.response?.data?.message || error.message || "Registration failed";

      toast.error(errorMessage);
    }
  };



  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            Create your account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {/* Name */}
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  required
                />
              </div>

              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type="password"
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-blue-500 hover:bg-blue-600 rounded-md"
          >
            Sign up
          </Button>
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
