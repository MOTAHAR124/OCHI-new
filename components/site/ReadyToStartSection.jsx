import ArrowUpRightIcon from "@/components/site/ArrowUpRightIcon";
import EyesBadge from "@/components/site/EyesBadge";

export default function ReadyToStartSection() {
  return (
    <section className="rounded-section relative bg-ochi-lime py-[7rem] md:py-[8.5rem] lg:py-[14rem]">
      <div className="section-shell relative">
        <div className="text-center">
          <h2 className="heading-large leading-negative mb-[4rem] uppercase">
            Ready
            <br />
            to start
            <br />
            the project?
          </h2>
        </div>

        <div className="pointer-events-none absolute left-1/2 top-1/2 hidden w-full max-w-[36rem] -translate-x-1/2 -translate-y-1/2 lg:block">
          <EyesBadge size="clamp(8rem, 11vw, 20rem)" pupilSize="clamp(4.5rem, 6.6vw, 12rem)" />
        </div>

        <div className="grid justify-center gap-y-[1.2rem] text-center">
          <div>
            <a href="#contact" className="btn btn--primary">
              <span className="btn__text">Start the project</span>
              <span className="btn__icon btn__icon--append" aria-hidden="true">
                <ArrowUpRightIcon />
              </span>
            </a>
          </div>
          <span>OR</span>
          <div>
            <a href="mailto:hello@ochi.design" className="btn btn--default">
              <span className="btn__text">hello@ochi.design</span>
              <span className="btn__icon btn__icon--append" aria-hidden="true">
                <ArrowUpRightIcon />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
