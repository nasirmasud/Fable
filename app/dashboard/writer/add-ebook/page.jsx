"use client";

import {
  AlignCenter,
  Bold,
  BookOpen,
  Clock,
  DollarSign,
  Eye,
  Hash,
  Image,
  ImageIcon,
  Italic,
  Link,
  List, ListOrdered,
  Loader2,
  Quote,
  Redo,
  Send,
  Strikethrough,
  Tag,
  Underline,
  Undo,
  Upload, X
} from "lucide-react";
import NextImage from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { addEbook } from "@/lib/actions/ebooks";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";


const GENRES = [
  "Fantasy", "Science Fiction", "Romance", "Mystery", "Thriller",
  "Horror", "Historical Fiction", "Literary Fiction", "Non-Fiction",
  "Biography", "Self-Help", "Adventure",
];

const LANGUAGES = [
  "English", "Bengali", "Spanish", "French", "German",
  "Arabic", "Hindi", "Portuguese", "Japanese", "Chinese",
];

const TOOLBAR_GROUPS = [
  [
    { icon: Bold, label: "Bold" },
    { icon: Italic, label: "Italic" },
    { icon: Underline, label: "Underline" },
    { icon: Strikethrough, label: "Strikethrough" },
  ],
  [
    { icon: List, label: "Bullet List" },
    { icon: ListOrdered, label: "Ordered List" },
    { icon: AlignCenter, label: "Align Center" },
  ],
  [
    { icon: Link, label: "Insert Link" },
    { icon: Image, label: "Insert Image" },
    { icon: Quote, label: "Blockquote" },
  ],
  [
    { icon: Undo, label: "Undo" },
    { icon: Redo, label: "Redo" },
  ],
];


