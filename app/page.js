import EbookGenres from "@/components/pageContent/EbookGenres";
import FeaturedEbooks from "@/components/pageContent/FeaturedEbooks";
import HeroSlider from "@/components/pageContent/HeroSlider";
import HowFableWorks from "@/components/pageContent/HowFableWorks";
import LivePulseTicker from "@/components/pageContent/LivePulseTicker";
import ReadersFeedback from "@/components/pageContent/ReadersFeedback";
import StatsBanner from "@/components/pageContent/StatsBanner";
import SubscribeBanner from "@/components/pageContent/SubscribeBanner";
import TopWriters from "@/components/pageContent/TopWriters";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <LivePulseTicker />
      <FeaturedEbooks />
      <HowFableWorks />
      <TopWriters />
      <EbookGenres />
      <StatsBanner />
      <ReadersFeedback />
      <SubscribeBanner />
    </>
  );
}
