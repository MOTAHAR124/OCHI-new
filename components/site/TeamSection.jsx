"use client";

import Image from "next/image";
import { useState } from "react";
import ArrowUpRightIcon from "@/components/site/ArrowUpRightIcon";

const reviewRows = [
  {
    company: "Karman Ventures",
    href: "https://karmanventures.com/",
    reviewer: "William Barnes",
    services: ["Investor Deck", "Sales Deck"],
    avatar: "/assets/ochi/013-William-Barnes-1-300x300-75b78a6a.png",
    quote:
      "They were transparent about the time and the stages of the project. The end product is high quality, and I feel confident about how they were handholding the client through the process. I feel like I can introduce them to someone who needs to put a sales deck together from scratch, and they would be able to handhold the client experience from 0 to 100 very effectively from story to design. 5/5"
  },
  {
    company: "Medallia",
    href: "https://www.medallia.com/",
    reviewer: "Becky Chastain",
    services: ["Branded Template", "Executive Keynote", "Product Launch"],
    avatar: "/assets/ochi/014-Becky-300x300-f7e73a08.png",
    quote:
      "The most impressive part was attention to detail. They helped us craft the narrative, not just design slides."
  },
  {
    company: "Planetly",
    href: "https://www.planetly.com/",
    reviewer: "Nina Walloch",
    services: [
      "Agency",
      "Big News Deck",
      "Branded Template",
      "Investor Deck",
      "Product Presentation",
      "Sales Deck",
      "Startup Pitch"
    ],
    avatar: "/assets/ochi/015-Nina-jpg-7ea1f143.png",
    quote:
      "They tackled each project with strong professionalism and creativity, then translated our brand values into a scalable presentation system."
  },
  {
    company: "Workiz Easy",
    href: "https://www.workiz.com/",
    reviewer: "Tomer Levy",
    services: ["Company Presentation", "Onboarding", "Sales Deck"],
    avatar: "/assets/ochi/016-Tomer-9900d2a6.png",
    quote:
      "OCHI brought a level of professionalism we were missing. The final result was exactly what we needed."
  },
  {
    company: "Premium Blend",
    href: "https://www.premium-blend.com/",
    reviewer: "Ellen Kim",
    services: ["Branded Template", "Illustrations"],
    avatar: "/assets/ochi/017-image-677-300x298-0c8205c8.png",
    quote:
      "Fast, effective collaboration with careful listening on details. The final template is both easier and more enjoyable to present with."
  },
  {
    company: "Hypercare Systems",
    href: "https://hypercare-systems.com/",
    reviewer: "Brendan Goss",
    services: ["Investor Deck", "Startup Pitch"],
    avatar: "/assets/ochi/018-1627398835558-11-aad36418.png",
    quote:
      "The team delivered first-class work with clear thinking around narrative flow and visual quality, beyond initial expectations."
  },
  {
    company: "Officevibe",
    href: "https://officevibe.com/",
    reviewer: "Raff Labrie",
    services: ["Branded Template"],
    avatar: "/assets/ochi/019-Photo-300x300-58e4798e.png",
    quote:
      "They have an impressive understanding of what makes presentations effective. The quality exceeded what we expected."
  },
  {
    company: "Orderlion",
    href: "https://orderlion.com/en",
    reviewer: "Stefan Strohmer",
    services: ["Agency", "Investor Deck", "Product Presentation", "Review", "Sales Deck"],
    avatar: "/assets/ochi/020-Stefan-300x300-2a2cfa0b.jpg",
    quote:
      "They understood the real business problem, iterated quickly through drafts, and delivered a polished story we were proud to share."
  },
  {
    company: "Black Book",
    href: "https://blackbookapp.co/",
    reviewer: "Jaci Smith",
    services: ["Review", "Startup Pitch"],
    avatar: "/assets/ochi/021-Jaci-jpg-68c2fc2f.png",
    quote:
      "They nailed our product narrative, handled feedback well, and kept the entire process smooth and professional."
  },
  {
    company: "Trawa Energy",
    href: "https://www.trawa.de/",
    reviewer: "David Budde",
    services: ["Branding", "Investor Deck", "Startup Pitch"],
    avatar: "/assets/ochi/022-David-Budde-1-300x300-3603b70e.png",
    quote:
      "We were surprised by how accurately they captured our design language and aligned it with our company vision."
  }
];

