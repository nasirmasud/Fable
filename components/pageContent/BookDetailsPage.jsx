"use client";

import BookmarkButton from "@/components/tools/BookmarkButton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  ChevronRight,
  Clock,
  FileText,
  Globe,
  Lock,
  Share2,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { BookCard } from "./AllEbooks";

function StarRating({ value, max = 5, size = 16 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={
            i < Math.round(value)
              ? "fill-yellow-400 text-yellow-400"
              : "fill-muted text-muted-foreground"
          }
        />
      ))}
    </div>
  );
}

const SIMILAR_BOOKS = [
  {
    id: 1,
    title: "Mindset Mastery",
    author: "James Clear",
    rating: 4.6,
    price: 4.99,
    cover: "https://i.ibb.co.com/yB6G9hsD/71-Zp31d-Fe-UL-SY466.jpg",
  },
  {
    id: 2,
    title: "The Power Within",
    author: "Tony Robbins",
    rating: 4.7,
    price: 3.99,
    cover: "https://i.ibb.co.com/HcZ2bh8/41ix-Ew-Q3ly-L-SY445-SX342-FMwebp.webp",
  },
  {
    id: 3,
    title: "Daily Success Habits",
    author: "Darren Hardy",
    rating: 4.5,
    price: 2.99,
    cover: "https://i.ibb.co.com/gbVXJ8mG/51l-Abf-Eas5-L-SY466.jpg",
  },
  {
    id: 4,
    title: "Focus & Win",
    author: "Cal Newport",
    rating: 4.4,
    price: 3.49,
    cover: "https://i.ibb.co.com/7J9X1Lr8/81nr-Vzhh-Yp-L-SY466.jpg",
  },
];

const MOCK_REVIEWS = [
  {
    id: 1,
    name: "Sarah Johnson",
    initials: "S",
    date: "May 10, 2024",
    rating: 5,
    text: "Amazing book! It completely changed the way I think about success and life. Highly recommended to everyone.",
    color: "bg-purple-600",
  },
  {
    id: 2,
    name: "David Wilson",
    initials: "D",
    date: "Apr 28, 2024",
    rating: 4,
    text: "Very practical and easy to apply. The examples are relatable and really helpful.",
    color: "bg-blue-600",
  },
];

