import ContactFooter from "@/components/site/ContactFooter";
import InsightsInstagramSection from "@/components/insights/InsightsInstagramSection";
import InsightsListingSection from "@/components/insights/InsightsListingSection";

export const metadata = {
  title: "Insights | Ochi Inspired Studio",
  description:
    "Explore our insights for presentation design trends, expert tips, and client success stories."
};

export default function InsightsPage() {
  return (
    <>
      <InsightsListingSection />
      <InsightsInstagramSection />
      <ContactFooter />
    </>
  );
}