export default function AddBookPage() {
  const { data: session, isPending } = authClient.useSession();
  const role = session?.user?.name;
  const router = useRouter();
  const [coverPreview, setCoverPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [language, setLanguage] = useState("");
  const [price, setPrice] = useState("");
  const [pages, setPages] = useState("");
  const [readingTime, setReadingTime] = useState("");
  const [status, setStatus] = useState("draft");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState(["Fantasy", "Adventure", "Magic"]);
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const fileInputRef = useRef(null);

  const processImage = async (file) => {
    if (!file || !file.type.startsWith("image/")) return;

    setIsUploading(true);
    const imageFormData = new FormData();
    imageFormData.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API}`,
        { method: "POST", body: imageFormData }
      );
      const data = await response.json();
      console.log("ImgBB Response:", data);

      if (data.success) {
        setCoverPreview(data.data.url);
        toast.success("Cover image uploaded!");
      } else {
        toast.error("Upload failed!");
      }
    } catch (err) {
      toast.error("Network error!");
    } finally {
      setIsUploading(false);
    }
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      e.stopPropagation();
      if (!tags.includes(tagInput.trim())) setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    const errors = [];
    if (!coverPreview) errors.push("Cover Image");
    if (!title.trim()) errors.push("Book Title");
    if (!genre) errors.push("Genre");
    if (!price) errors.push("Price");
    if (!description.trim()) errors.push("Short Description");
    if (!content.trim()) errors.push("Full Ebook Content");

    if (errors.length > 0) {
      toast.error(`Please fill in: ${errors.join(", ")}`);
      return;
    }

    const submitData = {
      coverPreview,
      title,
      genre,
      language,
      price: parseFloat(price),
      pages: pages ? parseInt(pages) : null,
      readingTime,
      status,
      tags,
      description,
      content,
      writerEmail: session?.user?.email,
    };

    const res = await addEbook(submitData)
    if (res?.insertedId) {
      toast.success("Ebook Added Successfully");
      // manually reset all states
      setTitle("");
      setGenre("");
      setLanguage("");
      setPrice("");
      setPages("");
      setReadingTime("");
      setStatus("draft");
      setTags([]);
      setDescription("");
      setContent("");
      setCoverPreview(null);

      router.push("/dashboard/writer");
    } else {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d1a] text-white">

      {/* Breadcrumb */}
      <div className="px-6 pt-6 pb-2 text-sm text-gray-400 flex items-center gap-2">
        <span className="hover:text-purple-400 cursor-pointer transition-colors">Dashboard</span>
        <span className="text-gray-600">›</span>
        <span className="text-white font-medium">Add New Ebook</span>
      </div>

      <div
        className="mx-6 mt-3 mb-6 rounded-2xl px-8 py-8 flex items-center justify-between overflow-hidden relative"
        style={{ background: "linear-gradient(135deg, #1a0a3d 0%, #2d1065 55%, #3d1580 100%)" }}
      >
        {/* sparkles */}
        {[
          { top: "20%", left: "55%" },
          { top: "15%", left: "68%" },
          { top: "55%", left: "74%" },
          { top: "20%", left: "82%" },
          { top: "40%", left: "90%" },
        ].map((s, i) => (
          <span
            key={i}
            className="absolute text-purple-300/50 text-lg pointer-events-none select-none"
            style={{ top: s.top, left: s.left }}
          >
            ✦
          </span>
        ))}

        {/* Left text */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-purple-500/30 flex items-center justify-center">
              <BookOpen size={18} className="text-purple-300" />
            </div>
            <h1 className="text-2xl font-bold">Add New Ebook</h1>
          </div>
          <p className="text-purple-200/70 text-sm leading-relaxed">
            Share your imagination with readers around the world.<br />
            Fill in the details below to publish your ebook.
          </p>
        </div>

        {/* Right decorative book stack */}
        <div className="hidden md:block relative w-32 h-28 shrink-0 mr-8">
          {/* back book */}
          <div className="absolute right-0 top-2 w-20 h-24 rounded-xl bg-linear-to-br from-purple-600 to-purple-900 border border-purple-400/20 rotate-6 shadow-xl" />
          {/* front book */}
          <div className="absolute right-4 top-0 w-20 h-24 rounded-xl bg-linear-to-br from-purple-500 to-indigo-700 border border-purple-300/20 -rotate-3 shadow-xl flex items-center justify-center">
            <BookOpen size={28} className="text-purple-200/50" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-10 grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6">

        {/* ── LEFT COLUMN ── */}
        <div className="space-y-5">

          {/* Card 1: Cover + Fields */}
          <Card className="bg-[#13132a] border-white/5 rounded-2xl">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6">

                {/* Cover Upload */}
                <div>
                  <Label className="text-white font-semibold mb-3 block">
                    Cover Image <span className="text-red-400">*</span>
                  </Label>
                  <div
                    onDrop={(e) => { e.preventDefault(); setIsDragging(false); processImage(e.dataTransfer.files[0]); }}
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    className={`relative border-2 border-dashed rounded-xl transition-all ${isDragging ? "border-purple-400 bg-purple-500/10" : "border-white/10 hover:border-purple-500/40"}`}
                  >
                    {!coverPreview ? (
                      <div className="py-28 px-4 text-center">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                          {isUploading
                            ? <Loader2 size={20} className="text-purple-400 animate-spin" />
                            : <Upload size={20} className="text-purple-400" />
                          }
                        </div>
                        <p className="text-sm text-gray-400 mb-1">
                          {isUploading ? "Uploading..." : "Drag & drop your image here"}
                        </p>
                        <p className="text-xs text-gray-600 mb-3">or</p>
                        <Button
                          variant="link"
                          className="text-purple-400 p-0 h-auto text-sm"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isUploading}
                        >
                          {isUploading ? "Please wait..." : "click to browse"}
                        </Button>
                        <p className="text-xs text-gray-600 mt-3">Supports: JPG, PNG, WEBP · Max 5MB</p>
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="relative w-full rounded-xl overflow-hidden" style={{ height: "380px" }}>
                          <NextImage src={coverPreview} alt="Cover" fill className="object-cover rounded-xl" unoptimized />
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="absolute top-2 right-2 w-7 h-7 bg-black/60 hover:bg-black rounded-full"
                          onClick={() => { setCoverPreview(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                        >
                          <X size={13} />
                        </Button>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => processImage(e.target.files[0])}
                    />
                  </div>

                  {coverPreview && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3 w-full border-white/10 bg-transparent text-gray-300 hover:bg-white/5 hover:text-white"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                    >
                      <ImageIcon size={13} className="mr-2" /> Change Image
                    </Button>
                  )}
                </div>

                {/* Right Fields */}
                <div className="space-y-4">
                  {/* Title */}
                  <div>
                    <Label className="text-white font-semibold mb-2 block">
                      Book Title <span className="text-red-400">*</span>
                    </Label>
                    <Input
                      placeholder="Enter ebook title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="bg-[#0d0d1a] border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-purple-500 focus-visible:ring-1 focus-visible:border-purple-500"
                    />
                  </div>

                  {/* Genre + Language */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-white font-semibold mb-2 block">
                        Genre <span className="text-red-400">*</span>
                      </Label>
                      <Select onValueChange={setGenre}>
                        <SelectTrigger className="bg-[#0d0d1a] border-white/10 text-white focus:ring-purple-500 focus:ring-1">
                          <SelectValue placeholder="Select genre" className="text-gray-600" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1a1a35] border-white/10 text-white">
                          {GENRES.map((g) => (
                            <SelectItem key={g} value={g} className="focus:bg-purple-500/20 focus:text-white">{g}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-white font-semibold mb-2 block">Language</Label>
                      <Select onValueChange={setLanguage}>
                        <SelectTrigger className="bg-[#0d0d1a] border-white/10 text-white focus:ring-purple-500 focus:ring-1">
                          <SelectValue placeholder="Select language" className="text-gray-600" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1a1a35] border-white/10 text-white">
                          {LANGUAGES.map((l) => (
                            <SelectItem key={l} value={l} className="focus:bg-purple-500/20 focus:text-white">{l}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Price + Pages */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-white font-semibold mb-2 block">
                        Price (USD) <span className="text-red-400">*</span>
                      </Label>
                      <div className="relative">
                        <DollarSign size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <Input
                          type="number"
                          placeholder="9.99"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          className="bg-[#0d0d1a] border-white/10 text-white placeholder:text-gray-600 pl-7 focus-visible:ring-purple-500 focus-visible:ring-1 focus-visible:border-purple-500"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-white font-semibold mb-2 block">Number of Pages</Label>
                      <div className="relative">
                        <Hash size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <Input
                          type="number"
                          placeholder="250"
                          value={pages}
                          onChange={(e) => setPages(e.target.value)}
                          className="bg-[#0d0d1a] border-white/10 text-white placeholder:text-gray-600 pl-7 focus-visible:ring-purple-500 focus-visible:ring-1 focus-visible:border-purple-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Reading Time + Status */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-white font-semibold mb-2 block">Reading Time (Est.)</Label>
                      <div className="relative">
                        <Clock size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <Input
                          placeholder="5-6 hours"
                          value={readingTime}
                          onChange={(e) => setReadingTime(e.target.value)}
                          className="bg-[#0d0d1a] border-white/10 text-white placeholder:text-gray-600 pl-7 focus-visible:ring-purple-500 focus-visible:ring-1 focus-visible:border-purple-500"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-white font-semibold mb-2 block">
                        Status <span className="text-red-400">*</span>
                      </Label>
                      <RadioGroup value={status} onValueChange={setStatus} className="flex items-center gap-4 h-10">
                        {["draft", "published"].map((s) => (
                          <div key={s} className="flex items-center gap-2">
                            <RadioGroupItem
                              value={s}
                              id={s}
                              className="border-gray-600 text-purple-500 data-[state=checked]:border-purple-500"
                            />
                            <Label htmlFor={s} className="text-gray-300 capitalize cursor-pointer text-sm">
                              {s === "draft" ? "Draft" : "Published"}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <Label className="text-white font-semibold mb-2 block">
                      Tags{" "}
                      <span className="text-gray-500 font-normal text-xs">(Press Enter to add)</span>
                    </Label>
                    <div className="relative">
                      <Tag size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                      <Input
                        placeholder="e.g. Fantasy, Adventure, Magic"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleTagKeyDown}
                        className="bg-[#0d0d1a] border-white/10 text-white placeholder:text-gray-600 pl-7 focus-visible:ring-purple-500 focus-visible:ring-1 focus-visible:border-purple-500"
                      />
                    </div>
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="bg-purple-600/20 border-purple-500/30 text-purple-300 hover:bg-purple-600/30 gap-1.5 pr-1.5"
                          >
                            {tag}
                            <button onClick={() => setTags(tags.filter((t) => t !== tag))} className="hover:text-white transition-colors">
                              <X size={10} />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Short Description */}
          <Card className="bg-[#13132a] border-white/5 rounded-2xl">
            <CardContent className="p-6">
              <Label className="text-white font-semibold mb-3 block">
                Short Description <span className="text-red-400">*</span>
              </Label>
              <div className="relative">
                <Textarea
                  placeholder="Write a short description about your ebook. This will be shown to readers..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value.slice(0, 300))}
                  rows={10}
                  className="bg-[#0d0d1a] border-white/10 text-white placeholder:text-gray-600 resize-none focus-visible:ring-purple-500 focus-visible:ring-1 focus-visible:border-purple-500 h-36"
                />
                <span className="absolute bottom-3 right-3 text-xs text-gray-600">
                  {description.length} / 300
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Full Content Editor */}
          <Card className="bg-[#13132a] border-white/5 rounded-2xl">
            <CardContent className="p-6">
              <Label className="text-white font-semibold mb-3 block">
                Full Ebook Content <span className="text-red-400">*</span>
              </Label>

              {/* Toolbar */}
              <div className="flex flex-wrap items-center gap-0.5 p-2 bg-[#0d0d1a] border border-white/10 rounded-t-xl border-b-0">
                <Select defaultValue="paragraph">
                  <SelectTrigger className="h-7 w-28 bg-transparent border-0 text-gray-400 text-xs focus:ring-0 px-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a35] border-white/10 text-white">
                    <SelectItem value="paragraph" className="text-xs focus:bg-purple-500/20">Paragraph</SelectItem>
                    <SelectItem value="h1" className="text-xs focus:bg-purple-500/20">Heading 1</SelectItem>
                    <SelectItem value="h2" className="text-xs focus:bg-purple-500/20">Heading 2</SelectItem>
                  </SelectContent>
                </Select>

                {TOOLBAR_GROUPS.map((group, gi) => (
                  <div key={gi} className="flex items-center">
                    <Separator orientation="vertical" className="h-5 mx-1 bg-white/10" />
                    {group.map(({ icon: Icon, label }) => (
                      <button
                        key={label}
                        type="button"
                        title={label}
                        className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors"
                      >
                        <Icon size={13} />
                      </button>
                    ))}
                  </div>
                ))}
              </div>

              <Textarea
                placeholder="Write your ebook content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={16}
                className="bg-[#0d0d1a] border-white/10 text-white placeholder:text-gray-600 resize-y min-h-70 rounded-t-none border-t-0 focus-visible:ring-purple-500 focus-visible:ring-1 focus-visible:border-purple-500"
              />
            </CardContent>
          </Card>

          {/* Action Button */}
          <div>
            <Button
              onClick={handleFormSubmit}
              size="lg"
              className="rounded-xl font-semibold text-white w-full"
              style={{ background: "linear-gradient(135deg, #1a0a3d 0%, #2d1065 50%, #3d1580 100%)" }}
            >
              <Send size={16} className="mr-2" />
              Publish Ebook
            </Button>
          </div>
        </div>

        {/* ── RIGHT COLUMN: Preview ── */}
        <div className="xl:sticky xl:top-6 self-start">
          <Card className="bg-[#13132a] border-white/5 rounded-2xl">
            <CardHeader className="pb-2 px-5 pt-5">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold text-white">
                <Eye size={15} className="text-purple-400" />
                Ebook Preview
              </CardTitle>
              <p className="text-xs text-gray-500">This is how your ebook will appear to readers.</p>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              {/* Cover */}
              <div className="rounded-xl overflow-hidden mb-4 aspect-3/4 bg-linear-to-br from-[#1a0a3d] to-[#2d1065] flex items-center justify-center relative">
                {isUploading ? (
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 size={28} className="text-purple-400 animate-spin" />
                    <p className="text-xs text-purple-300">Uploading...</p>
                  </div>
                ) : coverPreview ? (
                  <NextImage src={coverPreview} alt="Preview" fill className="object-cover" unoptimized />
                ) : (
                  <BookOpen size={36} className="text-purple-300/30" />
                )}
              </div>

              <h3 className="text-base font-bold text-white mb-1">{title || ""}</h3>
              <p className="text-sm text-purple-400 mb-3">by {role?.toUpperCase()}</p>

              <div className="flex items-center gap-2 mb-3 flex-wrap">
                {genre && (
                  <Badge variant="outline" className="bg-purple-600/20 border-purple-500/30 text-purple-300 text-xs">
                    {genre}
                  </Badge>
                )}
                <Badge
                  variant="outline"
                  className={`text-xs ${status === "published"
                    ? "bg-green-500/20 border-green-500/30 text-green-400"
                    : "bg-yellow-500/20 border-yellow-500/30 text-yellow-400"
                    }`}
                >
                  {status === "published" ? "Available" : "Draft"}
                </Badge>
              </div>

              <p className="text-xl font-bold text-white mb-3">${price || "9.99"}</p>

              {description && (
                <p className="text-xs text-gray-400 mb-4 leading-relaxed line-clamp-3">{description}</p>
              )}

              <Separator className="bg-white/5 mb-4" />

              <div className="space-y-2">
                {[
                  { label: "Pages", value: pages || "—" },
                  { label: "Reading Time", value: readingTime || "—" },
                  { label: "Language", value: language || "—" },
                  { label: "Published", value: status === "published" ? "Yes" : "—" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{label}</span>
                    <span className="text-xs text-gray-300 font-medium">{value}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-gray-600 mt-4 text-center">More details will be shown on the ebook details page.</p>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}