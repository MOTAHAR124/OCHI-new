"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import OchiLogo from "@/components/site/OchiLogo";
import { headerLinks, officeLocations, socialLinks } from "@/data/siteData";

function NavLink({ label, href, onClick, animated = false, active = false }) {
  if (!animated) {
    return (
      <Link
        href={href}
        className={`link main-nav__link${active ? " link--underline main-nav__link--active" : ""}`}
        onClick={onClick}
      >
        {label}
      </Link>
    );
  }

  return (
    <Link href={href} className={`link link--custom main-nav__link${active ? " link--active" : ""}`} onClick={onClick}>
      <span className="link__inner">
        <span className="link__default-text">{label}</span>
        <span className="link__hover-text">{label}</span>
      </span>
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [hash, setHash] = useState(() => (typeof window !== "undefined" ? window.location.hash || "" : ""));
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(64);
  const headerRef = useRef(null);
  const lastScrollYRef = useRef(0);
  const rafIdRef = useRef(0);
  const headerHeightRef = useRef(64);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return undefined;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const updateHash = () => {
      setHash(window.location.hash || "");
    };

    window.addEventListener("hashchange", updateHash);

    return () => {
      window.removeEventListener("hashchange", updateHash);
    };
  }, []);

  useEffect(() => {
    const updateHeaderHeight = () => {
      const nextHeight = headerRef.current?.offsetHeight ?? 64;
      if (nextHeight !== headerHeightRef.current) {
        headerHeightRef.current = nextHeight;
        setHeaderHeight(nextHeight);
      }
    };

    updateHeaderHeight();

    let resizeObserver;
    if (typeof ResizeObserver !== "undefined" && headerRef.current) {
      resizeObserver = new ResizeObserver(updateHeaderHeight);
      resizeObserver.observe(headerRef.current);
    }

    window.addEventListener("resize", updateHeaderHeight);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, []);

  useEffect(() => {
    if (open) {
      return undefined;
    }

    lastScrollYRef.current = window.scrollY;

    const onScroll = () => {
      if (rafIdRef.current) {
        return;
      }

      rafIdRef.current = window.requestAnimationFrame(() => {
        const currentY = Math.max(window.scrollY, 0);
        const previousY = lastScrollYRef.current;
        const delta = currentY - previousY;
        const threshold = headerHeightRef.current;

        if (currentY <= threshold) {
          setIsVisible(true);
        } else if (delta > 1.5) {
          setIsVisible(false);
        } else if (delta < -1.5) {
          setIsVisible(true);
        }

        lastScrollYRef.current = currentY;
        rafIdRef.current = 0;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafIdRef.current) {
        window.cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = 0;
      }
    };
  }, [open]);

  const isWorkPage = pathname === "/work";
  const normalizePath = (value) => {
    if (!value || value === "/") {
      return "/";
    }
    return value.replace(/\/+$/, "");
  };

  const matchesPath = (currentPath, targetPath) => {
    if (targetPath === "/") {
      return currentPath === "/";
    }
    return currentPath === targetPath || currentPath.startsWith(`${targetPath}/`);
  };

  const currentPath = normalizePath(pathname || "/");
  const currentHash = hash || (typeof window !== "undefined" ? window.location.hash || "" : "");

  const isHeaderLinkActive = (item) => {
    if (item.label === "Services") {
      return matchesPath(currentPath, "/services");
    }
    if (item.label === "Our work") {
      return matchesPath(currentPath, "/work");
    }
    if (item.label === "About us") {
      return matchesPath(currentPath, "/about");
    }
    if (item.label === "Insights") {
      return matchesPath(currentPath, "/insights");
    }
    if (item.label === "Contact us") {
      return matchesPath(currentPath, "/contact") || (currentPath === "/" && currentHash === "#contact");
    }

    const [rawPath, rawHash] = item.href.split("#");
    const targetPath = normalizePath(rawPath || "/");
    if (rawHash) {
      return currentPath === targetPath && currentHash === `#${rawHash}`;
    }

    return matchesPath(currentPath, targetPath);
  };

  return (
    <>
      <div
        aria-hidden="true"
        className={isWorkPage ? "bg-ochi-lime" : undefined}
        style={{ height: `${headerHeight}px` }}
      />

      <header
        ref={headerRef}
        data-component="header"
        className={`fixed inset-x-0 top-0 z-30 ${
          open ? "bg-ochi-gray900 text-ochi-gray100" : "header-frosted text-ochi-ink"
        } ${open || isVisible ? "header-state-visible" : "header-state-hidden"}`}
      >
        <div className="section-shell py-[1.5rem]">
          <div className="grid grid-cols-12 items-center gap-x-[1rem]">
            <div className="col-span-6">
              <Link href="/" className="inline-flex">
                <OchiLogo className="h-auto w-[6.8rem] md:w-[7.2rem]" />
              </Link>
            </div>

            <div className="col-span-6 hidden lg:flex">
              <ul className="header-nav flex-grow text-[1.6rem] leading-none">
                {headerLinks.map((item) => (
                  <li key={item.label}>
                    <NavLink label={item.label} href={item.href} active={isHeaderLinkActive(item)} animated />
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-6 flex justify-end lg:hidden">
              <button
                type="button"
                className="grid h-[2.4rem] w-[2.4rem] place-items-center"
                aria-label="Toggle menu"
                aria-expanded={open}
                onClick={() => setOpen((value) => !value)}
              >
                <svg className="overflow-visible" width="24" height="9" viewBox="0 0 24 9" fill="none">
                  <line
                    x1="24"
                    y1="8"
                    x2="0"
                    y2="8"
                    stroke="currentColor"
                    className={`origin-center transition duration-300 ${
                      open ? "-translate-y-[3px] rotate-45" : ""
                    }`}
                  />
                  <line
                    x1="24"
                    y1="1"
                    x2="0"
                    y2="1"
                    stroke="currentColor"
                    className={`origin-center transition duration-300 ${
                      open ? "translate-y-[3px] -rotate-45" : ""
                    }`}
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.35, ease: [0.3, 0.86, 0.36, 0.95] }}
            className="fixed inset-x-0 z-40 overflow-hidden bg-ochi-gray900 text-ochi-gray100"
            style={{ top: `${headerHeight}px`, height: `calc(100vh - ${headerHeight}px)` }}
          >
            <div className="section-shell h-full pb-[3rem] pt-[6rem]">
              <div className="outline-top h-full overflow-y-auto" data-lenis-prevent>
                <ul className="mb-[7.5rem] grid gap-[1.5rem] py-[1.5rem]">
                  {headerLinks.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className={`h1 leading-negative uppercase${isHeaderLinkActive(item) ? " link link--underline" : ""}`}
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="grid gap-[3rem] pb-8">
                  <div>
                    <p className="mb-[1.5rem]">S:</p>
                    <ul className="leading-loose">
                      {socialLinks.map((item) => (
                        <li key={item.label}>
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noreferrer"
                            className="link link--underline"
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="leading-loose">
                    <p className="mb-[1.5rem]">L:</p>
                    <address className="m-0 not-italic">
                      {officeLocations.map((line, index) =>
                        line ? (
                          <span key={line} className="block">
                            <span className="link link--underline">{line}</span>
                          </span>
                        ) : (
                          <br key={`break-${index}`} />
                        )
                      )}
                    </address>
                  </div>
                  <div className="leading-loose">
                    <p className="mb-[1.5rem]">E:</p>
                    <a href="mailto:hello@ochi.design" className="link link--underline">
                      hello@ochi.design
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
