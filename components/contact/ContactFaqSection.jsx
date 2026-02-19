"use client";

import { useState } from "react";
import AccordionHeight from "@/components/shared/animation/AccordionHeight";
import { contactFaqItems } from "@/data/contactPageData";

export default function ContactFaqSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="rounded-section relative bg-ochi-gray100">
      <div className="section-shell py-[4.5rem] lg:py-[7.5rem]">
        <h2 className="mb-[4rem]">
          A few things you
          <br />
          may want to ask us:
        </h2>

        <div className="outline-bottom" data-component="accordion">
          {contactFaqItems.map((item, index) => {
            const isOpen = activeIndex === index;

            return (
              <div key={item.question} className={isOpen ? "is-active" : ""} data-accordion-item="">
                <div className="outline-top grid grid-cols-12 gap-x-[1rem] py-[1.5rem] leading-[1.35]">
                  <div className="col-span-6 lg:col-span-3">
                    <span>{item.question}</span>
                  </div>

                  <div className="accordion-services hidden lg:col-span-3 lg:block" />

                  <div className="hidden lg:col-span-3 lg:block">
                    <span>Description:</span>
                  </div>

                  <div className="col-span-6 flex-shrink-0 text-right lg:col-span-3">
                    <button
                      type="button"
                      className="link link--underline inline-flex bg-transparent p-0 uppercase leading-none"
                      onClick={() => setActiveIndex(index)}
                      data-accordion-trigger=""
                    >
                      Read
                    </button>
                  </div>
                </div>

                <AccordionHeight open={isOpen} className="accordion-content overflow-hidden" data-accordion-content="">
                  <div className="grid gap-y-[3rem] gap-x-[1rem] py-[3rem] lg:grid-cols-12 lg:py-[4.5rem]">
                    <div className="lg:col-span-4 lg:col-start-7">
                      <div className="relative">
                        <p className="mb-[1.5rem] lg:hidden">Description:</p>

                        {item.paragraphs?.map((paragraph) => (
                          <p key={`${item.question}-${paragraph}`} className="mb-[1.6rem]">
                            {paragraph}
                          </p>
                        ))}

                        {item.bullets?.length ? (
                          <ol className="list-decimal space-y-[1rem] pl-[2rem]">
                            {item.bullets.map((bullet) => (
                              <li key={`${item.question}-${bullet}`}>{bullet}</li>
                            ))}
                          </ol>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </AccordionHeight>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
