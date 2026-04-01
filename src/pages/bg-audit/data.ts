// ─── Algorithm Research Data ───

export const algorithmData = {
  engagementWeights: {
    threadedComment: "~15x",
    standaloneComment15Plus: "~7-8x",
    standaloneCommentShort: "~5x",
    saveBookmark: "~3-5x",
    dmShare: "~3-5x",
    repostWithCommentary: "~5x",
    instantRepost: "~2x",
    reaction: "1x baseline",
    dwellTime61Plus: "10-15x engagement rate",
    profileVisit: "~60% future visibility boost",
    quickScrollPast: "negative signal",
  },
  formatPerformance: {
    carousel: {
      engagement: "7.00%",
      reachMultiplier: "~3x",
      sweetSpot: "8-10 slides",
    },
    polls: { reachMultiplier: "~206% above avg", usage: "0.00034% of posts" },
    nativeVideo: {
      reachMultiplier: "1.4x",
      optimal: "30-120 sec, vertical, captioned",
    },
    textImage: { reachMultiplier: "~1x baseline" },
    textOnly: { reachMultiplier: "0.28x on pages, declining" },
    externalLinks: { reachMultiplier: "~40-60% less reach" },
  },
  buyerJourney: {
    averageDays: 272,
    preSalesPercent: 81,
    touchpoints: "60+",
    stakeholders: "~12 per purchase",
  },
  postingOptimal: {
    personalProfiles: "2-3 posts/week",
    minGapHours: 24,
    goldenHourMinutes: 90,
    reachDeterminedInGoldenHour: "70%",
    authorReplyBoost: "64% more comments if within 30 min",
  },
  investmentTimeline: {
    phase1: { name: "Initial Traction", weeks: "12-24" },
    phase2: { name: "Pipeline Impact", weeks: "24-52" },
    phase3: { name: "Compound Growth", weeks: "52+" },
  },
  hashtagPenalty: "29% less reach with 3+ hashtags",
  aiContentPenalty: "30% less reach, 55% less engagement",
  regularPosters: "7.1% of LinkedIn users",
};

// ─── Funnel tier assignments ───

export const funnelTiers: Record<number, "top" | "middle" | "bottom"> = {
  1: "top",     // Vietnam Veterans Day
  2: "top",     // MLB Opening Day
  3: "middle",  // Amazon COA compliance
  4: "top",     // Hearing aids
  5: "bottom",  // Batch Pro pitch
  6: "middle",  // Amazon Supply Chain / Cal Poly
  7: "middle",  // Creatine nostalgia
  8: "bottom",  // Netrush hiring
  9: "bottom",  // Brand Day TikTok LA
  10: "bottom", // Protein Day brand tags
  11: "top",    // F1 metaphor
  12: "middle", // Netrush values
  13: "bottom", // Brand Day NYC
  14: "bottom", // Brand Day preview
  15: "bottom", // Brandrunner / Showrunner
  16: "bottom", // Commerce video / Batch
  17: "middle", // Unwholesale / Amazon insight
  18: "middle", // Netrush turns 20
  19: "top",    // Daughter Ella / DNCE MYX
};

// ─── Comment Quality & Thread Depth Data ───

export const commentQualityData = {
  overall: {
    totalCommentsAnalyzed: 144,
    avgWordCount: 12.4,
    medianWordCount: 8,
    buckets: [
      { label: "Emoji only", count: 1, pct: 0.7 },
      { label: "1-5 words", count: 39, pct: 27.1 },
      { label: "6-9 words", count: 33, pct: 22.9 },
      { label: "10-15 words", count: 32, pct: 22.2 },
      { label: "16-25 words", count: 21, pct: 14.6 },
      { label: "26+ words", count: 18, pct: 12.5 },
    ],
    over9Words: { count: 71, pct: 49.3 },
    over15Words: { count: 39, pct: 27.1 },
  },
  byTheme: [
    { theme: "Industry History / Nostalgia", avgWc: 21.4, pctOver9: 63, pctOver15: 46 },
    { theme: "Amazon / Marketplace Insight", avgWc: 22.7, pctOver9: 89, pctOver15: 67 },
    { theme: "Product / Solution Pitch", avgWc: 27.8, pctOver9: 100, pctOver15: 75 },
    { theme: "Brand Day / Event Promotion", avgWc: 13.6, pctOver9: 43, pctOver15: 25 },
    { theme: "Sports / Culture / Lifestyle", avgWc: 13.6, pctOver9: 40, pctOver15: 20 },
    { theme: "Netrush Company News", avgWc: 9.6, pctOver9: 32, pctOver15: 16 },
    { theme: "Personal Story / Vulnerability", avgWc: 8.9, pctOver9: 30, pctOver15: 15 },
    { theme: "Industry Shout-out / Appreciation", avgWc: 3, pctOver9: 0, pctOver15: 0 },
  ],
};

