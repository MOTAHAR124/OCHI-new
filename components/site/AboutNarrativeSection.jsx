"use client";

import { motion } from "framer-motion";
import ArrowUpRightIcon from "@/components/site/ArrowUpRightIcon";
import { aboutImage, socialLinks } from "@/data/siteData";

export default function AboutNarrativeSection() {
  return (
    <section id="services" className="rounded-section relative bg-ochi-lime">
      <div className="section-shell pb-[4rem] pt-[4rem] md:pb-[4.4rem] md:pt-[7.8rem]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45 }}
          className="mb-[5.4rem] max-w-[114rem]"
        >
          <h2 className="mb-0 text-[3.2rem] leading-[1.02] md:text-[4.1rem] lg:text-[5.3rem]">
            We craft category-defining presentations, brand identities, and digital experiences that{" "}
            <span className="link link--underline">drive funding</span>, <span className="link link--underline">sales</span>, and{" "}
            <span className="link link--underline">market leadership</span>.
          </h2>
        </motion.div>

        <div className="outline-top mb-[5.4rem] grid gap-y-[3rem] py-[1.6rem] md:mb-[7.7rem] md:grid-cols-12">
          <div className="md:col-span-4 lg:col-span-6">
            <p className="mb-0">What you can expect:</p>
          </div>

          <div className="md:col-span-4 lg:col-span-4 lg:max-w-[28rem]">
            <p className="mb-[2.8rem]">
              We don&apos;t just make slides. We shape strategy, storytelling, design scalable brand systems, and
              build presentations that make people say: &quot;I want in!&quot;
            </p>
            <p className="mb-[2.8rem]">
              Our clients make the world go round - from deep tech, aerospace and robotics to music festivals and
              Michelin-starred restaurants.
            </p>
            <p className="mb-0">
              Since 2019, we&apos;ve been the go-to partner for Yahoo, Medallia, Uber, Lexus, Salience Labs, Trawa
              and AllThingsGo.
            </p>
          </div>

          <div className="md:col-span-4 md:flex md:items-center md:justify-end lg:col-span-2 lg:justify-start">
            <div>
              <p className="mb-[1.5rem]">S:</p>
              <ul className="about-social-list leading-[1.45]">
                {socialLinks.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} target="_blank" rel="noreferrer" className="link link--underline">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="outline-top grid gap-y-[4rem] pt-[1.6rem] md:grid-cols-2 md:items-start md:gap-x-[2rem]">
          <div>
            <h2 className="mb-[2.2rem] text-[3.3rem] leading-[1] md:text-[5.5rem]">How we can help:</h2>
            <a href="#featured" className="btn btn--primary">
              <span className="btn__text">Read more</span>
              <span className="btn__icon btn__icon--append" aria-hidden="true">
                <ArrowUpRightIcon />
              </span>
            </a>
          </div>

          <div className="overflow-hidden rounded-[1rem]">
            <img
              src={aboutImage}
              alt="Creative team visual"
              className="h-full min-h-[26rem] w-full rounded-[1rem] bg-ochi-gray200 object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
