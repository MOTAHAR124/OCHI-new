import assetManifest from "@/data/ochi-asset-manifest.json";

const manifestImages = Array.isArray(assetManifest?.images) ? assetManifest.images : [];

function pickInsightAsset(patterns, fallback) {
  const searchTerms = Array.isArray(patterns) ? patterns : [patterns];

  for (const searchTerm of searchTerms) {
    const found = manifestImages.find((item) => {
      const source = String(item?.source || "");
      const localPath = String(item?.localPath || "");
      return source.includes(searchTerm) || localPath.includes(searchTerm);
    });

    if (found?.localPath) {
      return found.localPath;
    }
  }

  return fallback;
}

export const insightCategories = [
  { id: "all", label: "All" },
  { id: "news", label: "News" },
  { id: "pitch-deck", label: "Pitch Deck" },
  { id: "presentation-agency", label: "Presentation Agency" },
  { id: "presentation-template", label: "Presentation Template" },
  { id: "public-speaking", label: "Public speaking" },
  { id: "storytelling", label: "Storytelling" }
];

export const insightCategoryLabels = {
  news: "News",
  "pitch-deck": "Pitch Deck",
  "presentation-agency": "Presentation Agency",
  "presentation-template": "Presentation Template",
  "public-speaking": "Public speaking",
  storytelling: "Storytelling"
};

export const insightArticles = [
  {
    title: "Best Presentation Agencies 2025: top 5 studios defining business storytelling",
    href: "https://ochi.design/insights-top-5-best-presentation-agencies-2025/",
    image: pickInsightAsset("INSTAGRAM_1-1", "https://ochi.design/wp-content/uploads/2025/08/INSTAGRAM_1-1.png"),
    width: 663,
    height: 663,
    categories: ["presentation-agency"],
    author: "Mira Davis",
    date: "27 Aug. 25"
  },
  {
    title: "Salience Labs Secures $30M to Redefine AI Infrastructure",
    href: "https://ochi.design/salience-labs-pitch-deck-brand-identity-series-a-round/",
    image: pickInsightAsset("SL_Website_238-1-663x663", "https://ochi.design/wp-content/uploads/2025/02/SL_Website_238-1-663x663.png"),
    width: 663,
    height: 663,
    categories: ["news", "pitch-deck"],
    author: "Kseniia Palamarchuk",
    date: "08 Feb. 25"
  },
  {
    title: "Nala Earth Secures €4M in Seed Funding to Transform Nature Tech",
    href: "https://ochi.design/clients-success-stories-pitch-deck-development/",
    image: pickInsightAsset("front_exploration_265-1-663x663", "https://ochi.design/wp-content/uploads/2025/01/front_exploration_265-1-663x663.png"),
    width: 663,
    height: 663,
    categories: ["pitch-deck", "news"],
    author: "Kseniia Palamarchuk",
    date: "07 Jan. 25"
  },
  {
    title: "Why hiring a presentation agency will boost your business",
    href: "https://ochi.design/insights-why-hire-presentation-agency/",
    image: pickInsightAsset("v3_0-663x663", "https://ochi.design/wp-content/uploads/2023/11/v3_0-663x663.png"),
    width: 663,
    height: 663,
    categories: ["presentation-agency"],
    author: "Mira Davis",
    date: "09 Aug. 24"
  },
  {
    title: "Our client trawa raises €10M in seed funding",
    href: "https://ochi.design/insights-pitch-deck-presentation-agency/",
    image: pickInsightAsset("trawa_website-663x497", "https://ochi.design/wp-content/uploads/2024/07/trawa_website-663x497.png"),
    width: 663,
    height: 497,
    categories: ["pitch-deck", "news"],
    author: "Kseniia Palamarchuk",
    date: "31 Jul. 24"
  },
  {
    title: "The art of presenting: Tips on successful presentation and lessons learned",
    href: "https://ochi.design/tips-for-sucessful-presentation-international-audience/",
    image: pickInsightAsset("Frame-41265-663x806", "https://ochi.design/wp-content/uploads/2024/08/Frame-41265-663x806.png"),
    width: 663,
    height: 806,
    categories: ["public-speaking", "storytelling"],
    author: "Ihor Hulyahrodskyy",
    date: "26 May. 23"
  },
  {
    title: "Developing company-wide presentation template for Premium Blend",
    href: "https://ochi.design/insights-why-your-company-needs-presentation-template/",
    image: pickInsightAsset("front-5_optimized-663x663", "https://ochi.design/wp-content/uploads/2022/12/front-5_optimized-663x663.jpg"),
    width: 663,
    height: 663,
    categories: ["presentation-template"],
    author: "Ihor Hulyahrodskyy",
    date: "07 Dec. 22"
  }
];

export const insightInstagramPosts = [
  {
    title: "Gift guide for creatives",
    href: "https://www.instagram.com/p/DDYTv7lPuNQ/?img_index=1",
    image: pickInsightAsset("ochi.design_4-650x650", "https://ochi.design/wp-content/uploads/2025/08/ochi.design_4-650x650.png"),
    width: 650,
    height: 650
  },
  {
    title: "Future looks green",
    href: "https://www.instagram.com/p/DAqlh4AxVMD/?img_index=1",
    image: pickInsightAsset("ochi.design_5-650x650", "https://ochi.design/wp-content/uploads/2025/08/ochi.design_5-650x650.png"),
    width: 650,
    height: 650
  },
  {
    title: "Trawa raises €24M",
    href: "https://www.instagram.com/ochi_design/",
    image: pickInsightAsset("ochi.design_3-650x650", "https://ochi.design/wp-content/uploads/2025/08/ochi.design_3-650x650.png"),
    width: 650,
    height: 650
  }
];