export const threadDepthData = {
  totalThreadsGt1: 25,
  avgDepth: 2.5,
  deepestThread: {
    depth: 13,
    postLine: "1997: launched the brand Extreme Sports Nutrition.",
    starter: "Anthony Almada",
  },
  brianParticipates: { count: 18, pct: 72 },
  brianAbsent: { count: 7, pct: 28 },
  avgDepthWithBrian: 2.6,
  avgDepthWithout: 2.0,
};

export const brianReplyData = {
  postsWithReplies: { count: 11, total: 17, pct: 64.7 },
  totalReplies: 24,
  avgReplyWordCount: 7.4,
  repliesOver9Words: { count: 9, pct: 37.5 },
  repliesOver15Words: { count: 4, pct: 16.7 },
  replySpeed: "Fast-Moderate",
  missedOpportunities: [
    { commenter: "Kat Bryce", headline: "Chief Growth & Marketing Officer", post: "Brand Day NYC", words: 28 },
    { commenter: "Russ Dieringer", headline: "Founder & CEO, Stratabily | Omnichannel", post: "Brand Day NYC", words: 12 },
    { commenter: "Viktor K.", headline: "COO at Wise Engineering", post: "Batch Pro", words: 20 },
    { commenter: "Santi Strasser", headline: "Resilience Architect", post: "Commerce video", words: 22 },
    { commenter: "Briana Dixon", headline: "Revenue Whisperer", post: "Commerce video", words: 40 },
    { commenter: "Chris Glosson", headline: "Executive Commercial Leader | Protein Value Chain", post: "Protein Day", words: 60 },
    { commenter: "Ali Davey", headline: "Director of Partnerships | Scaling Brands", post: "Protein Day", words: 33 },
    { commenter: "Anjani Nabar", headline: "Business & Statistics @ Cal Poly SLO", post: "Amazon Supply Chain", words: 42 },
    { commenter: "Wesley Bea", headline: "Incoming Sales Engineering Intern @ Siemens", post: "Amazon Supply Chain", words: 32 },
  ],
  postReplyScores: [
    { postId: 7, replies: 4, avgWc: 12.5 },
    { postId: 13, replies: 5, avgWc: 13.6 },
    { postId: 12, replies: 2, avgWc: 17.5 },
    { postId: 18, replies: 6, avgWc: 3.8 },
    { postId: 19, replies: 2, avgWc: 1.5 },
    { postId: 1, replies: 1, avgWc: 8 },
    { postId: 2, replies: 1, avgWc: 3 },
    { postId: 3, replies: 1, avgWc: 10 },
    { postId: 14, replies: 1, avgWc: 8 },
    { postId: 15, replies: 1, avgWc: 5 },
  ],
};

// ─── Types ───

export interface Commenter {
  name: string;
  headline: string;
  is_icp_match: boolean;
  category: string;
  comment_likes?: number;
  reply_count?: number;
}

export interface Post {
  post_id: number;
  date_estimated: string;
  post_type: string;
  full_text: string;
  post_summary: string;
  hashtags: string[];
  people_tagged: string[];
  companies_tagged: string[];
  reactions: number;
  comments: number;
  reposts: number;
  estimated_impressions: number;
  primary_theme: string;
  business_orientation: string;
  commenters?: Commenter[];
  // comment quality fields
  avg_comment_word_count?: number | null;
  comments_over_9_words?: number;
  comments_over_15_words?: number;
  threads_depth_gt_1?: number;
  deepest_thread_depth?: number | null;
  brian_reply_count?: number;
  brian_avg_reply_word_count?: number | null;
}

export interface AuditData {
  audit_metadata: {
    subject: string;
    linkedin_url: string;
    title: string;
    company: string;
    company_description: string;
    follower_count: number;
    audit_date: string;
    audit_window_start: string;
    audit_window_end: string;
    total_posts_in_window: number;
    total_posts_captured: number;
    data_collection_notes: string;
  };
  posts: Post[];
}

// ─── Main Audit Data ───

