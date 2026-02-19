import assetManifest from "@/data/ochi-asset-manifest.json";

const manifestImages = Array.isArray(assetManifest?.images) ? assetManifest.images : [];

function pickAboutAsset(patterns, fallback) {
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

export const aboutHeroData = {
  titleTop: "We are",
  titleBottom: "OCHI design",
  inlineImage: pickAboutAsset("content-image01", "https://ochi.design/wp-content/uploads/2022/04/content-image01.jpg"),
  aboutLabel: "About us:",
  aboutParagraphs: [
    "Ochi\u00ae is more than our name, it\u2019s our philosophy. In Ukrainian, ochi means \u201ceyes.\u201d To us, it represents vision, clarity, and attention.",
    "We believe the strongest ideas are not just told \u2014 they\u2019re seen. That\u2019s why we create eye-opening presentations that transform complex messages into stories people can understand, remember, and act on."
  ],
  ctaLabel: "Our Works",
  ctaHref: "/work",
  heading: "We save businesses from ugly and ineffective presentations.",
  valuesLabel: "We are ochi design:",
  valuesParagraphs: [
    "The world-class, tight-knit group of creative experts from across the globe, who work together to create industry-shifting presentations that win people\u2019s hearts and minds.",
    "We\u2019ve earned our reputation through years of collaboration with global clients who know that being different takes courage and craft."
  ],
  heroImage: pickAboutAsset("017091720030-1340x858", "https://ochi.design/wp-content/uploads/2022/05/017091720030-1340x858.jpg")
};

export const aboutOperatingFlow = {
  label: "How we work:",
  heading: "A structured delivery rhythm that moves from signal to story to scalable systems.",
  intro: [
    "Great presentation work is never linear. We run a clear sequence that keeps strategy, design, and business outcomes tightly aligned.",
    "Every stage has ownership, deliverables, and decision checkpoints, so teams can move fast without sacrificing quality."
  ]
};

export const aboutWorkflowSteps = [
  {
    number: "01",
    stage: "Signal Mapping",
    focus: "We audit positioning, audience context, and high-stakes moments where your story needs to convert.",
    outcome: "A focused narrative brief with business priorities and messaging hierarchy."
  },
  {
    number: "02",
    stage: "Narrative Architecture",
    focus: "We shape the core storyline, slide logic, and supporting proof-points into a persuasion-ready sequence.",
    outcome: "A presentation blueprint that aligns leadership, sales, and product teams."
  },
  {
    number: "03",
    stage: "Design Production",
    focus: "Our team transforms the blueprint into high-fidelity decks and reusable visual systems across formats.",
    outcome: "Production-ready assets that scale from boardroom decks to launch narratives."
  },
  {
    number: "04",
    stage: "Rollout Enablement",
    focus: "We package templates, usage guidance, and handoff routines so teams can launch confidently.",
    outcome: "A scalable operating layer your team can run without bottlenecks."
  }
];

export const aboutDeliveryLanes = [
  {
    eyebrow: "Lane 01",
    title: "Fundraising",
    description:
      "For startups and venture teams preparing investor narratives, demo days, and milestone update decks.",
    tags: ["Pitch strategy", "Investor deck", "Data storytelling"]
  },
  {
    eyebrow: "Lane 02",
    title: "Enterprise Sales",
    description:
      "For growth and enterprise teams that need modular sales narratives tailored to complex buying committees.",
    tags: ["Sales deck systems", "Value framing", "Enablement kits"]
  },
  {
    eyebrow: "Lane 03",
    title: "Brand Platforms",
    description:
      "For brand and marketing teams building launch narratives, keynote moments, and internal storytelling standards.",
    tags: ["Keynote design", "Campaign storylines", "Template libraries"]
  }
];

export const aboutCommitments = [
  {
    titleLine1: "Quality comes",
    titleLine2: "before quantity",
    position: "1/4",
    image: pickAboutAsset("ochi_1-1-304x330", "https://ochi.design/wp-content/uploads/2025/09/ochi_1-1-304x330.avif")
  },
  {
    titleLine1: "Creating real",
    titleLine2: "world business results",
    position: "2/4",
    image: pickAboutAsset("INSTAGRAM_1-1", "https://ochi.design/wp-content/uploads/2025/08/INSTAGRAM_1-1.png")
  },
  {
    titleLine1: "Engineering",
    titleLine2: "clarity",
    position: "3/4",
    image: pickAboutAsset("ochi_2-1", "https://ochi.design/wp-content/uploads/2025/09/ochi_2-1.avif")
  },
  {
    titleLine1: "When we commit,",
    titleLine2: "we go all-in",
    position: "4/4",
    image: pickAboutAsset("ochi_3-1", "https://ochi.design/wp-content/uploads/2025/09/ochi_3-1.avif")
  }
];

export const aboutFounders = [
  {
    name: "Ihor Hulyahrodskyy, Founder and CEO",
    image: pickAboutAsset(["Ihor_ochi.design", "Ihor_ochi-design"], "https://ochi.design/wp-content/uploads/2025/09/Ihor_ochi.design.avif")
  },
  {
    name: "Kseniia Palamarchuk, Art Director",
    image: pickAboutAsset(["Kseniia_ochi.design", "Kseniia_ochi-design"], "https://ochi.design/wp-content/uploads/2025/09/Kseniia_ochi.design.avif")
  }
];

export const aboutTestimonials = [
  {
    company: "Medallia",
    logo: pickAboutAsset("Group-481774-1-63x63", "https://ochi.design/wp-content/uploads/2025/02/Group-481774-1-63x63.png"),
    logoWidth: 63,
    logoHeight: 63,
    quote: "The most impressive about Ochi is their attention to detail. They didn't just design presentations, but helped us craft a narrative."
  },
  {
    company: "Planetly",
    logo: pickAboutAsset("Asset-15", "https://ochi.design/wp-content/uploads/2022/05/Asset-15.svg"),
    logoWidth: 98,
    logoHeight: 63,
    quote:
      "Ihor and his team tackled the projects with great professionalism and creativity. They understood our brand value and turned this into excellent slide designs. The process was seamless and very effective, so we decided to roll this out across all our presentation decks. Furthermore, their understanding, professionalism, and creativity have secured a continued partnership."
  },
  {
    company: "Officevibe",
    logo: pickAboutAsset("Vector1", "https://ochi.design/wp-content/uploads/2022/05/Vector1.svg"),
    logoWidth: 98,
    logoHeight: 63,
    quote:
      "Ochi has an impressive understanding of what\u2019s needed to do an effective presentation. The stakeholders at work said it\u2019s the best most complete PP template they\u2019ve ever seen. Ochi delivered more than I was expecting and we were really surprised with the quality of his work. Will work with Ochi design again for sure!"
  },
  {
    company: "Nestle",
    logo: pickAboutAsset("Logo_2-1", "https://ochi.design/wp-content/uploads/2022/05/Logo_2-1.svg"),
    logoWidth: 98,
    logoHeight: 63,
    quote:
      "This is just a great experience for us! As an established company, you operate within different industries and expect immediate input with a certain level of service. Ihor and the team delivered exactly that. Fantastic result, quick delivery time, and highly responsive. This team is a hidden gem. We\u2019ve already started to outline our next projects for them."
  },
  {
    company: "Toyota",
    logo: pickAboutAsset("toyota-logo-freelogovectors-net_", "https://ochi.design/wp-content/uploads/2022/05/toyota-logo-freelogovectors.net_.svg"),
    logoWidth: 98,
    logoHeight: 63,
    quote:
      "Great work, great communication, and work ethic. Their skills, and understanding of project scope and subject matter - are simply unmatched. Looking very forward to working again soon."
  },
  {
    company: "Lexus",
    logo: pickAboutAsset("Logo_2-e5992b56", "https://ochi.design/wp-content/uploads/2022/05/Logo_2.svg"),
    logoWidth: 98,
    logoHeight: 63,
    quote:
      "Thanks for your great work! The communication was excellent, the team was able to grasp in detail what we wanted and plastered it on the company presentation and sales deck. Their work is absolutely amazing."
  },
  {
    company: "Aflorithmic",
    logo: pickAboutAsset("aflori-logo-freelogovectors-net_", "https://ochi.design/wp-content/uploads/2022/05/aflori-logo-freelogovectors.net_.svg"),
    logoWidth: 98,
    logoHeight: 63,
    quote:
      "Super responsive and quick. A charm to work with. Unfortunately, often designers are not like that and you end up losing a lot of time with briefings that don\u2019t lead anywhere. This is definitely not the case here. I\u2019d work again with Ihor and his team anytime!"
  },
  {
    company: "Orderlion",
    logo: pickAboutAsset("Asset-12", "https://ochi.design/wp-content/uploads/2022/05/Asset-12.svg"),
    logoWidth: 98,
    logoHeight: 63,
    quote:
      "The result was just amazing! For me, a designer is exceptional when you are so satisfied with the result that you want to look at it the whole day like a kid with a new toy. Ihor and his team delivered exactly that! They are very talented designers who understand the real business problem we are trying to solve and iterate over many drafts to achieve the best possible outcome. We are looking for a long-lasting working relationship!"
  },
  {
    company: "Black Book",
    logo: pickAboutAsset("Picture2-1", "https://ochi.design/wp-content/uploads/2022/05/Picture2-1.svg"),
    logoWidth: 98,
    logoHeight: 63,
    quote:
      "They nailed what our product was all about. We found their ability to workshop all the angles and take on feedback was great and it shows in the final product. Everything moved with a milestone dynamic brief via Notion which was handy to track progress. We\u2019re very happy with the process and the final product. All was handled well and professionally."
  }
];

export const aboutRewardCards = {
  greenLogo: pickAboutAsset("logo001", "https://ochi.design/wp-content/uploads/2022/04/logo001.svg"),
  clutchLogo: pickAboutAsset("logo002", "https://ochi.design/wp-content/uploads/2022/04/logo002.svg"),
  alumniLogo: pickAboutAsset("logo003", "https://ochi.design/wp-content/uploads/2022/04/logo003.png")
};

export const aboutStudioStats = [
  {
    value: "35+",
    label: "Specialists across design, motion, and narrative"
  },
  {
    value: "14",
    label: "Countries represented across our core collaborators"
  },
  {
    value: "4",
    label: "Primary delivery windows covering Americas to APAC"
  },
  {
    value: "300+",
    label: "High-stakes decks shipped across fundraising and enterprise"
  }
];

export const aboutValueFlows = [
  {
    title: "Strategy before styling",
    body: "We frame the argument first, then design for clarity and momentum."
  },
  {
    title: "One team, shared ownership",
    body: "Designers, storytellers, and leads work as a single delivery unit from day one."
  },
  {
    title: "Built for repeatability",
    body: "Every engagement leaves behind systems your team can keep using at scale."
  }
];

export const aboutInsights = [
  {
    href: "https://ochi.design/salience-labs-pitch-deck-brand-identity-series-a-round/",
    title: "Salience Labs Secures $30M to Redefine AI Infrastructure",
    author: "Kseniia Palamarchuk",
    date: "08 Feb. 25",
    categories: ["News", "Pitch Deck"],
    image: pickAboutAsset("SL_Website_238-1-324x324", "https://ochi.design/wp-content/uploads/2025/02/SL_Website_238-1-324x324.png"),
    width: 325,
    height: 324
  },
  {
    href: "https://ochi.design/insights-pitch-deck-presentation-agency/",
    title: "Our client trawa raises \u20ac10M in seed funding",
    author: "Kseniia Palamarchuk",
    date: "31 Jul. 24",
    categories: ["Pitch Deck", "News"],
    image: pickAboutAsset("trawa_website-324x243", "https://ochi.design/wp-content/uploads/2024/07/trawa_website-324x243.png"),
    width: 325,
    height: 243
  },
  {
    href: "https://ochi.design/clients-success-stories-pitch-deck-development/",
    title: "Nala Earth Secures \u20ac4M in Seed Funding to Transform Nature Tech",
    author: "Kseniia Palamarchuk",
    date: "07 Jan. 25",
    categories: ["Pitch Deck", "News"],
    image: pickAboutAsset("front_exploration_265-1-324x324", "https://ochi.design/wp-content/uploads/2025/01/front_exploration_265-1-324x324.png"),
    width: 325,
    height: 324
  }
];
