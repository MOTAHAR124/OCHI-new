import { Fragment } from "react";
import MouseReactiveEyesSvg from "@/components/shared/animation/MouseReactiveEyesSvg";
import ScrollProgressShift from "@/components/shared/animation/ScrollProgressShift";
import ArrowUpRightIcon from "@/components/site/ArrowUpRightIcon";
import { officeLocations, socialLinks } from "@/data/siteData";

export default function ContactSocialBlockSection() {
  return (
    <section className="rounded-section relative bg-ochi-lime">
      <div className="h-full w-full overflow-hidden">
        <ScrollProgressShift className="section-shell py-[7rem] md:py-[8.5rem] lg:py-[14rem]" multiplier={1}>
          <div className="w-full text-center">
            <h2 className="heading-large leading-negative mb-[4rem] uppercase">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  className="contact-social-link inline-grid px-[1rem] lg:px-[2rem]"
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="contact-social-link__inner">{item.label}</span>
                  <span className="contact-social-link__inner">{item.label}</span>
                </a>
              ))}
            </h2>
          </div>

          <ScrollProgressShift
            className="pointer-events-none absolute left-0 top-0 z-[2] mb-[4rem] hidden w-full lg:block lg:h-[calc(100vh+1.5rem)]"
            multiplier={0.4}
          >
            <div className="flex h-full w-full items-center justify-center px-[8rem] lg:px-[3rem]">
              <div className="w-full max-w-[36rem]">
                <MouseReactiveEyesSvg />
              </div>
            </div>
          </ScrollProgressShift>

          <div className="outline-top mt-[6rem] mb-[9rem] grid gap-y-[3rem] py-[1.5rem] lg:mt-[10rem] md:grid-cols-12">
            <div className="md:col-span-4 lg:col-span-6">
              <p className="mb-0">Our contact</p>
            </div>

            <div className="md:col-span-4 lg:col-span-3">
              <div className="leading-loose">
                <p className="mb-[1.5rem]">L:</p>
                <address className="m-0 not-italic">
                  {officeLocations.map((line, index) => (
                    <Fragment key={`location-${index}-${line || "break"}`}>
                      <span className="link link--underline">{line || "\u00A0"}</span>
                      <br />
                    </Fragment>
                  ))}
                </address>
              </div>
            </div>

            <div className="md:col-span-4 md:text-right lg:col-span-3">
              <a className="btn btn--icon-outside" href="mailto:hello@ochi.design">
                <span className="btn__text">hello@ochi.design</span>
                <span className="btn__icon btn__icon--append" aria-hidden="true">
                  <ArrowUpRightIcon />
                </span>
              </a>
            </div>
          </div>
        </ScrollProgressShift>
      </div>
    </section>
  );
}
