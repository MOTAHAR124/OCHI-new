import ArrowUpRightIcon from "@/components/site/ArrowUpRightIcon";
import SiteAwardBadge from "@/components/site/SiteAwardBadge";
import { heroSideImage } from "@/data/siteData";

export default function HeroSection() {
  return (
    <section className="section-shell relative flex min-h-screen flex-col pt-[4rem] md:pt-[6.4rem]">
      <SiteAwardBadge />

      <div>
        <div className="max-w-[101rem] overflow-hidden">
          <h1 className="h1 hero-title leading-negative uppercase">we create</h1>
        </div>

        <div className="flex max-w-[101rem] items-center gap-[1rem] overflow-hidden md:gap-[1.4rem]">
          <img src={heroSideImage} alt="" aria-hidden="true" className="hero-inline-image my-auto" />
          <h1 className="h1 hero-title leading-negative uppercase">eye-opening</h1>
        </div>

        <div className="max-w-[101rem] overflow-hidden">
          <h1 className="h1 hero-title leading-negative uppercase">presentations</h1>
        </div>
      </div>

      <div className="outline-top mt-[7rem] pt-[0.8rem] pb-[2.4rem] md:mt-[10rem]">
        <div className="grid items-center gap-y-[1.2rem] md:grid-cols-12">
          <p className="mb-0 md:col-span-4 lg:col-span-6">Presentation and storytelling agency</p>
          <p className="mb-0 md:col-span-4 lg:col-span-3">For innovation teams and global brands</p>
          <div className="md:col-span-4 md:flex md:justify-end lg:col-span-3">
            <a href="#contact" className="btn btn--icon-outside">
              <span className="btn__text">Start the project</span>
              <span className="btn__icon btn__icon--append" aria-hidden="true">
                <ArrowUpRightIcon />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
