// "use client";

// import { Eye, EyeOff, Loader2 } from "lucide-react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";

// import { Button } from "@/components/ui/button";
// import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { authClient } from "@/lib/auth-client";

// export default function LoginPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const searchParams = useSearchParams()
//   const redirectTo = searchParams.get("redirect") || "/"

//   const form = useForm({
//     defaultValues: { email: "", password: "" },
//   });

//   const handleQuickLogin = async (role) => {
//     const testData = {
//       Reader: { email: "reader@reader.com", password: "reader123" },
//       Writer: { email: "writer@writer.com", password: "writer123" },
//       Admin: { email: "admin@admin.com", password: "admin123" },
//     };

//     const credentials = testData[role];

//     await onSubmit(credentials);
//   };

//   async function onSubmit(values) {
//     setLoading(true);
//     const { error } = await authClient.signIn.email({
//       email: values.email,
//       password: values.password,
//     });
//     setLoading(false);

//     if (error) {
//       toast.error(error.message || "Login failed!");
//     } else {
//       toast.success("Logged in successfully!");
//       router.push(redirectTo);
//     }
//   }

//   return (
//     <div className="min-h-[80vh] bg-white dark:bg-[#070314] transition-colors flex items-center justify-center p-4">
//       <div className="w-full max-w-md bg-[#0d0724] border border-white/10 p-8 rounded-3xl shadow-xl">
//         <h1 className="text-2xl py-2 font-bold text-white mb-2 text-center">Welcome back</h1>

//         {/* Quick Test Buttons */}
//         <div className="grid grid-cols-3 gap-2">
//           {["Reader", "Writer", "Admin"].map((role) => (
//             <button
//               key={role}
//               type="button"
//               onClick={() => handleQuickLogin(role)}
//               className="text-[11px] py-2 bg-[#130d2e] hover:bg-[#6344f5] border border-white/10 text-white rounded-lg transition-colors"
//             >
//               Login as {role}
//             </button>
//           ))}
//         </div>

//         {/* Divider */}
//         <div className="relative my-8">
//           <div className="absolute inset-0 flex items-center">
//             <div className="w-full border-t border-white/10" />
//           </div>
//           <div className="relative flex justify-center text-xs uppercase">
//             <span className="bg-[#0d0724] px-2 text-gray-500">Or</span>
//           </div>
//         </div>

//         <p className="text-gray-400 text-center pb-8 mb-6 text-sm">Enter your credentials to access your account</p>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//             <FormField control={form.control} name="email" render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="text-gray-300">Email Address *</FormLabel>
//                 <FormControl>
//                   <Input type="email" placeholder="you@example.com" {...field} className="bg-[#130d2e] border-white/10 text-white" />
//                 </FormControl>
//               </FormItem>
//             )} />

//             <FormField control={form.control} name="password" render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="text-gray-300">Password *</FormLabel>
//                 <div className="relative">
//                   <FormControl>
//                     <Input type={showPassword ? "text" : "password"} placeholder="Enter your password" {...field} className="bg-[#130d2e] border-white/10 text-white pr-10" />
//                   </FormControl>
//                   <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-gray-400">
//                     {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                   </button>
//                 </div>
//               </FormItem>
//             )} />

//             <Button type="submit" className="w-full bg-[#6344f5] hover:bg-[#5032e6] text-white mt-2" disabled={loading}>
//               {loading ? <Loader2 className="animate-spin" /> : "Sign In"}
//             </Button>
//           </form>
//         </Form>

//         <p className="text-center text-gray-400 text-sm mt-6">
//           New to Fable? <a href={`/signup?redirect=${redirectTo}`} className="text-[#6344f5] hover:underline font-semibold">Create account</a>
//         </p>
//       </div>
//     </div>
//   );
// }

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
  const [googleLoading, setGoogleLoading] = useState(false); // 👈 গুগল লগইনের জন্য আলাদা লোডিং স্টেট
  const [showPassword, setShowPassword] = useState(false);

  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const form = useForm({
    defaultValues: { email: "", password: "" },
  });

  // ── গুগল লগইন হ্যান্ডলার ──
  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      await authClient.signIn.social({
        provider: "google",
        callbackURL: redirectTo, // লগইন সফল হলে ইউজার এই লিংকে চলে যাবে
      });
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google sign in failed!");
      setGoogleLoading(false);
    }
  };

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

        <div className="mt-4">
          <Button
            type="button"
            onClick={handleGoogleLogin}
            disabled={googleLoading || loading}
            className="w-full bg-[#130d2e] hover:bg-[#1a123e] text-white border border-white/10 flex items-center justify-center gap-2 font-medium h-11 rounded-xl transition-colors"
          >
            {googleLoading ? (
              <Loader2 className="animate-spin text-white" size={18} />
            ) : (
              <>
                {/* গুগলের SVG আইকন */}
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5.04c1.62 0 3.08.56 4.22 1.65l3.14-3.14C17.45 1.68 14.94 1 12 1 7.24 1 3.2 3.74 1.25 7.75l3.82 2.96c.9-2.7 3.41-4.67 6.93-4.67z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.45 12.27c0-.82-.07-1.61-.21-2.38H12v4.51h6.42c-.28 1.46-1.1 2.69-2.33 3.51l3.63 2.82c2.13-1.96 3.36-4.85 3.36-8.46z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.07 14.71c-.23-.69-.36-1.43-.36-2.21s.13-1.52.36-2.21L1.25 7.75C.45 9.4.01 11.25.01 13.2c0 1.95.44 3.8 1.24 5.45l3.82-2.94z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.63-2.82c-1.01.68-2.31 1.08-4.33 1.08-3.52 0-6.03-1.97-6.93-4.67L1.25 16.6C3.2 20.61 7.24 23 12 23z"
                  />
                </svg>
                Continue with Google
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
            <span className="bg-[#0d0724] px-2 text-gray-500">Or login with email</span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Email Address *</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                      className="bg-[#130d2e] border-white/10 text-white h-11"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Password *</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...field}
                        className="bg-[#130d2e] border-white/10 text-white pr-10 h-11"
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-[#6344f5] hover:bg-[#5032e6] text-white mt-2 h-11"
              disabled={loading || googleLoading}
            >
              {loading ? <Loader2 className="animate-spin" /> : "Sign In"}
            </Button>
          </form>
        </Form>

        <p className="text-center text-gray-400 text-sm mt-6">
          New to Fable?{" "}
          <a
            href={`/signup?redirect=${redirectTo}`}
            className="text-[#6344f5] hover:underline font-semibold"
          >
            Create account
          </a>
        </p>
      </div>
    </div>
  );
}