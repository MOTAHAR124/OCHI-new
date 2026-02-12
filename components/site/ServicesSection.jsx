"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { clientLogos, serviceCards, services } from "@/data/siteData";

export default function ServicesSection() {
  return (
    <section id="services" className="section-shell pb-[7rem] md:pb-[9rem]">
      <h2 className="mb-[4rem] text-[3.1rem] leading-[1] md:text-[4rem] lg:text-[5.2rem]">
        Services
      </h2>

      <div className="outline-top mb-[6rem] grid gap-y-[3rem] py-[1.5rem] md:grid-cols-12">
        <div className="md:col-span-3">
          <p className="mb-0">What we deliver:</p>
        </div>
        <div className="md:col-span-9">
          <div className="grid gap-[2rem] md:grid-cols-2">
            {services.map((service, index) => (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className="rounded-[1rem] border border-black/20 p-[2rem] transition-shadow duration-300 ease-[cubic-bezier(.3,.86,.36,.95)] hover:shadow-[0_25px_60px_-40px_rgba(0,0,0,0.3)]"
              >
                <p className="mb-[0.8rem] text-[1.2rem] uppercase opacity-60">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mb-[1rem] text-[2.4rem] leading-[1.1]">{service.title}</h3>
                <p className="mb-0 text-[1.4rem] opacity-80">{service.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-[1.5rem] md:grid-cols-3">
        {serviceCards.map((card) => (
          <article
            key={card.title}
            className="service-card relative overflow-hidden rounded-[1rem] bg-ochi-gray900 text-ochi-gray100"
          >
            <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent to-black/40" />
            <div className="service-card__media relative h-[24rem] overflow-hidden">
              <Image
                src={card.image}
                alt={card.title}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="service-card__image object-cover opacity-70 transition-transform duration-700"
                loading="lazy"
              />
            </div>
            <div className="absolute left-0 right-0 bottom-0 p-[2rem]">
              <h3 className="mb-[0.8rem] text-[2.4rem] leading-[1.05]">{card.title}</h3>
              <p className="mb-[1rem] text-[1.4rem] opacity-80">{card.subtitle}</p>
              <div className="flex flex-wrap -mb-[1rem] items-start">
                {card.tags.map((tag) => (
                  <div key={`${card.title}-${tag}`} className="mb-[1rem] mr-[1rem]">
                    <span className="btn btn--small btn--inverse">
                      <span className="btn__text">{tag}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-[4rem] overflow-hidden">
        <div className="flex w-max animate-logo-slide gap-[1rem]">
          {[...clientLogos, ...clientLogos].map((logo, index) => (
            <span key={`${logo}-${index}`} className="btn btn--small btn--default">
              <span className="btn__text">{logo}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