export default function BookDetailsPage({ book, id }) {
  const router = useRouter();
  const [descExpanded, setDescExpanded] = useState(false);

  if (!book) {
    return (
      <div className="min-h-screen bg-[#0d0d1a] flex items-center justify-center text-white">
        <p>Book not found.</p>
      </div>
    );
  }

  const {
    title,
    coverPreview,
    description,
    content,
    genre,
    language,
    pages,
    price,
    rating,
    readingTime,
    status,
    tags,
    writerEmail,
  } = book;

  const isDraft = status === "draft";

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d1a] text-white font-sans p-10">
      {/* Breadcrumb */}
      <nav className="px-4 md:px-8 pt-5 pb-2 flex items-center gap-2 text-sm text-gray-400">
        <span className="hover:text-white cursor-pointer transition-colors">Home</span>
        <ChevronRight size={14} />
        <span className="hover:text-white cursor-pointer transition-colors">Browse Ebooks</span>
        <ChevronRight size={14} />
        <span className="text-white">{title}</span>
      </nav>

      <main className="px-4 md:px-8 py-6 w-full">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* LEFT COLUMN */}
          <div className="flex-1 min-w-0 space-y-8">

            <section className="flex flex-col md:flex-row gap-8">
              {/* Cover */}
              <div className="shrink-0">
                <div className="w-64 h-96 rounded-sm overflow-hidden shadow-2xl shadow-purple-900/40 border border-white/5 relative">
                  {coverPreview ? (
                    <Image
                      src={coverPreview}
                      alt={title}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 208px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-linear-to-br from-purple-900 to-indigo-900 flex items-center justify-center">
                      <BookOpen size={48} className="text-purple-300" />
                    </div>
                  )}
                </div>
              </div>

              {/* Meta */}
              <div className="flex-1 space-y-4">
                <Badge
                  className={
                    isDraft
                      ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30 border"
                      : "bg-green-500/20 text-green-400 border-green-500/30 border"
                  }
                >
                  {isDraft ? "Draft" : "Published"}
                </Badge>

                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>

                {/* Author নাম */}
                <p className="text-gray-400 text-sm">
                  by{" "}
                  <span
                    onClick={() => router.push(`/authors/${encodeURIComponent(book.author ?? writerEmail)}`)}
                    className="text-purple-400 hover:text-purple-300 transition-colors cursor-pointer"
                  >
                    {book.author ?? writerEmail}
                  </span>
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <StarRating value={rating} size={18} />
                  <span className="text-yellow-400 font-semibold">{rating?.toFixed(1)}</span>
                  <span className="text-gray-400 text-sm">(28 Reviews)</span>
                </div>

                {/* Info chips */}
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-300">
                  <span className="flex items-center gap-1.5">
                    <BookOpen size={14} className="text-purple-400" />
                    {genre}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Globe size={14} className="text-purple-400" />
                    {language}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FileText size={14} className="text-purple-400" />
                    {pages} Pages
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} className="text-purple-400" />
                    {readingTime}
                  </span>
                </div>

                <Separator className="bg-white/10" />

                <p className="text-3xl font-bold text-purple-400">${price}</p>

                <div className="flex flex-wrap gap-3">
                  <Link href={`/all-books/${id}/read-more`}>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 gap-2">
                      <BookOpen size={16} />
                      Read Now
                    </Button>
                  </Link>
                  <BookmarkButton book={book} bookId={id} />
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-white/20 text-white hover:bg-white/10"
                    onClick={handleShare}
                  >
                    <Share2 size={16} />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {tags?.map((tag) => (
                    <Badge
                      key={tag}
                      className="bg-purple-600/20 text-purple-300 border border-purple-500/30 hover:bg-purple-600/30 cursor-pointer transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </section>

            {/* About + Stats */}
            <div className="space-y-4">
              <Card className="bg-[#13132b] border-white/10 text-white">
                <CardContent className="p-6 space-y-3">
                  <h2 className="font-semibold text-lg">About This Book</h2>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {descExpanded
                      ? description
                      : description?.slice(0, 220) + (description?.length > 220 ? "…" : "")}
                  </p>
                  {description?.length > 220 && (
                    <button
                      onClick={() => setDescExpanded((e) => !e)}
                      className="text-purple-400 text-sm flex items-center gap-1 hover:text-purple-300 transition-colors"
                    >
                      {descExpanded ? "Show less" : "Read more"}
                      <ChevronRight size={14} className={descExpanded ? "rotate-90" : ""} />
                    </button>
                  )}
                </CardContent>
              </Card>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  {
                    label: "Rating",
                    value: rating?.toFixed(1),
                    icon: <Star size={16} className="fill-yellow-400 text-yellow-400" />,
                  },
                  { label: "Pages", value: pages, icon: <FileText size={16} className="text-purple-400" /> },
                  { label: "Language", value: language, icon: <Globe size={16} className="text-purple-400" /> },
                  { label: "Genre", value: genre, icon: <BookOpen size={16} className="text-purple-400" /> },
                ].map(({ label, value, icon }) => (
                  <Card key={label} className="bg-[#13132b] border-white/10 text-white">
                    <CardContent className="p-4">
                      <p className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                        {icon} {label}
                      </p>
                      <p className="text-lg font-semibold">{value}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Preview + Author Row */}
            <div className="grid md:grid-cols-3 gap-6 items-start">
              <Card className="md:col-span-2 bg-[#13132b] border-white/10 text-white flex flex-col">
                <CardContent className="p-6 space-y-3 flex-1">
                  <h2 className="font-semibold text-lg">Preview</h2>
                  <p className="text-gray-300 text-sm leading-relaxed line-clamp-8">
                    {content}
                  </p>
                  <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-purple-400 text-sm flex items-center gap-1.5">
                      <Lock size={14} />
                      Continue reading after purchase
                    </span>
                    <Link href={`/all-books/${id}/read-more`}>
                      <Button className="bg-purple-600 hover:bg-purple-700 text-white gap-2 text-sm px-4">
                        <BookOpen size={14} />
                        Buy Now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Author Card */}
              <Card className="bg-[#13132b] border-white/10 text-white">
                <CardContent className="p-6 space-y-4">
                  <h2 className="font-semibold text-lg">Author Information</h2>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10 bg-gray-600">
                      <AvatarFallback className="bg-gray-600 text-gray-200 text-sm">
                        {(book.author ?? writerEmail)?.[0]?.toUpperCase() ?? "A"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-300">
                      {book.author ?? writerEmail}
                    </span>
                  </div>
                  <Separator className="bg-white/10" />
                  {[
                    { icon: <BookOpen size={15} className="text-gray-400" />, label: "Published Books", value: 12 },
                    { icon: <Users size={15} className="text-gray-400" />, label: "Followers", value: 320 },
                    {
                      icon: <TrendingUp size={15} className="text-gray-400" />,
                      label: "Average Rating",
                      value: (
                        <span className="flex items-center gap-1">
                          <Star size={14} className="fill-yellow-400 text-yellow-400" /> 4.8
                        </span>
                      ),
                    },
                  ].map(({ icon, label, value }) => (
                    <div key={label} className="flex items-center justify-between text-sm">
                      <span className="text-gray-400 flex items-center gap-2">
                        {icon} {label}
                      </span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="w-full lg:w-[360px] xl:w-[420px] 2xl:w-[480px] flex-shrink-0 space-y-8">
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Similar Books</h2>
                <button className="text-purple-400 text-sm flex items-center gap-1 hover:text-purple-300 transition-colors">
                  View All <ChevronRight size={14} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {SIMILAR_BOOKS.map((b) => {
                  const adaptedBook = {
                    _id: b.id,
                    title: b.title,
                    coverPreview: b.cover,
                    genre: genre,
                    rating: b.rating,
                    price: b.price,
                    author: b.author,
                  };
                  return <BookCard key={b.id} book={adaptedBook} />;
                })}
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Reviews (28)</h2>
                <button className="text-purple-400 text-sm flex items-center gap-1 hover:text-purple-300 transition-colors">
                  View All <ChevronRight size={14} />
                </button>
              </div>
              <div className="space-y-3">
                {MOCK_REVIEWS.map((r) => (
                  <Card key={r.id} className="bg-[#13132b] border-white/10 text-white">
                    <CardContent className="p-4 space-y-2">
                      <div className="flex items-start gap-3">
                        <Avatar className={`w-8 h-8 ${r.color} shrink-0`}>
                          <AvatarFallback className={`${r.color} text-white text-xs font-medium`}>
                            {r.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <p className="font-medium text-sm">{r.name}</p>
                            <p className="text-xs text-gray-500 shrink-0">{r.date}</p>
                          </div>
                          <StarRating value={r.rating} size={12} />
                        </div>
                      </div>
                      <p className="text-gray-300 text-xs leading-relaxed">{r.text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </aside>

        </div>
      </main>
    </div>
  );
}