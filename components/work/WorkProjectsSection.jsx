import RoundedSection from "@/components/shared/layout/RoundedSection";
import WorkProjectCard from "@/components/work/WorkProjectCard";
import { workCards } from "@/data/workPageData";

export default function WorkProjectsSection() {
  return (
    <RoundedSection className="bg-ochi-gray100">
      <div className="h-full w-full">
        <div className="section-shell py-[4.5rem] lg:py-[7.5rem]">
          <h2 className="custom-heading mb-[6rem] lg:mb-[7rem]">
            Purpose driven,{" "}
            <span className="link link--underline inline-block">strategy-led presentations</span>
            <br />
            that people care about.
          </h2>

          <div className="mb-[6rem] grid gap-x-[1.5rem] gap-y-[4rem] md:grid-cols-2 xl:gap-y-[5rem] lg:mb-[10rem]">
            {workCards.map((item) => (
              <WorkProjectCard key={`${item.title}-${item.href}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </RoundedSection>
  );
}
