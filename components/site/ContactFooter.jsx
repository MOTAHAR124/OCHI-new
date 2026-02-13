import OchiLogo from "@/components/site/OchiLogo";
import RevealInView from "@/components/shared/animation/RevealInView";
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
    <footer className="relative z-[3] bg-ochi-gray100 pb-[3rem] pt-[7.5rem] lg:pt-[11.5rem]" id="contact">
      <div className="section-shell">
        <RevealInView amount={0.2} offset={36}>
          <div className="mb-[4rem] grid gap-y-[1.5rem] md:grid-cols-12 md:gap-y-[1.5rem]">
            <div className="md:col-span-5 lg:col-span-6">
              <h3 className="h1 leading-negative mb-0 uppercase">
                eye-
                <br />
                opening
              </h3>
            </div>

            <div className="md:col-span-7 lg:col-span-6">
              <h3 className="h1 leading-negative mb-[4rem] uppercase">presentations</h3>

              <div className="grid grid-cols-2 gap-[3rem]">
                <div className="md:order-last md:flex md:justify-end lg:pr-[4rem]">
                  <div>
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

                <div className="md:col-span-2">
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
                </div>

                <div className="col-span-2 grid gap-[3rem] md:col-span-1">
                  <div className="leading-[1.5]">
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

                  <div className="leading-[1.5]">
                    <p className="mb-[1.5rem]">E:</p>
                    <a href="mailto:hello@ochi.design" className="link link--underline">
                      hello@ochi.design
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealInView>

        <RevealInView delay={0.1} amount={0.2} offset={24}>
          <div className="grid gap-y-[1.5rem] pt-[1.2rem] md:grid-cols-12 md:items-end lg:pt-[1.6rem]">
            <div className="mb-[3.6rem] md:col-span-5 md:mb-0 lg:col-span-6">
              <a className="inline-flex" href="#top" aria-label="Back to top">
                <OchiLogo />
              </a>
            </div>

            <div className="leading-none text-black/30 md:col-span-4 md:-mr-[3rem] lg:col-span-4">
              &copy; ochi design 2026.{" "}
              <a className="link link--underline" href="#contact">
                Legal Terms
              </a>
            </div>

            <div className="leading-none text-black/30 md:col-span-3 md:text-right lg:col-span-2">
              <span className="link">Website by Obys</span>
            </div>
          </div>
        </RevealInView>
      </div>
    </footer>
  );
}
