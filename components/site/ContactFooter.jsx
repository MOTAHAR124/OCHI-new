import OchiLogo from "@/components/site/OchiLogo";
import { footerMenuLinks, officeLocations, socialLinks } from "@/data/siteData";

const locationGroups = officeLocations
  .reduce((groups, line) => {
    if (!line) {
      const lastGroup = groups[groups.length - 1];
      if (lastGroup && lastGroup.length > 0) {
        groups.push([]);
      }
      return groups;
    }

    if (groups.length === 0) {
      groups.push([]);
    }
    groups[groups.length - 1].push(line);
    return groups;
  }, [])
  .filter((group) => group.length > 0);

export default function ContactFooter() {
  return (
    <footer
      className="relative z-[3] min-h-[100dvh] bg-ochi-gray100 pb-[3rem] pt-[5rem] md:pt-[7rem] lg:pt-[9rem]"
      id="contact"
    >
      <div className="section-shell flex min-h-[calc(100dvh-8rem)] flex-col">
        <div className="grid flex-1 gap-y-[3rem] md:grid-cols-12">
          <div className="md:col-span-5 lg:col-span-6">
            <h2 className="h1 leading-negative mb-0 uppercase">
              eye-
              <br />
              opening
            </h2>
          </div>

          <div className="md:col-span-7 lg:col-span-6">
            <h2 className="h1 leading-negative mb-[3.5rem] uppercase md:mb-[4.8rem]">presentations</h2>

            <div className="grid gap-y-[3rem] md:grid-cols-[minmax(0,1fr)_auto] md:gap-x-[9rem]">
              <div className="space-y-[3rem]">
                <div>
                  <p className="mb-[1.5rem]">S:</p>
                  <ul className="leading-[1.35]">
                    {socialLinks.map((item) => (
                      <li key={item.label}>
                        <a href={item.href} target="_blank" rel="noreferrer" className="link link--underline">
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="mb-[1.5rem]">L:</p>
                  <address className="m-0 not-italic">
                    {locationGroups.map((group, groupIndex) => (
                      <div
                        key={`location-group-${groupIndex}`}
                        className={groupIndex === locationGroups.length - 1 ? "" : "mb-[2.6rem]"}
                      >
                        {group.map((line) => (
                          <span key={line} className="block leading-[1.35]">
                            <span className="link link--underline">{line}</span>
                          </span>
                        ))}
                      </div>
                    ))}
                  </address>
                </div>

                <div>
                  <p className="mb-[1.5rem]">E:</p>
                  <a href="mailto:hello@ochi.design" className="link link--underline">
                    hello@ochi.design
                  </a>
                </div>
              </div>

              <div className="md:pt-[18.5rem] lg:pt-[18rem]">
                <p className="mb-[1.5rem]">M:</p>
                <ul className="footer-nav leading-[1.35]">
                  {footerMenuLinks.map((item) => (
                    <li key={item.label}>
                      <a href={item.href} className="footer-nav__link link link--underline">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-y-[1.5rem] pt-[3.5rem] md:grid-cols-12 md:items-end">
          <div className="mb-[2.8rem] md:col-span-5 md:mb-0 lg:col-span-6">
            <a className="inline-flex" href="#top" aria-label="Back to top">
              <OchiLogo />
            </a>
          </div>

          <div className="text-[rgba(33,33,33,0.35)] md:col-span-4 md:-mr-[3rem] lg:col-span-4">
            (c) ochi design 2026.{" "}
            <a className="link link--underline" href="#contact">
              Legal Terms
            </a>
          </div>

          <div className="text-[rgba(33,33,33,0.35)] md:col-span-3 md:text-right lg:col-span-2">
            <span className="link">Website by Obys</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
