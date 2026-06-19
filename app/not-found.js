"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FiArrowLeft, FiHome } from "react-icons/fi";

export default function NotFound() {
  const handleBack = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  return (
    <div className='min-h-screen w-full bg-[#070314] text-white flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-300'>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-100 bg-[#6344f5]/10 blur-[130px] rounded-full pointer-events-none' />
      <div className='w-full max-w-md text-center relative z-10 space-y-6 py-12'>
        <div className='relative inline-block select-none'>
          <h1 className='text-[120px] sm:text-[150px] font-extrabold tracking-tighter leading-none bg-clip-text text-transparent bg-linear-to-b from-white to-gray-600'>
            404
          </h1>
          <div className='flex items-center justify-center gap-1 mt-2'>
            <span className='w-1.5 h-1.5 rounded-sm bg-[#6344f5] block' />
            <span className='w-1.5 h-1.5 rounded-sm bg-[#6344f5] block' />
          </div>
        </div>
        <div className='space-y-2'>
          <h2 className='text-xl sm:text-2xl font-semibold tracking-tight'>
            Page not found
          </h2>
          <p className='text-xs sm:text-sm text-gray-400 max-w-xs mx-auto leading-relaxed'>
            Sorry, the page you are looking for doesn`&apos;t exist or has been
            moved to another URL.
          </p>
        </div>
        <div className='flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 max-w-xs sm:max-w-none mx-auto'>
          <Button
            variant='outline'
            onClick={handleBack}
            className='w-full sm:w-auto h-11 bg-transparent hover:bg-white/5 text-white border-white/10 text-[13px] font-medium px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 select-none'
          >
            <FiArrowLeft className='w-4 h-4' />
            Go Back
          </Button>
          <Link href='/' className='w-full sm:w-auto select-none'>
            <Button className='w-full h-11 bg-[#6344f5] hover:bg-[#5032e6] text-white text-[13px] font-medium px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-[0_0_20px_rgba(99,68,245,0.3)]'>
              <FiHome className='w-4 h-4' />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
