import AboutNarrativeSection from "@/components/site/AboutNarrativeSection";
import ContactFooter from "@/components/site/ContactFooter";
import EyesShowcaseSection from "@/components/site/EyesShowcaseSection";
import HeroSection from "@/components/site/HeroSection";
import MarqueeSection from "@/components/site/MarqueeSection";
import ProjectsReviewsSection from "@/components/site/ProjectsReviewsSection";
import ReadyToStartSection from "@/components/site/ReadyToStartSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <AboutNarrativeSection />
      <EyesShowcaseSection />
      <ProjectsReviewsSection />
      <ReadyToStartSection withParallax />
      <ContactFooter />
    </>
  );
}
