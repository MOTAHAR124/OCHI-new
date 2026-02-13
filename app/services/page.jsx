import CapabilitiesSection from "@/components/services/CapabilitiesSection";
import HolisticProcessSection from "@/components/services/HolisticProcessSection";
import ServicesHeroSection from "@/components/services/ServicesHeroSection";
import ServicesReviewsSection from "@/components/services/ServicesReviewsSection";
import WhyUsSection from "@/components/services/WhyUsSection";
import ContactFooter from "@/components/site/ContactFooter";
import ReadyToStartSection from "@/components/site/ReadyToStartSection";

export const metadata = {
  title: "Services | Ochi Inspired Studio",
  description:
    "Presentation design agency services page recreated with Next.js, Tailwind CSS, and Framer Motion."
};

export default function ServicesPage() {
  return (
    <>
      <section className="rounded-section relative bg-ochi-gray100">
        <div className="section-shell py-[9rem] lg:pb-[12rem] lg:pt-[14rem]">
          <ServicesHeroSection />
          <HolisticProcessSection />
        </div>
      </section>
      <CapabilitiesSection />
      <ServicesReviewsSection />
      <WhyUsSection />
      <ReadyToStartSection withParallax withScrollShift />
      <ContactFooter />
    </>
  );
}
