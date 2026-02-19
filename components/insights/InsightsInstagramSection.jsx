import Image from "next/image";
import ScrollProgressShift from "@/components/shared/animation/ScrollProgressShift";
import RoundedSection from "@/components/shared/layout/RoundedSection";
import { insightInstagramPosts } from "@/data/insightsPageData";

export default function InsightsInstagramSection() {
  return (
    <RoundedSection className="bg-ochi-green text-white">
      <div className="h-full w-full overflow-hidden">
        <ScrollProgressShift className="section-shell pb-[7.5rem] pt-[5rem] lg:pb-[11rem] lg:pt-[8.5rem]" multiplier={1}>
          <div className="outline-top outline-bottom mb-[1.5rem] py-[1.5rem]">
            <div className="crawling-line crawling-line--large inline-flex whitespace-nowrap font-secondary uppercase">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={`instagram-${index}`}
                  className="inline-block animate-[crawling-line_10s_linear_infinite] align-top"
                >
                  Instagram&nbsp;
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-x-[1rem] gap-y-[4rem] md:grid-cols-12">
            <div className="md:col-span-4">
              <h4>Latest publications:</h4>
            </div>

            <div className="grid gap-x-[1rem] gap-y-[4rem] sm:grid-cols-3 md:col-span-8">
              {insightInstagramPosts.map((item) => (
                <a key={item.href} className="group block" href={item.href} target="_blank" rel="noreferrer">
                  <div className="relative z-[1] mb-[2rem] overflow-hidden rounded bg-ochi-lime text-ochi-lime">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={item.width}
                      height={item.height}
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="h-auto w-full max-w-full rounded object-top transition-transform duration-400 group-hover:scale-110 group-hover:duration-700"
                      loading="lazy"
                    />
                  </div>

                  <div className="pr-[3rem]">
                    <h3 className="mb-[1rem]">{item.title}</h3>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </ScrollProgressShift>
      </div>
    </RoundedSection>
  );
}
