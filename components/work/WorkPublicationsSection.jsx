import Image from "next/image";
import RevealInView from "@/components/shared/animation/RevealInView";
import ScrollProgressShift from "@/components/shared/animation/ScrollProgressShift";
import RoundedSection from "@/components/shared/layout/RoundedSection";
import { latestPublications } from "@/data/workPageData";

export default function WorkPublicationsSection() {
  return (
    <RoundedSection className="bg-ochi-green text-white">
      <div className="h-full w-full overflow-hidden">
        <ScrollProgressShift className="section-shell pb-[7.5rem] pt-[5rem] lg:pb-[11rem] lg:pt-[8.5rem]" multiplier={1.2}>
          <div className="outline-top outline-bottom mb-[1.5rem] py-[1.5rem]">
            <div className="crawling-line-large inline-flex whitespace-nowrap uppercase">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={`behance-${index}`} className="work-crawl-item inline-block align-top">
                  Behance&nbsp;
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-x-[1rem] gap-y-[4rem] md:grid-cols-12">
            <div className="reset-last md:col-span-4">
              <h4>Latest publications:</h4>
            </div>

            <div className="grid gap-x-[1rem] gap-y-[4rem] sm:grid-cols-3 md:col-span-8">
              {latestPublications.map((item, index) => (
                <RevealInView key={item.href} delay={index * 0.06} amount={0.2} offset={24}>
                  <a className="group block" href={item.href} target="_blank" rel="noreferrer">
                    <div className="relative z-[1] mb-[2rem] overflow-hidden rounded bg-ochi-lime text-ochi-lime">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={325}
                        height={325}
                        sizes="(min-width: 520px) 33vw, 100vw"
                        className="w-full max-w-full rounded object-top transition-transform duration-300 group-hover:scale-110 group-hover:duration-700"
                      />
                    </div>

                    <div className="pr-[3rem]">
                      <div className="flex items-center">
                        <span className="mr-[1rem] h-[1rem] w-[1rem] flex-shrink-0 rounded-full bg-current" />
                        <p className="mb-0 uppercase">{item.title}</p>
                      </div>
                    </div>
                  </a>
                </RevealInView>
              ))}
            </div>
          </div>
        </ScrollProgressShift>
      </div>
    </RoundedSection>
  );
}
