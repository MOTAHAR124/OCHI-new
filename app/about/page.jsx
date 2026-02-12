import Image from "next/image";
import Link from "next/link";
import { teamMembers } from "@/data/siteData";

export const metadata = {
  title: "About | Ochi Inspired Studio"
};

const values = [
  "Narrative-first design that clarifies complex ideas quickly.",
  "Visual systems built for motion, storytelling, and conversion.",
  "Hands-on collaboration with marketing and product teams.",
  "Delivery cadence optimized for high-stakes presentations."
];

export default function AboutPage() {
  return (
    <div className="section-shell space-y-20 pb-24">
      <section className="space-y-10 border-b border-black/10 pb-16">
        <p className="text-xs uppercase tracking-[0.3em] text-black/60">About</p>
        <h1 className="display-copy text-[clamp(3.2rem,10vw,9rem)] leading-[0.88]">
          WE BUILD
          <br />
          EYE-OPENING
          <br />
          STORIES
        </h1>
        <p className="max-w-3xl text-lg leading-relaxed text-black/75 md:text-xl">
          This project recreates the public look and feel of the Ochi homepage using
          Next.js 16 App Router, Tailwind CSS, and Framer Motion. It keeps the visual
          language and motion direction while leaving out proprietary backend logic.
        </p>
      </section>

      <section className="grid gap-12 md:grid-cols-[1.2fr_1fr]">
        <div className="space-y-5">
          <p className="text-xs uppercase tracking-[0.3em] text-black/60">Values</p>
          <ul className="space-y-4 text-lg leading-relaxed text-black/75">
            {values.map((value) => (
              <li key={value} className="rounded-2xl border border-black/10 bg-white/40 p-5">
                {value}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-black/10 bg-ochi-slate p-8 text-ochi-bone shadow-card">
          <p className="text-xs uppercase tracking-[0.3em] text-white/70">How We Work</p>
          <ol className="mt-6 space-y-5 text-sm text-white/80 md:text-base">
            <li>
              <span className="block text-xs uppercase tracking-[0.2em] text-white/60">01</span>
              Discovery workshop and business framing.
            </li>
            <li>
              <span className="block text-xs uppercase tracking-[0.2em] text-white/60">02</span>
              Narrative arc, storyboard, and prototype motion language.
            </li>
            <li>
              <span className="block text-xs uppercase tracking-[0.2em] text-white/60">03</span>
              Design production, stakeholder reviews, and final handoff.
            </li>
          </ol>
        </div>
      </section>

      <section className="space-y-7">
        <p className="text-xs uppercase tracking-[0.3em] text-black/60">Core Team</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <article
              key={member.name}
              className="rounded-2xl border border-black/10 bg-white/55 p-5 shadow-sm"
            >
              <Image
                src={member.avatar}
                alt={member.name}
                width={56}
                height={56}
                className="h-14 w-14 rounded-full border border-black/15 object-cover"
                loading="lazy"
              />
              <h3 className="mt-4 text-xl font-semibold">{member.name}</h3>
              <p className="text-sm uppercase tracking-[0.18em] text-black/55">{member.role}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="contact"
        className="rounded-3xl border border-black/10 bg-ochi-lime px-8 py-10 text-ochi-slate md:px-14 md:py-16"
      >
        <p className="text-xs uppercase tracking-[0.3em]">Start a Project</p>
        <h2 className="display-copy mt-4 text-[clamp(2.5rem,8vw,6rem)] leading-[0.88]">
          LET&apos;S TALK
        </h2>
        <Link
          href="mailto:hello@studio.test"
          className="mt-7 inline-flex items-center rounded-full border border-ochi-slate px-6 py-3 text-sm uppercase tracking-[0.16em] transition hover:bg-ochi-slate hover:text-ochi-bone"
        >
          hello@studio.test
        </Link>
      </section>
    </div>
  );
}

