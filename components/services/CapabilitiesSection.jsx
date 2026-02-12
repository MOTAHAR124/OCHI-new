"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import ArrowUpRightIcon from "@/components/site/ArrowUpRightIcon";
import { capabilityGroups, serviceDetails } from "@/data/servicesPageData";

function ServicePopup({ serviceName, onClose }) {
  const details = serviceDetails[serviceName];

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  if (!details) {
    return null;
  }

  return (
    <div
      className="fixed left-0 top-0 z-[200] flex h-full w-full items-center justify-center p-[2rem] popup--large is-active"
      data-component="popup"
    >
      <button type="button" className="absolute left-0 top-0 h-full w-full bg-ochi-gray900/80" onClick={onClose} aria-label="Close popup" />
      <div className="popup-scroller rounded-[1.5rem] bg-ochi-gray100 max-h-full w-full overflow-y-auto overflow-x-hidden p-[2rem]">
        <div className="mb-[5rem] flex items-center justify-between">
          <span className="flex-grow">
            <u>{details.title}</u>
          </span>
          <button
            type="button"
            className="flex flex-shrink-0 cursor-pointer text-[2rem] leading-none"
            onClick={onClose}
            aria-label="Close"
          >
            <span className="icon-cross" aria-hidden="true" />
          </button>
        </div>

        <div className="reset-last">
          {(details.paragraphs || [details.description]).filter(Boolean).map((paragraph) => (
            <p key={`${details.title}-${paragraph.slice(0, 24)}`} className="mb-[3rem]">
              {paragraph}
            </p>
          ))}

          {details.projects.length ? (
            <div className="mt-[5rem] outline-top pt-[1.5rem]">
              <p className="mb-[2.5rem]">Projects:</p>
              <div className="flex flex-col items-start">
                {details.projects.map((project) => (
                  <div key={`${details.title}-${project.title}`} className="mb-[1rem]">
                    <a href={project.href || "/services"} className="btn btn--icon-outside-hidden">
                      <span className="btn__text">{project.title}</span>
                      <span className="btn__icon btn__icon--append" aria-hidden="true">
                        <ArrowUpRightIcon />
                      </span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function CapabilityBlock({ block, activePreview, onPreviewEnter, onPreviewLeave, onOpenService }) {
  return (
    <div data-component="hover-thumbnail">
      <div className="grid md:grid-cols-12">
        <div className="relative hidden xl:col-span-4 xl:block">
          <div
            className="relative z-[1] h-[15rem] w-[21rem] overflow-hidden rounded-[1rem] md:absolute md:left-0 md:top-0"
            data-image-container=""
          >
            <AnimatePresence mode="sync">
              {activePreview ? (
                <motion.div
                  key={activePreview.id}
                  className="absolute left-0 top-0 h-full w-full"
                  initial={{ clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" }}
                  animate={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
                  exit={{ clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)" }}
                  transition={{ duration: 0.4, ease: "circInOut" }}
                >
                  <Image src={activePreview.image} alt="" fill sizes="21rem" className="h-full w-full object-cover" />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
        <div className="md:col-span-12 xl:col-span-8">
          <div className="grid gap-x-[4rem] gap-y-[4rem] md:grid-cols-2">
            {block.columns.map((column) => (
              <div key={column.title}>
                <p className="mb-[2rem] flex items-center text-[1.4rem] uppercase">
                  <span className="mr-[0.8rem] h-[1rem] w-[1rem] rounded-full bg-current" />
                  <span>{column.title}</span>
                </p>
                <div className="flex flex-col items-start">
                  {column.items.map((item, itemIndex) => {
                    const previewId = `${column.title}-${item.title}-${itemIndex}`;

                    return (
                      <div
                        key={`${column.title}-${item.title}`}
                        className="pb-[1rem]"
                        data-hover-image={item.hoverImage}
                        onMouseEnter={() => onPreviewEnter(previewId, item.hoverImage)}
                        onMouseLeave={onPreviewLeave}
                      >
                        <button
                          className="btn btn--icon-outside-hidden"
                          type="button"
                          onMouseEnter={() => onPreviewEnter(previewId, item.hoverImage)}
                          onMouseLeave={onPreviewLeave}
                          onFocus={() => onPreviewEnter(previewId, item.hoverImage)}
                          onBlur={onPreviewLeave}
                          onClick={() => onOpenService(item.title)}
                        >
                          <span className="btn__text">{item.title}</span>
                          <span className="btn__icon btn__icon--append" aria-hidden="true">
                            <ArrowUpRightIcon />
                          </span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CapabilitiesSection() {
  const [activeService, setActiveService] = useState("");
  const [previewByBlock, setPreviewByBlock] = useState(capabilityGroups.map(() => null));

  const setPreview = (index, preview) => {
    setPreviewByBlock((prev) => prev.map((item, idx) => (idx === index ? preview : item)));
  };

  return (
    <section className="rounded-section relative bg-ochi-lime py-[6rem] lg:py-[10rem]">
      <div className="section-shell">
        <div className="mb-[6rem] max-w-[115rem]">
          <h2 className="mb-0 text-[3.1rem] leading-[1] md:text-[4rem] lg:text-[5.2rem]">
            <span className="link link--underline">Let&apos;s be honest.</span> There are really no excuses to have a
            bad presentation anymore. No one has time for poorly communicated ideas. Focus on what you do best &mdash;
            growing your business, while we do our best at{" "}
            <span className="link link--underline">making your presentations awesome</span>.
          </h2>
        </div>

        <div className="outline-top mb-[7rem] grid gap-y-[4rem] pt-[1.5rem] md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="mb-0">Our Capabilities:</p>
          </div>
          <div className="md:col-span-9 grid gap-y-[4rem] xl:gap-y-[7rem]">
            {capabilityGroups.map((block, index) => (
              <CapabilityBlock
                key={`capability-block-${index}`}
                block={block}
                activePreview={previewByBlock[index]}
                onPreviewEnter={(id, image) => setPreview(index, { id, image })}
                onPreviewLeave={() => setPreview(index, null)}
                onOpenService={(serviceName) => setActiveService(serviceName)}
              />
            ))}
          </div>
        </div>
      </div>

      {activeService ? <ServicePopup serviceName={activeService} onClose={() => setActiveService("")} /> : null}
    </section>
  );
}
