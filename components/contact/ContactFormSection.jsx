"use client";

import { useState } from "react";
import ArrowUpRightIcon from "@/components/site/ArrowUpRightIcon";
import LazyRevealImage from "@/components/shared/animation/LazyRevealImage";
import { contactHeroData } from "@/data/contactPageData";

export default function ContactFormSection() {
  const [hasAcceptedPolicy, setHasAcceptedPolicy] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <section className="rounded-section relative bg-ochi-gray100">
      <div className="section-shell py-[10rem] lg:py-[14rem]">
        <h1 className="h1 hero-title mb-[6rem] uppercase md:mb-[9rem] lg:mb-[10rem]">
          <span className="hero-title__line hero-title__line--with-image whitespace-nowrap">
            <span className="hero-inline-image-wrap">
              <LazyRevealImage
                src={contactHeroData.inlineImage}
                alt=""
                fill
                sizes="12vw"
                className="hero-inline-image"
                priority
              />
            </span>
            {contactHeroData.titleTop}
          </span>
          <span className="hero-title__line whitespace-nowrap">{contactHeroData.titleBottom}</span>
        </h1>

        <div>
          <p className="mb-[5rem]">Fill the form below:</p>

          <form className="contact-form grid gap-y-[1rem] leading-none" onSubmit={handleSubmit}>
            <div className="grid gap-y-[1rem] md:flex md:items-end md:gap-x-[1rem]">
              <p className="form-label mb-0 flex-shrink-0">Hi! My name is</p>
              <span className="flex-grow">
                <input className="form-control" type="text" placeholder="Enter your name*" required />
              </span>
              <p className="form-label mb-0 flex-shrink-0">and I work with</p>
              <span className="flex-grow">
                <input className="form-control" type="text" placeholder="Company name type here*" required />
              </span>
            </div>

            <div className="grid gap-y-[1rem] md:flex md:items-end md:gap-x-[1rem]">
              <p className="form-label mb-0 flex-shrink-0">I&apos;m looking for a partner to help me with</p>
              <span className="flex-grow">
                <input className="form-control" type="text" placeholder="Your goal type here*" required />
              </span>
            </div>

            <div className="grid gap-y-[1rem] md:flex md:items-end md:gap-x-[1rem]">
              <p className="form-label mb-0 flex-shrink-0">With an idea of having that completed</p>
              <span className="flex w-full">
                <input className="form-control cursor-pointer" type="text" placeholder="Date*" required />
              </span>
            </div>

            <div className="grid gap-y-[1rem] md:flex md:items-end md:gap-x-[1rem]">
              <p className="form-label mb-0 flex-shrink-0">I am hoping to stay around a budget range of</p>
              <span className="flex-grow">
                <select className="form-control js-custom-select" defaultValue="Select*" required>
                  <option value="Select*">Select*</option>
                  <option value="$5,000 - 15,000">$5,000 - 15,000</option>
                  <option value="$15,000 - 25,000">$15,000 - 25,000</option>
                  <option value="$25,000 - 50,000+">$25,000 - 50,000+</option>
                </select>
              </span>
            </div>

            <div className="grid gap-y-[1rem] md:flex md:items-end md:gap-x-[1rem]">
              <p className="form-label mb-0 flex-shrink-0">You can reach me at</p>
              <span className="flex-grow">
                <input className="form-control" type="email" placeholder="name@example.com" required />
              </span>
              <p className="form-label mb-0 flex-shrink-0">to start the conversation.</p>
            </div>

            <div className="grid gap-y-[1rem] md:flex md:items-end md:gap-x-[1rem]">
              <p className="form-label mb-0 flex-shrink-0">Optionally, i&apos;m sharing more:</p>
              <span className="flex-grow">
                <input className="form-control cursor-pointer" type="text" placeholder="Product details type here..." />
              </span>
            </div>

            <div className="grid gap-[4rem] pt-[3rem] md:grid-flow-col md:items-center md:justify-end md:pt-[4rem]">
              <label className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control__input"
                  required
                  checked={hasAcceptedPolicy}
                  onChange={(event) => setHasAcceptedPolicy(event.target.checked)}
                />
                <span className="custom-control__label">
                  I agree with the{" "}
                  <a className="link link--underline" href="https://ochi.design/privacy/" target="_blank" rel="noreferrer">
                    Privacy Policy
                  </a>
                </span>
              </label>

              <button className="btn btn--primary" type="submit" disabled={!hasAcceptedPolicy}>
                <span className="btn__text">Send Inquiry</span>
                <span className="btn__icon btn__icon--append" aria-hidden="true">
                  <ArrowUpRightIcon />
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
