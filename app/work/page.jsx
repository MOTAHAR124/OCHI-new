import ContactFooter from "@/components/site/ContactFooter";
import ReadyToStartSection from "@/components/site/ReadyToStartSection";
import WorkHeroSection from "@/components/work/WorkHeroSection";
import WorkProjectsSection from "@/components/work/WorkProjectsSection";
import WorkPublicationsSection from "@/components/work/WorkPublicationsSection";

export const metadata = {
  title: "Presentation Design Agency | Client's Success Stories",
  description:
    "See how we've helped our clients achieve their goals with eye-opening presentations that captivate and inspire."
};

export default function WorkPage() {
  return (
    <div className="bg-ochi-lime">
      <WorkHeroSection />
      <WorkProjectsSection />
      <WorkPublicationsSection />
      <ReadyToStartSection withParallax withScrollShift />
      <ContactFooter />
    </div>
  );
}
