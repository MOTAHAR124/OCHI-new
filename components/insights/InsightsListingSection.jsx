"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { insightArticles, insightCategories, insightCategoryLabels } from "@/data/insightsPageData";

export default function InsightsListingSection() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredArticles = useMemo(() => {
    if (activeCategory === "all") {
      return insightArticles;
    }
    return insightArticles.filter((item) => item.categories.includes(activeCategory));
  }, [activeCategory]);

  return (
    <section className="rounded-section relative bg-ochi-gray100">
      <div className="section-shell pb-[9rem] pt-[10rem] lg:pb-[10rem] lg:pt-[14rem]">
        <h1 className="mb-[6rem] uppercase leading-negative xl:mb-[9rem]">Insights</h1>

        <div className="outline-top pt-[1.5rem]" data-component="filter">
          <div className="mb-[4rem] grid gap-y-[3rem] md:grid-cols-12 xl:mb-[10rem]">
            <div className="md:col-span-4 xl:col-span-6">
              <p className="mb-0">Latest insights:</p>
            </div>

            <div className="-mb-[1.5rem] overflow-auto pb-[1.5rem] md:col-span-8 md:whitespace-normal md:overflow-visible xl:col-span-6">
              <div className="-mb-[1rem] flex whitespace-nowrap md:flex-wrap">
                {insightCategories.map((category) => {
                  const isActive = activeCategory === category.id;
                  return (
                    <div key={category.id} className="mb-[1rem] mr-[1rem]">
                      <button
                        type="button"
                        className={`btn btn--default btn--small${isActive ? " is-active" : ""}`}
                        onClick={() => setActiveCategory(category.id)}
                      >
                        <span className="btn__text">{category.label}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="relative" data-filter-content="">
            <div className="grid gap-x-[1rem] gap-y-[4rem] sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xl:gap-y-[10rem]">
            {filteredArticles.map((item) => (
              <a
                key={item.href}
                className="group group--no-events block"
                href={item.href}
                target="_blank"
                rel="noreferrer"
              >
                <div className="relative z-[1] mb-[2rem] overflow-hidden rounded bg-ochi-gray200 text-ochi-lime">
                  <span className="absolute left-0 top-0 z-[1] h-1/2 w-full bg-gradient-to-b from-black to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-50" />

                  <div className="absolute left-0 top-0 z-[2] flex w-full flex-wrap justify-start p-[2rem] -translate-y-full transition-transform duration-500 group-hover:translate-y-0">
                    {item.categories.map((category) => (
                      <div
                        key={`${item.href}-${category}`}
                        className="mb-[0.5rem] mr-[0.5rem]"
                      >
                        <button
                          className="btn btn--current btn--small pointer-events-none flex-shrink-0"
                          type="button"
                        >
                          <span className="btn__text">{insightCategoryLabels[category]}</span>
                        </button>
                      </div>
                    ))}
                  </div>

                  <Image
                    src={item.image}
                    alt={item.title}
                    width={item.width}
                    height={item.height}
                    sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="h-auto w-full max-w-full rounded object-top transition-transform duration-400 group-hover:scale-110 group-hover:duration-700"
                    loading="lazy"
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

            {!filteredArticles.length ? (
              <div className="news-empty-message py-[3rem]">
                <p>No insights found for this category.</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
