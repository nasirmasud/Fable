// "use client";

// import { Eye, EyeOff, Loader2, User } from "lucide-react";
// import Image from "next/image";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";

// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { authClient } from "@/lib/auth-client";

// export default function SignUpPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [isUploading, setIsUploading] = useState(false);
//   const [imageUrl, setImageUrl] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);


//   const searchParams = useSearchParams()
//   const redirectTo = searchParams.get("redirect") || "/"


//   const form = useForm({
//     defaultValues: { name: "", email: "", password: "", confirmPassword: "", role: "reader" },
//   });

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setIsUploading(true);
//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API}`, {
//         method: "POST",
//         body: formData,
//       });
//       const data = await response.json();
//       if (data.success) {
//         setImageUrl(data.data.url);
//         toast.success("Profile image updated!");
//       } else {
//         toast.error("Upload failed!");
//       }
//     } catch (err) {
//       toast.error("Network error!");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   async function onSubmit(values) {
//     if (values.password !== values.confirmPassword) {
//       toast.error("Passwords do not match!");
//       return;
//     }
//     if (!imageUrl) {
//       toast.error("Please upload a profile picture!");
//       return;
//     }

//     setLoading(true);
//     const { error } = await authClient.signUp.email({
//       email: values.email,
//       password: values.password,
//       name: values.name,
//       image: imageUrl,
//       role: values.role,
//     });
//     setLoading(false);

//     if (error) {
//       toast.error(error.message || "Sign up failed!");
//     } else {
//       toast.success("Account created successfully!");
//       router.push(redirectTo);
//     }
//   }

//   return (
//     <div className="min-h-[90vh] bg-white dark:bg-[#070314] transition-colors flex items-center justify-center">
//       <div className="w-full max-w-md bg-[#0d0724] border border-white/10 p-8 rounded-3xl shadow-xl">
//         <h1 className="text-2xl font-bold text-white mb-6 text-center">Join Fable</h1>

//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

//             <FormField control={form.control} name="name" render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="text-gray-300">Full Name</FormLabel>
//                 <FormControl><Input placeholder="John Doe" {...field} className="bg-[#130d2e] border-white/10 text-white" /></FormControl>
//               </FormItem>
//             )} />

//             <FormField control={form.control} name="email" render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="text-gray-300">Email</FormLabel>
//                 <FormControl><Input type="email" placeholder="email@example.com" {...field} className="bg-[#130d2e] border-white/10 text-white" /></FormControl>
//               </FormItem>
//             )} />

//             <FormField control={form.control} name="password" render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="text-gray-300">Password</FormLabel>
//                 <div className="relative">
//                   <FormControl><Input type={showPassword ? "text" : "password"} placeholder="********" {...field} className="bg-[#130d2e] border-white/10 text-white pr-10" /></FormControl>
//                   <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-gray-400">
//                     {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                   </button>
//                 </div>
//               </FormItem>
//             )} />

//             <FormField control={form.control} name="confirmPassword" render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="text-gray-300">Confirm Password</FormLabel>
//                 <div className="relative">
//                   <FormControl><Input type={showConfirmPassword ? "text" : "password"} placeholder="********" {...field} className="bg-[#130d2e] border-white/10 text-white pr-10" /></FormControl>
//                   <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-2.5 text-gray-400">
//                     {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                   </button>
//                 </div>
//               </FormItem>
//             )} />

//             <FormField control={form.control} name="role" render={({ field }) => (
//               <div className="flex gap-6 py-2">
//                 {["reader", "writer"].map((role) => (
//                   <div key={role} className="flex items-center space-x-2">
//                     <Checkbox checked={field.value === role} onCheckedChange={() => field.onChange(role)} className="data-[state=checked]:bg-[#6344f5] border-gray-500" />
//                     <label className="text-gray-300 text-sm cursor-pointer" onClick={() => field.onChange(role)}>{role}</label>
//                   </div>
//                 ))}
//               </div>
//             )} />

//             {/* Image Upload Area */}
//             <div className="flex flex-col items-center justify-center py-2 space-y-3">
//               <label className="w-20 h-20 border border-dashed border-white/20 bg-[#130d2e] rounded-full flex flex-col items-center justify-center cursor-pointer hover:border-white/40 overflow-hidden relative">
//                 <input type="file" className="hidden" onChange={handleImageUpload} disabled={isUploading} />
//                 {imageUrl ? (
//                   <Image src={imageUrl} alt="Profile" fill className="object-cover" />
//                 ) : isUploading ? (
//                   <Loader2 className="animate-spin text-white" />
//                 ) : (
//                   <User className="text-gray-400 w-8 h-8" />
//                 )}
//               </label>
//               <span className="text-[10px] text-gray-400 uppercase tracking-widest">Profile Picture</span>
//             </div>

//             <Button type="submit" className="w-full bg-[#6344f5] hover:bg-[#5032e6] text-white" disabled={loading || isUploading}>
//               {loading ? <Loader2 className="animate-spin" /> : "Sign Up"}
//             </Button>
//           </form>
//         </Form>
//         <p className="text-center text-gray-400 text-sm mt-6">
//           Already a Fable User? <a href={`/login?redirect-${redirectTo}`} className="text-[#6344f5] hover:underline font-semibold">Log In</a>
//         </p>
//       </div>
//     </div>
//   );
// }

