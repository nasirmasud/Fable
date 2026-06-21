// // import { serverFetch } from "@/lib/core/server";
// // import { ArrowRight, Star } from "lucide-react";
// // import Image from "next/image";
// // import Link from "next/link";

// // export default async function FeaturedEbooks() {
// //   const featuredBooks = await serverFetch("/api/ebooks?limit=6")

// //   return (
// //     <section className="w-full bg-[#f8fafc] dark:bg-[#070314] py-16 px-6 md:px-10 lg:px-16 font-sans transition-colors duration-300">
// //       <div className="w-full mx-auto">
// //         <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
// //           <div>
// //             <div className="flex items-center gap-2.5 mb-2">
// //               <span className="w-1 h-7 bg-[#6344f5] rounded-full block" />
// //               <h2 className="text-2xl md:text-3xl font-bold text-[#0f172a] dark:text-white transition-colors">
// //                 Featured Ebooks
// //               </h2>
// //             </div>
// //             <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base pl-3.5 transition-colors">
// //               Handpicked original ebooks just for you
// //             </p>
// //           </div>

// //           <Link
// //             href="/browse"
// //             className="flex items-center gap-1.5 text-sm font-semibold text-[#6344f5] dark:text-purple-400 hover:text-[#5032e6] dark:hover:text-purple-300 transition-colors group pl-3.5 sm:pl-0"
// //           >
// //             View All
// //             <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
// //           </Link>
// //         </div>

// //         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 md:gap-6">
// //           {featuredBooks.map((book) => (
// //             <div
// //               key={book.id}
// //               className="bg-white dark:bg-[#0d0724] rounded-2xl border border-gray-200/80 dark:border-purple-500/15 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-md dark:hover:border-purple-500/40 hover:border-purple-300 transition-all duration-300 flex flex-col h-full overflow-hidden group cursor-pointer"
// //             >
// //               <div className="relative aspect-3/4 w-full overflow-hidden bg-gray-100 dark:bg-purple-950/20">
// //                 <Image
// //                   src={book.cover}
// //                   alt={book.title}
// //                   fill
// //                   sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
// //                   className="object-cover group-hover:scale-105 transition-transform duration-500"
// //                 />
// //               </div>

// //               <div className="p-5 flex flex-col grow justify-between">
// //                 <div>
// //                   <h3 className="text-base font-bold text-[#1e293b] dark:text-slate-100 line-clamp-1 mb-1.5 group-hover:text-[#6344f5] dark:group-hover:text-purple-400 transition-colors tracking-tight">
// //                     {book.title}
// //                   </h3>
// //                   <p className="text-sm text-gray-500 dark:text-gray-400 font-medium line-clamp-1 mb-1 transition-colors">
// //                     {book.author}
// //                   </p>
// //                   <p className="text-xs font-semibold text-purple-600/85 dark:text-purple-400/90 uppercase tracking-wider text-[10px] transition-colors">
// //                     {book.category}
// //                   </p>
// //                 </div>

// //                 <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100 dark:border-white/5">
// //                   <div className="flex items-center gap-1.5">
// //                     <Star size={15} className="fill-[#f59e0b] text-[#f59e0b]" />
// //                     <span className="text-sm font-bold text-[#334155] dark:text-slate-300 transition-colors">
// //                       {book.rating}
// //                     </span>
// //                   </div>
// //                   <span className="text-base font-extrabold text-[#6344f5] dark:text-purple-400 tracking-tight transition-colors">
// //                     {book.price}
// //                   </span>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// import { serverFetch } from "@/lib/core/server";
// import { ArrowRight, Star } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";

// export default async function FeaturedEbooks() {
//   const featuredBooks = await serverFetch("/api/ebooks?limit=6") || [];

//   console.log(featuredBooks);


//   return (
//     <section className="w-full bg-[#f8fafc] dark:bg-[#070314] py-16 px-6 md:px-10 lg:px-16 font-sans transition-colors duration-300">
//       <div className="w-full mx-auto">
//         <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
//           <div>
//             <div className="flex items-center gap-2.5 mb-2">
//               <span className="w-1 h-7 bg-[#6344f5] rounded-full block" />
//               <h2 className="text-2xl md:text-3xl font-bold text-[#0f172a] dark:text-white transition-colors">
//                 Featured Ebooks
//               </h2>
//             </div>
//             <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base pl-3.5 transition-colors">
//               Handpicked original ebooks just for you
//             </p>
//           </div>

//           <Link
//             href="/browse"
//             className="flex items-center gap-1.5 text-sm font-semibold text-[#6344f5] dark:text-purple-400 hover:text-[#5032e6] dark:hover:text-purple-300 transition-colors group pl-3.5 sm:pl-0"
//           >
//             View All
//             <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
//           </Link>
//         </div>

