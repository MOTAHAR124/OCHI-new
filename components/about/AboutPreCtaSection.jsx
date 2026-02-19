"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import LazyRevealImage from "@/components/shared/animation/LazyRevealImage";
import ScrollProgressShift from "@/components/shared/animation/ScrollProgressShift";
import ArrowUpRightIcon from "@/components/site/ArrowUpRightIcon";
import RoundedSection from "@/components/shared/layout/RoundedSection";
import {
  aboutFounders,
  aboutInsights,
  aboutRewardCards,
  aboutTestimonials
} from "@/data/aboutPageData";

gsap.registerPlugin(Draggable, InertiaPlugin);

export default function AboutPreCtaSection() {
  const railRef = useRef(null);

  useEffect(() => {
    const holder = railRef.current;
    if (!holder) {
      return undefined;
    }

    const draggableTrack = holder.querySelector("[data-draggable]");
    const scrollbar = holder.querySelector("[data-swiper-scrollbar]");
    const scrollbarThumb = holder.querySelector(".swiper-scrollbar-drag");

    if (!draggableTrack || !scrollbar || !scrollbarThumb) {
      return undefined;
    }

    let thumbWidthPercent = 100;
    let thumbTravelXPercent = 0;

    const syncScrollbar = function syncScrollbar() {
      if (thumbWidthPercent >= 100) {
        gsap.set(scrollbarThumb, { xPercent: 0 });
        return;
      }

      const progress = gsap.utils.normalize(this.maxX, this.minX, this.x);
      const xPercent = gsap.utils.mapRange(0, 1, 0, thumbTravelXPercent, progress);
      gsap.set(scrollbarThumb, { xPercent: Number.isFinite(xPercent) ? xPercent : 0 });
    };

    const [draggable] = Draggable.create(draggableTrack, {
      type: "x",
      bounds: holder,
      inertia: true,
      edgeResistance: 0.65,
      onPress: () => {
        holder.classList.remove("cursor-grab");
        holder.classList.add("cursor-grabbing");
      },
      onRelease: () => {
        holder.classList.remove("cursor-grabbing");
        holder.classList.add("cursor-grab");
      },
      onDrag: syncScrollbar,
      onThrowUpdate: syncScrollbar,
      onDragEnd: syncScrollbar
    });

    const updateRailMetrics = () => {
      const { width: trackWidth } = draggableTrack.getBoundingClientRect();
      const { width: scrollbarWidth } = scrollbar.getBoundingClientRect();
      const { width: containerWidth } = holder.getBoundingClientRect();

      thumbWidthPercent = Math.max(0, Math.min(100, (containerWidth / trackWidth) * 100));
      thumbTravelXPercent =
        thumbWidthPercent >= 100 ? 0 : (scrollbarWidth / ((scrollbarWidth * thumbWidthPercent) / 100)) * 100 - 100;
      gsap.set(scrollbarThumb, { width: `${thumbWidthPercent}%` });

      draggable.applyBounds(holder);
      draggable.update(true);
      syncScrollbar.call(draggable);
    };

    updateRailMetrics();
    window.addEventListener("resize", updateRailMetrics);

    return () => {
      window.removeEventListener("resize", updateRailMetrics);
      holder.classList.remove("cursor-grabbing");
      holder.classList.add("cursor-grab");
      draggable.kill();
    };
  }, []);

  return (
    <RoundedSection className="bg-ochi-gray100">
      <div className="h-full w-full">
        <ScrollProgressShift
          className="section-shell py-[7rem] md:py-[8.5rem] xl:py-[14rem]"
          multiplier={0.55}
          offset={["start end", "end start"]}
        >
          <div className="mb-[9rem] lg:mb-[14rem]">
            <h2 className="mb-[4rem] lg:mb-[5rem] lg:max-w-[80%] xl:max-w-[60%]">
              A world-class creative duo, backed by a team without borders.
            </h2>

            <div className="outline-top pt-[5rem]">
              <div className="grid gap-x-[1.5rem] gap-y-[3.5rem] md:grid-cols-2">
                {aboutFounders.map((founder) => (
                  <div key={founder.name} className="featured-project relative">
                    <div className="featured-project__preview relative mb-[1.5rem] block overflow-hidden rounded-[1rem] md:overflow-visible">
                      <div className="featured-project__media origin-center overflow-hidden rounded-[1rem] transition-transform duration-500">
                        <LazyRevealImage
                          src={founder.image}
                          alt={founder.name}
                          width={663}
                          height={551}
                          className="featured-project__image w-full max-w-full rounded-[1rem] bg-ochi-gray200 transition-transform duration-500"
                        />
                      </div>
                    </div>
                    <p className="mb-0 max-w-[32rem]">{founder.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-[6rem] lg:mb-[10rem]">
            <h2 className="mb-[4rem] lg:mb-[5rem] lg:max-w-[80%] xl:max-w-[60%]">
              We&apos;ve built long-lasting partnerships with the most ambitious brands across the globe:
            </h2>

            <div className="outline-top">
              <div
                ref={railRef}
                className="-mx-[2rem] cursor-grab"
                data-component="drag-carousel"
                data-cursor="drag"
              >
                <div className="inline-flex" data-draggable="">
                  {aboutTestimonials.map((item) => (
                    <div key={item.company} className="mx-[2rem] w-[25rem] md:w-[30.5rem]">
                      <div className="flex flex-col py-[4rem] lg:py-[10rem]">
                        <div className="mb-[4rem] flex h-[7rem] w-full items-center">
                          <LazyRevealImage
                            src={item.logo}
                            alt={`${item.company} logo`}
                            width={item.logoWidth}
                            height={item.logoHeight}
                            className="max-h-full bg-ochi-gray200 object-contain object-left"
                          />
                        </div>
                        <h4 className="mb-[1rem] underline">{item.company}</h4>
                        <p className="mb-0">{item.quote}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="px-[2rem] md:grid md:grid-cols-12">
                  <div className="md:col-span-6 md:col-start-4" data-swiper-scrollbar="">
                    <div className="swiper-scrollbar-drag" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-[9rem] grid gap-[1.5rem] sm:grid-cols-12 lg:mb-[14rem]">
            <div className="review-reward-card review-reward-card--green pointer-events-none sm:col-span-12 lg:col-span-4 xl:col-span-6">
              <div className="review-reward-card__logo-wrap">
                <LazyRevealImage
                  src={aboutRewardCards.greenLogo}
                  alt="Ochi reward"
                  width={150}
                  height={150}
                  className="review-reward-card__logo review-reward-card__logo--large"
                />
              </div>
              <div className="review-reward-card__footer">
                <span className="review-reward-pill review-reward-pill--green">&copy;2019-2025</span>
              </div>
            </div>

            <a
              className="review-reward-card review-reward-card--dark sm:col-span-6 lg:col-span-4 xl:col-span-3"
              href="https://clutch.co/profile/ochi-presentation-design"
              target="_blank"
              rel="noreferrer"
            >
              <div className="review-reward-card__logo-wrap">
                <LazyRevealImage
                  src={aboutRewardCards.clutchLogo}
                  alt="Clutch"
                  width={150}
                  height={150}
                  className="review-reward-card__logo"
                />
              </div>
              <div className="review-reward-card__footer">
                <span className="btn btn--inverse btn--small review-reward-pill review-reward-pill--light">
                  <span className="btn__text">Rating 5.0 on Clutch</span>
                </span>
              </div>
            </a>

            <a
              className="review-reward-card review-reward-card--dark sm:col-span-6 lg:col-span-4 xl:col-span-3"
              href="https://thefutur.com/alumni"
              target="_blank"
              rel="noreferrer"
            >
              <div className="review-reward-card__logo-wrap">
                <LazyRevealImage
                  src={aboutRewardCards.alumniLogo}
                  alt="Business bootcamp alumni"
                  width={102}
                  height={104}
                  className="review-reward-card__logo review-reward-card__logo--small"
                />
              </div>
              <div className="review-reward-card__footer">
                <span className="btn btn--inverse btn--small review-reward-pill review-reward-pill--light">
                  <span className="btn__text">Business Bootcamp Alumni</span>
                </span>
              </div>
            </a>
          </div>

          <div className="mb-[6rem] lg:mb-[10rem]">
            <div className="lg:max-w-[80%] xl:max-w-[60%]">
              <h2>Insights</h2>
            </div>

            <div className="outline-top pt-[1.5rem]">
              <div className="mb-[6rem] grid gap-x-[1rem] gap-y-[4rem] lg:mb-0 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <h4 className="mb-0 lg:mb-[3rem]">Latest publications:</h4>
                  <div className="hidden lg:block">
                    <a className="btn btn--primary" href="/insights">
                      <span className="btn__text">All Insights</span>
                      <span className="btn__icon btn__icon--append" aria-hidden="true">
                        <ArrowUpRightIcon />
                      </span>
                    </a>
                  </div>
                </div>

                <div className="grid gap-x-[1rem] gap-y-[4rem] sm:grid-cols-3 lg:col-span-8">
                  {aboutInsights.map((item) => (
                    <a
                      key={item.href}
                      className="group group--no-events block"
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div className="relative z-[1] mb-[2rem] overflow-hidden rounded bg-ochi-gray200 text-ochi-lime">
                        <span className="absolute left-0 top-0 z-[1] h-1/2 w-full bg-gradient-to-b from-black to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-50" />

                        <div className="absolute left-0 top-0 z-[2] flex w-full -translate-y-full flex-wrap justify-start p-[2rem] transition-transform duration-500 group-hover:transform-none">
                          {item.categories.map((category) => (
                            <div key={`${item.href}-${category}`} className="mb-[0.5rem] mr-[0.5rem]">
                              <button
                                className="btn btn--current btn--small pointer-events-none flex-shrink-0"
                                type="button"
                              >
                                <span className="btn__text">{category}</span>
                              </button>
                            </div>
                          ))}
                        </div>

                        <LazyRevealImage
                          src={item.image}
                          alt={item.title}
                          width={item.width}
                          height={item.height}
                          className="w-full max-w-full rounded bg-ochi-gray200 object-top transition-transform duration-400 group-hover:scale-110 group-hover:duration-700"
                        />
                      </div>

                      <div className="pr-[3rem]">
                        <h3 className="mb-[1rem]">{item.title}</h3>
                        <div className="opacity-50">
                          <h4 className="mb-0">
                            By <u>{item.author}</u>
                          </h4>
                          <h4 className="mb-0">{item.date}</h4>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex justify-center lg:hidden">
                <a className="btn btn--primary" href="/insights">
                  <span className="btn__text">All Insights</span>
                  <span className="btn__icon btn__icon--append" aria-hidden="true">
                    <ArrowUpRightIcon />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </ScrollProgressShift>
      </div>
    </RoundedSection>
  );
}
