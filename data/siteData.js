import assetManifest from "@/data/ochi-asset-manifest.json";

const fallbackProjectImages = [
  "/assets/placeholders/project-01.svg",
  "/assets/placeholders/project-02.svg",
  "/assets/placeholders/project-03.svg",
  "/assets/placeholders/project-04.svg"
];

const fallbackAvatars = [
  "/assets/placeholders/avatar-01.svg",
  "/assets/placeholders/avatar-02.svg",
  "/assets/placeholders/avatar-03.svg",
  "/assets/placeholders/avatar-04.svg"
];

const manifestImages = Array.isArray(assetManifest?.images) ? assetManifest.images : [];
const downloadedImages = manifestImages
  .map((item) => item?.localPath)
  .filter((item) => typeof item === "string" && item.startsWith("/"));

function pickAsset(patterns, fallback) {
  const searchTerms = Array.isArray(patterns) ? patterns : [patterns];
  for (const searchTerm of searchTerms) {
    const match = manifestImages.find((item) => {
      const source = String(item?.source || "");
      const localPath = String(item?.localPath || "");
      return source.includes(searchTerm) || localPath.includes(searchTerm);
    });
    if (match?.localPath) {
      return match.localPath;
    }
  }
  return fallback;
}

function resolveImage(index, fallbackList) {
  return downloadedImages[index] || fallbackList[index % fallbackList.length];
}

export const featuredProjects = [
  {
    title: "SALIENCE LABS",
    client: "Salience Labs",
    tags: ["Brand Identity", "Pitch Deck"],
    image: pickAsset(["Salience_Website_cover-663x551", "Salience_Website_cover-663x550"], resolveImage(0, fallbackProjectImages))
  },
  {
    title: "MEDALLIA EXPERIENCE",
    client: "Medallia Experience",
    tags: ["Conference", "Executive Keynote", "Product Launch"],
    image: pickAsset("Med_Website_0", resolveImage(1, fallbackProjectImages))
  },
  {
    title: "AH2 & MATT HORN",
    client: "AH2 & Matt Horn",
    tags: ["Pitch Deck"],
    image: pickAsset(["Frame-481692-1-663x551", "Frame-481692-1-663x550"], resolveImage(2, fallbackProjectImages))
  },
  {
    title: "VISE",
    client: "Vise",
    tags: ["Agency", "Company Presentation"],
    image: pickAsset(["Vise_Front-1-663x551", "Vise_Front-1-663x550"], resolveImage(3, fallbackProjectImages))
  },
  {
    title: "SOFTSTART",
    client: "Softstart",
    tags: ["Branded Template", "Sales Deck"],
    image: pickAsset(["Frame-3898-1-663x551", "Frame-3898-1-663x550"], resolveImage(0, fallbackProjectImages))
  },
  {
    title: "FYDE",
    client: "Fyde",
    tags: ["Audit", "Copywriting", "Sales Deck", "Slides Design"],
    image: pickAsset(["Fyde_Front-1-663x551", "Fyde_Front-1-663x550"], resolveImage(1, fallbackProjectImages))
  },
  {
    title: "ALL THINGS GO",
    client: "All Things Go",
    tags: ["Brand Identity", "Pitch Deck"],
    image: pickAsset("ATG_Website_1-663x551", resolveImage(2, fallbackProjectImages))
  },
  {
    title: "TRAWA",
    client: "Trawa",
    tags: ["Brand Identity", "Design Research", "Investor Deck"],
    image: pickAsset(["Frame-3875-663x551", "Frame-3875-663x550"], resolveImage(3, fallbackProjectImages))
  },
  {
    title: "CARDBOARD SPACESHIP",
    client: "Cardboard Spaceship",
    tags: ["Branded Template", "Sales Deck", "Social Media Templates"],
    image: pickAsset(["CS_Website_1-663x551", "CS_Website_1-663x550"], resolveImage(0, fallbackProjectImages))
  },
  {
    title: "PREMIUM BLEND",
    client: "Premium Blend",
    tags: ["Branded Template"],
    image: pickAsset(["PB-Front-4-663x551", "PB-Front-4-663x550"], resolveImage(1, fallbackProjectImages))
  }
];

export const heroSideImage = pickAsset("content-image01", "/assets/placeholders/team-main.svg");

