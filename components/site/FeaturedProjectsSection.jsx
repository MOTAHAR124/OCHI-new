"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ArrowUpRightIcon from "@/components/site/ArrowUpRightIcon";
import { featuredProjects } from "@/data/siteData";

function FeaturedCard({ project, index }) {
  const isLeftColumn = index % 2 === 0;

  const titleChars = project.title.split("");

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.24 }}
      transition={{ duration: 0.45, delay: index * 0.03 }}
      className="featured-project relative"
    >
      <div className="mb-[1.5rem] flex items-center text-[1.4rem] uppercase leading-none">
        <span className="mr-[0.8rem] h-[0.9rem] w-[0.9rem] rounded-full bg-current" />
        <span>{project.client}</span>
      </div>

      <a
        href="#contact"
        className="featured-project__preview relative mb-[1.8rem] block overflow-hidden rounded-[1rem] md:overflow-visible"
      >
        <div className="featured-project__media origin-center overflow-hidden rounded-[1rem] transition-transform duration-500">
          <Image
            src={project.image}
            alt={project.title}
            width={1326}
            height={1101}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="featured-project__image w-full rounded-[1rem] bg-ochi-gray200 transition-transform duration-500"
            loading="lazy"
          />
        </div>

        <h3
          aria-hidden="true"
          className={`h1 uppercase font-semibold whitespace-nowrap m-0 featured-project__headline ${
            isLeftColumn ? "featured-project__headline--left" : "featured-project__headline--right"
          }`}
        >
          {titleChars.map((char, charIndex) => (
            <span
              key={`${project.title}-${charIndex}`}
              className="featured-project__char"
              style={{ transitionDelay: `${charIndex * 0.03}s` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h3>
      </a>

      <div className="flex flex-wrap -mb-[1rem] items-start">
        {project.tags.map((tag) => (
          <div key={`${project.title}-${tag}`} className="mb-[1rem] mr-[1rem]">
            <a className="btn btn--default btn--small" href="#contact">
              <span className="btn__text">{tag}</span>
            </a>
          </div>
        ))}
      </div>
    </motion.article>
  );
}

export default function FeaturedProjectsSection() {
  return (
    <section id="featured" className="bg-ochi-gray100">
      <div className="section-shell pb-[11rem] pt-[4.8rem] lg:pb-[13rem] lg:pt-[7.4rem]">
        <h2 className="mb-[5rem] text-[5rem] leading-[1] md:text-[5rem]">Featured projects</h2>

        <div className="mb-[8rem] lg:mb-[9rem]">
          <div className="outline-top grid gap-x-[1.8rem] gap-y-[4.8rem] py-[5rem] md:grid-cols-2">
            {featuredProjects.map((project, index) => (
              <FeaturedCard key={`${project.client}-${project.title}`} project={project} index={index} />
            ))}
          </div>
        </div>

        <div className="text-center">
          <a href="#contact" className="btn btn--primary">
            <span className="btn__text">View all case studies</span>
            <span className="btn__icon btn__icon--append" aria-hidden="true">
              <ArrowUpRightIcon />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
