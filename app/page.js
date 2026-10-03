import BecomeAWriter from "@/components/pageContent/BecomeAWriter";
import CloudReaderPreview from "@/components/pageContent/CloudReaderPreview";
import CuratedCollections from "@/components/pageContent/CuratedCollections";
import EbookGenres from "@/components/pageContent/EbookGenres";
import EditorsSpotlight from "@/components/pageContent/EditorsSpotlight";
import FaqSection from "@/components/pageContent/FaqSection";
import FeaturedEbooks from "@/components/pageContent/FeaturedEbooks";
import HeroSlider from "@/components/pageContent/HeroSlider";
import HowFableWorks from "@/components/pageContent/HowFableWorks";
import LivePulseTicker from "@/components/pageContent/LivePulseTicker";
import ReadersFeedback from "@/components/pageContent/ReadersFeedback";
import StatsBanner from "@/components/pageContent/StatsBanner";
import SubscribeBanner from "@/components/pageContent/SubscribeBanner";
import TopWriters from "@/components/pageContent/TopWriters";
import TrendingBestsellers from "@/components/pageContent/TrendingBestsellers";
import TrustSecurity from "@/components/pageContent/TrustSecurity";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <LivePulseTicker />
      <FeaturedEbooks />
      <HowFableWorks />
      <EditorsSpotlight />
      <TopWriters />
      <EbookGenres />
      <TrendingBestsellers />
      <CloudReaderPreview />
      <BecomeAWriter />
      <CuratedCollections />
      <StatsBanner />
      <ReadersFeedback />
      <TrustSecurity />
      <FaqSection />
      <SubscribeBanner />
    </>
  );
}
