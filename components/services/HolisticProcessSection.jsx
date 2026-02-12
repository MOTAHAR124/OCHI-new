"use client";

import Image from "next/image";
import { useState } from "react";
import AccordionHeight from "@/components/shared/animation/AccordionHeight";
import { processPhases } from "@/data/servicesPageData";

export default function HolisticProcessSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <h2 className="mb-[4rem] text-[3.1rem] leading-[1] md:text-[4rem] lg:text-[5.2rem]">Holistic process</h2>
      <div className="outline-bottom mb-[6rem] lg:mb-[10rem]">
        {processPhases.map((phase, index) => {
          const isActive = index === activeIndex;

          return (
            <article key={phase.title} data-accordion-item="" className={isActive ? "is-active" : ""}>
              <div className="outline-top grid grid-cols-12 gap-x-[1rem] py-[1.5rem] leading-[1.5]">
                <div className="col-span-6 lg:col-span-3">
                  <span>{phase.number}</span>
                </div>
                <div className="hidden lg:col-span-3 lg:block accordion-services" />
                <div className="hidden lg:col-span-3 lg:block">
                  <span>{phase.title}</span>
                </div>
                <div className="col-span-6 text-right lg:col-span-3">
                  <button
                    className="uppercase link link--underline bg-transparent"
                    type="button"
                    data-accordion-trigger=""
                    onClick={() => setActiveIndex(index)}
                    aria-expanded={isActive}
                  >
                    Read
                  </button>
                </div>
              </div>

              <AccordionHeight open={isActive} className="accordion-content overflow-hidden">
                <div className="grid gap-y-[3rem] gap-x-[1rem] py-[3rem] lg:grid-cols-12 lg:py-[4.5rem]">
                  <div className="lg:col-span-4 lg:col-start-7">
                    <div className="relative">
                      <p className="mb-[1.5rem] lg:hidden">{phase.title}</p>
                      <div className="mb-[2rem] h-[10rem] w-[10rem] overflow-hidden rounded-[1rem]">
                        <Image
                          src={phase.image}
                          alt={phase.title}
                          width={100}
                          height={100}
                          className="accordion-content-image h-full w-full object-cover rounded-[1rem]"
                          loading="lazy"
                        />
                      </div>
                      <p className="mb-0">{phase.description}</p>
                    </div>
                  </div>
                </div>
              </AccordionHeight>
            </article>
          );
        })}
      </div>
    </div>
  );
}
