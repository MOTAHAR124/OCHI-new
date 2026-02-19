import RevealInView from "@/components/shared/animation/RevealInView";
import RoundedSection from "@/components/shared/layout/RoundedSection";
import ArrowUpRightIcon from "@/components/site/ArrowUpRightIcon";
import {
  aboutDeliveryLanes,
  aboutOperatingFlow,
  aboutWorkflowSteps
} from "@/data/aboutPageData";

export default function AboutOperatingFlowSection() {
  return (
    <RoundedSection className="bg-ochi-gray100">
      <div className="h-full w-full">
        <div className="section-shell pb-[7rem] pt-[2rem] lg:pb-[10rem]">
          <RevealInView className="mb-[5rem] lg:mb-[7rem]">
            <div className="max-w-[96rem]">
              <h2 className="custom-heading">{aboutOperatingFlow.heading}</h2>
            </div>
          </RevealInView>

          <div className="outline-top mb-[6rem] grid gap-y-[3rem] py-[1.5rem] md:grid-cols-12 lg:mb-[8rem]">
            <div className="md:col-span-4 lg:col-span-3">
              <p>{aboutOperatingFlow.label}</p>
            </div>

            <div className="md:col-span-5 lg:col-span-6">
              <div className="max-w-[52rem]">
                {aboutOperatingFlow.intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="md:col-span-3 lg:col-span-3 md:text-right">
              <a href="/services" className="btn btn--icon-outside-hidden">
                <span className="btn__text">Explore services</span>
                <span className="btn__icon btn__icon--append" aria-hidden="true">
                  <ArrowUpRightIcon />
                </span>
              </a>
            </div>
          </div>

          <div className="outline-top outline-bottom mb-[6rem] lg:mb-[9rem]">
            {aboutWorkflowSteps.map((step, index) => (
              <RevealInView key={step.number} delay={index * 0.05}>
                <article
                  className={`grid gap-y-[2rem] py-[2rem] md:grid-cols-12 md:items-end ${
                    index > 0 ? "outline-top" : ""
                  }`}
                >
                  <div className="md:col-span-2">
                    <p className="font-secondary mb-0 text-[4.4rem] uppercase leading-[0.75] md:text-[5.2rem]">
                      {step.number}
                    </p>
                  </div>

                  <div className="md:col-span-3">
                    <h3 className="font-secondary mb-0 text-[3.4rem] uppercase leading-[0.78] md:text-[4.2rem]">
                      {step.stage}
                    </h3>
                  </div>

                  <div className="md:col-span-4">
                    <p className="mb-0 max-w-[44rem]">{step.focus}</p>
                  </div>

                  <div className="md:col-span-3">
                    <p className="mb-[0.6rem] text-[1.2rem] uppercase opacity-50">Outcome</p>
                    <p className="mb-0">{step.outcome}</p>
                  </div>
                </article>
              </RevealInView>
            ))}
          </div>

          <div>
            <RevealInView>
              <h3 className="font-secondary mb-[2.5rem] text-[4.4rem] uppercase leading-[0.8] md:text-[6rem]">
                Engagement flows
              </h3>
            </RevealInView>

            <div className="grid gap-[1.5rem] md:grid-cols-3">
              {aboutDeliveryLanes.map((lane, index) => (
                <RevealInView key={lane.title} delay={index * 0.07}>
                  <article className="h-full rounded-[1rem] border border-black/20 bg-white p-[2rem] lg:p-[2.4rem]">
                    <p className="mb-[1.4rem] text-[1.2rem] uppercase opacity-60">{lane.eyebrow}</p>
                    <h4 className="font-secondary mb-[1rem] text-[3.4rem] uppercase leading-[0.8]">
                      {lane.title}
                    </h4>
                    <p className="mb-[2rem]">{lane.description}</p>
                    <div className="flex flex-wrap gap-[0.6rem]">
                      {lane.tags.map((tag) => (
                        <span key={`${lane.title}-${tag}`} className="tag-pill text-[1.2rem]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                </RevealInView>
              ))}
            </div>
          </div>
        </div>
      </div>
    </RoundedSection>
  );
}
