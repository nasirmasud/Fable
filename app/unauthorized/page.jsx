import { ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-[#0d0d1a] flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-[#13132a] border border-white/5 rounded-2xl p-8 flex flex-col items-center text-center shadow-2xl">

        <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6 animate-in fade-in zoom-in duration-500">
          <ShieldAlert size={32} className="text-red-400" />
        </div>

        <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
        <p className="text-gray-400 text-sm mb-8 leading-relaxed">
          You don`&aps;t have the necessary permissions to view this content. Please check your credentials or go back.`
        </p>

        <div className="flex w-full gap-3">
          <Link
            href="/"
            className="flex-1 px-5 py-2.5 rounded-lg bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 transition-all shadow-lg shadow-purple-900/20"
          >
            Return Home
          </Link>
          <Link
            href="/dashboard"
            className="px-5 py-2.5 rounded-lg border border-white/10 bg-white/5 text-gray-300 text-sm font-medium hover:bg-white/10 transition-all"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}