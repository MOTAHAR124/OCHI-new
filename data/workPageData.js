import assetManifest from "@/data/ochi-asset-manifest.json";

const fallbackProjectImage = "/assets/placeholders/project-01.svg";

const manifestImages = Array.isArray(assetManifest?.images) ? assetManifest.images : [];

function pickAsset(patterns, fallback = fallbackProjectImage) {
  const terms = Array.isArray(patterns) ? patterns : [patterns];

  for (const term of terms) {
    const normalized = String(term || "");
    if (!normalized) {
      continue;
    }

    const match = manifestImages.find((item) => {
      const source = String(item?.source || "");
      const localPath = String(item?.localPath || "");
      return source.includes(normalized) || localPath.includes(normalized);
    });

    if (match?.localPath) {
      return match.localPath;
    }
  }

  return fallback;
}

export const workCards = [
  {
    client: "Medallia Experience",
    title: "Medallia Experience",
    href: "https://ochi.design/case/medallia-experience-2024-presentation-ecosystem/",
    image: pickAsset("Med_Website_0"),
    tags: ["Conference", "Executive Keynote", "Product Launch"]
  },
  {
    client: "Salience Labs",
    title: "Salience Labs",
    href: "https://ochi.design/case/salience-labs-brand-identity-photonic-switches-ai/",
    image: pickAsset("Salience_Website_cover-663x550"),
    tags: ["Brand Identity", "Pitch deck"]
  },
  {
    client: "Fyde",
    title: "Fyde",
    href: "https://ochi.design/case/fyde-partnership_deck/",
    image: pickAsset("Fyde_Front-1-663x550"),
    tags: ["Audit", "Copywriting", "Sales Deck", "Slides Design"]
  },
  {
    client: "AH2 & Matt Horn",
    title: "AH2 & Matt Horn",
    href: "https://ochi.design/case/ah2-matt-horn-pitch-deck-design/",
    image: pickAsset("Frame-481692-1-663x550"),
    tags: ["Pitch deck"]
  },
  {
    client: "Cardboard Spaceship",
    title: "Cardboard Spaceship",
    href: "https://ochi.design/case/sales-deck-keynote-template/",
    image: pickAsset("CS_Website_1-663x550"),
    tags: ["Branded Template", "Sales Deck", "Social Media Templates"]
  },
  {
    client: "Vise",
    title: "Vise",
    href: "https://ochi.design/case/vise_company_presentation_design/",
    image: pickAsset("Vise_Front-1-663x550"),
    tags: ["Agency", "Company Presentation"]
  },
  {
    client: "Premium Blend",
    title: "Premium Blend",
    href: "https://ochi.design/case/presentation-template-premium_blend/",
    image: pickAsset("PB-Front-4-663x550"),
    tags: ["Branded Template"]
  },
  {
    client: "Trawa",
    title: "Trawa",
    href: "https://ochi.design/case/pitch-deck-and-brand-identity-climatech-startup/",
    image: pickAsset("Frame-3875-663x550"),
    tags: ["Brand Identity", "Design Research", "Investor Deck"]
  },
  {
    client: "Planetly",
    title: "Planetly",
    href: "https://ochi.design/case/planetly-climate-tech-pitch-deck-sales-deck/",
    image: pickAsset("10-663x550"),
    tags: [
      "Agency",
      "Big News Deck",
      "Branded Template",
      "Investor Deck",
      "Policy Deck & Playbook",
      "Sales Deck"
    ]
  },
  {
    client: "Black Book",
    title: "Black Book",
    href: "https://ochi.design/case/black_book-pitch_deck/",
    image: pickAsset("Frame-3876-663x550"),
    tags: ["Investor Deck", "Redesign", "Review"]
  },
  {
    client: "Softstart",
    title: "Softstart",
    href: "https://ochi.design/case/softstart-powerpoint_template/",
    image: pickAsset("Frame-3898-1-663x550"),
    tags: ["Branded Template", "Sales Deck"]
  },
  {
    client: "Officevibe",
    title: "Officevibe",
    href: "https://ochi.design/case/powerpoint-presentation-template-for-officevibe/",
    image: pickAsset("Officevibe-Short-1-663x550"),
    tags: ["Branded Template"]
  },
  {
    client: "Workiz Easy",
    title: "Workiz Easy",
    href: "https://ochi.design/case/internal-presentations-sales-deck-onboarding-deck/",
    image: pickAsset("Photo-663x550"),
    tags: ["Onboarding presentation", "Policy Deck & Playbook", "Sales Deck"]
  }
];

export const latestPublications = [
  {
    title: "Officevibe",
    href: "https://www.behance.net/gallery/144915203/Presentation-template-for-Officevibe",
    image: pickAsset("Frame-3878-325x325")
  },
  {
    title: "Medallia Experience",
    href: "https://www.behance.net/gallery/216281433/Medallia-Experience-2024-Product-Launch-Keynotes",
    image: pickAsset("Med_Website_0")
  },
  {
    title: "Soma Energy",
    href: "https://www.behance.net/gallery/229333903/Brand-identity-pitch-deck-design-for-Soma",
    image: pickAsset("Soma_Website_17-325x325")
  }
];

export const workHero = {
  title: "Work",
  count: workCards.length
};

