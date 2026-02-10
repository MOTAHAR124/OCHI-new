import AboutNarrativeSection from "@/components/site/AboutNarrativeSection";
import ContactFooter from "@/components/site/ContactFooter";
import EyesShowcaseSection from "@/components/site/EyesShowcaseSection";
import FeaturedProjectsSection from "@/components/site/FeaturedProjectsSection";
import HeroSection from "@/components/site/HeroSection";
import MarqueeSection from "@/components/site/MarqueeSection";
import TeamSection from "@/components/site/TeamSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <AboutNarrativeSection />
      <EyesShowcaseSection />
      <FeaturedProjectsSection />
      <TeamSection />
      <ContactFooter />
    </>
  );
}
