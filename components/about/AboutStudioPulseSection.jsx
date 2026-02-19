import RevealInView from "@/components/shared/animation/RevealInView";
import RoundedSection from "@/components/shared/layout/RoundedSection";
import { aboutStudioStats, aboutValueFlows } from "@/data/aboutPageData";

export default function AboutStudioPulseSection() {
  return (
    <RoundedSection className="bg-ochi-gray900 text-white">
      <div className="h-full w-full">
        <div className="section-shell py-[7rem] lg:py-[10rem]">
          <RevealInView className="outline-bottom mb-[5rem] pb-[3rem] lg:mb-[7rem] lg:pb-[4rem]">
            <div className="grid gap-y-[2rem] md:grid-cols-12">
              <div className="md:col-span-4">
                <p className="mb-0">Studio pulse:</p>
              </div>

              <div className="md:col-span-8">
                <h2 className="custom-heading mb-0 max-w-[88rem]">
                  Built like a global studio, operated as one accountable team.
                </h2>
              </div>
            </div>
          </RevealInView>

          <div className="mb-[6rem] grid gap-[1rem] sm:grid-cols-2 lg:mb-[8rem] lg:grid-cols-4">
            {aboutStudioStats.map((item, index) => (
              <RevealInView key={item.label} delay={index * 0.06}>
                <article className="h-full rounded-[1rem] border border-white/20 bg-white/5 p-[2rem] backdrop-blur-sm lg:p-[2.4rem]">
                  <p className="font-secondary mb-[1rem] text-[5rem] uppercase leading-[0.8] lg:text-[6.4rem]">
                    {item.value}
                  </p>
                  <p className="mb-0 max-w-[24rem] text-white/80">{item.label}</p>
                </article>
              </RevealInView>
            ))}
          </div>

          <div className="outline-top outline-bottom">
            {aboutValueFlows.map((flow, index) => (
              <RevealInView key={flow.title} delay={index * 0.05}>
                <article
                  className={`grid gap-y-[1.5rem] py-[2rem] md:grid-cols-12 ${
                    index > 0 ? "outline-top" : ""
                  }`}
                >
                  <div className="md:col-span-1">
                    <p className="mb-0 text-[1.3rem] uppercase text-white/55">0{index + 1}</p>
                  </div>
                  <div className="md:col-span-4">
                    <h3 className="font-secondary mb-0 text-[3.4rem] uppercase leading-[0.82] lg:text-[4rem]">
                      {flow.title}
                    </h3>
                  </div>
                  <div className="md:col-span-7">
                    <p className="mb-0 max-w-[60rem] text-white/80">{flow.body}</p>
                  </div>
                </article>
              </RevealInView>
            ))}
          </div>
        </div>
      </div>
    </RoundedSection>
  );
}