"use client";

import { Eye, EyeOff, Loader2, User } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
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
  const [googleLoading, setGoogleLoading] = useState(false); // 👈 গুগল লোডিং স্টেট
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const form = useForm({
    defaultValues: { name: "", email: "", password: "", confirmPassword: "", role: "reader" },
  });

  // ── গুগল সাইন-আপ হ্যান্ডলার ──
  const handleGoogleSignUp = async () => {
    try {
      setGoogleLoading(true);
      await authClient.signIn.social({
        provider: "google",
        callbackURL: redirectTo,
      });
    } catch (error) {
      console.error("Google sign up error:", error);
      toast.error("Google sign up failed!");
      setGoogleLoading(false);
    }
  };

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
      router.push(redirectTo);
    }
  }

  return (
    <div className="min-h-[90vh] bg-white dark:bg-[#070314] transition-colors flex items-center justify-center p-4 py-10">
      <div className="w-full max-w-md bg-[#0d0724] border border-white/10 p-8 rounded-3xl shadow-xl">
        <h1 className="text-2xl font-bold text-white mb-4 text-center">Join Fable</h1>

        {/* ── গুগল সাইন-আপ বাটন (ডার্ক থিম ম্যাচিং) ── */}
        <div className="mb-4">
          <Button
            type="button"
            onClick={handleGoogleSignUp}
            disabled={googleLoading || loading || isUploading}
            className="w-full bg-[#130d2e] hover:bg-[#1a123e] text-white border border-white/10 flex items-center justify-center gap-2 font-medium h-11 rounded-xl transition-colors"
          >
            {googleLoading ? (
              <Loader2 className="animate-spin text-white" size={18} />
            ) : (
              <>
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5.04c1.62 0 3.08.56 4.22 1.65l3.14-3.14C17.45 1.68 14.94 1 12 1 7.24 1 3.2 3.74 1.25 7.75l3.82 2.96c.9-2.7 3.41-4.67 6.93-4.67z" />
                  <path fill="#4285F4" d="M23.45 12.27c0-.82-.07-1.61-.21-2.38H12v4.51h6.42c-.28 1.46-1.1 2.69-2.33 3.51l3.63 2.82c2.13-1.96 3.36-4.85 3.36-8.46z" />
                  <path fill="#FBBC05" d="M5.07 14.71c-.23-.69-.36-1.43-.36-2.21s.13-1.52.36-2.21L1.25 7.75C.45 9.4.01 11.25.01 13.2c0 1.95.44 3.8 1.24 5.45l3.82-2.94z" />
                  <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.63-2.82c-1.01.68-2.31 1.08-4.33 1.08-3.52 0-6.03-1.97-6.93-4.67L1.25 16.6C3.2 20.61 7.24 23 12 23z" />
                </svg>
                Sign up with Google
              </>
            )}
          </Button>
        </div>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#0d0724] px-2 text-gray-500">Or register with email</span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Full Name</FormLabel>
                <FormControl><Input placeholder="John Doe" {...field} className="bg-[#130d2e] border-white/10 text-white h-11" /></FormControl>
              </FormItem>
            )} />

            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Email</FormLabel>
                <FormControl><Input type="email" placeholder="email@example.com" {...field} className="bg-[#130d2e] border-white/10 text-white h-11" /></FormControl>
              </FormItem>
            )} />

            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Password</FormLabel>
                <div className="relative">
                  <FormControl><Input type={showPassword ? "text" : "password"} placeholder="********" {...field} className="bg-[#130d2e] border-white/10 text-white pr-10 h-11" /></FormControl>
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-400">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </FormItem>
            )} />

            <FormField control={form.control} name="confirmPassword" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Confirm Password</FormLabel>
                <div className="relative">
                  <FormControl><Input type={showConfirmPassword ? "text" : "password"} placeholder="********" {...field} className="bg-[#130d2e] border-white/10 text-white pr-10 h-11" /></FormControl>
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-3 text-gray-400">
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </FormItem>
            )} />

            <FormField control={form.control} name="role" render={({ field }) => (
              <div className="flex gap-6 py-1">
                {["reader", "writer"].map((role) => (
                  <div key={role} className="flex items-center space-x-2">
                    <Checkbox checked={field.value === role} onCheckedChange={() => field.onChange(role)} className="data-[state=checked]:bg-[#6344f5] border-gray-500" />
                    <label className="text-gray-300 text-sm cursor-pointer capitalize" onClick={() => field.onChange(role)}>{role}</label>
                  </div>
                ))}
              </div>
            )} />

            {/* Image Upload Area */}
            <div className="flex flex-col items-center justify-center py-1 space-y-2">
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

            <Button type="submit" className="w-full bg-[#6344f5] hover:bg-[#5032e6] text-white h-11" disabled={loading || googleLoading || isUploading}>
              {loading ? <Loader2 className="animate-spin" /> : "Sign Up"}
            </Button>
          </form>
        </Form>

        <p className="text-center text-gray-400 text-sm mt-6">
          Already a Fable User? <a href={`/login?redirect=${redirectTo}`} className="text-[#6344f5] hover:underline font-semibold">Log In</a>
        </p>
      </div>
    </div>
  );
}