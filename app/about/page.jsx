import AboutCommitmentsSection from "@/components/about/AboutCommitmentsSection";
import AboutCustomCursor from "@/components/about/AboutCustomCursor";
import AboutHeroSection from "@/components/about/AboutHeroSection";
import AboutPreCtaSection from "@/components/about/AboutPreCtaSection";
import ContactFooter from "@/components/site/ContactFooter";
import ReadyToStartSection from "@/components/site/ReadyToStartSection";

export const metadata = {
  title: "Presentation Design Agency | Presentation Design Services",
  description:
    "A high-fidelity replication of Ochi's team page visual language, interactions, and motion behavior."
};

export default function AboutPage() {
  return (
    <>
      <AboutHeroSection />
      <AboutCommitmentsSection />
      <AboutPreCtaSection />
      <ReadyToStartSection withParallax startProjectHref="/contact" eyesMultiplier={0.8} />
      <ContactFooter />
      <AboutCustomCursor />
    </>
  );
}
