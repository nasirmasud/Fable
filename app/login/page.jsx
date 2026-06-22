"use client";

import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirect") || "/"

  const form = useForm({
    defaultValues: { email: "", password: "" },
  });

  const handleQuickLogin = async (role) => {
    const testData = {
      Reader: { email: "reader@reader.com", password: "reader123" },
      Writer: { email: "writer@writer.com", password: "writer123" },
      Admin: { email: "admin@admin.com", password: "admin123" },
    };

    const credentials = testData[role];

    await onSubmit(credentials);
  };

  async function onSubmit(values) {
    setLoading(true);
    const { error } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Login failed!");
    } else {
      toast.success("Logged in successfully!");
      router.push(redirectTo);
    }
  }

  return (
    <div className="min-h-[80vh] bg-white dark:bg-[#070314] transition-colors flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0d0724] border border-white/10 p-8 rounded-3xl shadow-xl">
        <h1 className="text-2xl py-2 font-bold text-white mb-2 text-center">Welcome back</h1>

        {/* Quick Test Buttons */}
        <div className="grid grid-cols-3 gap-2">
          {["Reader", "Writer", "Admin"].map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => handleQuickLogin(role)}
              className="text-[11px] py-2 bg-[#130d2e] hover:bg-[#6344f5] border border-white/10 text-white rounded-lg transition-colors"
            >
              Login as {role}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#0d0724] px-2 text-gray-500">Or</span>
          </div>
        </div>

        <p className="text-gray-400 text-center pb-8 mb-6 text-sm">Enter your credentials to access your account</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Email Address *</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@example.com" {...field} className="bg-[#130d2e] border-white/10 text-white" />
                </FormControl>
              </FormItem>
            )} />

            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Password *</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input type={showPassword ? "text" : "password"} placeholder="Enter your password" {...field} className="bg-[#130d2e] border-white/10 text-white pr-10" />
                  </FormControl>
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-gray-400">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </FormItem>
            )} />

            <Button type="submit" className="w-full bg-[#6344f5] hover:bg-[#5032e6] text-white mt-2" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : "Sign In"}
            </Button>
          </form>
        </Form>

        <p className="text-center text-gray-400 text-sm mt-6">
          New to Fable? <a href={`/signup?redirect=${redirectTo}`} className="text-[#6344f5] hover:underline font-semibold">Create account</a>
        </p>
      </div>
    </div>
  );
}