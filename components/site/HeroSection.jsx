import Image from "next/image";
import ScrollProgressShift from "@/components/shared/animation/ScrollProgressShift";
import ArrowUpRightIcon from "@/components/site/ArrowUpRightIcon";
import SiteAwardBadge from "@/components/site/SiteAwardBadge";
import { heroSideImage } from "@/data/siteData";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <ScrollProgressShift
        className="section-shell relative flex h-screen flex-col pb-[9rem] pt-[6rem] md:pb-[12rem] md:pt-[6.5rem] lg:pt-[8rem]"
        multiplier={0.3}
        offset={["start start", "end start"]}
      >
        <SiteAwardBadge />

        <div className="max-w-[101rem]">
          <h1 className="h1 hero-title mb-[6rem] uppercase md:mb-[9rem] lg:mb-[10rem]">
            <span className="hero-title__line">We create</span>
            <span className="hero-title__line hero-title__line--with-image">
              <Image
                src={heroSideImage}
                alt=""
                aria-hidden="true"
                width={130}
                height={84}
                className="hero-inline-image"
                priority
              />
              <span>eye-opening</span>
            </span>
            <span className="hero-title__line">presentations</span>
          </h1>
        </div>

        <div className="outline-top mt-auto py-[1.5rem]">
          <div className="grid items-center gap-y-[3rem] md:grid-cols-12">
            <p className="mb-0 md:col-span-4 lg:col-span-6">Presentation and storytelling agency</p>
            <div className="md:col-span-4 lg:col-span-3">
              <p className="mb-0 max-w-[27.5rem]">For innovation teams and global brands</p>
            </div>
            <div className="md:col-span-4 md:text-right lg:col-span-3">
              <a href="#contact" className="btn btn--icon-outside">
                <span className="btn__text">Start the project</span>
                <span className="btn__icon btn__icon--append" aria-hidden="true">
                  <ArrowUpRightIcon />
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-[5rem] left-0 hidden w-full opacity-30 xl:grid xl:grid-cols-12">
          <div className="xl:col-span-6 xl:col-start-7">
            <div className="scroll-down-indicator">
              <span className="scroll-down-indicator__text">Scroll down</span>
            </div>
          </div>
        </div>
      </ScrollProgressShift>
    </section>
  );
}
