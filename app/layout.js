import Footer from "@/components/pageContent/Footer";
import Navbar from "@/components/pageContent/Navbar";
import { ThemeProvider } from "@/components/tools/ThemeProvider";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Fable | Discover & Read Ebooks",
  description: "A premium platform for ebook lovers",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang='en'
      className={`${plusJakartaSans.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body className='min-h-full flex flex-col'>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem={false}
        >
          <Navbar />
          {children}
          <Toaster richColors position='bottom-center' />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
