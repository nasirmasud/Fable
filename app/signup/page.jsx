"use client";

import { Eye, EyeOff, Loader2, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm({
    defaultValues: { name: "", email: "", password: "", confirmPassword: "", role: "Reader" },
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API}`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setImageUrl(data.data.url);
        toast.success("Profile image updated!");
      } else {
        toast.error("Upload failed!");
      }
    } catch (err) {
      toast.error("Network error!");
    } finally {
      setIsUploading(false);
    }
  };

  async function onSubmit(values) {
    if (values.password !== values.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (!imageUrl) {
      toast.error("Please upload a profile picture!");
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({
      email: values.email,
      password: values.password,
      name: values.name,
      image: imageUrl,
      role: values.role,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Sign up failed!");
    } else {
      toast.success("Account created successfully!");
      router.push("/");
    }
  }

  return (
    <div className="min-h-[90vh] bg-white dark:bg-[#070314] transition-colors flex items-center justify-center">
      <div className="w-full max-w-md bg-[#0d0724] border border-white/10 p-8 rounded-3xl shadow-xl">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Join Fable</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Full Name</FormLabel>
                <FormControl><Input placeholder="John Doe" {...field} className="bg-[#130d2e] border-white/10 text-white" /></FormControl>
              </FormItem>
            )} />

            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Email</FormLabel>
                <FormControl><Input type="email" placeholder="email@example.com" {...field} className="bg-[#130d2e] border-white/10 text-white" /></FormControl>
              </FormItem>
            )} />

            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Password</FormLabel>
                <div className="relative">
                  <FormControl><Input type={showPassword ? "text" : "password"} placeholder="********" {...field} className="bg-[#130d2e] border-white/10 text-white pr-10" /></FormControl>
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-gray-400">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </FormItem>
            )} />

            <FormField control={form.control} name="confirmPassword" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Confirm Password</FormLabel>
                <div className="relative">
                  <FormControl><Input type={showConfirmPassword ? "text" : "password"} placeholder="********" {...field} className="bg-[#130d2e] border-white/10 text-white pr-10" /></FormControl>
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-2.5 text-gray-400">
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </FormItem>
            )} />

            <FormField control={form.control} name="role" render={({ field }) => (
              <div className="flex gap-6 py-2">
                {["Reader", "Writer"].map((role) => (
                  <div key={role} className="flex items-center space-x-2">
                    <Checkbox checked={field.value === role} onCheckedChange={() => field.onChange(role)} className="data-[state=checked]:bg-[#6344f5] border-gray-500" />
                    <label className="text-gray-300 text-sm cursor-pointer" onClick={() => field.onChange(role)}>{role}</label>
                  </div>
                ))}
              </div>
            )} />

            {/* Image Upload Area */}
            <div className="flex flex-col items-center justify-center py-2 space-y-3">
              <label className="w-20 h-20 border border-dashed border-white/20 bg-[#130d2e] rounded-full flex flex-col items-center justify-center cursor-pointer hover:border-white/40 overflow-hidden relative">
                <input type="file" className="hidden" onChange={handleImageUpload} disabled={isUploading} />
                {imageUrl ? (
                  <Image src={imageUrl} alt="Profile" fill className="object-cover" />
                ) : isUploading ? (
                  <Loader2 className="animate-spin text-white" />
                ) : (
                  <User className="text-gray-400 w-8 h-8" />
                )}
              </label>
              <span className="text-[10px] text-gray-400 uppercase tracking-widest">Profile Picture</span>
            </div>

            <Button type="submit" className="w-full bg-[#6344f5] hover:bg-[#5032e6] text-white" disabled={loading || isUploading}>
              {loading ? <Loader2 className="animate-spin" /> : "Sign Up"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}