import RevealInView from "@/components/shared/animation/RevealInView";
import { servicesClientTypes, servicesHeroIntro } from "@/data/servicesPageData";

export default function ServicesHeroSection() {
  const [introBefore, introAfter] = servicesHeroIntro.split("$400M+ in funding");

  return (
    <div id="services">
      <RevealInView>
        <h1 className="h1 leading-negative -mt-[6.5rem] mb-[6rem] uppercase lg:mb-[10rem]">Services</h1>
      </RevealInView>

      <RevealInView delay={0.08}>
        <div className="pt-[1.5rem] outline-top">
          <div className="mb-[6rem] max-w-[110rem]">
            <h2 className="mb-0 text-[3.1rem] leading-[1] md:text-[4rem] lg:text-[5.2rem]">
              {introBefore}
              <span className="link link--underline">$400M+ in funding</span>
              {introAfter}
            </h2>
          </div>
        </div>
      </RevealInView>

      <div className="outline-top mb-[9rem] pt-[1.5rem]">
        <div className="grid gap-y-[3rem] md:grid-cols-12">
          <div className="md:col-span-4 lg:col-span-6">
            <p className="mb-0">We&apos;re best positioned for 3 types of clients:</p>
          </div>

          <div className="md:col-span-4 lg:col-span-3 lg:pr-[4rem]">
            {servicesClientTypes.slice(0, 2).map((item) => (
              <article key={item.title} className="mb-[4rem]">
                <h3 className="mb-[1.5rem] text-[1.6rem] leading-[1.2]">
                  <u>{item.title}</u>
                </h3>
                <p className="mb-0">{item.description}</p>
              </article>
            ))}
          </div>

          <div className="md:col-span-4 lg:col-span-3 lg:pr-[4rem]">
            {servicesClientTypes.slice(2).map((item) => (
              <article key={item.title} className="mb-[4rem]">
                <h3 className="mb-[1.5rem] text-[1.6rem] leading-[1.2]">
                  <u>{item.title}</u>
                </h3>
                <p className="mb-0">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
