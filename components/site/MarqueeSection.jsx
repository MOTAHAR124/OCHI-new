import ScrollProgressShift from "@/components/shared/animation/ScrollProgressShift";

const marqueeItems = ["WE ARE OCHI", "WE ARE OCHI", "WE ARE OCHI", "WE ARE OCHI"];

export default function MarqueeSection() {
  return (
    <section className="rounded-section relative z-[1] overflow-hidden bg-ochi-green text-white">
      <div className="h-full w-full">
        <ScrollProgressShift className="h-full w-full" multiplier={0.7} offset={["start start", "end start"]}>
          <div className="section-shell pb-[7.5rem] pt-[5rem] lg:pt-[8.5rem] xl:pb-[25rem]">
            <div className="outline-top outline-bottom overflow-hidden py-[1.5rem]">
              <div className="crawling-line crawling-line--large inline-flex whitespace-nowrap font-secondary uppercase">
                {marqueeItems.map((item, index) => (
                  <div key={`${item}-${index}`} className="inline-block animate-[crawling-line_10s_linear_infinite] align-top">
                    {item}&nbsp;
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollProgressShift>
      </div>
    </section>
  );
}
