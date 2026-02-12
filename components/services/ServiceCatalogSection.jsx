"use client";

import Image from "next/image";
import { useState } from "react";
import AccordionHeight from "@/components/shared/animation/AccordionHeight";
import RevealInView from "@/components/shared/animation/RevealInView";
import { serviceCatalog } from "@/data/servicesPageData";

export default function ServiceCatalogSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="section-shell pb-[10rem] md:pb-[12rem]">
      <RevealInView>
        <h2 className="mb-[4rem] text-[3.1rem] leading-[1] md:text-[4rem] lg:text-[5.2rem]">Service catalog:</h2>
      </RevealInView>

      <div className="outline-bottom">
        {serviceCatalog.map((service, index) => {
          const isActive = index === activeIndex;

          return (
            <article
              key={service.title}
              data-accordion-item=""
              className={`outline-top ${isActive ? "is-active" : ""}`}
            >
              <button
                type="button"
                data-accordion-trigger=""
                className="grid w-full grid-cols-12 items-start gap-x-[1rem] bg-transparent py-[2rem] text-left"
                onClick={() => setActiveIndex(index)}
              >
                <span className="col-span-2 text-[1.2rem] uppercase text-black/45">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="col-span-8 text-[2.4rem] leading-[1] md:col-span-9 md:text-[3.2rem]">
                  {service.title}
                </span>
                <span
                  data-component="open-close"
                  className={`col-span-2 text-right text-[2.1rem] leading-none ${isActive ? "is-active" : ""}`}
                  aria-hidden="true"
                >
                  <span className="trigger-status ml-auto">
                    <span data-text-show>+</span>
                    <span data-text-hide>-</span>
                  </span>
                </span>
              </button>

              <AccordionHeight open={isActive} className="overflow-hidden">
                <div className="accordion-services pb-[2.8rem]">
                  <div className="grid gap-y-[2.2rem] md:grid-cols-12">
                    <div className="md:col-span-9 md:col-start-3">
                      <p className="mb-[2rem] max-w-[86rem] text-[1.9rem] leading-[1.32] text-black/82">
                        {service.summary}
                      </p>
                      <div className="flex flex-wrap -mb-[1rem] items-start pb-[1.4rem]">
                        {service.tags.map((tag) => (
                          <div key={`${service.title}-${tag}`} className="mb-[1rem] mr-[1rem]">
                            <span className="btn btn--small btn--default">
                              <span className="btn__text">{tag}</span>
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="grid gap-[1.5rem] md:grid-cols-3">
                        {service.projects.map((project) => (
                          <article
                            key={`${service.title}-${project.title}`}
                            className="group relative overflow-hidden rounded-[1rem] bg-ochi-gray900 text-ochi-gray100"
                          >
                            <div className="relative aspect-[1.15/1] overflow-hidden">
                              <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                sizes="(min-width: 768px) 28vw, 100vw"
                                className="service-card__image object-cover opacity-80 transition-transform duration-700"
                                loading="lazy"
                              />
                            </div>
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-b from-transparent to-black/70 p-[1.6rem]">
                              <p className="mb-0 text-[1.6rem] leading-none">{project.title}</p>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionHeight>
            </article>
          );
        })}
      </div>
    </section>
  );
}
