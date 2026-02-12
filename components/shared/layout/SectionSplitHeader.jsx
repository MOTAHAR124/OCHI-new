export default function SectionSplitHeader({ title, label, description, className = "" }) {
  return (
    <div className={`outline-top grid gap-y-[2rem] py-[1.5rem] md:grid-cols-12 ${className}`}>
      <div className="md:col-span-3">
        {label ? <p className="mb-0">{label}</p> : null}
      </div>
      <div className="md:col-span-9">
        {title ? (
          <h2 className="mb-[2.4rem] text-[3.1rem] leading-[1] md:text-[4rem] lg:text-[5.2rem]">{title}</h2>
        ) : null}
        {description ? <p className="mb-0 max-w-[82rem] text-[2.2rem] leading-[1.2]">{description}</p> : null}
      </div>
    </div>
  );
}
