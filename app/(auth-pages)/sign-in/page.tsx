"use client";

import { signInAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const searchParams = useSearchParams();


  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      toast({
        title: "Error Logging In",
        description: "An error occurred while logging in. Please try again.",
        duration: 5000,
        variant: "destructive",
      });
    }
  }, [searchParams]);

  const validateEmail = (email: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email address";
      valid = false;
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Button is enabled only if all fields are filled and valid
  const isFormValid =
    formData.email &&
    formData.password &&
    validateEmail(formData.email) &&
    formData.password.length >= 8;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-8 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-extrabold text-brand mb-2 text-center">
        Sign in to your account
      </h1>
      <p className="text-sm text-muted-foreground text-center mb-8">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="text-brand hover:underline font-medium">
          Sign up
        </Link>
      </p>
      <form
        className="w-full space-y-6"
        onSubmit={async (e) => {
          e.preventDefault();
          if (validateForm()) {
            const form = new FormData(e.currentTarget);
            await signInAction(form);
          }
        }}
        noValidate
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm text-brand font-medium">
              Email address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className={`w-full border border-brand focus:ring-2 focus:ring-brand focus:border-brand transition ${errors.email ? "border-red-500" : ""
                }`}
              value={formData.email}
              onChange={handleChange}
              onBlur={validateForm}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm text-brand font-medium">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              className={`w-full border border-brand focus:ring-2 focus:ring-brand focus:border-brand transition ${errors.password ? "border-red-500" : ""
                }`}
              value={formData.password}
              onChange={handleChange}
              onBlur={validateForm}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
        </div>
        <SubmitButton
          pendingText="Signing in..."
          formAction={signInAction}
          className="w-full bg-brand hover:bg-brand/90 transition-all text-white py-3 rounded-md font-bold text-base shadow-md"
          disabled={!isFormValid}
        >
          Sign In
        </SubmitButton>
      </form>
    </div>
  );
}


