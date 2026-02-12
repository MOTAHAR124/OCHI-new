import ArrowUpRightIcon from "@/components/site/ArrowUpRightIcon";
import SiteAwardBadge from "@/components/site/SiteAwardBadge";
import { heroSideImage } from "@/data/siteData";

export default function HeroSection() {
  return (
    <section className="section-shell relative flex min-h-screen flex-col pb-[9rem] pt-[10rem] md:pb-[12rem] lg:pt-[14rem]">
      <SiteAwardBadge />

      <div className="max-w-[101rem]">
        <h1 className="h1 hero-title leading-negative mb-[6rem] uppercase md:mb-[10rem]">
          We create
          <br />
          <span className="inline-flex items-center gap-[1rem] align-middle md:gap-[1.4rem]">
            <img src={heroSideImage} alt="" aria-hidden="true" className="hero-inline-image my-auto" />
            <span>eye-opening</span>
          </span>
          <br />
          presentations
        </h1>
      </div>

      <div className="outline-top mt-auto py-[1.5rem]">
        <div className="grid items-center gap-y-[3rem] md:grid-cols-12">
          <p className="mb-0 md:col-span-4 lg:col-span-6">Presentation and storytelling agency</p>
          <p className="mb-0 md:col-span-4 lg:col-span-3">For innovation teams and global brands</p>
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
    </section>
  );
}