export default function TeamSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="team" className="section-shell pb-[9rem]">
      <h2 className="mb-[5rem] text-[4.5rem] leading-[1] md:text-[5rem]">Clients&apos; reviews</h2>

      <div className="outline-bottom mb-[6rem] lg:mb-[10rem]">
        {reviewRows.map((review, index) => {
          const isActive = activeIndex === index;

          return (
            <div key={review.company}>
              <div className="outline-top grid grid-cols-12 gap-x-[1rem] py-[1.5rem] leading-loose">
                <div className="col-span-6 lg:col-span-3">
                  <a
                    href={review.href}
                    target="_blank"
                    rel="noreferrer"
                    className="link link--underline inline-block bg-transparent text-left transition duration-300 hover:translate-x-[1rem]"
                  >
                    {review.company}
                  </a>
                </div>
                <div className="hidden lg:col-span-3 lg:block">
                  {isActive ? <span>Services:</span> : null}
                </div>
                <div className="hidden lg:col-span-3 lg:block">
                  <span>{review.reviewer}</span>
                </div>
                <div className="col-span-6 text-right lg:col-span-3">
                  <button
                    type="button"
                    className={`bg-transparent p-0 uppercase ${
                      isActive ? "review-row-read review-row-read--active" : "link link--underline"
                    }`}
                    onClick={() => setActiveIndex(index)}
                    aria-disabled={isActive}
                  >
                    Read
                  </button>
                </div>
              </div>

              {isActive ? (
                <div className="grid gap-y-[3rem] gap-x-[1rem] py-[4.2rem] lg:grid-cols-12 lg:py-[5.2rem]">
                  <div className="lg:col-span-3 lg:col-start-4">
                    <p className="mb-[1.5rem] lg:hidden">Services:</p>
                    <div className="flex flex-wrap items-start justify-start -mb-[1rem] lg:flex-col">
                      {review.services.map((service) => (
                        <div key={`${review.company}-${service}`} className="mb-[1rem] mr-[1rem]">
                          <a href="#services" className="btn btn--icon-outside-hidden btn--small">
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
                      <div className="relative mb-[2rem] h-[10rem] w-[10rem] overflow-hidden rounded-[1rem] bg-ochi-gray200">
                        <Image
                          src={review.avatar}
                          alt={review.reviewer}
                          fill
                          sizes="10rem"
                          className="object-cover"
                          loading="lazy"
                        />
                      </div>
                      <p className="mb-0 max-w-[56rem] leading-[1.42]">{review.quote}</p>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="review-reward-stage">
        <div className="grid gap-[1.5rem] sm:grid-cols-12">
          <article className="review-reward-card review-reward-card--green pointer-events-none sm:col-span-12 lg:col-span-6">
            <div className="review-reward-card__logo-wrap">
              <Image
                src="/assets/ochi/023-logo001-f365597d.svg"
                alt="Ochi reward logo"
                width={150}
                height={150}
                className="review-reward-card__logo review-reward-card__logo--large"
                loading="lazy"
              />
            </div>
            <div className="review-reward-card__footer">
              <span className="review-reward-pill review-reward-pill--green">&copy;2019-2025</span>
            </div>
          </article>

          <a
            href="https://clutch.co/profile/ochi-presentation-design"
            target="_blank"
            rel="noreferrer"
            className="review-reward-card review-reward-card--dark sm:col-span-6 lg:col-span-3"
          >
            <div className="review-reward-card__logo-wrap">
              <Image
                src="/assets/ochi/024-logo002-03c4b736.svg"
                alt="Clutch logo"
                width={150}
                height={150}
                className="review-reward-card__logo"
                loading="lazy"
              />
            </div>
            <div className="review-reward-card__footer">
              <span className="btn btn--inverse btn--small review-reward-pill review-reward-pill--light">
                <span className="btn__text">Rating 5.0 on Clutch</span>
              </span>
            </div>
          </a>

          <a
            href="https://thefutur.com/alumni"
            target="_blank"
            rel="noreferrer"
            className="review-reward-card review-reward-card--dark sm:col-span-6 lg:col-span-3"
          >
            <div className="review-reward-card__logo-wrap">
              <Image
                src="/assets/ochi/025-logo003-ad896a99.png"
                alt="Business bootcamp alumni logo"
                width={102}
                height={104}
                className="review-reward-card__logo review-reward-card__logo--small"
                loading="lazy"
              />
            </div>
            <div className="review-reward-card__footer">
              <span className="btn btn--inverse btn--small review-reward-pill review-reward-pill--light">
                <span className="btn__text">Business Bootcamp Alumni</span>
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
