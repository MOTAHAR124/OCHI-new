import Image from "next/image";
import ArrowUpRightIcon from "@/components/site/ArrowUpRightIcon";
import { aboutImage, socialLinks } from "@/data/siteData";

export default function AboutNarrativeSection() {
  return (
    <section id="services" className="rounded-section relative bg-ochi-lime">
      <div className="h-full w-full">
        <div className="section-shell pb-[0.5rem] pt-[4rem] md:pb-[3.5rem] md:pt-[7.5rem]">
          <div className="mb-[6rem]">
            <div className="max-w-[110rem]">
              <h2 className="custom-heading mb-0">
                We craft category-defining presentations, brand identities, and digital experiences that{" "}
                <span className="link link--underline">drive funding</span>, <span className="link link--underline">sales</span>, and{" "}
                <span className="link link--underline">market leadership</span>.
              </h2>
            </div>
          </div>

          <div className="outline-top mb-[6rem] grid gap-y-[3rem] py-[1.5rem] md:mb-[9rem] md:grid-cols-12">
            <div className="md:col-span-4 lg:col-span-6">
              <p className="mb-0">What you can expect:</p>
            </div>

            <div className="md:col-span-4 lg:col-span-4">
              <div className="max-w-[27.5rem]">
                <p>
                  We don&apos;t just make slides. We shape strategy, storytelling, design scalable brand systems, and
                  build presentations that make people say: &quot;I want in!&quot;
                </p>
                <p>
                  Our clients make the world go round - from deep tech, aerospace and robotics to music festivals and
                  Michelin-starred restaurants.
                </p>
                <p className="mb-0">
                  Since 2019, we&apos;ve been the go-to partner for Yahoo, Medallia, Uber, Lexus, Salience Labs, Trawa
                  and AllThingsGo.
                </p>
              </div>
            </div>

            <div className="md:col-span-4 md:flex md:items-end md:justify-end lg:col-span-2 xl:justify-start">
              <div>
                <p className="mb-[1.5rem]">S:</p>
                <ul className="about-social-list leading-[1.5]">
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

          <div className="outline-top grid gap-y-[4rem] pt-[1.5rem] md:grid-cols-2">
            <div>
              <h2 className="mb-[2rem]">How we can help:</h2>
              <a href="#featured" className="btn btn--primary">
                <span className="btn__text">Read more</span>
                <span className="btn__icon btn__icon--append" aria-hidden="true">
                  <ArrowUpRightIcon />
                </span>
              </a>
            </div>

            <div>
              <div className="zoom-hover relative overflow-hidden rounded-[1rem]">
                <Image
                  src={aboutImage}
                  alt="Creative team visual"
                  width={663}
                  height={469}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="w-full max-w-full rounded-[1rem] bg-ochi-gray200"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
