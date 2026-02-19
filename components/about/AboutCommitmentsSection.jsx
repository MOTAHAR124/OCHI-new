"use client";

import { useEffect, useRef } from "react";
import Swiper from "swiper";
import LazyRevealImage from "@/components/shared/animation/LazyRevealImage";
import OchiLogo from "@/components/site/OchiLogo";
import RoundedSection from "@/components/shared/layout/RoundedSection";
import { aboutCommitments } from "@/data/aboutPageData";

function applyTransformElement(settings, slide) {
  if (settings.transformEl) {
    return slide.find(settings.transformEl).css({
      "backface-visibility": "hidden",
      "-webkit-backface-visibility": "hidden"
    });
  }
  return slide;
}

export default function AboutCommitmentsSection() {
  const carouselRef = useRef(null);

  useEffect(() => {
    const holder = carouselRef.current;
    if (!holder) {
      return undefined;
    }

    const isTabletUp = window.innerWidth >= 768;
    const nextButton = holder.querySelector("[data-next-button]");

    const swiper = new Swiper(holder, {
      init: false,
      effect: "cards",
      perspective: true,
      allowTouchMove: false,
      watchSlidesProgress: true,
      virtualTranslate: true,
      loopedSlides: 3,
      preventInteractionOnTransition: false,
      speed: 700,
      loop: true,
      on: {
        setTranslate: (instance) => {
          const { slides } = instance;
          const settings = {
            slideShadows: false,
            transformEl: null
          };

          for (let index = 0; index < slides.length; index += 1) {
            const slide = slides.eq(index);
            const progress = slide[0].progress;
            const limitedProgress = Math.min(Math.max(progress, -4), 4);
            const slideOffset = slide[0].swiperSlideOffset;

            let zIndex = -Math.abs(Math.round(progress)) + slides.length;
            let x = isTabletUp ? 20 * (0 - limitedProgress) - slideOffset : 1 - limitedProgress - slideOffset;
            let y = isTabletUp ? 0 : `${10 * -(0 - limitedProgress)}px`;
            let scale = 1 + 0.05 * limitedProgress;

            if (limitedProgress < 0) {
              x = `${x}px`;
            } else if (limitedProgress > 0) {
              x = `${x}px`;
              y = "200vh";
              scale = 0.5;
              zIndex = slides.length + 1;
            } else {
              x = `${x}px`;
            }

            const normalizedScale = `${
              limitedProgress < 0 ? 1 + (1 - scale) * limitedProgress : 1 - (1 - scale) * limitedProgress
            }`;
            const transform = `translate3d(${x}, ${y}, 0px) scale(${normalizedScale})`;

            slide[0].style.zIndex = zIndex;
            applyTransformElement(settings, slide).transform(transform);
          }
        },
        setTransition: (instance, duration) => {
          instance.slides.transition(duration);

          if (instance.params.virtualTranslate && duration !== 0) {
            let done = false;
            let target = instance.slides.eq(instance.activeIndex);
            target.transitionEnd(() => {
              if (done || !instance || instance.destroyed) {
                return;
              }

              done = true;
              instance.animating = false;
              const events = ["webkitTransitionEnd", "transitionend"];
              for (let idx = 0; idx < events.length; idx += 1) {
                instance.$wrapperEl.trigger(events[idx]);
              }
            });
          }
        }
      }
    });

    const slideNext = () => swiper.slideNext();

    if (nextButton) {
      nextButton.addEventListener("click", slideNext);
    }
    holder.addEventListener("click", slideNext);

    swiper.init();

    return () => {
      if (nextButton) {
        nextButton.removeEventListener("click", slideNext);
      }
      holder.removeEventListener("click", slideNext);
      swiper.destroy(true, true);
    };
  }, []);

  return (
    <RoundedSection className="bg-ochi-green text-white">
      <div className="h-full w-full overflow-hidden">
        <div className="section-shell pb-[7.5rem] pt-[5rem] lg:pb-[11rem] lg:pt-[8.5rem]">
          <div className="outline-top outline-bottom mb-[1.5rem] py-[1.5rem]">
            <div className="crawling-line crawling-line--large inline-flex whitespace-nowrap font-secondary uppercase">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={`commitment-line-${index}`} className="inline-block animate-[crawling-line_10s_linear_infinite] align-top">
                  Our commitments&nbsp;
                </div>
              ))}
            </div>
          </div>

          <div
            ref={carouselRef}
            className="overflow-hidden pb-[3rem] pt-[5rem] md:overflow-visible md:px-[5rem] lg:px-[10rem] lg:pt-[9rem]"
            data-component="stacked-carousel"
            data-cursor="next"
          >
            <div className="swiper-wrapper mb-[4rem] cursor-pointer md:mb-0" data-cursor="next">
              {aboutCommitments.map((item) => {
                const [current, total] = item.position.split("/");

                return (
                  <div key={item.position} className="swiper-slide">
                    <div className="team-member-block rounded bg-ochi-gray100 p-[2rem] text-ochi-gray900">
                      <div className="team-member-block__holder">
                        <div className="mb-[4rem] grid grid-cols-2 md:mb-0">
                          <OchiLogo className="h-auto w-[5rem]" />

                          <div className="flex justify-end">
                            <div className="member-box">
                              <div className="z-[1] mb-[1rem] w-full overflow-hidden rounded lg:mb-[1.5rem]">
                                <LazyRevealImage
                                  src={item.image}
                                  alt=""
                                  width={304}
                                  height={330}
                                  className="max-w-full bg-ochi-gray200 object-cover object-top"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-end justify-between">
                          <div className="max-w-[80%] flex-grow">
                            <h3 className="font-secondary mb-0 overflow-hidden overflow-ellipsis whitespace-nowrap text-[4.4rem] font-semibold uppercase leading-negative md:text-[6.4rem] lg:text-[9rem]">
                              {item.titleLine1} <br />
                              {item.titleLine2}
                            </h3>
                          </div>

                          <div className="flex-shrink-0">
                            <p className="font-secondary mb-0 grid grid-flow-col gap-x-[2px] text-[4.4rem] font-semibold uppercase leading-negative md:gap-x-[0.5rem] md:text-[6.4rem] lg:text-[9rem]">
                              <span>{current}</span>
                              <span>/</span>
                              <span>{total}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="relative z-[5] flex justify-center md:hidden">
              <button
                className="h-[11rem] w-[11rem] rounded-full bg-ochi-lime text-[1.4rem] uppercase text-ochi-gray900"
                data-next-button=""
                type="button"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </RoundedSection>
  );
}
