"use client";

export default function Loading() {
  return (
    <div className='min-h-screen w-full bg-[#070314] flex flex-col items-center justify-center p-4 relative overflow-hidden'>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-75 bg-[#6344f5]/10 blur-[120px] rounded-full pointer-events-none' />

      <div className='relative flex items-center justify-center w-24 h-24 mb-4'>
        <div className='absolute inset-0 rounded-full border border-[#6344f5]/20 animate-ping duration-1000' />
        <div className='absolute w-16 h-16 rounded-full border-2 border-t-[#6344f5] border-r-transparent border-b-white/10 border-l-transparent animate-spin' />
        <div className='absolute w-6 h-6 rounded-full bg-linear-to-tr from-[#6344f5] to-purple-400 shadow-[0_0_20px_rgba(99,68,245,0.6)] animate-pulse' />
        <div className='absolute w-full h-full rounded-full border border-transparent border-l-purple-400/30 animate-spin animation-duration-[3s]' />
      </div>
      <div className='text-center space-y-2 relative z-10 select-none'>
        <h3 className='text-sm font-semibold tracking-[0.2em] text-white uppercase pl-1'>
          Fable
        </h3>
        <p className='text-xs text-gray-400 font-medium tracking-wide'>
          Preparing your workspace...
        </p>
        <div className='flex items-center justify-center gap-1 pt-0.5'>
          <span className='w-1 h-1 rounded-full bg-[#6344f5] animate-bounce [animation-delay:-0.3s]' />
          <span className='w-1 h-1 rounded-full bg-[#6344f5] animate-bounce [animation-delay:-0.15s]' />
          <span className='w-1 h-1 rounded-full bg-[#6344f5] animate-bounce' />
        </div>
      </div>
    </div>
  );
}
