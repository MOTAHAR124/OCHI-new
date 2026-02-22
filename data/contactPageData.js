import assetManifest from "@/data/ochi-asset-manifest.json";

const manifestImages = Array.isArray(assetManifest?.images) ? assetManifest.images : [];

function pickContactAsset(patterns, fallback) {
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

export const contactHeroData = {
  titleTop: "Let's start",
  titleBottom: "a project together",
  inlineImage: pickContactAsset(
    "Asset-41-20-300x203",
    "https://ochi.design/wp-content/uploads/2022/05/Asset-41-20-300x203.jpg"
  )
};

export const contactFaqItems = [
  {
    question: "How many iterations the project includes?",
    paragraphs: [
      "We’re committed to delighting every one of our clients and will do everything to deliver on the project fully. We iterate as much as needed to ensure the best result."
    ],
    bullets: [
      "Based on our experience and ways of working, no more than three revisions are needed to meet clients’ expectations and business needs.",
      "If your project is something we are not capable of doing, we will say it right there and won’t commit. Instead, we will refer you to specialists in any field you need and we might know."
    ]
  },
  {
    question: "Do you animate presentations?",
    paragraphs: [
      "Movement is what attracts the eye. But not every presentation requires animation, although we do agree that animated presentations give a wow effect. We surely add transitions and animation to your presentation where we think it increases engagement, surprise, or simply delivers the message flawlessly.",
      "By the way, animated presentations can also be used for marketing purposes to promote your ideas via socials."
    ]
  },
  {
    question: "Do you join forces with other agencies?",
    paragraphs: [
      "Yes, we do partner with other creative agencies where we lack expertise or experience. We carefully select our partners and frequently collaborate on brand identity, web design, animation design, and other fine initiatives that benefit both us and our clients. All with the purpose to expand our creative POV and supplementing you with top-notch work."
    ]
  },
  {
    question: "I want to become a part of the team! Do you hire?",
    paragraphs: [
      "Yes! We actively search for talent to join us in completing high-stake presentation design projects at OCHI. As a presentation agency, we always aim to create the best products and services possible. Hence, we are looking for someone who will enjoy helping us fuse design and thinking into something impactful and beautiful."
    ],
    bullets: [
      "If you feel like you’re on top of your creative game, whether it’s storytelling, graphic design, or animation. Send us the CV and portfolio at Ihor@ochi.design with “CREATE AND THRILL” in the subject. We will get back to you and maybe schedule a call. If there’s a potential fit here, you will meet the team. If that goes well – you’ll become a part of it.",
      "If you think you can improve our processes, marketing, PR, and communications, or you excel at managing people, we would love to hear from you. Send your message to hello@ochi.design with “-” and we will get back to you."
    ]
  },
  {
    question: "Can I hire you for publish speaking, or student workshop?",
    paragraphs: [
      "The short answer is yes.",
      "Through our work, we empower brands to make a difference. But while, the presentations that raise millions help in the long run by providing resources for organizations to evolve, create new workplaces, and make things better. We also offer our corporate clients personal training. We love visiting traditional university students to share insights and expertise through masterclasses and workshops. This is how we make things better by teaching others how to make better things. And this changes the world here and now.",
      "If you have an event coming or you are a university academic, please reach out to us with the topic, and we will see how we can help."
    ]
  },
  {
    question: "Would you like to jump on a podcast or YouTube video?",
    paragraphs: [
      "Yes, why not. It’s a great chance to give back to the creative community by sharing and learning. Especially if the audience is relevant to the communication design subject. Or maybe it helps our clients in some way. We can’t know until we see some details, so drop us a line with a brief explanation at kseniia@ochi.design with the “Podcast/YT Proposal”."
    ]
  }
];
