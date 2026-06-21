import EbookGenres from "@/components/pageContent/EbookGenres";
import FeaturedEbooks from "@/components/pageContent/FeaturedEbooks";
import HeroSlider from "@/components/pageContent/HeroSlider";
import ReadersFeedback from "@/components/pageContent/ReadersFeedback";
import StatsBanner from "@/components/pageContent/StatsBanner";
import SubscribeBanner from "@/components/pageContent/SubscribeBanner";
import TopWriters from "@/components/pageContent/TopWriters";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <FeaturedEbooks />
      <TopWriters />
      <EbookGenres />
      <StatsBanner />
      <ReadersFeedback />
      <SubscribeBanner />
    </>
  );
}
