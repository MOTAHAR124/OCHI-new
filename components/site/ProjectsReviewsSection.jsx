import ScrollProgressShift from "@/components/shared/animation/ScrollProgressShift";
import { FeaturedProjectsSectionBody } from "@/components/site/FeaturedProjectsSection";
import { TeamSectionBody } from "@/components/site/TeamSection";

export default function ProjectsReviewsSection() {
  return (
    <section className="rounded-section relative bg-ochi-gray100">
      <div className="h-full w-full">
        <ScrollProgressShift
          className="section-shell pb-[12rem] pt-[4.8rem] lg:pb-[15rem] lg:pt-[7.4rem]"
          multiplier={1}
          offset={["end end", "end start"]}
        >
          <FeaturedProjectsSectionBody />
          <TeamSectionBody />
        </ScrollProgressShift>
      </div>
    </section>
  );
}
