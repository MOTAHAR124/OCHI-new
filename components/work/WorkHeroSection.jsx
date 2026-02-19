"use client";

import MouseReactiveEyesSvg from "@/components/shared/animation/MouseReactiveEyesSvg";
import RoundedSection from "@/components/shared/layout/RoundedSection";
import { workHero } from "@/data/workPageData";

export default function WorkHeroSection() {
  return (
    <RoundedSection className="bg-ochi-lime">
      <div className="h-full w-full overflow-hidden">
        <div className="section-shell pt-[9rem] lg:pt-[14rem]">
          <h1 className="mb-[1rem] uppercase leading-negative md:mb-[4rem]">
            {workHero.title}{" "}
            <sup className="font-primary relative ml-[0.12em] inline-flex align-top translate-y-[0.9em] text-[0.16em] font-thin leading-none">
              <span>({workHero.count})</span>
            </sup>
          </h1>

          <div className="relative flex justify-center px-[3rem]">
            <div className="w-full max-w-[65rem] translate-y-[30%] md:translate-y-[10%]">
              <MouseReactiveEyesSvg />
            </div>

            <div className="pointer-events-none absolute bottom-0 left-0 right-0">
              <span className="absolute left-0 right-0 top-full mx-auto -mt-[3.5rem] block h-[10rem] w-5/6 rounded bg-[#bfda62] md:-mt-[9.5rem]" />
              <span className="absolute left-0 right-0 top-full mx-auto -mt-[2.5rem] block h-[10rem] w-full rounded bg-[#b8d25e] md:-mt-[5.5rem]" />
            </div>
          </div>
        </div>
      </div>
    </RoundedSection>
  );
}
