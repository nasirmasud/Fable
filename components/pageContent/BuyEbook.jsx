"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Download,
  Lock,
  RotateCcw,
  ShieldCheck,
  User,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const BuyEbookPage = ({ ebook, user }) => {
  const router = useRouter();
  const [form, setForm] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   const submissionData = {
  //     bookId: ebook?._id,
  //     author: ebook.author,
  //     bookTitle: ebook?.title,
  //     price: ebook?.price,
  //     buyerId: user?.id,
  //     ...form,
  //   };

  //   const res = await soldEbook(submissionData);

  //   if (!res.insertedId) {
  //     alert('Something went wrong!');
  //     setLoading(false);
  //     return;
  //   }

  //   const checkoutRes = await fetch("/api/checkout_sessions", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       bookId: ebook?._id,
  //       bookTitle: ebook?.title,
  //       price: ebook?.price,
  //       email: form.email,
  //     }),
  //   });

  //   const data = await checkoutRes.json();
  //   if (data.url) {
  //     window.location.href = data.url
  //   }

  //   setLoading(false);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const checkoutRes = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bookId: ebook?._id,
        bookTitle: ebook?.title,
        price: ebook?.price,
        email: form.email,
        // success page এ soldEbook এর জন্য এগুলাও পাঠাও
        name: form.name,
        phone: form.phone,
        author: ebook?.author,
        buyerId: user?.id,
      }),
    });

    const data = await checkoutRes.json();
    if (data.url) {
      window.location.href = data.url;
    }

    setLoading(false);
  };

  const price = ebook?.price ?? 0;

  return (
    <div className="min-h-screen bg-[#0d0d1a] text-white font-sans flex flex-col">

      {/* ── Breadcrumb ── */}
      <nav className="px-4 md:px-10 pt-5 pb-2 flex items-center gap-2 text-sm text-gray-400">
        <span className="hover:text-white cursor-pointer transition-colors">Home</span>
        <span className="text-gray-600">›</span>
        <span className="hover:text-white cursor-pointer transition-colors">Browse Ebooks</span>
        <span className="text-gray-600">›</span>
        <span
          className="hover:text-white cursor-pointer transition-colors"
          onClick={() => router.back()}
        >
          {ebook?.title}
        </span>
        <span className="text-gray-600">›</span>
        <span className="text-purple-400 font-medium">Buy Now</span>
      </nav>

      {/* ── Page Header ── */}
      <div className="px-4 md:px-10 py-4 flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-lg border border-white/15 flex items-center justify-center hover:bg-white/10 transition-colors shrink-0"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-3xl font-bold">Checkout</h1>
          <p className="text-gray-400 text-sm mt-0.5">
            Enter your information to complete your purchase.
          </p>
        </div>
      </div>

      {/* ── Main Content ── */}
      <main className="flex-1 px-4 md:px-10 py-4 pb-10">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-6">

          {/* ── Left: Form ── */}
          <Card className="flex-1 bg-[#13132b] border-white/10 text-white">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Section heading */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center shrink-0">
                    <User size={17} />
                  </div>
                  <h2 className="text-lg font-semibold">Your Information</h2>
                </div>

                {/* Full Name */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-white">Full Name</Label>
                  <Input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="bg-transparent border-white/15 text-white placeholder:text-gray-500 focus:border-purple-500 focus-visible:ring-0 h-12"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-white">Email Address</Label>
                  <Input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="bg-transparent border-white/15 text-white placeholder:text-gray-500 focus:border-purple-500 focus-visible:ring-0 h-12"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-white">
                    Phone Number{" "}
                    <span className="text-gray-400 font-normal">(Optional)</span>
                  </Label>
                  <Input
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="bg-transparent border-white/15 text-white placeholder:text-gray-500 focus:border-purple-500 focus-visible:ring-0 h-12"
                  />
                </div>

                {/* Security note */}
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Lock size={14} className="text-purple-400 shrink-0" />
                  Your information is secure and will not be shared.
                </div>

                {/* Pay Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 bg-purple-600 hover:bg-purple-700 text-white text-base font-semibold gap-2 disabled:opacity-70"
                >
                  <Lock size={18} />
                  {loading ? "Processing…" : `Pay $${price.toFixed(2)}`}
                </Button>

                {/* Stripe note */}
                <p className="text-center text-sm text-gray-400">
                  You will be redirected to{" "}
                  <span className="text-purple-400 font-medium">Stripe</span> to
                  complete your payment securely.
                </p>

              </form>
            </CardContent>
          </Card>

          {/* ── Right: Order Summary ── */}
          <div className="w-full lg:w-80 xl:w-96 shrink-0 space-y-4">
            <Card className="bg-[#13132b] border-white/10 text-white">
              <CardContent className="p-6 space-y-5">
                <h2 className="text-lg font-semibold">Order Summary</h2>

                {/* Book cover */}
                <div className="relative w-full aspect-3/2 rounded-xl overflow-hidden">
                  {ebook?.coverPreview ? (
                    <Image
                      src={ebook.coverPreview}
                      alt={ebook.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 384px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-linear-to-br from-purple-900 to-indigo-900" />
                  )}
                </div>

                {/* Book info */}
                <div>
                  <h3 className="font-semibold text-base">{ebook?.title}</h3>
                  <p className="text-gray-400 text-sm">Digital eBook</p>
                </div>

                <Separator className="bg-white/10" />

                {/* Price row */}
                <div className="flex items-center justify-between text-sm text-gray-300">
                  <span>Price</span>
                  <span>${price.toFixed(2)}</span>
                </div>

                <Separator className="bg-white/10" />

                {/* Total */}
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-base">Total</span>
                  <span className="text-purple-400 text-2xl font-bold">
                    ${price.toFixed(2)}
                  </span>
                </div>

                <Separator className="bg-white/10" />

                {/* Trust badges */}
                <div className="space-y-3">
                  {[
                    {
                      icon: <ShieldCheck size={18} className="text-purple-400" />,
                      title: "Secure Payment",
                      sub: "Powered by Stripe",
                    },
                    {
                      icon: <Download size={18} className="text-purple-400" />,
                      title: "Instant Access",
                      sub: "Get your book immediately",
                    },
                    {
                      icon: <RotateCcw size={18} className="text-purple-400" />,
                      title: "30-Day Money Back",
                      sub: "Full refund if not satisfied",
                    },
                  ].map(({ icon, title, sub }) => (
                    <div key={title} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        {icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{title}</p>
                        <p className="text-xs text-gray-400">{sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </main>

      {/* ── Footer: Payment strip ── */}
      <footer className="border-t border-white/10">
        <div className="px-4 md:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto w-full">
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            Secure checkout powered by{" "}
            <span className="text-purple-400 text-xl font-bold tracking-tighter">
              stripe
            </span>
          </div>
          <div className="flex items-center gap-4 text-gray-300 font-bold tracking-widest text-sm">
            <span>VISA</span>
            <span className="flex items-center gap-0.5">
              <span className="w-5 h-5 rounded-full bg-red-500 opacity-80 inline-block" />
              <span className="w-5 h-5 rounded-full bg-yellow-400 opacity-80 -ml-2 inline-block" />
            </span>
            <span>AMEX</span>
            <span>DISCOVER</span>
          </div>
        </div>

        {/* Bottom note */}
        <div className="text-center pb-6 space-y-1">
          <p className="text-gray-400 text-sm flex items-center justify-center gap-1.5">
            <ShieldCheck size={14} />
            We respect your privacy. Your data is safe with us.
          </p>
          <p className="text-gray-500 text-sm">
            © 2024 EbookStore. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default BuyEbookPage;