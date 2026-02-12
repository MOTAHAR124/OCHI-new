import RevealInView from "@/components/shared/animation/RevealInView";
import { serviceNumbers } from "@/data/servicesPageData";

export default function ServicesNumbersSection() {
  return (
    <section className="section-shell pb-[10rem] md:pb-[12rem]">
      <RevealInView>
        <h2 className="mb-[4rem] text-[3.1rem] leading-[1] md:text-[4rem] lg:text-[5.2rem]">Ochi in numbers:</h2>
      </RevealInView>

      <div className="grid gap-[1.5rem] sm:grid-cols-2 lg:grid-cols-4">
        {serviceNumbers.map((item, index) => {
          const isAccent = index === serviceNumbers.length - 1;
          return (
            <RevealInView key={item.label} delay={index * 0.06}>
              <article
                className={`h-full rounded-[1rem] p-[2.4rem] ${
                  isAccent ? "bg-ochi-lime text-ochi-ink" : "bg-ochi-gray900 text-ochi-gray100"
                }`}
              >
                <p className="display-copy mb-[1.2rem] text-[5.6rem] leading-[0.9]">{item.value}</p>
                <p className={`mb-[0.8rem] text-[2rem] leading-[1.1] ${isAccent ? "text-black/80" : "text-white"}`}>
                  {item.label}
                </p>
                <p className={`mb-0 text-[1.5rem] leading-[1.35] ${isAccent ? "text-black/65" : "text-white/70"}`}>
                  {item.detail}
                </p>
              </article>
            </RevealInView>
          );
        })}
      </div>
    </section>
  );
}
