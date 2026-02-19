"use client";

import MouseReactiveEyesSvg from "@/components/shared/animation/MouseReactiveEyesSvg";
import ArrowUpRightIcon from "@/components/site/ArrowUpRightIcon";
import ScrollProgressShift from "@/components/shared/animation/ScrollProgressShift";

export default function ReadyToStartSection({
  withParallax = false,
  startProjectHref = "#contact"
}) {
  const shellPadding = "py-[7rem] md:py-[8.5rem] xl:py-[14rem]";
  const eyesLayerClass =
    "pointer-events-none mb-[4rem] w-full xl:absolute xl:left-0 xl:top-0 xl:z-[2] xl:mb-0 xl:h-[calc(100vh+1.5rem)]";

  return (
    <section className="rounded-section relative bg-ochi-lime">
      <div className="h-full w-full overflow-hidden">
        <ScrollProgressShift className={`section-shell relative ${shellPadding}`} multiplier={1}>
          <div className="text-center">
            <h2 className="heading-large leading-negative mb-[4rem] uppercase">
              Ready
              <br />
              to start
              <br />
              the project?
            </h2>
          </div>

          {withParallax ? (
            <ScrollProgressShift className={eyesLayerClass} multiplier={0.4}>
              <div className="flex h-full w-full items-center justify-center px-[8rem] xl:p-[3rem]">
                <div className="w-full max-w-[36rem]">
                  <MouseReactiveEyesSvg />
                </div>
              </div>
            </ScrollProgressShift>
          ) : (
            <ScrollProgressShift className={eyesLayerClass} multiplier={0}>
              <div className="flex h-full w-full items-center justify-center px-[8rem] xl:p-[3rem]">
                <div className="w-full max-w-[36rem]">
                  <MouseReactiveEyesSvg />
                </div>
              </div>
            </ScrollProgressShift>
          )}

          <div className="grid items-center justify-center gap-y-[1.2rem] text-center">
            <div>
              <a href={startProjectHref} className="btn btn--primary">
                <span className="btn__text">Start the project</span>
                <span className="btn__icon btn__icon--append" aria-hidden="true">
                  <ArrowUpRightIcon />
                </span>
              </a>
            </div>
            <span>OR</span>
            <div>
              <a href="mailto:hello@ochi.design" className="btn btn--default">
                <span className="btn__text">hello@ochi.design</span>
                <span className="btn__icon btn__icon--append" aria-hidden="true">
                  <ArrowUpRightIcon />
                </span>
              </a>
            </div>
          </div>
        </ScrollProgressShift>
      </div>
    </section>
  );
}
