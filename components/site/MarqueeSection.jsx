const marqueeItems = ["WE ARE OCHI", "WE ARE OCHI", "WE ARE OCHI", "WE ARE OCHI"];

export default function MarqueeSection() {
  return (
    <section className="rounded-section relative z-[1] bg-ochi-green text-white">
      <div className="pb-[5rem] pt-[5rem] lg:pb-[8.5rem] lg:pt-[8.5rem]">
        <div className="marquee-frame overflow-hidden py-[1.7rem]">
          <div className="marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <div key={`${item}-${index}`} className="crawling-line-large marquee-word uppercase">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