export const auditData: AuditData = {
  audit_metadata: {
    subject: "Brian Gonsalves",
    linkedin_url: "https://www.linkedin.com/in/brian-gonsalves-35b70554/",
    title: "Co-CEO and Co-Founder at Netrush",
    company: "Netrush",
    company_description:
      "Commerce operating company specializing in modern commerce for consumer brands across Amazon, TikTok Shop, DTC, and Walmart",
    follower_count: 5303,
    audit_date: "2026-03-30",
    audit_window_start: "2025-10-01",
    audit_window_end: "2026-03-30",
    total_posts_in_window: 19,
    total_posts_captured: 19,
    data_collection_notes:
      "LinkedIn loaded 20 posts on Brian's activity page. 19 fall within the 6-month audit window. There is a significant posting gap: no posts between approximately November 2025 and mid-February 2026 (roughly 12 weeks of inactivity). The 18 posts from Feb-Mar 2026 represent a burst of renewed activity. Only 1 post exists from the Oct-Dec 2025 period.",
  },

  posts: [
    {
      post_id: 1,
      date_estimated: "2026-03-27",
      post_type: "image",
      post_summary: "Vietnam Veterans Day tribute to his father, a Navy veteran who most encouraged his entrepreneurship.",
      full_text: "National Vietnam War Veterans Day is March 29.\n\nThe person who most encouraged me to become an entrepreneur was a Vietnam Veteran who served multiple tours in the U.S. Navy. I know that time in his life helped shape the strength, discipline, and perspective he carried into everything that came after.\n\nI was lucky enough to benefit from that. His support, belief, and steady encouragement helped shape me into the person I am today. A lot of the way I approach business, leadership, and life started with his example.\n\nI'm incredibly grateful for him, and for all those who have served our country.\n\nLove you, Dad.",
      primary_theme: "Personal Story / Vulnerability",
      business_orientation: "Personal with Business Bridge",
      reactions: 31,
      comments: 2,
      reposts: 0,
      estimated_impressions: 932,
      hashtags: [],
      people_tagged: [],
      companies_tagged: [],
      avg_comment_word_count: 9,
      comments_over_9_words: 1,
      comments_over_15_words: 0,
      threads_depth_gt_1: 1,
      deepest_thread_depth: 2,
      brian_reply_count: 1,
      brian_avg_reply_word_count: 8,
    },
    {
      post_id: 2,
      date_estimated: "2026-03-25",
      post_type: "image",
      post_summary: "MLB Opening Day reflection on coaching Juan Pierre with the Rockies. Talent vs. work ethic lesson bridged to 20 years at Netrush.",
      full_text: "MLB Opening Day always makes me reflect.\n\nI spent 3 seasons as a Strength and Conditioning Coach in the Colorado Rockies organization, working with a lot of talented players chasing the same dream of reaching the major leagues.\n\nThat experience taught me something I have never forgotten: talent is everywhere, but talent alone is not enough.\n\nOne player stood out to me more than anyone: Juan Pierre.\n\nHe had talent, no question. But what separated him was his determination, discipline, and grit. I had the privilege of seeing that up close over 2 seasons in Single A and Double A.\n\nHe showed me what real talent looks like. Not just ability, but work ethic. Not just potential, but consistency.\n\nThat lesson has stayed with me and I have seen the same thing over the last 20 years at Netrush. The best people are not always the loudest. They are the ones who keep showing up, keep improving, and keep doing what it takes.\nThat is the kind of talent that endures.\n\nHappy Opening Day.",
      primary_theme: "Sports / Culture / Lifestyle",
      business_orientation: "Personal with Business Bridge",
      reactions: 20,
      comments: 2,
      reposts: 0,
      estimated_impressions: 820,
      hashtags: ["#OpeningDay", "#MLB", "#Leadership", "#WorkEthic", "#Grit", "#Netrush"],
      people_tagged: [],
      companies_tagged: [],
      avg_comment_word_count: 16.5,
      comments_over_9_words: 1,
      comments_over_15_words: 1,
      threads_depth_gt_1: 1,
      deepest_thread_depth: 3,
      brian_reply_count: 1,
      brian_avg_reply_word_count: 3,
    },
    {
      post_id: 3,
      date_estimated: "2026-03-24",
      post_type: "text",
      post_summary: "Amazon dietary supplement COA compliance insight. Met with Amazon team. Reassures brands the process is manageable.",
      full_text: "For 30 years, I have sold dietary supplements online and have seen just about everything.\n\nThat is why I appreciate the work Amazon is doing to strengthen product safety and compliance.\n\nAfter spending time with Somie Rico and Pulkit Lala to better understand Amazon's Dietary Supplement COA requirements, one thing stood out to me: this process was built to work behind the scenes.\n\nIf a brand receives a notice, it does not always mean something is seriously wrong. In many cases, the system just was not able to verify part of the manufacturing process.\n\nThat is important for brands to know because the next step may be easier than they think and may not require expensive retesting.\n\nIf you want to hear more what I learned about Amazon's process, feel free to reach out.",
      primary_theme: "Amazon / Marketplace Insight",
      business_orientation: "Thought Leadership",
      reactions: 13,
      comments: 3,
      reposts: 0,
      estimated_impressions: 761,
      hashtags: ["#DietarySupplements", "#BrandProtection", "#AmazonCompliance"],
      people_tagged: ["Somie Rico", "Pulkit Lala"],
      companies_tagged: ["Amazon"],
      avg_comment_word_count: 16.7,
      comments_over_9_words: 2,
      comments_over_15_words: 2,
      threads_depth_gt_1: 1,
      deepest_thread_depth: 3,
      brian_reply_count: 1,
      brian_avg_reply_word_count: 10,
    },
    {
      post_id: 4,
      date_estimated: "2026-03-23",
      post_type: "image",
      post_summary: "Childhood hearing aids story. Told class they were Sony Walkmans. Insecurity becomes your edge.",
      full_text: "When I was in 5th grade, I got my first pair of hearing aids.\n\nMy teacher, Mr. Smith, had me stand up in front of the class for a little show-and-tell. Exactly what every kid wants when they already feel different.\n\nSo I stood up, took off my hearing aids, held them up, and said:\n\n\"I just got the new Sony Walkmans, and I'll be wearing them in class so I can listen to music.\"\n\nThen I sat down.\n\nAfter class, kids came up to ask where I got them.\n\nLesson learned: sometimes your biggest insecurity can become your edge. And apparently my career in sales started in 5th grade.",
      primary_theme: "Personal Story / Vulnerability",
      business_orientation: "Personal with Business Bridge",
      reactions: 87,
      comments: 6,
      reposts: 0,
      estimated_impressions: 1724,
      hashtags: ["#EmbracePossibilities", "#Growth", "#Leadership", "#Sales"],
      people_tagged: [],
      companies_tagged: [],
      commenters: [
        { name: "Michele Flamer-Powell", headline: "Sales Director @ Bizrate Insights | Outdoor Industry", is_icp_match: false, category: "Industry Peer" },
        { name: "Lisa Abel", headline: "Sr Partnership Development Manager at Amazon - MCF", is_icp_match: false, category: "Amazon Employee" },
      ],
      avg_comment_word_count: 6.2,
      comments_over_9_words: 2,
      comments_over_15_words: 0,
      threads_depth_gt_1: 0,
      deepest_thread_depth: 1,
      brian_reply_count: 0,
      brian_avg_reply_word_count: null,
    },
    {
      post_id: 5,
      date_estimated: "2026-03-23",
      post_type: "image",
      post_summary: "Batch Pro pitch for practitioner/healthcare brands. Solves in-office purchase friction.",
      full_text: "Practitioner brands have earned trust through quality, clinical standards, and the guidance of healthcare professionals. But the purchase experience in-office still has too much friction.\n\nWhen buying is not simple at the moment of recommendation, patients often leave and purchase later on Amazon.\n\nBatch Pro improves that experience.\n\nA practice can display an empty bottle in the office, add a Batch tag, and let the patient order directly from their phone. The product ships quickly, reordering is built in, and every order remains connected back to the practitioner.\n\nNo practitioner inventory. Practitioner-attributed sales. Fast delivery. Built-in reordering.\n\nIt turns a recommendation into a modern, reorderable sales channel.",
      primary_theme: "Product / Solution Pitch",
      business_orientation: "Direct Sell",
      reactions: 21,
      comments: 1,
      reposts: 2,
      estimated_impressions: 957,
      hashtags: ["#Batch", "#PractitionerBrands", "#PatientExperience", "#ConnectedCommerce"],
      people_tagged: [],
      companies_tagged: [],
      avg_comment_word_count: 20,
      comments_over_9_words: 1,
      comments_over_15_words: 1,
      threads_depth_gt_1: 0,
      deepest_thread_depth: 1,
      brian_reply_count: 0,
      brian_avg_reply_word_count: null,
    },
    {
      post_id: 6,
      date_estimated: "2026-03-16",
      post_type: "text",
      post_summary: "Amazon Supply Chain Services invited feedback. Cal Poly SLO students led the session.",
      full_text: "Amazon Supply Chain Services team invited me to share feedback on their program and the seller experience, including Multi-Channel Fulfillment. They are working with a consulting group to better understand how brands experience their services.\n\nAmazon has built an incredible supply chain network. But from my view, there are still challenges in how these services are presented to brands and integrated into the bigger picture of their business.\n\nWhat made this conversation especially fun was seeing that it was being led by Anjani Nabar and Wesley Bea, business students at California Polytechnic State University-San Luis Obispo working with Mustang Consulting Group.\n\nThey did an excellent job. After a few opening nerves, they settled in quickly and led the conversation with curiosity, thoughtful questions, and professionalism well beyond their years.",
      primary_theme: "Amazon / Marketplace Insight",
      business_orientation: "Thought Leadership",
      reactions: 37,
      comments: 5,
      reposts: 1,
      estimated_impressions: 1174,
      hashtags: ["#Amazon", "#SupplyChain", "#CalPolySLO", "#EnjoytheRide"],
      people_tagged: ["Anjani Nabar", "Wesley Bea", "Peter Larsen", "Rotem Yuz Ashash", "Mike Byrnes"],
      companies_tagged: ["Amazon", "California Polytechnic State University-San Luis Obispo"],
      avg_comment_word_count: 29.4,
      comments_over_9_words: 5,
      comments_over_15_words: 4,
      threads_depth_gt_1: 0,
      deepest_thread_depth: 1,
      brian_reply_count: 0,
      brian_avg_reply_word_count: null,
    },
    {
      post_id: 7,
      date_estimated: "2026-03-16",
      post_type: "image",
      post_summary: "1997 nostalgia: launched Extreme Sports Nutrition with creatine powder. Creatine now $600M Amazon category.",
      full_text: "1997: launched the brand Extreme Sports Nutrition.\n\nFirst product: Creatine Powder.\n\n2026: creatine is a $600M annual category on Amazon.\n\nFunny how that works.\n\nBeing early is hard.\nBut sometimes early is just right, before the world is ready.\n\n(Sorry, it was the 90s. Best image I've got.)",
      primary_theme: "Industry History / Nostalgia",
      business_orientation: "Personal with Business Bridge",
      reactions: 44,
      comments: 22,
      reposts: 0,
      estimated_impressions: 1608,
      hashtags: ["#Creatine", "#SportsNutrition", "#Supplements", "#Innovation", "#Batch"],
      people_tagged: [],
      companies_tagged: [],
      commenters: [
        { name: "Anthony Almada", headline: "IP & Evidence-driven nutrition industry executive", is_icp_match: true, category: "Industry Legend / ICP Match", comment_likes: 12, reply_count: 12 },
        { name: "Robert Principe", headline: "Helping CPG & Pet Brands Navigate Amazon Complexity", is_icp_match: false, category: "Industry Peer / Repeat Engager" },
        { name: "Ryan Sensenbrenner", headline: "Sr. Director of Marketing & eCommerce", is_icp_match: true, category: "ICP Match - Brand Executive" },
        { name: "Sarah Remy", headline: "Fractional GM, CMO, and Advisor to CPG health brands", is_icp_match: true, category: "ICP Match - CPG Health Brand Advisor" },
        { name: "Bob Myhal", headline: "Chief Marketing Officer / Digital Transformation & AI Marketing", is_icp_match: true, category: "ICP Match - CMO" },
        { name: "Qurat-ul-ain Khalid", headline: "E-commerce Growth Partner", is_icp_match: false, category: "Amazon Services Peer" },
        { name: "Angela Wong", headline: "SRS Nutrition Express-Senior Product Manager", is_icp_match: true, category: "ICP Match - Nutrition Product Manager" },
      ],
      avg_comment_word_count: 22.8,
      comments_over_9_words: 14,
      comments_over_15_words: 10,
      threads_depth_gt_1: 4,
      deepest_thread_depth: 13,
      brian_reply_count: 4,
      brian_avg_reply_word_count: 12.5,
    },
    {
      post_id: 8,
      date_estimated: "2026-03-09",
      post_type: "text",
      post_summary: "Netrush modern commerce model and hiring pitch. Flywheel: Awareness>Transaction>Retention.",
      full_text: "Even Scott Needham agrees that Netrush is still crushing it.\n\nBut not by executing the old wholesale model.\n\nThe playbook has changed.\n\nBrands are shifting toward a modern commerce model where growth is driven through a simple but powerful flywheel:\n\nAwareness > Transaction > Retention\n\nWhen brands control this loop, they unlock something wholesale rarely delivers:\n\nDirect relationships with their customers\nHigher margins\nBetter data\nStronger long term growth\n\nWe guide brands through this transformation every day.\n\nThe demand has grown so much that we are expanding the team.",
      primary_theme: "Netrush Company News",
      business_orientation: "Direct Sell",
      reactions: 34,
      comments: 0,
      reposts: 1,
      estimated_impressions: 1013,
      hashtags: [],
      people_tagged: ["Scott Needham"],
      companies_tagged: ["Netrush"],
      avg_comment_word_count: null,
      comments_over_9_words: 0,
      comments_over_15_words: 0,
      threads_depth_gt_1: 0,
      deepest_thread_depth: null,
      brian_reply_count: 0,
      brian_avg_reply_word_count: null,
    },
    {
      post_id: 9,
      date_estimated: "2026-03-09",
      post_type: "image",
      post_summary: "Brand Day at TikTok LA office. Brand leaders met health creators for deep dive into TikTok Shop.",
      full_text: "Another Brand Day today. Big thanks to the leadership at TikTok for welcoming us into their Los Angeles office for a deep dive into the innerworkings of TikTok Shop.\n\nWhat stood out most was the energy in the room when brand leaders got to engage directly with their newest sales team: creators.\n\nThese health creators walked us through the creator economics and the real factors that drive success: how they choose products, what makes content convert, and what brands can do to make the partnership sustainable for both sides.\n\nThe best ideas and the strongest alignment are built around a table, not on a stage.",
      primary_theme: "Brand Day / Event Promotion",
      business_orientation: "Soft Sell",
      reactions: 84,
      comments: 7,
      reposts: 1,
      estimated_impressions: 1778,
      hashtags: ["#Netrush", "#BrandDay", "#Batch", "#TikTok", "#TikTokShop", "#TTS"],
      people_tagged: [],
      companies_tagged: ["TikTok", "TikTok Shop"],
      avg_comment_word_count: 6.4,
      comments_over_9_words: 1,
      comments_over_15_words: 0,
      threads_depth_gt_1: 1,
      deepest_thread_depth: 2,
      brian_reply_count: 0,
      brian_avg_reply_word_count: null,
    },
    {
      post_id: 10,
      date_estimated: "2026-03-02",
      post_type: "image",
      post_summary: "National Protein Day celebration. Tagged ~33 supplement/snack brands. Expo West preview.",
      full_text: "Celebrating National Protein Day with a quick nod to a few supplement & snack brands that help me meet my protein target every day.\n\nLooking forward to connecting with many of you next week at Expo West, sampling the new products, and introducing you to Batch Box.",
      primary_theme: "Industry Shout-out / Appreciation",
      business_orientation: "Soft Sell",
      reactions: 52,
      comments: 10,
      reposts: 1,
      estimated_impressions: 1529,
      hashtags: [],
      people_tagged: [],
      companies_tagged: ["Ancient Nutrition", "Bloom Nutrition", "Bob's Red Mill", "Catalina Crunch", "Clean Simple Eats", "Clif Bar", "Force Factor", "Garden of Life", "Kodiak Cakes", "Laird Superfood", "MaryRuth's", "Now Foods", "Sunwarrior", "Sports Research", "Truvani", "Vibrant Health"],
      avg_comment_word_count: 13.6,
      comments_over_9_words: 4,
      comments_over_15_words: 2,
      threads_depth_gt_1: 0,
      deepest_thread_depth: 1,
      brian_reply_count: 0,
      brian_avg_reply_word_count: null,
    },
    {
      post_id: 11,
      date_estimated: "2026-03-02",
      post_type: "image",
      post_summary: "Formula 1 metaphor for business transformation. Netrush has retooled and is back on the track.",
      full_text: "Change feels a lot like Formula 1.\n\nYou can start with the best car on the track and still need a few pit stops. The hard part is making them while you watch other teams take the lead.\n\nBut the stop is the point. New tires. New engine. New setup. A better plan for the next laps.\n\nThat is how I feel right now. Our car is built for combat, and we have got great drivers. We are back on the track, ready to compete, push, and win.",
      primary_theme: "Netrush Company News",
      business_orientation: "Soft Sell",
      reactions: 27,
      comments: 0,
      reposts: 0,
      estimated_impressions: 854,
      hashtags: ["#Netrush", "#Innovation", "#EnjoytheRide", "#LFG"],
      people_tagged: [],
      companies_tagged: [],
      avg_comment_word_count: null,
      comments_over_9_words: 0,
      comments_over_15_words: 0,
      threads_depth_gt_1: 0,
      deepest_thread_depth: null,
      brian_reply_count: 0,
      brian_avg_reply_word_count: null,
    },
    {
      post_id: 12,
      date_estimated: "2026-02-26",
      post_type: "image",
      post_summary: "Netrush's 4 core values: Do the Right Thing, Embrace Possibilities, Passionately Contribute, Enjoy the Ride.",
      full_text: "From the beginning at Netrush, we chose to lead with our values and make them part of how we operate every single day.\n\n1. Do the Right Thing\n2. Embrace Possibilities\n3. Passionately Contribute\n4. Enjoy the Ride\n\nKeeping these values out in the open has been a magnet for the right people. Amazing employees, great brand partners, and an incredible community of builders who want to do meaningful work the right way.",
      primary_theme: "Netrush Company News",
      business_orientation: "Thought Leadership",
      reactions: 66,
      comments: 8,
      reposts: 2,
      estimated_impressions: 1572,
      hashtags: [],
      people_tagged: [],
      companies_tagged: [],
      avg_comment_word_count: 16,
      comments_over_9_words: 4,
      comments_over_15_words: 3,
      threads_depth_gt_1: 2,
      deepest_thread_depth: 2,
      brian_reply_count: 2,
      brian_avg_reply_word_count: 17.5,
    },
    {
      post_id: 13,
      date_estimated: "2026-02-18",
      post_type: "image",
      post_summary: "Brand Day NYC recap at William Hood & Company office. Tagged 12+ attendees.",
      full_text: "Grateful to William Hood & Company for opening up their NYC office and helping us host Brand Day.\n\nWhat makes Brand Day different is not the agenda. It is the room.\n\nBrand leaders, Amazon, TikTok Shop, and creators around one table, comparing notes on what is changing in digital commerce right now.\n\nThe best ideas and the strongest alignment are built around a table, not on a stage.",
      primary_theme: "Brand Day / Event Promotion",
      business_orientation: "Soft Sell",
      reactions: 104,
      comments: 14,
      reposts: 2,
      estimated_impressions: 2148,
      hashtags: [],
      people_tagged: ["William S.J. Hood", "Jill Staib", "Greg Horn", "Maggie Philen", "Rotem Yuz Ashash", "Jason Tsai", "Kevin McCabe", "Russ Dieringer", "Edward Hauck", "Thomas Aarts", "Maria Gill", "Jarrod Barefoot"],
      companies_tagged: ["William Hood & Company"],
      commenters: [
        { name: "Todd Hutsko", headline: "Consumer Healthcare Executive/Board Member", is_icp_match: true, category: "ICP Match - Consumer Healthcare Executive" },
        { name: "Kevin McCabe", headline: "Experienced Operating Executive | AI, Business Development", is_icp_match: false, category: "Industry Peer / Event Attendee" },
      ],
      avg_comment_word_count: 17.3,
      comments_over_9_words: 9,
      comments_over_15_words: 5,
      threads_depth_gt_1: 5,
      deepest_thread_depth: 2,
      brian_reply_count: 5,
      brian_avg_reply_word_count: 13.6,
    },
    {
      post_id: 14,
      date_estimated: "2026-02-16",
      post_type: "image",
      post_summary: "Brand Day preview/teaser. Natural products leaders, Amazon, TikTok, plus creators.",
      full_text: "Getting excited for our next Brand Day.\n\nWe have been doing these for years to bring brand leaders and platform teams around the same table, focused on what is working now and what is coming next.\n\nThis session brings together natural products leaders, Amazon, and TikTok leadership. We have also added a few chairs for creators so brand leaders can hear directly from them.\n\nThe best ideas and the strongest alignment are built around a table, not on a stage.",
      primary_theme: "Brand Day / Event Promotion",
      business_orientation: "Soft Sell",
      reactions: 51,
      comments: 4,
      reposts: 0,
      estimated_impressions: 1242,
      hashtags: ["#Netrush", "#BrandDay", "#Amazon", "#TikTok"],
      people_tagged: [],
      companies_tagged: [],
      avg_comment_word_count: 8.5,
      comments_over_9_words: 1,
      comments_over_15_words: 1,
      threads_depth_gt_1: 1,
      deepest_thread_depth: 2,
      brian_reply_count: 1,
      brian_avg_reply_word_count: 8,
    },
    {
      post_id: 15,
      date_estimated: "2026-02-14",
      post_type: "image",
      post_summary: "In Hollywood, the Showrunner keeps the whole production on track. Brandrunner analogy for Netrush's operating model.",
      full_text: "In Hollywood, the Showrunner keeps the whole production on track. At Netrush, the Brandrunner does the same for modern commerce.\n\nA Brandrunner manages the entire operating system for a brand across Amazon, TikTok Shop, DTC, and Walmart.",
      primary_theme: "Industry Shout-out / Appreciation",
      business_orientation: "Soft Sell",
      reactions: 26,
      comments: 2,
      reposts: 0,
      estimated_impressions: 892,
      hashtags: [],
      people_tagged: [],
      companies_tagged: [],
      avg_comment_word_count: 3,
      comments_over_9_words: 0,
      comments_over_15_words: 0,
      threads_depth_gt_1: 1,
      deepest_thread_depth: 2,
      brian_reply_count: 1,
      brian_avg_reply_word_count: 5,
    },
    {
      post_id: 16,
      date_estimated: "2026-02-12",
      post_type: "video",
      post_summary: "Commerce is everywhere now. Attention is expensive. Video about modern commerce landscape and Batch.",
      full_text: "Commerce is everywhere now. Attention is expensive. The brands that win are the ones that build a direct connection to their customer and make the buying experience seamless across every channel.",
      primary_theme: "Product / Solution Pitch",
      business_orientation: "Direct Sell",
      reactions: 37,
      comments: 3,
      reposts: 0,
      estimated_impressions: 1049,
      hashtags: [],
      people_tagged: [],
      companies_tagged: [],
      avg_comment_word_count: 32.3,
      comments_over_9_words: 3,
      comments_over_15_words: 3,
      threads_depth_gt_1: 0,
      deepest_thread_depth: 1,
      brian_reply_count: 0,
      brian_avg_reply_word_count: null,
    },
    {
      post_id: 17,
      date_estimated: "2026-02-10",
      post_type: "text",
      post_summary: "Netrush used to run a classic Amazon accelerator model. Now unwholesaling.",
      full_text: "Netrush used to run a classic Amazon accelerator model. We bought inventory wholesale, listed it on Amazon, and managed the entire channel.\n\nThat model worked for years. But we saw the shift coming.\n\nBrands deserve to own their customer relationship. They deserve better data, better margins, and a direct connection to the consumer.\n\nSo we evolved. We unwholesaled.",
      primary_theme: "Amazon / Marketplace Insight",
      business_orientation: "Thought Leadership",
      reactions: 59,
      comments: 1,
      reposts: 0,
      estimated_impressions: 1263,
      hashtags: [],
      people_tagged: [],
      companies_tagged: [],
      avg_comment_word_count: 10,
      comments_over_9_words: 1,
      comments_over_15_words: 0,
      threads_depth_gt_1: 0,
      deepest_thread_depth: 1,
      brian_reply_count: 0,
      brian_avg_reply_word_count: null,
    },
    {
      post_id: 18,
      date_estimated: "2026-02-05",
      post_type: "image",
      post_summary: "Netrush turns 20 this year. Anniversary post thanking partners, co-founder Chris Marantette, and the team.",
      full_text: "Netrush turns 20 this year.\n\n20 years of building something we believe in. 20 years of learning, growing, failing, and getting back up. 20 years of partnering with incredible brands and talented people.\n\nTo Chris Marantette, my co-founder and business partner for 25 years: thank you for building this with me.",
      primary_theme: "Netrush Company News",
      business_orientation: "Personal with Business Bridge",
      reactions: 174,
      comments: 42,
      reposts: 3,
      estimated_impressions: 3843,
      hashtags: ["#moderncommerce"],
      people_tagged: ["Chris Marantette"],
      companies_tagged: ["Netrush"],
      avg_comment_word_count: 8.1,
      comments_over_9_words: 10,
      comments_over_15_words: 5,
      threads_depth_gt_1: 6,
      deepest_thread_depth: 2,
      brian_reply_count: 6,
      brian_avg_reply_word_count: 3.8,
    },
    {
      post_id: 19,
      date_estimated: "2025-11-15",
      post_type: "image",
      post_summary: "Thirty years ago, started a business in college. Now daughter Ella launching DNCE MYX on Instagram and TikTok.",
      full_text: "Thirty years ago, I started a business while in college. Now my daughter Ella is doing the same thing.\n\nShe is launching DNCE MYX on Instagram and TikTok. Watching her build something from scratch, with all the energy and confidence of someone who does not yet know what she does not know, is one of the best things I have ever experienced as a parent.\n\nI could not be more proud.",
      primary_theme: "Personal Story / Vulnerability",
      business_orientation: "Pure Personal",
      reactions: 113,
      comments: 12,
      reposts: 0,
      estimated_impressions: 2186,
      hashtags: [],
      people_tagged: [],
      companies_tagged: ["DNCE MYX"],
      avg_comment_word_count: 7.8,
      comments_over_9_words: 3,
      comments_over_15_words: 2,
      threads_depth_gt_1: 2,
      deepest_thread_depth: 2,
      brian_reply_count: 2,
      brian_avg_reply_word_count: 1.5,
    },
  ],
};
