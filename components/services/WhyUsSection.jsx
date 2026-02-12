"use client";

import { useState } from "react";
import AccordionHeight from "@/components/shared/animation/AccordionHeight";
import { whyUsItems } from "@/data/servicesPageData";

function KeyCard({ item, open, onToggle }) {
  return (
    <article
      className={`relative z-[1] flex min-h-[19rem] flex-col overflow-hidden rounded-[1rem] p-[2rem] ${
        open ? "is-active" : ""
      }`}
      data-component="open-close"
    >
      <span className="absolute left-0 top-0 h-full w-full bg-current opacity-[0.08]" />
      <div className="mb-[8rem] flex-grow">
        <h3 className="mb-0 text-[5.2rem] leading-none">{item.number}</h3>
      </div>
      <button
        type="button"
        className="flex items-center justify-between bg-transparent text-left"
        data-accordion-trigger=""
        onClick={onToggle}
        aria-expanded={open}
      >
        <p className="link link--underline mb-0">{item.title}</p>
        <span className="trigger-status uppercase text-[1.4rem] link link--underline">
          <span data-text-show="">READ</span>
          <span data-text-hide="">HIDE</span>
        </span>
      </button>
      <AccordionHeight open={open}>
        <div className="pt-[1.2rem]">
          <div className="outline-top pt-[6rem]">
            <p className="mb-0 opacity-50">{item.description}</p>
          </div>
        </div>
      </AccordionHeight>
    </article>
  );
}

export default function WhyUsSection() {
  const [openStates, setOpenStates] = useState(() => whyUsItems.map(() => false));

  const toggleAt = (index) => {
    setOpenStates((prev) => prev.map((item, idx) => (idx === index ? !item : item)));
  };

  return (
    <section className="rounded-section relative bg-ochi-green py-[5rem] text-ochi-gray100 lg:pt-[8.5rem] lg:pb-[11rem]">
      <div className="h-full w-full overflow-hidden">
        <div className="section-shell">
          <div className="outline-top outline-bottom mb-[1.5rem] py-[1.5rem]">
            <div className="inline-flex whitespace-nowrap crawling-line-large uppercase">
              <div className="inline-block align-top animate-[crawling-line_10s_linear_infinite]">Key Advantages&nbsp;</div>
              <div className="inline-block align-top animate-[crawling-line_10s_linear_infinite]">Key Advantages&nbsp;</div>
              <div className="inline-block align-top animate-[crawling-line_10s_linear_infinite]">Key Advantages&nbsp;</div>
              <div className="inline-block align-top animate-[crawling-line_10s_linear_infinite]">Key Advantages&nbsp;</div>
            </div>
          </div>

          <div className="grid gap-y-[4rem] gap-x-[1rem] md:grid-cols-12">
            <div className="reset-last md:col-span-4 lg:col-span-6">
              <h4>What to expect:</h4>
            </div>

            <div className="md:col-span-8 lg:col-span-6">
              <div className="grid items-start gap-[1.5rem] md:grid-cols-2">
                <div className="grid gap-[1.5rem]">
                  {whyUsItems.slice(0, 3).map((item, index) => (
                    <KeyCard key={item.title} item={item} open={openStates[index]} onToggle={() => toggleAt(index)} />
                  ))}
                </div>
                <div className="grid gap-[1.5rem]">
                  {whyUsItems.slice(3).map((item, offset) => {
                    const idx = offset + 3;
                    return (
                      <KeyCard key={item.title} item={item} open={openStates[idx]} onToggle={() => toggleAt(idx)} />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