export const aboutImage = pickAsset(["Homepage-Photo-663x469", "Homepage-Photo-1326x939"], "/assets/placeholders/team-main.svg");

export const eyesBackdrop = pickAsset(
  ["Top-Viewbbcbv-1-1440x921", "Top-Viewbbcbv-1-scaled"],
  "/assets/placeholders/project-04.svg"
);

export const teamMembers = [
  {
    name: "Becky",
    role: "Strategy Lead",
    avatar: pickAsset("Becky-300x300", fallbackAvatars[0])
  },
  {
    name: "Nina",
    role: "Design Director",
    avatar: pickAsset("Nina-jpg", fallbackAvatars[1])
  },
  {
    name: "Tomer",
    role: "Motion Lead",
    avatar: pickAsset("Tomer", fallbackAvatars[2])
  },
  {
    name: "William Barnes",
    role: "Client Partner",
    avatar: pickAsset("William-Barnes-1-300x300", fallbackAvatars[3])
  }
];

export const services = [
  {
    title: "Pitch deck design",
    description:
      "Investor-ready decks with clear narrative pacing and visual hierarchy."
  },
  {
    title: "Presentation strategy",
    description:
      "Story architecture and messaging systems for founders and marketing teams."
  },
  {
    title: "Motion and interaction",
    description:
      "Motion systems and interactions that keep attention and improve comprehension."
  },
  {
    title: "Brand communication",
    description:
      "Design frameworks across campaign decks, workshops, and internal storytelling."
  }
];

export const serviceCards = [
  {
    title: "Investor deck",
    subtitle: "Story, structure, and design for fundraise materials.",
    image: pickAsset("logo001", "/assets/placeholders/project-01.svg"),
    tags: ["Pitch deck", "Narrative"]
  },
  {
    title: "Sales deck",
    subtitle: "High-conversion decks for sales and partnerships.",
    image: pickAsset("logo002", "/assets/placeholders/project-02.svg"),
    tags: ["Sales", "Training"]
  },
  {
    title: "Company templates",
    subtitle: "Scalable branded templates for internal teams.",
    image: pickAsset("logo003", "/assets/placeholders/project-03.svg"),
    tags: ["Brand system", "Templates"]
  }
];

export const clientLogos = [
  "Yahoo",
  "Medallia",
  "Uber",
  "Lexus",
  "Salience Labs",
  "Trawa",
  "All Things Go",
  "Karman Ventures"
];

export const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/ochi_design/" },
  { label: "Behance", href: "https://www.behance.net/ochi_design" },
  { label: "Facebook", href: "https://www.facebook.com/OCHI-presentation-design-103605044779378/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/56403597" }
];

export const headerLinks = [
  { label: "Services", href: "#services" },
  { label: "Our work", href: "#featured" },
  { label: "About us", href: "#team" },
  { label: "Insights", href: "#services" },
  { label: "Contact us", href: "#contact" }
];

export const footerMenuLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "#services" },
  { label: "Our work", href: "#featured" },
  { label: "About us", href: "#team" },
  { label: "Insights", href: "#services" },
  { label: "Contact us", href: "#contact" }
];

export const officeLocations = [
  "202-1965 W 4th Ave",
  "Vancouver, Canada",
  "",
  "30 Chukarina St",
  "Lviv, Ukraine"
];

export const clientReviews = [
  {
    company: "Karman Ventures",
    reviewer: "William Barnes",
    services: ["Investor Deck", "Sales Deck"],
    quote:
      "They were transparent through every project stage and delivered high-quality outcomes from story to design.",
    avatar: pickAsset("William-Barnes-1-300x300", fallbackAvatars[0])
  },
  {
    company: "Medallia",
    reviewer: "Becky",
    services: ["Executive Keynote", "Conference", "Product Launch"],
    quote:
      "The team translated complex product and event content into a cohesive presentation ecosystem.",
    avatar: pickAsset("Becky-300x300", fallbackAvatars[1])
  },
  {
    company: "Trawa",
    reviewer: "Tomer",
    services: ["Brand Identity", "Investor Deck"],
    quote:
      "The narrative and visual system gave us a clear positioning story for both investors and customers.",
    avatar: pickAsset("Tomer", fallbackAvatars[2])
  }
];

export const menuLinks = headerLinks;
