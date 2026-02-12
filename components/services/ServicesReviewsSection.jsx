"use client";

import Image from "next/image";
import { useState } from "react";
import ArrowUpRightIcon from "@/components/site/ArrowUpRightIcon";
import AccordionHeight from "@/components/shared/animation/AccordionHeight";
import { serviceNumbers, serviceReviewRows } from "@/data/servicesPageData";

export default function ServicesReviewsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="rounded-section relative bg-ochi-gray100 py-[4.5rem] lg:py-[7.5rem]">
      <div className="section-shell">
        <h2 className="mb-[4rem] text-[3.1rem] leading-[1] md:text-[4rem] lg:text-[5.2rem]">Clients&apos; reviews</h2>

        <div className="outline-bottom mb-[6rem] lg:mb-[10rem]">
          {serviceReviewRows.map((review, index) => {
            const isActive = activeIndex === index;

            return (
              <article key={review.company} data-accordion-item="" className={isActive ? "is-active" : ""}>
                <div className="outline-top grid grid-cols-12 gap-x-[1rem] py-[1.5rem] leading-[1.5]">
                  <div className="col-span-6 lg:col-span-3">
                    <a
                      href={review.href || ""}
                      target="_blank"
                      rel="noreferrer"
                      className="link link--underline transition duration-300 hover:translate-x-[1rem]"
                    >
                      {review.company}
                    </a>
                  </div>
                  <div className="hidden lg:col-span-3 lg:block accordion-services">{isActive ? <span>Services:</span> : null}</div>
                  <div className="hidden lg:col-span-3 lg:block">
                    <span>{review.reviewer}</span>
                  </div>
                  <div className="col-span-6 text-right lg:col-span-3">
                    <button
                      type="button"
                      className="uppercase link link--underline bg-transparent"
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
                    <div className="lg:col-span-3 lg:col-start-4">
                      <p className="mb-[1.5rem] lg:hidden">Services:</p>
                      <div className="flex flex-wrap items-start justify-start -mb-[1rem] lg:flex-col">
                        {review.services.map((service) => (
                          <div key={`${review.company}-${service}`} className="mr-[1rem] mb-[1rem]">
                            <a href="/services" className="btn btn--icon-outside-hidden btn--small">
                              <span className="btn__text">{service}</span>
                              <span className="btn__icon btn__icon--append" aria-hidden="true">
                                <ArrowUpRightIcon />
                              </span>
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-4 lg:col-start-7">
                      <div className="relative">
                        <p className="mb-[1.5rem] lg:hidden">{review.reviewer}</p>
                        <div className="mb-[2rem] h-[10rem] w-[10rem] overflow-hidden rounded-[1rem]">
                          <Image
                            src={review.avatar}
                            alt={review.reviewer}
                            width={100}
                            height={100}
                            className="accordion-content-image h-full w-full object-cover rounded-[1rem]"
                            loading="lazy"
                          />
                        </div>
                        <p className="mb-0">{review.quote}</p>
                      </div>
                    </div>
                  </div>
                </AccordionHeight>
              </article>
            );
          })}
        </div>

        <div className="outline-top pt-[1.5rem]">
          <div className="grid gap-y-[4rem] md:grid-cols-12">
            <div className="md:col-span-4 lg:col-span-6">
              <p className="mb-0">Ochi in numbers:</p>
            </div>
            <div className="md:col-span-8 lg:col-span-6">
              <div className="grid gap-[1.5rem] md:grid-cols-2">
                {serviceNumbers.map((item) => (
                  <article
                    key={item.label}
                    className="relative z-[1] flex min-h-[19rem] flex-col overflow-hidden rounded-[1rem] p-[2rem]"
                  >
                    <span className="absolute left-0 top-0 h-full w-full bg-current opacity-[0.08]" />
                    <div className="mb-[8rem] flex-grow">
                      <h3 className="mb-0 text-[5.2rem] leading-none">{item.value}</h3>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="mb-0">{item.label}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