//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 md:gap-6">
//           {featuredBooks.map((book) => (
//             <div
//               key={book._id}
//               className="bg-white dark:bg-[#0d0724] rounded-2xl border border-gray-200/80 dark:border-purple-500/15 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-md dark:hover:border-purple-500/40 hover:border-purple-300 transition-all duration-300 flex flex-col h-full overflow-hidden group cursor-pointer"
//             >
//               <div className="relative aspect-3/4 w-full overflow-hidden bg-gray-100 dark:bg-purple-950/20">
//                 {book.coverPreview && (
//                   <Image
//                     src={book.coverPreview}
//                     alt={book.title || "Book cover"}
//                     fill
//                     sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
//                     className="object-cover group-hover:scale-105 transition-transform duration-500"
//                     priority
//                     unoptimized
//                   />
//                 )}
//               </div>

//               <div className="p-5 flex flex-col grow justify-between">
//                 <div>
//                   <h3 className="text-base font-bold text-[#1e293b] dark:text-slate-100 line-clamp-1 mb-1.5 group-hover:text-[#6344f5] dark:group-hover:text-purple-400 transition-colors tracking-tight">
//                     {book.title}
//                   </h3>
//                   <p className="text-sm text-gray-500 dark:text-gray-400 font-medium line-clamp-1 mb-1 transition-colors">
//                     {book.author}
//                   </p>
//                   <p className="text-xs font-semibold text-purple-600/85 dark:text-purple-400/90 uppercase tracking-wider text-[10px] transition-colors">
//                     {book.category}
//                   </p>
//                 </div>

//                 <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100 dark:border-white/5">
//                   <div className="flex items-center gap-1.5">
//                     <Star size={15} className="fill-[#f59e0b] text-[#f59e0b]" />
//                     <span className="text-sm font-bold text-[#334155] dark:text-slate-300 transition-colors">
//                       {book.rating}
//                     </span>
//                   </div>
//                   <span className="text-base font-extrabold text-[#6344f5] dark:text-purple-400 tracking-tight transition-colors">
//                     ${book.price}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

import { serverFetch } from "@/lib/core/server";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function resolveAuthor(book) {
  if (book.author) return book.author;
  if (!book.writerEmail) return "Unknown Author";
  return book.writerEmail
    .split("@")[0]
    .replace(/[._]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatPrice(price) {
  if (price === null || price === undefined || price === "") return "Free";
  const n = Number(price);
  if (n === 0) return "Free";
  return `$${n.toFixed(2)}`;
}

export default async function FeaturedEbooks() {
  const featuredBooks = (await serverFetch("/api/ebooks?limit=6")) || [];

  return (
    <section className="w-full bg-[#f8fafc] dark:bg-[#070314] py-16 px-6 md:px-10 lg:px-16 font-sans transition-colors duration-300">
      <div className="w-full mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="w-1 h-7 bg-[#6344f5] rounded-full block" />
              <h2 className="text-2xl md:text-3xl font-bold text-[#0f172a] dark:text-white transition-colors">
                Featured Ebooks
              </h2>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base pl-3.5 transition-colors">
              Handpicked original ebooks just for you
            </p>
          </div>

          <Link
            href="/all-books"
            className="flex items-center gap-1.5 text-sm font-semibold text-[#6344f5] dark:text-purple-400 hover:text-[#5032e6] dark:hover:text-purple-300 transition-colors group pl-3.5 sm:pl-0"
          >
            View All
            <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 md:gap-6">
          {featuredBooks.map((book) => (
            <div
              key={book._id}
              className="group relative bg-[#131428] border border-white/5 rounded overflow-hidden cursor-pointer hover:border-purple-500/40 hover:shadow-[0_0_24px_rgba(139,92,246,0.15)] transition-all duration-300"
            >
              {/* Cover */}
              <div className="relative aspect-[3/4] overflow-hidden">
                {book.coverPreview && (
                  <Image
                    src={book.coverPreview}
                    alt={book.title || "Book cover"}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                    unoptimized
                  />
                )}
                {/* Genre badge */}
                {book.genre && (
                  <span className="absolute top-2 left-2 bg-purple-600/80 text-purple-100 text-[10px] uppercase tracking-wide backdrop-blur-sm px-2 py-0.5 rounded">
                    {book.genre}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-3">
                <h3 className="text-white font-semibold text-sm leading-snug line-clamp-2 mb-0.5">
                  {book.title}
                </h3>
                <p className="text-white/40 text-xs mb-2">{resolveAuthor(book)}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="text-yellow-400 text-xs font-medium">
                      {book.rating ?? "—"}
                    </span>
                  </div>
                  <span className="text-purple-400 font-bold text-sm">
                    {formatPrice(book.price)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}