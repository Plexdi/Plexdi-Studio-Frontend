export const pricingCategories = [
  // 1) BANNERS (already done on your side, so this is just a pattern reference)
  {
    id: "graphics-banners",
    label: "Banners",
    description:
      "Banner packages for streaming and social platforms, from simple starters to premium, fully detailed visuals.",
    tiers: [
      {
        id: "banner-starter",
        title: "Starter Banner",
        priceLabel: "£15",
        summary:
          "Minimal, clean layout with simple effects. Good entry point for new creators.",
        includes: [
          "Simple composition (no complex illustration)",
          "1 revision",
          "Sized for one platform (e.g. Twitch or YouTube)",
          "Basic text layout",
          "High-resolution PNG/JPEG export",
        ],
        excludes: [
          "Complex lighting or heavy effects",
          "Custom characters / mascots",
          "Advanced compositions",
          "Source files",
        ],
        bestFor: "New creators, budget clients, simple channels.",
      },
      {
        id: "banner-standard",
        title: "Standard Banner",
        priceLabel: "£25",
        summary:
          "Polished banner with proper lighting, effects, and branding. Ideal for most creators.",
        includes: [
          "1 main concept + 1–2 refinement rounds",
          "Brand-matched colours and typography",
          "Readable layout with balanced effects",
          "High-resolution PNG/JPEG export",
          "Resize for one extra platform on request",
        ],
        bestFor: "Most streamers, YouTubers, and standard rebrands.",
        highlight: true,
      },
      {
        id: "banner-premium",
        title: "Premium Banner",
        priceLabel: "£50",
        summary:
          "Highly detailed, fully polished banner with extra revisions and matching assets.",
        includes: [
          "Fully detailed composition and visual polish",
          "Advanced lighting/effects tuned to the brand",
          "Up to 3 revision rounds",
          "Matching simple PFP themed to the banner",
          "Source file (e.g. PSD) included",
          "Multiple exports for Twitch, YouTube, Discord, etc.",
        ],
        bestFor:
          "Serious creators, long-term branding, and full channel revamps.",
      },
    ],
  },

  // 2) YOUTUBE THUMBNAILS
  {
    id: "video-thumbnails",
    label: "YouTube Thumbnails",
    description:
      "Thumbnail packages focused on clarity, contrast, and click-through potential.",
    tiers: [
      {
        id: "thumb-starter",
        title: "Starter Thumbnail",
        priceLabel: "£15",
        summary:
          "Simple thumbnail focused on clarity and quick readability in the feed.",
        includes: [
          "1 thumbnail concept",
          "Basic composition (text + 1–2 elements)",
          "Simple brightness/contrast adjustments",
          "1 revision",
          "Export optimised for YouTube",
        ],
        bestFor:
          "Small channels, simple uploads, informational or low-effort videos.",
      },
      {
        id: "thumb-standard",
        title: "Standard Thumbnail",
        priceLabel: "£20",
        summary:
          "Polished thumbnail with clean cut-outs and strong emphasis on click-through.",
        includes: [
          "1 strong concept + 1–2 revisions",
          "Subject cut-outs and layered composition",
          "Text and focal elements designed to stand out",
          "Colour and contrast tuned for YouTube feed",
          "Optional resize for Shorts or other vertical platforms",
        ],
        bestFor:
          "Growing channels, gaming content, commentary, and regular uploads.",
        highlight: true,
      },
      {
        id: "thumb-premium",
        title: "Premium Thumbnail",
        priceLabel: "£40",
        summary:
          "High-impact thumbnail with advanced effects and multiple format versions.",
        includes: [
          "Up to 2 concepts to choose from",
          "Advanced lighting, glows, and atmosphere",
          "Complex compositions with multiple subjects",
          "Up to 3 revision rounds",
          "Horizontal + vertical + Shorts versions",
          "Source file (e.g. PSD) on delivery",
        ],
        bestFor:
          "High-production channels, serious creators, sponsored or high-stakes videos.",
      },
    ],
  },

  // 3) PROFILE PICTURES
  {
    id: "profile-pictures",
    label: "Profile Pictures",
    description:
      "Profile pictures designed to match your overall brand and channel style.",
    tiers: [
      {
        id: "pfp-starter",
        title: "Starter PFP",
        priceLabel: "£15",
        summary:
          "Simple, minimalist profile picture without heavy illustration work.",
        includes: [
          "Basic character silhouette or icon-style design",
          "1 revision",
          "Square format (around 800×800+)",
          "Clean background and simple colours",
        ],
        bestFor:
          "New creators, budget setups, Discord/alt accounts, minimalist branding.",
      },
      {
        id: "pfp-standard",
        title: "Standard PFP",
        priceLabel: "£25",
        summary:
          "Custom PFP with proper shading and branding, ideal for most creators.",
        includes: [
          "Custom character or avatar in your style",
          "1 main concept + 1–2 revision rounds",
          "Shading, lighting, and colour harmony",
          "High-resolution export for Twitch, Discord, X, etc.",
          "Optional light/dark background variant",
        ],
        bestFor:
          "Streamers, YouTubers, and creators who want a recognisable identity.",
        highlight: true,
      },
      {
        id: "pfp-premium",
        title: "Premium PFP",
        priceLabel: "£45",
        summary:
          "High-detail, fully illustrated PFP with extra polish and variations.",
        includes: [
          "Detailed stylised character with expressive face",
          "Advanced colouring, lighting, and highlights",
          "Up to 3 revision rounds",
          "Alt versions (e.g. different expression or colour variant)",
          "Source file included (e.g. PSD/SVG)",
          "Transparent background export on request",
        ],
        bestFor:
          "Mascot-style branding, VTubers, serious creators planning long-term use.",
      },
    ],
  },

  // 4) EMOTES
  {
    id: "stream-emotes",
    label: "Twitch / Discord Emotes",
    description:
      "Custom emotes created to stay readable and expressive at tiny sizes.",
    tiers: [
      {
        id: "emote-mini-pack",
        title: "Mini Emote Pack (3)",
        priceLabel: "from £30",
        summary:
          "A small set of matching emotes using one base style or character.",
        includes: [
          "3 custom emotes",
          "3 standard sizes (e.g. 28px, 56px, 112px)",
          "Transparent PNG exports",
          "One consistent base style across all emotes",
        ],
        bestFor:
          "New streamers who want a starter emote set that feels cohesive.",
      },
      {
        id: "emote-standard-pack",
        title: "Standard Emote Pack (5)",
        priceLabel: "from £55",
        summary:
          "A fuller set of expressions to cover common reactions for your chat.",
        includes: [
          "5 custom emotes",
          "3 standard sizes per emote",
          "Crisp linework tuned for tiny sizes",
          "Mix of expressive reactions (hype, cry, GG, etc.)",
          "1–2 revision rounds per batch",
        ],
        bestFor:
          "Regular streamers who want a good variety of emotes for their community.",
        highlight: true,
      },
      {
        id: "emote-deluxe-pack",
        title: "Deluxe Emote Pack (8+)",
        priceLabel: "£70",
        summary:
          "Larger emote packs with deeper expression range and brand-focused style.",
        includes: [
          "8 or more custom emotes",
          "3 standard sizes per emote",
          "Emotes designed around your mascot/character",
          "Extra attention to readability at tiny sizes",
          "2–3 revision rounds across the set",
        ],
        bestFor:
          "Partners, affiliates, or creators building a complete emote ecosystem.",
      },
    ],
  },

  // // 5) LOGOS
  // {
  //   id: "creator-logos",
  //   label: "Logos",
  //   description:
  //     "Logo designs for creators, small teams, or personal brands.",
  //   tiers: [
  //     {
  //       id: "logo-starter",
  //       title: "Starter Logo",
  //       priceLabel: "£50",
  //       summary:
  //         "Simple wordmark or icon-style logo for use on social and streaming platforms.",
  //       includes: [
  //         "Wordmark or simple icon-based logo",
  //         "1 main concept + 1 refinement round",
  //         "PNG export + basic SVG where possible",
  //         "Colour and monochrome versions",
  //       ],
  //       bestFor: "Solo creators and small channels needing a basic identity.",
  //     },
  //     {
  //       id: "logo-standard",
  //       title: "Standard Logo",
  //       priceLabel: "£80",
  //       summary:
  //         "More refined logo with stronger concept and better scalability.",
  //       includes: [
  //         "Logo concept with more developed idea/shape language",
  //         "1 main concept + 1–2 refinement rounds",
  //         "Vector or high-resolution exports for multiple uses",
  //         "Horizontal + stacked layout where needed",
  //       ],
  //       bestFor:
  //         "Teams, long-term creator brands, or those planning overlays/merch around the logo.",
  //       highlight: true,
  //     },
  //     {
  //       id: "logo-premium",
  //       title: "Premium Logo",
  //       priceLabel: "£100+",
  //       summary:
  //         "Fully developed logo system for serious branding and long-term use.",
  //       includes: [
  //         "Multiple initial directions to choose from",
  //         "Refinements based on feedback",
  //         "Full logo set (primary, secondary, mark/icon)",
  //         "Vector exports and usage-ready files",
  //         "Colour, monochrome, and inverted variants",
  //       ],
  //       bestFor:
  //         "Serious brands, teams, or creators building a full visual identity.",
  //     },
  //   ],
  // },

  // 6) BUNDLES / PACKS
  {
    id: "creator-bundles",
    label: "Bundles / Packs",
    description:
      "Discounted bundles for creators who want a matching look across multiple assets.",
    tiers: [
      {
        id: "bundle-starter",
        title: "Starter Creator Pack",
        priceLabel: "from £60",
        summary:
          "A cohesive base setup for new creators wanting a consistent look.",
        includes: [
          "Banner + Standard PFP",
          "Designed together as a single identity",
          "High-resolution exports for key platforms",
        ],
        bestFor:
          "New creators or rebrands wanting a basic but cohesive visual setup.",
      },
      {
        id: "bundle-stream-pack",
        title: "Stream Pack",
        priceLabel: "from £80–£100",
        summary:
          "A more complete set for streamers who want multiple elements matching.",
        includes: [
          "Banner + PFP + basic panel/header set",
          "Coordinated colours, typography, and layout",
          "Files organised for easy upload and reuse",
        ],
        bestFor:
          "Streamers upgrading their whole channel look in one go.",
        highlight: true,
      },
      {
        id: "bundle-ultimate",
        title: "Ultimate Creator Bundle",
        priceLabel: "from £140+",
        summary:
          "Full branding starter kit for creators who want everything handled at once.",
        includes: [
          "Banner + PFP",
          "Basic logo or mark",
          "Panel set and 1–2 thumbnails",
          "All assets designed as one unified identity",
        ],
        bestFor:
          "Serious rebrands, launches, or creators committing to a long-term visual identity.",
      },
    ],
  },
];
