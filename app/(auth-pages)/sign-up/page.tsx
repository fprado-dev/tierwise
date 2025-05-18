"use client";

import { signupAction } from "@/app/actions";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    password: "",
    coupon: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    companyName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  // ... existing state

  // Add state for server errors

  // Check for error query parameter on mount
  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      toast({
        title: "Error creating account",
        description: "An error occurred while creating your account. Try with a different email address.",
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
    const newErrors = { fullName: "", companyName: "", email: "", password: "" };

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
      valid = false;
    }
    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company Name is required";
      valid = false;
    }
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-8 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-extrabold text-brand mb-2 text-center">
        Create your account
      </h1>
      <p className="text-sm text-muted-foreground text-center mb-8">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-brand hover:underline font-medium">
          Log in
        </Link>
      </p>
      <form
        className="w-full space-y-6"
        onSubmit={async (e) => {
          e.preventDefault();
          if (validateForm()) {
            const form = new FormData(e.currentTarget);
            await signupAction(form);
          }
        }}
        noValidate
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm text-brand font-medium">
              Full Name
            </Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="fullname"
              placeholder="Your full name"
              required
              className={`w-full border border-brand focus:ring-2 focus:ring-brand focus:border-brand transition ${errors.fullName ? "border-red-500" : ""
                }`}
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-sm text-brand font-medium">
              Company Name
            </Label>
            <Input
              id="companyName"
              name="companyName"
              type="text"
              placeholder="Your company"
              required
              className={`w-full border border-brand focus:ring-2 focus:ring-brand focus:border-brand transition ${errors.companyName ? "border-red-500" : ""
                }`}
              value={formData.companyName}
              onChange={handleChange}
            />
            {errors.companyName && (
              <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm text-brand font-medium">
              Email address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              className={`w-full border border-brand focus:ring-2 focus:ring-brand focus:border-brand transition ${errors.email ? "border-red-500" : ""
                }`}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm text-brand font-medium">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                autoComplete="current-password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                className={`w-full border border-brand focus:ring-2 focus:ring-brand focus:border-brand transition ${errors.password ? "border-red-500" : ""
                  } pr-12`}
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-brand text-sm focus:outline-none"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? (
                  <span role="img" aria-label="Hide">
                    <EyeOffIcon className="w-4 h-4" />
                  </span>
                ) : (
                  <span role="img" aria-label="Show">
                    <EyeIcon className="w-4 h-4" />
                  </span>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="coupon" className="text-sm text-brand font-medium">
              Coupon Code{" "}
              <span className="text-xs text-muted-foreground">(optional)</span>
            </Label>
            <Input
              id="coupon"
              name="coupon"
              type="text"
              placeholder="Enter coupon code"
              className="w-full border border-brand focus:ring-2 focus:ring-brand focus:border-brand transition"
              value={formData.coupon}
              onChange={handleChange}
            />
          </div>
        </div>
        <SubmitButton
          pendingText="Creating account..."
          formAction={signupAction}
          className="w-full bg-brand hover:bg-brand/90 transition-all text-white py-3 rounded-md font-bold text-base shadow-md"
        >
          Sign Up
        </SubmitButton>
      </form>
      <div className="mt-8 text-center text-xs text-muted-foreground">
        By signing up, you agree to our{" "}
        <Link href="/terms" className="text-brand hover:underline">
          Terms
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="text-brand hover:underline">
          Privacy Policy
        </Link>
        .
      </div>
    </div>
  );
}
