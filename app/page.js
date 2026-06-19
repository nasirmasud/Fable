import EbookGenres from "@/components/pageContent/EbookGenres";
import FeaturedEbooks from "@/components/pageContent/FeaturedEbooks";
import HeroCarousel from "@/components/pageContent/HeroCarousel";
import ReadersFeedback from "@/components/pageContent/ReadersFeedback";
import StatsBanner from "@/components/pageContent/StatsBanner";
import SubscribeBanner from "@/components/pageContent/SubscribeBanner";
import TopWriters from "@/components/pageContent/TopWriters";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <FeaturedEbooks />
      <TopWriters />
      <EbookGenres />
      <StatsBanner />
      <ReadersFeedback />
      <SubscribeBanner />
    </>
  );
}
