"use client";

import MouseReactiveEyesSvg from "@/components/shared/animation/MouseReactiveEyesSvg";
import LazyRevealImage from "@/components/shared/animation/LazyRevealImage";
import ScrollProgressShift from "@/components/shared/animation/ScrollProgressShift";
import ArrowUpRightIcon from "@/components/site/ArrowUpRightIcon";
import RoundedSection from "@/components/shared/layout/RoundedSection";
import { aboutHeroData } from "@/data/aboutPageData";

export default function AboutHeroSection() {
  return (
    <RoundedSection className="bg-ochi-gray100">
      <div className="h-full w-full">
        <div className="section-shell pb-[3.5rem] pt-[35px] lg:pb-[6.5rem] lg:pt-[75px]">
          <h1 className="mb-[6rem] uppercase leading-negative lg:mb-[14rem]">
            <span className="about-hero-line">{aboutHeroData.titleTop}</span>
            <span className="about-hero-line">
              <span className="about-hero-image-wrap">
                <LazyRevealImage
                  src={aboutHeroData.inlineImage}
                  alt=""
                  fill
                  sizes="20vw"
                  className="about-hero-image"
                  priority
                />
              </span>
              <span className="about-hero-title-bottom">{aboutHeroData.titleBottom}</span>
            </span>
          </h1>

          <div className="outline-top mb-[9rem] grid gap-y-[3rem] py-[1.5rem] md:grid-cols-12">
            <div className="md:col-span-4 lg:col-span-6">
              <p>{aboutHeroData.aboutLabel}</p>
            </div>

            <div className="md:col-span-4 lg:col-span-3">
              <div className="max-w-[27.5rem]">
                {aboutHeroData.aboutParagraphs.map((paragraph, index) => (
                  <p key={paragraph} className={index === 0 ? "mb-[3rem]" : "mb-0"}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="md:col-span-4 md:text-right lg:col-span-3">
              <a href={aboutHeroData.ctaHref} className="btn btn--icon-outside">
                <span className="btn__text">{aboutHeroData.ctaLabel}</span>
                <span className="btn__icon btn__icon--append" aria-hidden="true">
                  <ArrowUpRightIcon />
                </span>
              </a>
            </div>
          </div>

          <ScrollProgressShift
            className="mb-[9rem] flex justify-center lg:mb-[10rem]"
            multiplier={-0.1}
            offset={["start end", "end start"]}
          >
            <div className="mx-auto w-full max-w-[65rem]" data-scroll-call="eyes">
              <MouseReactiveEyesSvg withStroke strokeColor="rgba(0, 0, 0, 0.2)" />
            </div>
          </ScrollProgressShift>

          <div className="mb-[5rem]">
            <div className="max-w-[90rem]">
              <h2 className="custom-heading">{aboutHeroData.heading}</h2>
            </div>
          </div>

          <div className="outline-top mb-[5rem] grid gap-y-[3rem] py-[1.5rem] lg:mb-[9rem] md:grid-cols-12">
            <div className="md:col-span-4 lg:col-span-6">
              <p>{aboutHeroData.valuesLabel}</p>
            </div>

            <div className="md:col-span-4 lg:col-span-3">
              <div className="max-w-[27.5rem]">
                {aboutHeroData.valuesParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-[6rem] lg:mb-[10rem]">
            <div className="relative z-[1] flex min-h-[40rem] w-full overflow-hidden rounded-[1rem]">
              <ScrollProgressShift
                className="relative h-full w-full will-change-transform"
                multiplier={-0.2}
                offset={["start end", "end start"]}
              >
                <LazyRevealImage
                  src={aboutHeroData.heroImage}
                  alt="Ochi team"
                  width={1340}
                  height={858}
                  className="about-hero-photo h-full w-full max-w-full bg-ochi-gray200 object-cover"
                  priority
                />
              </ScrollProgressShift>
            </div>
          </div>
        </div>
      </div>
    </RoundedSection>
  );
}
