import assetManifest from "@/data/ochi-asset-manifest.json";
import servicesSource from "@/data/services-source.json";

const fallbackProjectImages = [
  "/assets/placeholders/project-01.svg",
  "/assets/placeholders/project-02.svg",
  "/assets/placeholders/project-03.svg",
  "/assets/placeholders/project-04.svg"
];

const fallbackAvatarImages = [
  "/assets/placeholders/avatar-01.svg",
  "/assets/placeholders/avatar-02.svg",
  "/assets/placeholders/avatar-03.svg",
  "/assets/placeholders/avatar-04.svg"
];

const phaseFallbackImages = [
  "/assets/ochi/047-1-Discovery-194x194-d5b6a2b9.png",
  "/assets/ochi/048-2-Structure-194x194-637d21d7.png",
  "/assets/ochi/049-3-Design-194x194-993f6feb.png",
  "/assets/ochi/050-4-Feedback-194x194-1ec0238e.png",
  "/assets/ochi/051-5-Delivery-194x194-8868fc5b.png"
];

const manifestImages = Array.isArray(assetManifest?.images) ? assetManifest.images : [];

function pickAsset(patterns, fallback) {
  const searchTerms = Array.isArray(patterns) ? patterns : [patterns];

  for (const searchTerm of searchTerms) {
    const normalized = String(searchTerm || "");
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

function sourceFileStem(url) {
  const pathPart = String(url || "").split("?")[0];
  const fileName = pathPart.split("/").pop() || "";
  return fileName.replace(/\.[^.]+$/, "");
}

function pickAssetFromSource(url, fallback) {
  const fileStem = sourceFileStem(url);
  if (!fileStem) {
    return fallback;
  }

  return pickAsset([fileStem, decodeURIComponent(fileStem)], fallback);
}

function joinParagraphs(paragraphs) {
  if (!Array.isArray(paragraphs)) {
    return "";
  }

  return paragraphs.filter(Boolean).join("\n\n");
}

const defaultCardImages = {
  salience: pickAsset(["Salience_Website_cover-663x551", "Salience_Website_cover-663x550"], fallbackProjectImages[0]),
  medallia: pickAsset("Med_Website_0", fallbackProjectImages[1]),
  vise: pickAsset(["Vise_Front-1-663x551", "Vise_Front-1-663x550"], fallbackProjectImages[2]),
  trawa: pickAsset(["Frame-3875-663x551", "Frame-3875-663x550"], fallbackProjectImages[3]),
  cardboard: pickAsset(["CS_Website_1-663x551", "CS_Website_1-663x550"], fallbackProjectImages[0]),
  fyde: pickAsset(["Fyde_Front-1-663x551", "Fyde_Front-1-663x550"], fallbackProjectImages[1]),
  softstart: pickAsset(["SoftStart-1340x848", "SoftStart-scaled"], fallbackProjectImages[2]),
  premiumBlend: pickAsset(["PB-Front-4-663x551", "PB-Front-4-663x550"], fallbackProjectImages[3]),
  workiz: pickAsset(["Workiz_1-2-1340x848", "Workiz_1-2-scaled"], fallbackProjectImages[0]),
  progressReport: pickAsset("Asset-34-20-663x448", fallbackProjectImages[0]),
  planetly: pickAsset(["Planetly_1-1340x740", "Planetly_1"], fallbackProjectImages[1]),
  blackBook: pickAsset(["BB_WEB_1-1340x740", "BB_WEB_1"], fallbackProjectImages[2])
};

const projectImageByTitle = {
  Trawa: defaultCardImages.trawa,
  Planetly: defaultCardImages.planetly,
  "Black Book": defaultCardImages.blackBook,
  Vise: defaultCardImages.vise,
  "Cardboard Spaceship": defaultCardImages.cardboard,
  Fyde: defaultCardImages.fyde,
  Softstart: defaultCardImages.softstart,
  "Premium Blend": defaultCardImages.premiumBlend,
  "Workiz Easy": defaultCardImages.workiz,
  Medallia: defaultCardImages.medallia,
  "Salience Labs": defaultCardImages.salience
};

const capabilityButtonByTitle = Object.fromEntries(
  (Array.isArray(servicesSource?.capabilityButtons) ? servicesSource.capabilityButtons : []).map((item) => [item.title, item])
);

function capabilityItem(title, fallback) {
  const sourceItem = capabilityButtonByTitle[title];
  return {
    title,
    hoverImage: pickAssetFromSource(sourceItem?.hoverImage, fallback)
  };
}

export const servicesHeroIntro =
  "Our work has helped clients secure $400M+ in funding, wow small and global stages, and shape how the world sees them.";

export const servicesClientTypes = Array.isArray(servicesSource?.clientTypes)
  ? servicesSource.clientTypes
  : [];

export const processPhases = (Array.isArray(servicesSource?.phases) ? servicesSource.phases : []).map((phase, index) => ({
  number: phase.number,
  title: phase.title,
  description: phase.description,
  image: pickAssetFromSource(phase.image, phaseFallbackImages[index] || fallbackProjectImages[0])
}));

export const capabilityGroups = [
  {
    columns: [
      {
        title: "Raise Funds:",
        items: [
          capabilityItem("Investor Deck", defaultCardImages.trawa),
          capabilityItem("Startup pitch", defaultCardImages.trawa)
        ]
      },
      {
        title: "Sell Products:",
        items: [
          capabilityItem("Business Proposal", defaultCardImages.medallia),
          capabilityItem("Company Presentation", defaultCardImages.medallia),
          capabilityItem("Product Presentation", defaultCardImages.medallia),
          capabilityItem("Sales Deck", defaultCardImages.medallia),
          capabilityItem("Service Deck", defaultCardImages.medallia)
        ]
      }
    ]
  },
  {
    columns: [
      {
        title: "Hire & Manage People:",
        items: [
          capabilityItem("Big News Deck", defaultCardImages.workiz),
          capabilityItem("Branded Template", defaultCardImages.workiz),
          capabilityItem("Onboarding presentation", defaultCardImages.workiz),
          capabilityItem("Policy Deck & Playbook", defaultCardImages.workiz),
          capabilityItem("Progress Report", defaultCardImages.progressReport)
        ]
      },
      {
        title: "Additional:",
        items: [
          capabilityItem("Agency", defaultCardImages.cardboard),
          capabilityItem("Branding", defaultCardImages.cardboard),
          capabilityItem("Corporate Training", defaultCardImages.cardboard),
          capabilityItem("Redesign", defaultCardImages.cardboard),
          capabilityItem("Review", defaultCardImages.cardboard)
        ]
      }
    ]
  }
];

const popupByTitle = Object.fromEntries(
  (Array.isArray(servicesSource?.popups) ? servicesSource.popups : []).map((popup) => [popup.title, popup])
);

const serviceOrder = [
  "Investor Deck",
  "Startup pitch",
  "Business Proposal",
  "Company Presentation",
  "Product Presentation",
  "Sales Deck",
  "Service Deck",
  "Big News Deck",
  "Branded Template",
  "Onboarding presentation",
  "Policy Deck & Playbook",
  "Progress Report",
  "Agency",
  "Branding",
  "Corporate Training",
  "Redesign",
  "Review"
];

export const serviceDetails = Object.fromEntries(
  serviceOrder.map((title) => {
    const popup = popupByTitle[title] || { paragraphs: [], projects: [] };

    return [
      title,
      {
        title,
        description: popup.paragraphs?.[0] || "",
        paragraphs: Array.isArray(popup.paragraphs) ? popup.paragraphs : [],
        projects: Array.isArray(popup.projects)
          ? popup.projects.map((project) => ({
              title: project.title,
              href: project.href,
              image: projectImageByTitle[project.title] || fallbackProjectImages[0]
            }))
          : []
      }
    ];
  })
);

export const serviceReviewRows = (Array.isArray(servicesSource?.reviews) ? servicesSource.reviews : []).map(
  (review, index) => ({
    company: review.company,
    href: review.href,
    reviewer: review.reviewer,
    services: Array.isArray(review.services) ? review.services : [],
    avatar: pickAssetFromSource(review.avatar, fallbackAvatarImages[index % fallbackAvatarImages.length]),
    quote: review.quote
  })
);

export const serviceNumbers = [
  { value: "100+", label: "Clients from 17 Countries" },
  { value: "$400M+", label: "Million raised by our clients" },
  { value: "91%", label: "Of our clients come back" },
  { value: "94.5%", label: "Net Promoting Score" }
];

export const whyUsItems = Array.isArray(servicesSource?.why) ? servicesSource.why : [];

// Compatibility exports for existing page-specific modules.
export const simpleApproachCards = servicesClientTypes.map((item) => ({
  title: item.title,
  description: item.description
}));

export const serviceCatalog = Object.values(serviceDetails).map((item) => ({
  title: item.title,
  summary: joinParagraphs(item.paragraphs),
  tags: [],
  projects: item.projects
}));
