import { FeaturedProjectsSectionBody } from "@/components/site/FeaturedProjectsSection";
import { TeamSectionBody } from "@/components/site/TeamSection";
import ScrollProgressShift from "@/components/shared/animation/ScrollProgressShift";

export default function ProjectsReviewsSection() {
  return (
    <section className="rounded-section relative bg-ochi-gray100">
      <div className="h-full w-full">
        <ScrollProgressShift className="section-shell pb-[15rem] pt-[5rem] lg:pb-[15rem] lg:pt-[9rem]" multiplier={1}>
          <FeaturedProjectsSectionBody />
          <TeamSectionBody />
        </ScrollProgressShift>
      </div>
    </section>
  );
}
