import Image from "next/image";

export default function WorkProjectCard({ item }) {
  return (
    <article className="work-project relative">
      <div className="mb-[1.5rem] flex items-center text-[1.4rem] uppercase">
        <span className="mr-[0.8rem] h-[1rem] w-[1rem] flex-shrink-0 rounded-full bg-current" />
        <span>{item.client}</span>
      </div>

      <a className="work-project-card relative mb-[1.5rem] block" href={item.href} target="_blank" rel="noreferrer">
        <div className="work-project-card__media overflow-hidden rounded-[1rem]">
          <Image
            src={item.image}
            alt={item.title}
            width={663}
            height={550}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="work-project-card__image w-full max-w-full rounded-[1rem]"
          />
        </div>

        <h3 className="work-project__headline pointer-events-none absolute z-[2] m-0 whitespace-nowrap h1 font-semibold uppercase leading-[1] text-ochi-lime">
          {item.title.split("").map((char, index) => (
            <span
              key={`${item.title}-${index}`}
              className="work-project__char"
              style={{ transitionDelay: `${Math.min((index + 1) * 0.02, 0.98).toFixed(2)}s` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h3>
      </a>

      <div className="-mb-[1rem] flex flex-wrap items-start">
        {item.tags.map((tag) => (
          <div key={`${item.title}-${tag}`} className="mb-[1rem] mr-[1rem]">
            <a className="btn btn--default btn--small" href={item.href} target="_blank" rel="noreferrer">
              <span className="btn__text">{tag}</span>
            </a>
          </div>
        ))}
      </div>
    </article>
  );
}
