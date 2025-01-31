// app/login/page.tsx
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Mail } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your login logic here
    console.log({ email, password });
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-700 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Please sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-600" />
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 border-green-200 focus-visible:ring-green-500"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-600" />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 border-green-200 focus-visible:ring-green-500"
                required
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-lg"
          >
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center space-y-4">
          <a 
            href="#" 
            className="text-sm text-green-700 hover:text-green-800 hover:underline"
          >
            Forgot Password?
          </a>
          <p className="text-gray-600 text-sm">
            Don't have an account?{' '}
            <a 
              href="#" 
              className="text-green-700 hover:text-green-800 hover:underline"
            >
              Create Account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}