import { useState, useEffect, useRef } from "react";

// ============================================================
// TEAM A21 PARTNERSHIPS PLATFORM
// Full-featured internal tool for partnership sales
// ============================================================

// ============================================================
// ICONS (Lucide-style inline SVGs)
// ============================================================
const Icons = {
  Home: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  Clipboard: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
    </svg>
  ),
  Brain: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/>
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
    </svg>
  ),
  FileText: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
  Grid: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/>
      <rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/>
      <rect x="3" y="14" width="7" height="7"/>
    </svg>
  ),
  Package: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
      <line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  ),
  Book: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  ),
  Settings: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
  Plus: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"/>
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  ChevronRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  ),
  ArrowLeft: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"/>
      <polyline points="12 19 5 12 12 5"/>
    </svg>
  ),
  Zap: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  TrendingUp: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
      <polyline points="17 6 23 6 23 12"/>
    </svg>
  ),
  Users: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  DollarSign: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23"/>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  ),
  Calendar: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  Mail: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  Copy: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>
  ),
  Check: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Sparkles: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z"/>
    </svg>
  ),
  HelpCircle: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  X: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
};

// ============================================================
// DESIGN TOKENS
// ============================================================
const colors = {
  primary: "#29286A",      // Deep navy - a21 brand
  accent: "#E07BAF",       // Pink accent - a21 brand
  accentHover: "#d4699f",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
  
  bg: "#FAFAFA",
  bgCard: "#FFFFFF",
  bgSidebar: "#29286A",
  
  text: "#1F2937",
  textMuted: "#6B7280",
  textLight: "#9CA3AF",
  
  border: "#E5E7EB",
  borderLight: "#F3F4F6",
};

// ============================================================
// PROPERTY DATABASE
// ============================================================
const PROPERTIES = {
  sobewff: {
    id: "sobewff",
    name: "South Beach Wine & Food Festival",
    shortName: "SOBEWFF",
    tier: 1,
    tierName: "National Flagship",
    dates: "February 19–22, 2026",
    market: "Miami Beach, FL",
    attendees: "65,000+",
    format: "4-day multi-event festival",
    emoji: "🌊",
    color: "#E91E8C",
    tagline: "The nation's most celebrated food & wine festival — 25 years strong",
    audience: "44% male / 56% female | Age peak 36–45 | 67% HHI $100K+ | 37% over $175K | Nationally drawn, 70% Florida-based",
    scale: "100+ events, 500+ chefs & talent, 65,000+ attendees",
    media: "9.7B PR impressions | 833M advertising | 470M social | 400K email list at 45% open rate",
    presented: "Food Network & Capital One presenting",
    beneficiary: "FIU Chaplin School — $45M+ raised",
    inventory: "Platinum $100K+ | Diamond $75–99K | Gold $50–74K | Silver $25–49K | Bronze $15–24K",
    keyInventory: ["Festival-wide category exclusivity (Diamond/Platinum)", "Grand Tasting Village footprint", "Gift bag insertion (~17,000)", "Director's VIP Happy Hour", "Miami Herald full-page ad inclusion", "Festival Guide (NYT/Herald distribution)", "Social posts, web banners", "Event title/presenting sponsor opportunity (Gold+)"],
    existingPartners: ["Capital One (presenting)", "Southern Glazer's (host/beverage)", "LaCroix", "Goya", "Publix"],
    whyHere: "The Super Bowl of food festivals. Nothing else in the portfolio — or the industry — delivers this scale, this media reach, and this South Beach energy. 25 years of brand equity in a city that never stops moving.",
    bestFitCategories: ["Financial services", "Auto", "CPG/food & beverage", "Travel & hospitality", "Tech/lifestyle"],
  },
  nycwff: {
    id: "nycwff",
    name: "NYC Wine & Food Festival",
    shortName: "NYCWFF",
    tier: 1,
    tierName: "National Flagship",
    dates: "October 15–19, 2025",
    market: "New York City — Historic Seaport",
    attendees: "35,000+",
    format: "5-day multi-event festival",
    emoji: "🗽",
    color: "#1565C0",
    tagline: "NYC's premier culinary festival in the heart of the Seaport",
    audience: "Affluent NYC metro + national draw | 20,000+ at Grand Tasting alone | Culinary enthusiasts, industry leaders",
    scale: "50+ events including walk-around tastings, intimate dinners, FoodieCon, cocktail parties",
    media: "National Food Network platform, extensive NYC media footprint",
    presented: "Food Network & Invesco QQQ presenting",
    beneficiary: "No Kid Hungry & James Beard Foundation",
    inventory: "Custom packages — contact for pricing",
    keyInventory: ["Grand Tasting presenting/title", "Signature event sponsorship", "FoodieCon integration", "Custom brand activation", "Marketing & media collaboration"],
    existingPartners: ["Invesco QQQ (presenting)", "Southern Glazer's"],
    whyHere: "The New York version of SOBEWFF — same Food Network DNA, same caliber of talent, different city energy. The Seaport setting gives brands a world-class backdrop in the media capital of the world.",
    bestFitCategories: ["Financial services/investment", "Auto", "CPG", "Travel", "Tech", "Fashion/lifestyle"],
  },
  pebblebeach: {
    id: "pebblebeach",
    name: "Pebble Beach Food & Wine",
    shortName: "Pebble Beach F&W",
    tier: 2,
    tierName: "Premium Destination",
    dates: "April 9–12, 2026",
    market: "Pebble Beach, CA",
    attendees: "~8,500",
    format: "4-day destination festival",
    emoji: "⛳",
    color: "#2E7D32",
    tagline: "The West Coast's premier epicurean destination — where golf, wine, and world-class cuisine meet",
    audience: "Ultra-premium wine & spirits connoisseurs | HNW destination travelers | Packages from $3K–$10K per person",
    scale: "35+ events including Tasting Pavilion, intimate dinners, golf tournament, wine seminars",
    media: "Wine & spirits trade press, luxury lifestyle media",
    presented: "Pebble Beach Company Foundation",
    beneficiary: "Pebble Beach Company Foundation — $20M+ to Monterey County youth",
    inventory: "Custom packages — premium pricing",
    keyInventory: ["Tasting Pavilion presenting/title", "Golf tournament integration", "Intimate dinner hosting", "Wine seminar presenting", "VIP lounge"],
    existingPartners: ["HexClad", "James Beard Foundation"],
    whyHere: "The most prestigious wine-focused festival in the country. If a brand needs to reach serious wine and spirits buyers in a setting that says 'we belong here,' nothing competes with Pebble Beach.",
    bestFitCategories: ["Ultra-premium spirits & wine", "Luxury auto", "Financial/wealth management", "Luxury travel & hospitality"],
  },
  dlv: {
    id: "dlv",
    name: "Drink Las Vegas",
    shortName: "DLV",
    tier: 2,
    tierName: "Premium Destination",
    dates: "Year 1: 10,000 | Year 2: 15,000 | Year 3: 25,000",
    market: "Las Vegas, NV — MGM Resorts",
    attendees: "10,000+ (Year 1)",
    format: "Multi-day spirits & culinary festival",
    emoji: "🎰",
    color: "#F57F17",
    tagline: "Las Vegas reimagined through the lens of premium spirits — backed by MGM and SGWS",
    audience: "Premium spirits enthusiasts | Vegas destination travelers | Industry trade | MGM loyalty base",
    scale: "House of Sazerac, Pappy Van Winkle seminars, Iris Lounge experiences",
    media: "MGM media network, SGWS distribution reach",
    presented: "MGM Resorts & Southern Glazer's",
    beneficiary: "TBD",
    inventory: "See DLV Thought Center for pricing",
    keyInventory: ["Presenting partner", "House of Sazerac integration", "Iris Lounge activation", "Grand Tasting footprint"],
    existingPartners: ["MGM Resorts", "Southern Glazer's Wine & Spirits"],
    whyHere: "Vegas is the ultimate stage for spirits brands. DLV combines the distribution muscle of SGWS, the hotel power of MGM, and a growing festival platform.",
    bestFitCategories: ["Premium spirits", "Luxury hospitality", "Entertainment", "High-end CPG"],
  },
  bahamas: {
    id: "bahamas",
    name: "Bahamas Culinary & Arts Festival",
    shortName: "Bahamas CAF",
    tier: 2,
    tierName: "Premium Destination",
    dates: "October 22–26, 2025",
    market: "Nassau, Bahamas — Baha Mar Resort",
    attendees: "Premium destination format",
    format: "5-day premium destination festival — culinary + arts + music",
    emoji: "🏝️",
    color: "#00838F",
    tagline: "The Caribbean's most spectacular culinary and arts event — headlined by Lenny Kravitz",
    audience: "Affluent Caribbean destination travelers | International luxury resort guests | Arts & culinary enthusiasts",
    scale: "5 days | Lenny Kravitz welcome concert | Celebrity chef roster | FUZE Art Fair",
    media: "Caribbean luxury travel press, international food media, arts press",
    presented: "Baha Mar Resort",
    beneficiary: "Bahamas cultural development",
    inventory: "Custom partnership packages — premium destination pricing",
    keyInventory: ["Music event presenting/title", "FUZE Art Fair integration", "Celebrity chef dinner hosting", "Resort-wide activation"],
    existingPartners: ["ScotiaBank", "Amex", "Macallan", "Fiji"],
    whyHere: "Nothing combines music, art, celebrity chefs, and Caribbean luxury at this level. The festival layered on top of Baha Mar makes it unmissable.",
    bestFitCategories: ["Luxury spirits", "Financial/banking", "Premium water/beverage", "Luxury travel"],
  },
  lawf: {
    id: "lawf",
    name: "Los Angeles Wine & Food Festival",
    shortName: "LAWF",
    tier: 3,
    tierName: "Cultural & Regional",
    dates: "November 7–9, 2025",
    market: "Santa Monica, CA — Barker Hangar",
    attendees: "10,000",
    format: "3-day grand tasting format (Bite Club) + dinner series",
    emoji: "🌴",
    color: "#E65100",
    tagline: "A taste of LA like never before — multicultural, creative, and unmistakably Angelyne",
    audience: "LA food culture enthusiasts | Multi-cultural, creative class | Tastemade audience crossover",
    scale: "Multi-day Bite Club grand tasting, dinner series, immersive pop-ups",
    media: "Tastemade co-host, LA food press",
    presented: "Hosted by Tastemade",
    beneficiary: "TBD",
    inventory: "Custom partnership packages",
    keyInventory: ["Bite Club presenting/title", "Dinner series hosting", "Brand activation footprint", "Tastemade content integration"],
    existingPartners: ["Chase United", "Kia", "Tastemade"],
    whyHere: "LA's food scene is one of the most culturally diverse and influential in the world. LAWF with Tastemade gives brands authentic access to the LA culinary conversation.",
    bestFitCategories: ["Auto", "Financial/credit", "CPG/beverage", "Tech/lifestyle", "Fashion"],
  },
  atlantafw: {
    id: "atlantafw",
    name: "Atlanta Food & Wine Festival",
    shortName: "Atlanta F&W",
    tier: 3,
    tierName: "Cultural & Regional",
    dates: "Annual — Spring",
    market: "Atlanta, GA",
    attendees: "15,000",
    format: "Multi-day festival with tasting tents, dinners, Whiskey & Fire",
    emoji: "🍑",
    color: "#AD1457",
    tagline: "All about Atlanta — great party energy, celebrity chefs, and Southern culinary pride",
    audience: "Atlanta food enthusiasts, Southern culinary fans, 26–45 affluent consumers",
    scale: "Grand tasting tents, intimate dinners, Whiskey & Fire activation",
    media: "Atlanta media market, regional food press",
    presented: "InvescoQQQ presenting",
    beneficiary: "TBD",
    inventory: "Custom partnership packages",
    keyInventory: ["Tasting tent presenting", "Whiskey & Fire activation", "Celebrity chef demo presenting", "Dinner series hosting"],
    existingPartners: ["InvescoQQQ (presenting)", "Publix", "LaCroix", "Goya"],
    whyHere: "Atlanta is one of the fastest-growing, most culturally vibrant markets in the country. This festival captures the city's energy.",
    bestFitCategories: ["Financial/investment", "Grocery/CPG", "Beverage", "Auto", "Entertainment"],
  },
  palmbeach: {
    id: "palmbeach",
    name: "Palm Beach Food & Wine Festival",
    shortName: "Palm Beach F&W",
    tier: 3,
    tierName: "Cultural & Regional",
    dates: "Annual — December",
    market: "Palm Beach, FL",
    attendees: "7,500",
    format: "Multi-day festival with demos, dinners, tastings",
    emoji: "🌺",
    color: "#6A1B9A",
    tagline: "Very Palm Beach — luxury hotel venues, celebrity talent, and great culinary demos",
    audience: "Affluent Palm Beach consumers | HNW South Florida audience | Luxury lifestyle seekers",
    scale: "Celebrity talent, cooking demos, dinners, tastings at luxury hotel venues",
    media: "Palm Beach media market, luxury lifestyle press",
    presented: "TBD",
    beneficiary: "TBD",
    inventory: "Custom partnership packages",
    keyInventory: ["Presenting partner", "Demo stage presenting", "Dinner hosting", "Luxury hotel activation"],
    existingPartners: ["Cadillac", "JP Morgan", "Geico"],
    whyHere: "Palm Beach is one of the wealthiest zip codes in America. This festival is the on-ramp to that audience.",
    bestFitCategories: ["Luxury auto", "Financial/wealth management", "Insurance", "Luxury hospitality"],
  },
  tours: {
    id: "tours",
    name: "a21 Tours (Heritage Fire / Whiskies of the World)",
    shortName: "a21 Tours",
    tier: 4,
    tierName: "National Tour",
    dates: "Year-round — 13 stops",
    market: "13 markets: CA, CO, NC, SC, GA, FL + London",
    attendees: "18,000+ total",
    format: "Heritage Fire (live-fire), Whiskies of the World (200+ expressions), Whiskey & Fire",
    emoji: "🔥",
    color: "#E64A19",
    tagline: "1 tour. 3 epic experiences. 13 stops. National reach, local energy.",
    audience: "26–45 | $170K average HHI | 50/50 male/female | Diverse and affluent",
    scale: "13 markets including San Diego, Asheville, Napa, Atlanta, Miami",
    media: "350M+ overall impressions | 80M Facebook/Instagram",
    presented: "a21 / EventZero sustainability partner",
    beneficiary: "EventZero environmental nonprofit",
    inventory: "Tour Presenting $225K | Event Presenting from $35K | 10x10 from $5K/event",
    keyInventory: ["Tour Presenting Partner $225K", "Event Presenting from $35K/stop", "10x10 footprint from $5K/event", "Sampling table $2,500/event"],
    existingPartners: ["BMW", "Regions Bank", "LaCroix"],
    whyHere: "Multi-market national reach that no single festival can match. 18,000 affluent consumers across 13 markets.",
    bestFitCategories: ["Spirits & whiskey", "Auto", "Banking/financial", "Sparkling water/beverage"],
  },
};

const TIERS = [
  { id: 1, name: "National Flagships", desc: "Maximum scale, Food Network presented" },
  { id: 2, name: "Premium Destination", desc: "Ultra-premium audience, destination value" },
  { id: 3, name: "Cultural & Regional", desc: "Market-specific, targeted reach" },
  { id: 4, name: "National Tour", desc: "Multi-market reach, touring format" },
];

// ============================================================
// QUALIFIER FIELDS
// ============================================================
const QUALIFIER_FIELDS = [
  { section: "Brand & Product", fields: [
    { id: "company", label: "Company / Brand Name", type: "text", placeholder: "e.g. Macallan, Chase, Cadillac", required: true },
    { id: "product", label: "Product or Service Being Marketed", type: "text", placeholder: "e.g. single malt whisky, Sapphire Reserve card" },
    { id: "category", label: "Brand Category", type: "select", options: ["Spirits & Wine", "Beer/Hard Beverage", "Financial Services", "Automotive", "CPG / Food & Beverage", "Travel & Hospitality", "Technology", "Retail", "Healthcare", "Fashion / Lifestyle", "Real Estate", "Entertainment", "Other"] },
    { id: "stage", label: "Brand/Product Stage", type: "select", options: ["Established brand, maintaining presence", "Established brand, entering new market", "New product launch", "Rebrand / repositioning", "First-time festival sponsor"] },
  ]},
  { section: "Budget & Timeline", fields: [
    { id: "budget", label: "Partnership Budget Range", type: "select", options: ["Under $15,000", "$15,000–$25,000", "$25,000–$50,000", "$50,000–$100,000", "$100,000–$250,000", "$250,000+", "Flexible / TBD"] },
    { id: "timeline", label: "Timeline / Urgency", type: "select", options: ["This cycle / immediate", "Planning for next season", "Exploratory — no set timeline", "Multi-year deal interest"] },
    { id: "decisionMaker", label: "Decision Makers Involved", type: "text", placeholder: "e.g. CMO approval needed, agency involved" },
  ]},
  { section: "Goals & KPIs", fields: [
    { id: "primaryKPI", label: "Primary Success Metric", type: "select", options: ["Brand awareness / impressions", "Product sampling / trial", "Sales / revenue generation", "Lead generation / data capture", "Trade / industry relationships", "Content creation / social media", "VIP / hospitality experiences", "Market entry / new geography", "Cultural relevance / PR"] },
    { id: "secondaryKPI", label: "Secondary Goal", type: "text", placeholder: "e.g. also want trade engagement" },
    { id: "perfectPartnership", label: "In Their Words — What Does Success Look Like?", type: "textarea", placeholder: "What did they say on the call? Quote them if possible." },
  ]},
  { section: "Experience Preferences", fields: [
    { id: "activationConcept", label: "Do They Have an Activation Concept?", type: "select", options: ["Yes — specific idea", "Partial — some direction", "No — needs strategy from us", "Open to recommendation"] },
    { id: "activationDetail", label: "Describe Their Concept (if any)", type: "textarea", placeholder: "e.g. want a branded tasting booth, or hosting a dinner" },
    { id: "format", label: "Experience Format Interest", type: "multicheck", options: ["Large-scale tasting / sampling", "Intimate dinner / VIP experience", "Demo / education / seminar", "Naming rights / logo visibility", "Entertainment / hospitality", "Content creation / social", "Trade / industry engagement", "Golf / lifestyle experience"] },
  ]},
  { section: "Audience Priorities", fields: [
    { id: "audienceType", label: "Consumer vs. Trade Priority", type: "select", options: ["Consumer only", "Trade / industry only", "Both — consumer primary", "Both — trade primary", "Equal weight"] },
    { id: "geography", label: "Geographic Priority", type: "select", options: ["National reach", "Southeast region", "Northeast region", "West Coast", "Specific market (single city)", "Caribbean / International", "Multi-market / touring"] },
    { id: "demographic", label: "Target Demographic", type: "text", placeholder: "e.g. HNW 35–55, millennial food enthusiasts" },
  ]},
  { section: "Deal Context", fields: [
    { id: "festivalExperience", label: "Previous Festival Sponsorship Experience", type: "select", options: ["Very experienced — many festivals", "Some experience", "New to live events", "Unknown"] },
    { id: "categoryExclusivity", label: "Category Exclusivity Expectations", type: "select", options: ["Requires exclusivity", "Prefers exclusivity", "Nice to have", "Not important"] },
    { id: "additionalContext", label: "Anything Else Worth Knowing?", type: "textarea", placeholder: "Competitive situation, red flags, enthusiasm level..." },
  ]},
];

// ============================================================
// PLAYBOOKS DATA
// ============================================================
const PLAYBOOKS = {
  ethos: {
    title: "a21 Ethos & Voice",
    icon: "💡",
    color: colors.accent,
    cards: [
      {
        icon: "🎯",
        title: "What a21 Creates",
        content: "We create experience. We create connection — brand to an audience that consumes, earns, and explores. Our events are the room where that happens. Premium environments, world-class talent, and a genuine sense of place. That's not a pitch. That's what we do."
      },
      {
        icon: "🏆",
        title: "What Great Activation Looks Like",
        content: "Specific to the brand's world, not generic. Uses the festival's unique assets — talent, setting, audience — in ways that couldn't happen anywhere else. Tells a story. Creates a moment worth remembering."
      },
      {
        icon: "🚫",
        title: "What Lazy Activation Looks Like",
        content: "A booth with a banner. Sampling without a story. Logo on a sign with no integration. Proposals that lead with impressions instead of experience. a21 doesn't sell presence — we sell participation."
      },
      {
        icon: "💬",
        title: "How We Sound in Proposals",
        content: "Confident, not arrogant. Specific, not generic. Lead with the brand's world before talking about ours. We're not order-takers — we're strategic partners who happen to have the best festivals in the country."
      },
      {
        icon: "🎪",
        title: "The Portfolio Advantage",
        content: "No other agency runs SOBEWFF, NYCWFF, Pebble Beach, Bahamas, Heritage Fire, and an art fair portfolio simultaneously. 650K+ attendees across 17+ properties. Multi-property deals are the goal."
      },
      {
        icon: "🤝",
        title: "The Qualifying Mindset",
        content: "The best proposals come from the best discovery calls. Know their business before you pitch ours. What does success look like to their CMO? The qualifying form is a tool — the mindset is curiosity."
      },
    ]
  },
  spirits: {
    title: "Spirits & Wine Playbook",
    icon: "🥃",
    color: "#8B4513",
    cards: [
      {
        icon: "⚠️",
        title: "Critical: Distribution Requirement",
        content: "All wine and spirits brands at a21 events must distribute through Southern Glazer's Wine & Spirits. This is non-negotiable for sampling. Verify distribution status early in qualification."
      },
      {
        icon: "🎯",
        title: "What Spirits Brands Want",
        content: "Premium positioning, not volume. Education and storytelling opportunities. Access to tastemakers and trade. Content for social. Association with culinary excellence. Trade engagement alongside consumer."
      },
      {
        icon: "💰",
        title: "Typical Entry Points",
        content: "Sampling table: $2,500–$5,000/event. 10x10 footprint: $5,000–$10,000. Seminar presenting: $15,000–$25,000. Event presenting: $35,000–$75,000. Festival presenting: $100,000+."
      },
      {
        icon: "🏆",
        title: "Best Fit Properties",
        content: "Premium spirits → Pebble Beach, Drink Vegas, Bahamas. Whiskey → Heritage Fire, Whiskies of the World. Wine → Pebble Beach, SOBEWFF, NYCWFF. Tequila/Mezcal → LAWF, SOBEWFF."
      },
      {
        icon: "❓",
        title: "Common Objections",
        content: "\"We only do on-premise\" → Festival IS on-premise with 65,000 high-value consumers. \"Our distributor handles events\" → SGWS partnership means we're already aligned. \"Budget is locked\" → Multi-property deals create efficiency."
      },
    ]
  },
  auto: {
    title: "Automotive Playbook",
    icon: "🚗",
    color: "#1565C0",
    cards: [
      {
        icon: "🎯",
        title: "What Auto Brands Want",
        content: "Affluent lifestyle alignment. Experiential test-drive opportunities. Content creation in premium settings. Association with culinary/cultural excellence. Regional dealer activation support."
      },
      {
        icon: "💰",
        title: "Typical Packages",
        content: "Festival presenting: $100,000–$250,000. Event presenting: $50,000–$100,000. Vehicle display + activation: $25,000–$50,000. Multi-property national: $500,000+."
      },
      {
        icon: "🏆",
        title: "Best Fit Properties",
        content: "Luxury (Porsche, BMW, Mercedes) → Pebble Beach, Palm Beach. Mass luxury (Lexus, Cadillac) → SOBEWFF, NYCWFF. EV launches → LA Food & Wine, Atlanta. Touring → Heritage Fire national."
      },
      {
        icon: "✨",
        title: "Activation Ideas",
        content: "Ride-and-drive experiences. Chef transportation partnerships. VIP shuttle branding. Culinary road trip content series. Chef car delivery moments. Golf tournament vehicle fleet."
      },
    ]
  },
  financial: {
    title: "Financial Services Playbook",
    icon: "💳",
    color: "#059669",
    cards: [
      {
        icon: "🎯",
        title: "What Financial Brands Want",
        content: "Affluent cardholder engagement. Premium lifestyle association. Lead generation for wealth management. B2B visibility with business owners. Content showing \"good life\" positioning."
      },
      {
        icon: "💰",
        title: "Typical Packages",
        content: "Festival presenting: $100,000–$500,000. VIP lounge: $50,000–$100,000. Cardholder exclusive access: $25,000–$50,000. Multi-property portfolio: $250,000+."
      },
      {
        icon: "🏆",
        title: "Best Fit Properties",
        content: "Wealth management → Pebble Beach, Bahamas, Palm Beach. Credit cards → SOBEWFF, NYCWFF (scale). Regional banks → Atlanta, touring events. Investment → NYCWFF (presenting precedent)."
      },
      {
        icon: "✨",
        title: "Activation Ideas",
        content: "Cardholder early access/priority entry. VIP lounge with dedicated experiences. Bill payment as sponsor benefit. \"Book with points\" dinner series. Business owner networking events."
      },
    ]
  },
};

// ============================================================
// SAMPLE DEALS (for dashboard)
// ============================================================
const SAMPLE_DEALS = [
  { id: 1, company: "Macallan", property: "Pebble Beach F&W", stage: "Proposal Sent", value: 75000, seller: "Anthony G.", date: "2025-03-01" },
  { id: 2, company: "Chase Sapphire", property: "SOBEWFF", stage: "Negotiation", value: 150000, seller: "Darrin C.", date: "2025-02-28" },
  { id: 3, company: "BMW", property: "Heritage Fire Tour", stage: "Qualified", value: 225000, seller: "Anthony G.", date: "2025-03-03" },
  { id: 4, company: "Regions Bank", property: "Atlanta F&W", stage: "Closed Won", value: 50000, seller: "Darrin C.", date: "2025-02-15" },
  { id: 5, company: "Fiji Water", property: "Bahamas CAF", stage: "Proposal Sent", value: 40000, seller: "Anthony G.", date: "2025-03-02" },
  { id: 6, company: "Lexus", property: "Palm Beach F&W", stage: "Lead", value: 100000, seller: "Darrin C.", date: "2025-03-04" },
  { id: 7, company: "Goya Foods", property: "NYCWFF", stage: "Closed Won", value: 60000, seller: "Anthony G.", date: "2025-01-20" },
  { id: 8, company: "LaCroix", property: "SOBEWFF", stage: "Closed Won", value: 45000, seller: "Darrin C.", date: "2025-02-01" },
];

// ============================================================
// STYLES
// ============================================================
const styles = {
  app: {
    display: "flex",
    minHeight: "100vh",
    background: colors.bg,
    fontFamily: "'Söhne', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  sidebar: {
    width: "240px",
    background: colors.bgSidebar,
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    height: "100vh",
    zIndex: 100,
  },
  sidebarLogo: {
    padding: "24px 20px",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  },
  logoMark: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  logoText: {
    fontSize: "24px",
    fontWeight: "800",
    letterSpacing: "-0.02em",
    background: `linear-gradient(135deg, ${colors.accent}, #fff)`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  logoSubtext: {
    fontSize: "11px",
    color: "rgba(255,255,255,0.5)",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    marginTop: "4px",
  },
  nav: {
    flex: 1,
    padding: "16px 12px",
    overflowY: "auto",
  },
  navSection: {
    marginBottom: "24px",
  },
  navLabel: {
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    color: "rgba(255,255,255,0.4)",
    padding: "0 8px",
    marginBottom: "8px",
  },
  navItem: (active) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: active ? "600" : "400",
    background: active ? "rgba(224,123,175,0.15)" : "transparent",
    color: active ? colors.accent : "rgba(255,255,255,0.7)",
    transition: "all 0.15s ease",
    marginBottom: "2px",
  }),
  main: {
    marginLeft: "240px",
    flex: 1,
    minHeight: "100vh",
  },
  header: {
    background: colors.bgCard,
    borderBottom: `1px solid ${colors.border}`,
    padding: "16px 32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "sticky",
    top: 0,
    zIndex: 50,
  },
  headerTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: colors.text,
  },
  headerActions: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  content: {
    padding: "32px",
    maxWidth: "1400px",
  },
  card: {
    background: colors.bgCard,
    borderRadius: "12px",
    border: `1px solid ${colors.border}`,
    padding: "24px",
    marginBottom: "24px",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  cardTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: colors.text,
  },
  button: (variant = "primary") => ({
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: variant === "sm" ? "8px 14px" : "12px 20px",
    borderRadius: "8px",
    border: "none",
    fontSize: variant === "sm" ? "13px" : "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.15s ease",
    background: variant === "primary" || variant === "sm" ? colors.accent : variant === "secondary" ? colors.bgCard : "transparent",
    color: variant === "primary" || variant === "sm" ? "#fff" : colors.text,
    borderColor: variant === "secondary" ? colors.border : "transparent",
    borderWidth: variant === "secondary" ? "1px" : "0",
    borderStyle: "solid",
  }),
  input: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "8px",
    border: `1px solid ${colors.border}`,
    fontSize: "14px",
    color: colors.text,
    background: colors.bgCard,
    outline: "none",
    transition: "border-color 0.15s ease",
  },
  select: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "8px",
    border: `1px solid ${colors.border}`,
    fontSize: "14px",
    color: colors.text,
    background: colors.bgCard,
    outline: "none",
    cursor: "pointer",
  },
  textarea: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "8px",
    border: `1px solid ${colors.border}`,
    fontSize: "14px",
    color: colors.text,
    background: colors.bgCard,
    outline: "none",
    resize: "vertical",
    minHeight: "80px",
    fontFamily: "inherit",
  },
  label: {
    display: "block",
    fontSize: "13px",
    fontWeight: "500",
    color: colors.textMuted,
    marginBottom: "6px",
  },
  badge: (color = colors.accent) => ({
    display: "inline-flex",
    alignItems: "center",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "500",
    background: `${color}15`,
    color: color,
  }),
  metric: {
    textAlign: "center",
    padding: "20px",
  },
  metricValue: {
    fontSize: "32px",
    fontWeight: "700",
    color: colors.primary,
    marginBottom: "4px",
  },
  metricLabel: {
    fontSize: "13px",
    color: colors.textMuted,
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
  },
  grid4: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "16px",
  },
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function A21Platform() {
  // Navigation state
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [currentSubPage, setCurrentSubPage] = useState(null);
  
  // Onboarding state
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  
  // Data state
  const [qualifiers, setQualifiers] = useState([]);
  const [currentQualifier, setCurrentQualifier] = useState(null);
  const [currentStrategy, setCurrentStrategy] = useState(null);
  const [currentProposal, setCurrentProposal] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [selectedPlaybook, setSelectedPlaybook] = useState("ethos");
  
  // Form state
  const [qualifierData, setQualifierData] = useState({});
  const [checkedFormats, setCheckedFormats] = useState([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState("");
  
  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [strategyOutput, setStrategyOutput] = useState("");
  const [proposalOutput, setProposalOutput] = useState("");
  const [emailOutput, setEmailOutput] = useState("");
  
  // Filter state
  const [propertyFilter, setPropertyFilter] = useState("all");

  // Navigation
  const navigate = (page, subPage = null) => {
    setCurrentPage(page);
    setCurrentSubPage(subPage);
    if (page === "qualifier" && subPage === "new") {
      setQualifierData({});
      setCheckedFormats([]);
      setSelectedPropertyId("");
      setStrategyOutput("");
      setProposalOutput("");
    }
  };

  // Handlers
  const handleQualifierChange = (id, value) => {
    setQualifierData(prev => ({ ...prev, [id]: value }));
  };

  const handleFormatCheck = (option) => {
    setCheckedFormats(prev =>
      prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
    );
  };

  const saveQualifier = () => {
    const newQualifier = {
      id: Date.now(),
      ...qualifierData,
      formats: checkedFormats,
      propertyId: selectedPropertyId,
      createdAt: new Date().toISOString(),
      status: "draft",
    };
    setQualifiers(prev => [newQualifier, ...prev]);
    setCurrentQualifier(newQualifier);
    return newQualifier;
  };

  // ============================================================
  // TEMPLATE-BASED STRATEGY ENGINE (No AI Required)
  // ============================================================

  // Activation concept templates by category
  const ACTIVATION_TEMPLATES = {
    "Spirits & Wine": [
      "**Signature Tasting Experience**: Create an exclusive tasting lounge featuring [PRODUCT] with guided tastings led by your brand ambassador. Pair with chef-curated bites that complement flavor profiles.",
      "**Cocktail Garden Activation**: Transform a section of the festival into an immersive [BRAND] cocktail garden with live mixologists crafting signature serves.",
      "**Master Class Series**: Host intimate seminars where guests learn the craft behind [PRODUCT] — distillation process, tasting notes, perfect pairings.",
      "**VIP Happy Hour Presenting**: Own the pre-event VIP reception, positioning [BRAND] as the drink of choice for the festival's most influential attendees.",
    ],
    "Financial Services": [
      "**Cardholder Lounge**: Create an exclusive retreat for [BRAND] cardholders with premium seating, complimentary refreshments, and priority access to events.",
      "**VIP Experience Presenting**: Sponsor the festival's most coveted experiences, connecting your brand with high-net-worth attendees in an aspirational setting.",
      "**Concierge Services**: Offer [BRAND] members a dedicated concierge desk for reservations, upgrades, and personalized recommendations.",
      "**Business Networking Reception**: Host an intimate gathering for entrepreneurs and executives, positioning [BRAND] as the partner for ambitious professionals.",
    ],
    "Automotive": [
      "**Ride & Drive Experience**: Position vehicles at the festival entrance or VIP areas, offering attendees test drives to nearby destinations.",
      "**Chef Shuttle Partnership**: Transport celebrity chefs in [BRAND] vehicles, creating organic content moments and brand association with culinary excellence.",
      "**Luxury Lounge Display**: Showcase the latest models in a premium lounge environment where attendees can explore features while enjoying the festival.",
      "**VIP Transportation Fleet**: Provide branded shuttle service for VIP attendees, ensuring your vehicles are the first and last impression of the festival.",
    ],
    "CPG / Food & Beverage": [
      "**Sampling Station**: High-traffic sampling activation with brand ambassadors, encouraging trial and driving awareness among target consumers.",
      "**Chef Collaboration**: Partner with festival chefs to incorporate [PRODUCT] into signature dishes, earning menu placement and culinary credibility.",
      "**Gift Bag Inclusion**: Reach every attendee through the official gift bag program, putting [PRODUCT] directly in consumers' hands.",
      "**Cooking Demo Presenting**: Sponsor a celebrity chef demonstration featuring [PRODUCT] as a key ingredient, with live audience engagement.",
    ],
    "Travel & Hospitality": [
      "**Destination Experience**: Create an immersive activation transporting guests to [DESTINATION] through decor, cuisine, and entertainment.",
      "**Getaway Giveaway**: Generate leads and buzz with a trip giveaway, collecting contact information from qualified prospects.",
      "**VIP Hospitality Suite**: Host key clients and prospects in an exclusive branded suite with premium catering and entertainment.",
      "**Loyalty Member Experience**: Offer exclusive access or upgrades to [BRAND] loyalty members, driving program enrollment on-site.",
    ],
    "default": [
      "**Brand Experience Zone**: Create an immersive activation space that brings your brand story to life through interactive elements and product showcases.",
      "**Presenting Partner**: Align with a signature festival event, gaining naming rights, stage presence, and premium visibility.",
      "**VIP Access Sponsor**: Own the VIP experience, connecting your brand with the festival's most valuable attendees.",
      "**Sampling & Engagement**: High-touch activation with brand ambassadors driving awareness, trial, and data capture.",
    ],
  };

  // Objection templates by category
  const OBJECTION_TEMPLATES = {
    "Spirits & Wine": [
      { objection: "We only do on-premise activations", response: "Festival IS on-premise — 65,000+ consumers actively choosing to engage with food and beverage brands in a premium environment. This is the definition of high-value on-premise." },
      { objection: "Our distributor handles events", response: "As an SGWS-partnered event, we're already aligned with your distribution. This isn't competitive — it's complementary, and we can coordinate directly with your distributor contacts." },
      { objection: "Budget is allocated to other channels", response: "Consider this: a single festival activation can generate more qualified, high-intent consumer touchpoints than months of traditional advertising — with content assets you can repurpose year-round." },
    ],
    "Financial Services": [
      { objection: "We need to see hard ROI numbers", response: "We can structure this with trackable KPIs: card sign-ups, QR scans, lead capture, cardholder attendance. Past partners have seen 3-5x ROI on activation spend through new acquisitions alone." },
      { objection: "Our cardholders already have access to events", response: "This creates differentiated value your competitors can't match — exclusive festival access positions your card as the key to experiences money can't buy." },
      { objection: "We're focused on digital this year", response: "Festival activations generate premium content for digital channels. One weekend creates months of social content, influencer partnerships, and authentic brand moments." },
    ],
    "Automotive": [
      { objection: "We need test drives to justify spend", response: "We can absolutely structure a ride-and-drive experience. Festival attendees are the exact demographic — affluent, experience-seeking, brand-conscious — who convert from test drives to purchases." },
      { objection: "Our regional dealers need to be involved", response: "We love dealer involvement. Local dealers can staff the activation, capture leads for their market, and build relationships with customers in their territory." },
      { objection: "Timing doesn't align with launch calendar", response: "Brand presence between launches keeps you top-of-mind. This audience is researching their next vehicle now — being present when competitors aren't is a strategic advantage." },
    ],
    "default": [
      { objection: "We've never done festival sponsorship before", response: "That's exactly why this is an opportunity. Your competitors are already here. First-mover advantage in a category means you define the space before others arrive." },
      { objection: "Budget is tight this year", response: "We have entry points at multiple levels. A strategic smaller activation can prove the concept, generate learnings, and set the stage for expanded partnership next year." },
      { objection: "We need to involve our agency", response: "Happy to loop them in. We work with agencies regularly and can provide all the specs, audience data, and creative guidelines they need to build this into your broader strategy." },
    ],
  };

  // Email templates
  const EMAIL_TEMPLATES = [
    {
      tone: "warm",
      subject: "Quick thought on [PROPERTY] + [BRAND]",
      body: `Hi [CONTACT],

I've been thinking about [BRAND]'s positioning in the [CATEGORY] space, and I wanted to share an idea.

[PROPERTY] is coming up [DATES], and there's a natural fit I'd love to explore with you. The festival draws [ATTENDEES] — exactly the [DEMOGRAPHIC] audience that [BRAND] resonates with.

I have a specific activation concept in mind that I think could work beautifully. Would you have 20 minutes this week or next to walk through it?

Best,
[SELLER]`
    },
    {
      tone: "direct",
      subject: "[BRAND] + [PROPERTY] — partnership opportunity",
      body: `Hi [CONTACT],

[PROPERTY] ([DATES]) has an opening in the [CATEGORY] category that I think [BRAND] should consider.

Quick context:
• [ATTENDEES] attendees, [DEMOGRAPHIC]
• Category exclusivity available at your investment level
• Activation options ranging from sampling to presenting partner

I'd like to send over a brief one-pager with specific ideas. What's the best email for that?

[SELLER]`
    },
    {
      tone: "follow-up",
      subject: "Following up: [PROPERTY] opportunity",
      body: `Hi [CONTACT],

Wanted to circle back on the [PROPERTY] partnership opportunity I mentioned.

We're finalizing the sponsor lineup for [DATES], and I'd hate for [BRAND] to miss the window. The [CATEGORY] space is competitive and I have a few other conversations in progress.

Do you have 15 minutes this week to discuss? I can work around your schedule.

[SELLER]`
    },
  ];

  // Property matching logic based on qualifier inputs
  const getRecommendedProperties = () => {
    const recommendations = [];
    const budget = qualifierData.budget || "";
    const category = qualifierData.category || "";
    const geography = qualifierData.geography || "";
    const primaryKPI = qualifierData.primaryKPI || "";

    // Budget to tier mapping
    let targetTiers = [1, 2, 3, 4];
    if (budget.includes("Under $15,000") || budget.includes("$15,000–$25,000")) {
      targetTiers = [3, 4]; // Regional and Tours
    } else if (budget.includes("$25,000–$50,000") || budget.includes("$50,000–$100,000")) {
      targetTiers = [2, 3, 4]; // Premium Destination, Regional, Tours
    } else if (budget.includes("$100,000") || budget.includes("$250,000")) {
      targetTiers = [1, 2]; // National Flagships, Premium Destination
    }

    // Geography matching
    const geoMatches = {
      "Southeast region": ["sobewff", "atlantafw", "palmbeach"],
      "Northeast region": ["nycwff"],
      "West Coast": ["pebblebeach", "lawf"],
      "Caribbean / International": ["bahamas"],
      "Multi-market / touring": ["tours"],
      "National reach": ["sobewff", "nycwff", "tours"],
    };

    // Category matching - use bestFitCategories from properties
    Object.values(PROPERTIES).forEach(prop => {
      let score = 0;
      let reasons = [];

      // Tier match
      if (targetTiers.includes(prop.tier)) {
        score += 2;
        reasons.push(`Budget aligns with ${prop.tierName} tier`);
      }

      // Geography match
      if (geography && geoMatches[geography]?.includes(prop.id)) {
        score += 3;
        reasons.push(`Matches ${geography} priority`);
      }

      // Category match
      if (category) {
        const categoryKey = category.split(" /")[0].toLowerCase();
        const propCategories = prop.bestFitCategories.map(c => c.toLowerCase()).join(" ");
        if (propCategories.includes(categoryKey) || propCategories.includes(category.toLowerCase())) {
          score += 3;
          reasons.push(`${category} is a best-fit category`);
        }
      }

      // KPI alignment
      if (primaryKPI) {
        if (primaryKPI.includes("awareness") && prop.tier <= 2) {
          score += 1;
          reasons.push("High visibility for brand awareness");
        }
        if (primaryKPI.includes("sampling") && ["sobewff", "nycwff", "tours", "atlantafw"].includes(prop.id)) {
          score += 1;
          reasons.push("Strong sampling opportunities");
        }
        if (primaryKPI.includes("VIP") && ["pebblebeach", "bahamas", "palmbeach"].includes(prop.id)) {
          score += 2;
          reasons.push("Premium VIP audience");
        }
      }

      if (score > 0) {
        recommendations.push({ property: prop, score, reasons });
      }
    });

    // Sort by score descending, take top 3
    return recommendations.sort((a, b) => b.score - a.score).slice(0, 3);
  };

  // Get activation templates for category
  const getActivationTemplates = () => {
    const category = qualifierData.category || "";
    return ACTIVATION_TEMPLATES[category] || ACTIVATION_TEMPLATES["default"];
  };

  // Get objection templates for category
  const getObjectionTemplates = () => {
    const category = qualifierData.category || "";
    return OBJECTION_TEMPLATES[category] || OBJECTION_TEMPLATES["default"];
  };

  // Generate strategy using templates (NO AI)
  const generateStrategy = () => {
    setIsGenerating(true);
    setStrategyOutput("");
    setProposalOutput("");

    // Simulate brief loading for UX
    setTimeout(() => {
      const prop = selectedPropertyId ? PROPERTIES[selectedPropertyId] : null;
      const recommendations = getRecommendedProperties();
      const activations = getActivationTemplates();
      const objections = getObjectionTemplates();
      const company = qualifierData.company || "[BRAND]";
      const category = qualifierData.category || "your category";

      // Build strategy output
      let strategy = `## Property Recommendation\n\n`;
      
      if (prop) {
        strategy += `**${prop.name}** is an excellent fit for ${company}.\n\n`;
        strategy += `→ **Why here:** ${prop.whyHere}\n\n`;
        strategy += `→ **Audience:** ${prop.audience}\n\n`;
        strategy += `→ **Scale:** ${prop.scale}\n\n`;
      } else if (recommendations.length > 0) {
        strategy += `Based on your qualifier inputs, here are the top property recommendations for ${company}:\n\n`;
        recommendations.forEach((rec, i) => {
          strategy += `**${i + 1}. ${rec.property.name}** (${rec.property.tierName})\n`;
          strategy += `→ ${rec.reasons.join(" • ")}\n`;
          strategy += `→ ${rec.property.attendees} attendees | ${rec.property.market}\n\n`;
        });
      } else {
        strategy += `We recommend exploring SOBEWFF or NYCWFF for maximum reach, or the a21 Tours for multi-market presence.\n\n`;
      }

      strategy += `## Activation Concepts\n\n`;
      strategy += `Here are tailored activation ideas for ${category} brands:\n\n`;
      activations.slice(0, 3).forEach(a => {
        strategy += a.replace(/\[BRAND\]/g, company).replace(/\[PRODUCT\]/g, qualifierData.product || "your product") + "\n\n";
      });

      const targetProp = prop || recommendations[0]?.property || PROPERTIES.sobewff;
      strategy += `## Recommended Inventory\n\n`;
      strategy += `For ${company} at ${targetProp.name}, consider:\n\n`;
      targetProp.keyInventory.slice(0, 5).forEach(item => {
        strategy += `→ **${item}**\n`;
      });
      strategy += `\n**Pricing reference:** ${targetProp.inventory}\n\n`;

      strategy += `## Audience Alignment\n\n`;
      strategy += `${targetProp.name} delivers:\n`;
      strategy += `→ ${targetProp.attendees} attendees\n`;
      strategy += `→ ${targetProp.audience}\n`;
      strategy += `→ Best-fit categories: ${targetProp.bestFitCategories.join(", ")}\n\n`;

      strategy += `## The Compelling Reason\n\n`;
      strategy += `${company} belongs at ${targetProp.name} because ${targetProp.whyHere} `;
      strategy += `This isn't just logo placement — it's authentic integration with an audience that values premium experiences and has the purchasing power to act on brand affinity.`;

      setStrategyOutput(strategy);

      // Build proposal output
      let proposal = `## Opening Hook\n\n`;
      proposal += `"${company} isn't just about ${qualifierData.product || "what you sell"} — it's about [specific brand value/mission]. `;
      proposal += `${targetProp.name} is where that story comes to life, in front of ${targetProp.attendees} consumers who share those values."\n\n`;

      proposal += `## Key Benefits to Lead With\n\n`;
      proposal += `1. **Audience Quality**: ${targetProp.audience}\n`;
      proposal += `2. **Scale & Reach**: ${targetProp.scale}\n`;
      proposal += `3. **Media Value**: ${targetProp.media || "Extensive press and social coverage"}\n`;
      if (qualifierData.primaryKPI) {
        proposal += `4. **${qualifierData.primaryKPI}**: Directly addresses your primary success metric\n`;
      }
      proposal += `\n`;

      proposal += `## Recommended Proposal Structure\n\n`;
      proposal += `1. **The Opportunity** — Lead with their world, not ours\n`;
      proposal += `2. **The Property** — ${targetProp.name} overview and fit\n`;
      proposal += `3. **The Activation** — Specific concept tailored to ${company}\n`;
      proposal += `4. **The Investment** — Package options and pricing\n`;
      proposal += `5. **The Ask** — Clear next step\n\n`;

      proposal += `## Objection Prep\n\n`;
      objections.forEach(obj => {
        proposal += `**"${obj.objection}"**\n`;
        proposal += `→ ${obj.response}\n\n`;
      });

      proposal += `## Closing Ask\n\n`;
      proposal += `"I'd love to walk you through a specific activation concept I have in mind for ${company}. `;
      proposal += `Can we find 30 minutes next week to discuss? I can also send over a one-pager in advance if that's helpful."\n\n`;

      proposal += `## Subject Line Options\n\n`;
      proposal += `1. "${targetProp.shortName} + ${company} — quick thought"\n`;
      proposal += `2. "Partnership opportunity for ${company} at ${targetProp.shortName}"\n`;
      proposal += `3. "Idea for ${company} — ${targetProp.dates}"`;

      setProposalOutput(proposal);
      setIsGenerating(false);
    }, 800); // Brief delay for UX
  };

  // Generate email using templates (NO AI)
  const generateEmail = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const prop = selectedPropertyId ? PROPERTIES[selectedPropertyId] : PROPERTIES.sobewff;
      const company = qualifierData.company || "[BRAND]";
      const contact = qualifierData.decisionMaker?.split(",")[0]?.trim() || "[CONTACT]";
      const category = qualifierData.category || "[CATEGORY]";
      const demographic = qualifierData.demographic || "affluent consumers";

      // Pick a random template
      const template = EMAIL_TEMPLATES[Math.floor(Math.random() * EMAIL_TEMPLATES.length)];
      
      let email = template.body
        .replace(/\[BRAND\]/g, company)
        .replace(/\[CONTACT\]/g, contact)
        .replace(/\[PROPERTY\]/g, prop.name)
        .replace(/\[DATES\]/g, prop.dates)
        .replace(/\[ATTENDEES\]/g, prop.attendees)
        .replace(/\[CATEGORY\]/g, category)
        .replace(/\[DEMOGRAPHIC\]/g, demographic)
        .replace(/\[SELLER\]/g, "Anthony Gordon");

      const subject = template.subject
        .replace(/\[BRAND\]/g, company)
        .replace(/\[PROPERTY\]/g, prop.shortName);

      setEmailOutput(`Subject: ${subject}\n\n${email}`);
      setIsGenerating(false);
    }, 500);
  };

  // Format markdown to HTML
  const formatMarkdown = (text) => {
    if (!text) return "";
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/^### (.*$)/gm, `<h4 style="color:${colors.accent};margin:20px 0 8px;font-size:13px;text-transform:uppercase;letter-spacing:0.05em;font-weight:600;">$1</h4>`)
      .replace(/^## (.*$)/gm, `<h3 style="color:${colors.primary};margin:24px 0 12px;font-size:16px;font-weight:600;">$1</h3>`)
      .replace(/^# (.*$)/gm, `<h2 style="color:${colors.text};margin:28px 0 14px;font-size:18px;font-weight:600;">$1</h2>`)
      .replace(/^\d+\. (.*$)/gm, `<div style="display:flex;gap:10px;margin:10px 0;padding-left:4px;"><span style="color:${colors.accent};font-weight:700;min-width:20px;">→</span><span>$1</span></div>`)
      .replace(/^- (.*$)/gm, `<div style="display:flex;gap:10px;margin:8px 0;padding-left:4px;"><span style="color:${colors.textMuted};min-width:12px;">•</span><span>$1</span></div>`)
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/\n/g, '<br/>');
  };

  // ============================================================
  // RENDER FUNCTIONS
  // ============================================================

  // SIDEBAR
  const renderSidebar = () => (
    <div style={styles.sidebar}>
      <div style={styles.sidebarLogo}>
        <div style={styles.logoMark}>
          <div style={{
            width: "36px",
            height: "36px",
            borderRadius: "8px",
            background: `linear-gradient(135deg, ${colors.accent}, #fff)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "800",
            fontSize: "16px",
            color: colors.primary,
          }}>a21</div>
          <div>
            <div style={styles.logoText}>Partnerships</div>
            <div style={styles.logoSubtext}>Internal Platform</div>
          </div>
        </div>
      </div>
      
      <nav style={styles.nav}>
        <div style={styles.navSection}>
          <div style={styles.navLabel}>Main</div>
          <div style={styles.navItem(currentPage === "dashboard")} onClick={() => navigate("dashboard")}>
            <Icons.Home /> Dashboard
          </div>
          <div style={styles.navItem(currentPage === "qualifier")} onClick={() => navigate("qualifier")}>
            <Icons.Clipboard /> Qualifier
          </div>
          <div style={styles.navItem(currentPage === "strategy")} onClick={() => navigate("strategy")}>
            <Icons.Brain /> Strategy Engine
          </div>
          <div style={styles.navItem(currentPage === "proposals")} onClick={() => navigate("proposals")}>
            <Icons.FileText /> Proposals
          </div>
        </div>
        
        <div style={styles.navSection}>
          <div style={styles.navLabel}>Reference</div>
          <div style={styles.navItem(currentPage === "properties")} onClick={() => navigate("properties")}>
            <Icons.Grid /> Properties
          </div>
          <div style={styles.navItem(currentPage === "inventory")} onClick={() => navigate("inventory")}>
            <Icons.Package /> Inventory
          </div>
          <div style={styles.navItem(currentPage === "playbooks")} onClick={() => navigate("playbooks")}>
            <Icons.Book /> Playbooks
          </div>
        </div>
        
        <div style={styles.navSection}>
          <div style={styles.navLabel}>System</div>
          <div style={styles.navItem(currentPage === "admin")} onClick={() => navigate("admin")}>
            <Icons.Settings /> Admin
          </div>
        </div>
      </nav>
      
      <div style={{ padding: "16px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: colors.accent,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "13px",
            fontWeight: "600",
            color: "#fff",
          }}>AG</div>
          <div>
            <div style={{ fontSize: "13px", fontWeight: "500" }}>Anthony Gordon</div>
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)" }}>VP Partnerships</div>
          </div>
        </div>
      </div>
    </div>
  );

  // DASHBOARD
  const renderDashboard = () => {
    const dealsByStage = {
      Lead: SAMPLE_DEALS.filter(d => d.stage === "Lead"),
      Qualified: SAMPLE_DEALS.filter(d => d.stage === "Qualified"),
      "Proposal Sent": SAMPLE_DEALS.filter(d => d.stage === "Proposal Sent"),
      Negotiation: SAMPLE_DEALS.filter(d => d.stage === "Negotiation"),
      "Closed Won": SAMPLE_DEALS.filter(d => d.stage === "Closed Won"),
    };
    
    const totalPipeline = SAMPLE_DEALS.filter(d => d.stage !== "Closed Won" && d.stage !== "Closed Lost")
      .reduce((sum, d) => sum + d.value, 0);
    const closedValue = SAMPLE_DEALS.filter(d => d.stage === "Closed Won")
      .reduce((sum, d) => sum + d.value, 0);

    return (
      <>
        <div style={styles.header}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <h1 style={styles.headerTitle}>Dashboard</h1>
            <span style={{ 
              fontSize: "13px", 
              color: colors.textMuted,
              padding: "4px 10px",
              background: colors.bg,
              borderRadius: "6px",
            }}>
              See your pipeline at a glance and start qualifiers to turn calls into partnerships
            </span>
          </div>
          <div style={styles.headerActions}>
            <button 
              style={{
                ...styles.button("secondary"),
                padding: "8px 12px",
              }}
              onClick={() => setShowHelp(true)}
              title="Help & Tips"
            >
              <Icons.HelpCircle />
            </button>
            <button style={styles.button("primary")} onClick={() => navigate("qualifier", "new")}>
              <Icons.Plus /> New Qualifier
            </button>
          </div>
        </div>
        
        <div style={styles.content}>
          {/* Metrics Row */}
          <div style={{ ...styles.grid4, marginBottom: "24px" }}>
            <div style={styles.card}>
              <div style={styles.metric}>
                <div style={styles.metricValue}>${(totalPipeline / 1000).toFixed(0)}K</div>
                <div style={styles.metricLabel}>Active Pipeline</div>
              </div>
            </div>
            <div style={styles.card}>
              <div style={styles.metric}>
                <div style={{ ...styles.metricValue, color: colors.success }}>${(closedValue / 1000).toFixed(0)}K</div>
                <div style={styles.metricLabel}>Closed This Quarter</div>
              </div>
            </div>
            <div style={styles.card}>
              <div style={styles.metric}>
                <div style={styles.metricValue}>{SAMPLE_DEALS.length}</div>
                <div style={styles.metricLabel}>Active Deals</div>
              </div>
            </div>
            <div style={styles.card}>
              <div style={styles.metric}>
                <div style={styles.metricValue}>{qualifiers.length}</div>
                <div style={styles.metricLabel}>Qualifiers This Week</div>
              </div>
            </div>
          </div>

          {/* Pipeline Stages */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>Pipeline by Stage</h2>
            </div>
            <div style={{ display: "flex", gap: "16px", overflowX: "auto", paddingBottom: "8px" }}>
              {Object.entries(dealsByStage).map(([stage, deals]) => (
                <div key={stage} style={{
                  flex: "0 0 220px",
                  background: colors.bg,
                  borderRadius: "10px",
                  padding: "16px",
                }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                    <span style={{ fontSize: "13px", fontWeight: "600", color: colors.text }}>{stage}</span>
                    <span style={styles.badge(stage === "Closed Won" ? colors.success : colors.accent)}>{deals.length}</span>
                  </div>
                  {deals.map(deal => (
                    <div key={deal.id} style={{
                      background: colors.bgCard,
                      borderRadius: "8px",
                      padding: "12px",
                      marginBottom: "8px",
                      border: `1px solid ${colors.border}`,
                    }}>
                      <div style={{ fontSize: "14px", fontWeight: "500", color: colors.text, marginBottom: "4px" }}>{deal.company}</div>
                      <div style={{ fontSize: "12px", color: colors.textMuted, marginBottom: "6px" }}>{deal.property}</div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "13px", fontWeight: "600", color: colors.primary }}>${(deal.value / 1000).toFixed(0)}K</span>
                        <span style={{ fontSize: "11px", color: colors.textLight }}>{deal.seller}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div style={styles.grid2}>
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h2 style={styles.cardTitle}>Quick Actions</h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <button style={{ ...styles.button("secondary"), justifyContent: "flex-start", width: "100%" }} onClick={() => navigate("qualifier", "new")}>
                  <Icons.Clipboard /> Start New Qualifier
                </button>
                <button style={{ ...styles.button("secondary"), justifyContent: "flex-start", width: "100%" }} onClick={() => navigate("properties")}>
                  <Icons.Grid /> Browse Properties
                </button>
                <button style={{ ...styles.button("secondary"), justifyContent: "flex-start", width: "100%" }} onClick={() => navigate("playbooks")}>
                  <Icons.Book /> Review Playbooks
                </button>
              </div>
            </div>
            
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h2 style={styles.cardTitle}>Recent Activity</h2>
              </div>
              <div style={{ fontSize: "13px", color: colors.textMuted }}>
                {qualifiers.length > 0 ? (
                  qualifiers.slice(0, 5).map((q, i) => (
                    <div key={i} style={{ padding: "8px 0", borderBottom: i < 4 ? `1px solid ${colors.borderLight}` : "none" }}>
                      <span style={{ fontWeight: "500", color: colors.text }}>{q.company || "New Lead"}</span>
                      <span style={{ marginLeft: "8px", color: colors.textLight }}>Qualifier created</span>
                    </div>
                  ))
                ) : (
                  <div style={{ padding: "20px", textAlign: "center", color: colors.textLight }}>
                    No recent activity. Start a qualifier to see it here.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  // QUALIFIER
  const renderQualifier = () => {
    if (currentSubPage === "new" || currentSubPage === "edit") {
      return renderQualifierForm();
    }
    
    return (
      <>
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>Qualifiers</h1>
          <div style={styles.headerActions}>
            <button style={styles.button("primary")} onClick={() => navigate("qualifier", "new")}>
              <Icons.Plus /> New Qualifier
            </button>
          </div>
        </div>
        
        <div style={styles.content}>
          {qualifiers.length === 0 ? (
            <div style={{ ...styles.card, textAlign: "center", padding: "60px" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>📋</div>
              <h2 style={{ fontSize: "18px", fontWeight: "600", color: colors.text, marginBottom: "8px" }}>No Qualifiers Yet</h2>
              <p style={{ color: colors.textMuted, marginBottom: "20px" }}>Start by creating your first qualifier after a discovery call.</p>
              <button style={styles.button("primary")} onClick={() => navigate("qualifier", "new")}>
                <Icons.Plus /> Create First Qualifier
              </button>
            </div>
          ) : (
            <div style={styles.card}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                    <th style={{ padding: "12px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: colors.textMuted, textTransform: "uppercase" }}>Company</th>
                    <th style={{ padding: "12px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: colors.textMuted, textTransform: "uppercase" }}>Category</th>
                    <th style={{ padding: "12px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: colors.textMuted, textTransform: "uppercase" }}>Property</th>
                    <th style={{ padding: "12px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: colors.textMuted, textTransform: "uppercase" }}>Status</th>
                    <th style={{ padding: "12px", textAlign: "left", fontSize: "12px", fontWeight: "600", color: colors.textMuted, textTransform: "uppercase" }}>Created</th>
                  </tr>
                </thead>
                <tbody>
                  {qualifiers.map((q, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${colors.borderLight}`, cursor: "pointer" }} 
                        onClick={() => {
                          setQualifierData(q);
                          setSelectedPropertyId(q.propertyId || "");
                          setCheckedFormats(q.formats || []);
                          navigate("qualifier", "edit");
                        }}>
                      <td style={{ padding: "12px", fontSize: "14px", fontWeight: "500", color: colors.text }}>{q.company || "—"}</td>
                      <td style={{ padding: "12px", fontSize: "14px", color: colors.textMuted }}>{q.category || "—"}</td>
                      <td style={{ padding: "12px", fontSize: "14px", color: colors.textMuted }}>{q.propertyId ? PROPERTIES[q.propertyId]?.shortName : "TBD"}</td>
                      <td style={{ padding: "12px" }}><span style={styles.badge(colors.warning)}>Draft</span></td>
                      <td style={{ padding: "12px", fontSize: "14px", color: colors.textLight }}>{new Date(q.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </>
    );
  };

  // QUALIFIER FORM
  const renderQualifierForm = () => (
    <>
      <div style={styles.header}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button style={{ ...styles.button("secondary"), padding: "8px" }} onClick={() => navigate("qualifier")}>
            <Icons.ArrowLeft />
          </button>
          <h1 style={styles.headerTitle}>{currentSubPage === "edit" ? "Edit Qualifier" : "New Qualifier"}</h1>
        </div>
        <div style={styles.headerActions}>
          <button style={styles.button("secondary")} onClick={() => { saveQualifier(); navigate("qualifier"); }}>
            Save Draft
          </button>
          <button style={styles.button("primary")} onClick={() => { saveQualifier(); navigate("strategy"); }} disabled={!qualifierData.company}>
            <Icons.Zap /> Generate Strategy
          </button>
        </div>
      </div>
      
      <div style={styles.content}>
        {/* Helpful Intro */}
        <div style={{
          background: `linear-gradient(135deg, ${colors.primary}08, ${colors.accent}08)`,
          borderRadius: "12px",
          padding: "16px 20px",
          marginBottom: "24px",
          borderLeft: `4px solid ${colors.accent}`,
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
            <span style={{ fontSize: "20px" }}>💡</span>
            <div>
              <p style={{ fontSize: "14px", color: colors.text, margin: "0 0 4px", fontWeight: "500" }}>
                The better your qualifier, the sharper your output.
              </p>
              <p style={{ fontSize: "13px", color: colors.textMuted, margin: 0 }}>
                Fill this out right after your discovery call while details are fresh. Include direct quotes when possible.
              </p>
            </div>
          </div>
        </div>

        {/* Property Selector */}
        <div style={{ ...styles.card, borderColor: colors.accent, borderWidth: "2px" }}>
          <label style={{ ...styles.label, color: colors.accent, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Target Property (optional)
          </label>
          <select
            value={selectedPropertyId}
            onChange={e => setSelectedPropertyId(e.target.value)}
            style={styles.select}
          >
            <option value="">🔍 Auto-recommend the best property fit</option>
            {Object.values(PROPERTIES).sort((a, b) => a.tier - b.tier).map(p => (
              <option key={p.id} value={p.id}>
                {p.emoji} {p.name} — {p.tierName}
              </option>
            ))}
          </select>
          {selectedPropertyId && PROPERTIES[selectedPropertyId] && (
            <div style={{
              marginTop: "12px",
              padding: "12px 16px",
              background: colors.bg,
              borderRadius: "8px",
              fontSize: "13px",
              color: colors.textMuted,
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
            }}>
              <span><strong style={{ color: PROPERTIES[selectedPropertyId].color }}>{PROPERTIES[selectedPropertyId].shortName}</strong></span>
              <span>{PROPERTIES[selectedPropertyId].dates}</span>
              <span>{PROPERTIES[selectedPropertyId].attendees} attendees</span>
              <span>{PROPERTIES[selectedPropertyId].market}</span>
            </div>
          )}
        </div>

        {/* Qualifier Sections */}
        {QUALIFIER_FIELDS.map(section => (
          <div key={section.section} style={styles.card}>
            <h3 style={{
              fontSize: "12px",
              fontWeight: "600",
              color: colors.accent,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "20px",
            }}>{section.section}</h3>
            <div style={styles.grid2}>
              {section.fields.map(field => (
                <div key={field.id} style={{ gridColumn: (field.type === "textarea" || field.type === "multicheck") ? "span 2" : "span 1" }}>
                  <label style={styles.label}>{field.label}</label>
                  {field.type === "text" && (
                    <input
                      type="text"
                      placeholder={field.placeholder}
                      value={qualifierData[field.id] || ""}
                      onChange={e => handleQualifierChange(field.id, e.target.value)}
                      style={styles.input}
                    />
                  )}
                  {field.type === "select" && (
                    <select
                      value={qualifierData[field.id] || ""}
                      onChange={e => handleQualifierChange(field.id, e.target.value)}
                      style={styles.select}
                    >
                      <option value="">Select...</option>
                      {field.options.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  )}
                  {field.type === "textarea" && (
                    <textarea
                      placeholder={field.placeholder}
                      value={qualifierData[field.id] || ""}
                      onChange={e => handleQualifierChange(field.id, e.target.value)}
                      style={styles.textarea}
                    />
                  )}
                  {field.type === "multicheck" && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {field.options.map(opt => (
                        <label key={opt} style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          background: checkedFormats.includes(opt) ? `${colors.accent}15` : colors.bg,
                          border: `1px solid ${checkedFormats.includes(opt) ? colors.accent : colors.border}`,
                          borderRadius: "20px",
                          padding: "6px 14px",
                          cursor: "pointer",
                          fontSize: "13px",
                          color: checkedFormats.includes(opt) ? colors.accent : colors.textMuted,
                          transition: "all 0.15s ease",
                        }}>
                          <input
                            type="checkbox"
                            checked={checkedFormats.includes(opt)}
                            onChange={() => handleFormatCheck(opt)}
                            style={{ display: "none" }}
                          />
                          {checkedFormats.includes(opt) && <Icons.Check />}
                          {opt}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Generate Button */}
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <button
            style={{
              ...styles.button("primary"),
              padding: "16px 48px",
              fontSize: "16px",
              boxShadow: `0 4px 24px ${colors.accent}40`,
            }}
            onClick={() => { saveQualifier(); navigate("strategy"); }}
            disabled={!qualifierData.company}
          >
            <Icons.Sparkles /> Generate Strategy & Proposal
          </button>
          <p style={{ marginTop: "12px", fontSize: "13px", color: colors.textMuted }}>
            The system will analyze your qualifier and generate strategic recommendations
          </p>
        </div>
      </div>
    </>
  );

  // STRATEGY ENGINE
  const renderStrategy = () => (
    <>
      <div style={styles.header}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <h1 style={styles.headerTitle}>Strategy Engine</h1>
          <span style={{ 
            fontSize: "13px", 
            color: colors.textMuted,
            padding: "4px 10px",
            background: colors.bg,
            borderRadius: "6px",
          }}>
            Smart recommendations based on your qualifier
          </span>
        </div>
        <div style={styles.headerActions}>
          {strategyOutput && (
            <button style={styles.button("secondary")} onClick={generateStrategy} disabled={isGenerating}>
              <Icons.Sparkles /> Regenerate
            </button>
          )}
        </div>
      </div>
      
      <div style={styles.content}>
        {!strategyOutput && !isGenerating && (
          <div style={{ ...styles.card, textAlign: "center", padding: "60px" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🧠</div>
            <h2 style={{ fontSize: "18px", fontWeight: "600", color: colors.text, marginBottom: "8px" }}>Ready to Generate Strategy</h2>
            <p style={{ color: colors.textMuted, marginBottom: "20px" }}>
              {qualifierData.company 
                ? `Qualifier for ${qualifierData.company} is ready. Click below to generate strategy.`
                : "Complete a qualifier first, then come back to generate strategy."
              }
            </p>
            {qualifierData.company ? (
              <button style={styles.button("primary")} onClick={generateStrategy}>
                <Icons.Zap /> Generate Strategy
              </button>
            ) : (
              <button style={styles.button("primary")} onClick={() => navigate("qualifier", "new")}>
                <Icons.Plus /> Start Qualifier
              </button>
            )}
          </div>
        )}

        {isGenerating && !strategyOutput && (
          <div style={{ ...styles.card, textAlign: "center", padding: "60px" }}>
            <div style={{ 
              width: "48px", 
              height: "48px", 
              border: `3px solid ${colors.border}`,
              borderTopColor: colors.accent,
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 20px",
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <h2 style={{ fontSize: "16px", fontWeight: "600", color: colors.text, marginBottom: "8px" }}>Generating Strategy...</h2>
            <p style={{ color: colors.textMuted }}>Analyzing brand fit, audience alignment, and activation potential</p>
          </div>
        )}

        {strategyOutput && (
          <>
            {/* Strategy Card */}
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h2 style={styles.cardTitle}>
                  <span style={{ marginRight: "8px" }}>🧠</span>
                  Partnership Strategy
                </h2>
                {qualifierData.company && (
                  <span style={styles.badge(colors.primary)}>{qualifierData.company}</span>
                )}
              </div>
              
              {selectedPropertyId && PROPERTIES[selectedPropertyId] && (
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "14px 18px",
                  background: `${PROPERTIES[selectedPropertyId].color}10`,
                  borderRadius: "10px",
                  borderLeft: `4px solid ${PROPERTIES[selectedPropertyId].color}`,
                  marginBottom: "20px",
                }}>
                  <span style={{ fontSize: "24px" }}>{PROPERTIES[selectedPropertyId].emoji}</span>
                  <div>
                    <div style={{ fontSize: "15px", fontWeight: "600", color: colors.text }}>{PROPERTIES[selectedPropertyId].name}</div>
                    <div style={{ fontSize: "13px", color: colors.textMuted }}>{PROPERTIES[selectedPropertyId].dates} · {PROPERTIES[selectedPropertyId].market}</div>
                  </div>
                </div>
              )}
              
              <div 
                style={{ fontSize: "14px", lineHeight: "1.7", color: colors.text }}
                dangerouslySetInnerHTML={{ __html: formatMarkdown(strategyOutput) }}
              />
            </div>

            {/* Proposal Card */}
            {proposalOutput && (
              <div style={styles.card}>
                <div style={styles.cardHeader}>
                  <h2 style={styles.cardTitle}>
                    <span style={{ marginRight: "8px" }}>📄</span>
                    Proposal Direction
                  </h2>
                  <button style={styles.button("sm")} onClick={generateEmail} disabled={isGenerating}>
                    <Icons.Mail /> Generate Email
                  </button>
                </div>
                <div 
                  style={{ fontSize: "14px", lineHeight: "1.7", color: colors.text }}
                  dangerouslySetInnerHTML={{ __html: formatMarkdown(proposalOutput) }}
                />
              </div>
            )}

            {/* Email Output */}
            {emailOutput && (
              <div style={styles.card}>
                <div style={styles.cardHeader}>
                  <h2 style={styles.cardTitle}>
                    <span style={{ marginRight: "8px" }}>✉️</span>
                    Outreach Email
                  </h2>
                  <button style={styles.button("sm")} onClick={() => navigator.clipboard.writeText(emailOutput)}>
                    <Icons.Copy /> Copy
                  </button>
                </div>
                <div style={{
                  background: colors.bg,
                  borderRadius: "8px",
                  padding: "20px",
                  fontFamily: "monospace",
                  fontSize: "13px",
                  lineHeight: "1.6",
                  whiteSpace: "pre-wrap",
                  color: colors.text,
                }}>
                  {emailOutput}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );

  // PROPERTIES
  const renderProperties = () => {
    const filtered = propertyFilter === "all" 
      ? Object.values(PROPERTIES) 
      : Object.values(PROPERTIES).filter(p => p.tier === parseInt(propertyFilter));

    if (selectedProperty) {
      const prop = selectedProperty;
      return (
        <>
          <div style={styles.header}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button style={{ ...styles.button("secondary"), padding: "8px" }} onClick={() => setSelectedProperty(null)}>
                <Icons.ArrowLeft />
              </button>
              <h1 style={styles.headerTitle}>{prop.name}</h1>
            </div>
            <div style={styles.headerActions}>
              <button style={styles.button("primary")} onClick={() => { setSelectedPropertyId(prop.id); navigate("qualifier", "new"); }}>
                <Icons.Plus /> Create Qualifier for This Property
              </button>
            </div>
          </div>
          
          <div style={styles.content}>
            <div style={styles.card}>
              <div style={{ display: "flex", gap: "16px", alignItems: "flex-start", marginBottom: "24px" }}>
                <span style={{ fontSize: "48px" }}>{prop.emoji}</span>
                <div>
                  <h2 style={{ fontSize: "24px", fontWeight: "600", color: colors.text, marginBottom: "8px" }}>{prop.name}</h2>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    <span style={styles.badge(prop.color)}>{prop.tierName}</span>
                    <span style={styles.badge(colors.primary)}>{prop.attendees} attendees</span>
                  </div>
                </div>
              </div>
              
              <div style={{
                padding: "16px 20px",
                background: `${prop.color}10`,
                borderRadius: "10px",
                borderLeft: `4px solid ${prop.color}`,
                marginBottom: "24px",
                fontStyle: "italic",
                color: colors.text,
                fontSize: "15px",
              }}>
                {prop.tagline}
              </div>
              
              <div style={styles.grid2}>
                {[
                  { label: "Dates", value: prop.dates },
                  { label: "Market", value: prop.market },
                  { label: "Format", value: prop.format },
                  { label: "Presented By", value: prop.presented },
                  { label: "Pricing", value: prop.inventory },
                  { label: "Beneficiary", value: prop.beneficiary || "TBD" },
                ].map(item => (
                  <div key={item.label} style={{ padding: "16px", background: colors.bg, borderRadius: "8px" }}>
                    <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", color: colors.textLight, marginBottom: "4px" }}>{item.label}</div>
                    <div style={{ fontSize: "14px", color: colors.text }}>{item.value}</div>
                  </div>
                ))}
              </div>
              
              <div style={{ marginTop: "24px" }}>
                <h3 style={{ fontSize: "14px", fontWeight: "600", color: colors.text, marginBottom: "12px" }}>Audience</h3>
                <p style={{ fontSize: "14px", color: colors.textMuted, lineHeight: "1.6" }}>{prop.audience}</p>
              </div>
              
              <div style={{ marginTop: "24px" }}>
                <h3 style={{ fontSize: "14px", fontWeight: "600", color: colors.text, marginBottom: "12px" }}>Key Inventory</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {prop.keyInventory.map(item => (
                    <span key={item} style={{
                      padding: "6px 12px",
                      background: colors.bg,
                      borderRadius: "6px",
                      fontSize: "13px",
                      color: colors.textMuted,
                      border: `1px solid ${colors.border}`,
                    }}>{item}</span>
                  ))}
                </div>
              </div>
              
              <div style={{ marginTop: "24px" }}>
                <h3 style={{ fontSize: "14px", fontWeight: "600", color: colors.text, marginBottom: "12px" }}>Best Fit Categories</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {prop.bestFitCategories.map(cat => (
                    <span key={cat} style={{
                      ...styles.badge(prop.color),
                    }}>{cat}</span>
                  ))}
                </div>
              </div>
              
              {prop.existingPartners?.length > 0 && (
                <div style={{ marginTop: "24px" }}>
                  <h3 style={{ fontSize: "14px", fontWeight: "600", color: colors.text, marginBottom: "12px" }}>Current Partners</h3>
                  <p style={{ fontSize: "14px", color: colors.textMuted }}>{prop.existingPartners.join(" · ")}</p>
                </div>
              )}
              
              <div style={{
                marginTop: "24px",
                padding: "20px",
                background: `${colors.accent}10`,
                borderRadius: "10px",
                borderLeft: `4px solid ${colors.accent}`,
              }}>
                <h3 style={{ fontSize: "12px", fontWeight: "600", color: colors.accent, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>Why Here</h3>
                <p style={{ fontSize: "14px", color: colors.text, lineHeight: "1.6" }}>{prop.whyHere}</p>
              </div>
            </div>
          </div>
        </>
      );
    }

    return (
      <>
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>Property Library</h1>
          <div style={styles.headerActions}>
            <div style={{ display: "flex", gap: "6px" }}>
              {[{ val: "all", label: "All" }, ...TIERS.map(t => ({ val: String(t.id), label: `T${t.id}` }))].map(f => (
                <button 
                  key={f.val} 
                  onClick={() => setPropertyFilter(f.val)}
                  style={{
                    ...styles.button("secondary"),
                    padding: "6px 12px",
                    fontSize: "12px",
                    background: propertyFilter === f.val ? `${colors.accent}15` : colors.bgCard,
                    borderColor: propertyFilter === f.val ? colors.accent : colors.border,
                    color: propertyFilter === f.val ? colors.accent : colors.textMuted,
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div style={styles.content}>
          <div style={styles.grid3}>
            {filtered.map(prop => (
              <div 
                key={prop.id} 
                style={{
                  ...styles.card,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  marginBottom: "0",
                }}
                onClick={() => setSelectedProperty(prop)}
                onMouseEnter={e => { e.currentTarget.style.borderColor = prop.color; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = colors.border; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <span style={{ fontSize: "28px" }}>{prop.emoji}</span>
                  <span style={styles.badge(prop.color)}>T{prop.tier}</span>
                </div>
                <h3 style={{ fontSize: "15px", fontWeight: "600", color: colors.text, marginBottom: "4px" }}>{prop.name}</h3>
                <p style={{ fontSize: "13px", color: colors.textMuted, marginBottom: "12px" }}>{prop.market}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "14px", fontWeight: "600", color: prop.color }}>{prop.attendees}</span>
                  <Icons.ChevronRight />
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  // PLAYBOOKS
  const renderPlaybooks = () => {
    const playbook = PLAYBOOKS[selectedPlaybook];
    
    return (
      <>
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>Playbooks & Ethos</h1>
        </div>
        
        <div style={styles.content}>
          {/* Playbook Tabs */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
            {Object.entries(PLAYBOOKS).map(([key, pb]) => (
              <button
                key={key}
                onClick={() => setSelectedPlaybook(key)}
                style={{
                  ...styles.button("secondary"),
                  background: selectedPlaybook === key ? `${pb.color}15` : colors.bgCard,
                  borderColor: selectedPlaybook === key ? pb.color : colors.border,
                  color: selectedPlaybook === key ? pb.color : colors.textMuted,
                }}
              >
                <span style={{ marginRight: "6px" }}>{pb.icon}</span>
                {pb.title}
              </button>
            ))}
          </div>
          
          {/* Playbook Content */}
          <div style={styles.card}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
              <span style={{ fontSize: "32px" }}>{playbook.icon}</span>
              <div>
                <h2 style={{ fontSize: "20px", fontWeight: "600", color: colors.text }}>{playbook.title}</h2>
                <p style={{ fontSize: "13px", color: colors.textMuted }}>Best practices and strategic guidance</p>
              </div>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {playbook.cards.map((card, i) => (
                <div key={i} style={{
                  padding: "20px",
                  background: colors.bg,
                  borderRadius: "10px",
                  borderLeft: `4px solid ${playbook.color}`,
                }}>
                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <span style={{ fontSize: "24px" }}>{card.icon}</span>
                    <div>
                      <h3 style={{ fontSize: "14px", fontWeight: "600", color: playbook.color, marginBottom: "8px" }}>{card.title}</h3>
                      <p style={{ fontSize: "14px", color: colors.text, lineHeight: "1.6" }}>{card.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  };

  // INVENTORY
  const renderInventory = () => (
    <>
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Inventory & Run of Show</h1>
      </div>
      
      <div style={styles.content}>
        <div style={{ ...styles.card, textAlign: "center", padding: "60px" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>📦</div>
          <h2 style={{ fontSize: "18px", fontWeight: "600", color: colors.text, marginBottom: "8px" }}>Inventory Management</h2>
          <p style={{ color: colors.textMuted, marginBottom: "20px" }}>
            This module will track inventory availability, commitments, and run of show details across all properties.
          </p>
          <p style={{ fontSize: "13px", color: colors.textLight }}>Coming in Phase 2</p>
        </div>
      </div>
    </>
  );

  // PROPOSALS
  const renderProposals = () => (
    <>
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Proposals</h1>
      </div>
      
      <div style={styles.content}>
        <div style={{ ...styles.card, textAlign: "center", padding: "60px" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>📄</div>
          <h2 style={{ fontSize: "18px", fontWeight: "600", color: colors.text, marginBottom: "8px" }}>Proposal Library</h2>
          <p style={{ color: colors.textMuted, marginBottom: "20px" }}>
            Generated proposals will be saved here for reference and tracking.
          </p>
          {strategyOutput ? (
            <button style={styles.button("primary")} onClick={() => navigate("strategy")}>
              View Current Proposal
            </button>
          ) : (
            <button style={styles.button("primary")} onClick={() => navigate("qualifier", "new")}>
              <Icons.Plus /> Start New Qualifier
            </button>
          )}
        </div>
      </div>
    </>
  );

  // ADMIN
  const renderAdmin = () => (
    <>
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Admin</h1>
      </div>
      
      <div style={styles.content}>
        <div style={styles.grid2}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>
              <span style={{ marginRight: "8px" }}>👥</span>
              User Management
            </h3>
            <p style={{ color: colors.textMuted, fontSize: "14px", marginTop: "8px" }}>
              Manage team members, roles, and permissions.
            </p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>
              <span style={{ marginRight: "8px" }}>🏢</span>
              Property Settings
            </h3>
            <p style={{ color: colors.textMuted, fontSize: "14px", marginTop: "8px" }}>
              Update property details, inventory, and pricing.
            </p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>
              <span style={{ marginRight: "8px" }}>🤖</span>
              Template Settings
            </h3>
            <p style={{ color: colors.textMuted, fontSize: "14px", marginTop: "8px" }}>
              Configure strategy templates, tone, and output settings.
            </p>
          </div>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>
              <span style={{ marginRight: "8px" }}>📊</span>
              Reports
            </h3>
            <p style={{ color: colors.textMuted, fontSize: "14px", marginTop: "8px" }}>
              Export pipeline reports and analytics.
            </p>
          </div>
        </div>
      </div>
    </>
  );

  // ============================================================
  // ONBOARDING MODAL
  // ============================================================
  const renderOnboardingModal = () => {
    if (!showOnboarding) return null;
    
    return (
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        backdropFilter: "blur(4px)",
      }}>
        <div style={{
          background: colors.bgCard,
          borderRadius: "16px",
          padding: "32px",
          maxWidth: "520px",
          width: "90%",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
          position: "relative",
        }}>
          <button 
            onClick={() => setShowOnboarding(false)}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: colors.textMuted,
              padding: "4px",
            }}
          >
            <Icons.X />
          </button>
          
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <div style={{
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: `linear-gradient(135deg, ${colors.accent}, ${colors.primary})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
              fontSize: "28px",
              color: "#fff",
              fontWeight: "800",
            }}>a21</div>
            <h2 style={{ fontSize: "22px", fontWeight: "600", color: colors.text, marginBottom: "8px" }}>
              Welcome to the Partnerships Platform
            </h2>
            <p style={{ color: colors.textMuted, fontSize: "15px", lineHeight: "1.6" }}>
              Your command center for turning discovery calls into closed deals. Start by creating a Qualifier after each prospect conversation — the system will generate strategy, activation concepts, and proposal direction tailored to that brand.
            </p>
          </div>
          
          <div style={{ background: colors.bg, borderRadius: "12px", padding: "20px", marginBottom: "24px" }}>
            <h3 style={{ fontSize: "13px", fontWeight: "600", color: colors.accent, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "16px" }}>
              Quick Start Guide
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { num: "1", text: "Start a Qualifier after every discovery call" },
                { num: "2", text: "Select a property or let the system recommend the best match" },
                { num: "3", text: "Generate Strategy for activation concepts & inventory" },
                { num: "4", text: "Review Proposal Direction for pitch hooks & email drafts" },
                { num: "5", text: "Browse Playbooks for category-specific guidance" },
              ].map(step => (
                <div key={step.num} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <div style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    background: colors.accent,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: "600",
                    flexShrink: 0,
                  }}>{step.num}</div>
                  <span style={{ fontSize: "14px", color: colors.text, paddingTop: "2px" }}>{step.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={() => setShowOnboarding(false)}
            style={{
              ...styles.button("primary"),
              width: "100%",
              justifyContent: "center",
              padding: "14px 24px",
            }}
          >
            <Icons.Zap /> Get Started
          </button>
          
          <p style={{ textAlign: "center", marginTop: "12px", fontSize: "12px", color: colors.textLight }}>
            Tip: Click the <strong>?</strong> button anytime for help
          </p>
        </div>
      </div>
    );
  };

  // ============================================================
  // HELP PANEL
  // ============================================================
  const renderHelpPanel = () => {
    if (!showHelp) return null;
    
    return (
      <div style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        width: "400px",
        background: colors.bgCard,
        boxShadow: "-4px 0 24px rgba(0,0,0,0.1)",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        borderLeft: `1px solid ${colors.border}`,
      }}>
        <div style={{
          padding: "20px 24px",
          borderBottom: `1px solid ${colors.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <h2 style={{ fontSize: "16px", fontWeight: "600", color: colors.text }}>
            <Icons.HelpCircle /> Dashboard Help
          </h2>
          <button 
            onClick={() => setShowHelp(false)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: colors.textMuted,
              padding: "4px",
            }}
          >
            <Icons.X />
          </button>
        </div>
        
        <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
          <div style={{ marginBottom: "24px" }}>
            <h3 style={{ fontSize: "14px", fontWeight: "600", color: colors.text, marginBottom: "8px" }}>
              Your Partnership Pipeline
            </h3>
            <p style={{ fontSize: "14px", color: colors.textMuted, lineHeight: "1.6" }}>
              This dashboard shows where your deals stand and helps you take action fast. Use it to track progress, spot opportunities, and jump into your next qualifier.
            </p>
          </div>
          
          <div style={{ marginBottom: "24px" }}>
            <h3 style={{ fontSize: "13px", fontWeight: "600", color: colors.accent, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px" }}>
              Key Elements
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { title: "Pipeline Metrics", desc: "Active pipeline value, closed revenue, total deals, and qualifier activity at a glance." },
                { title: "Pipeline by Stage", desc: "Every deal from Lead through Closed Won. Click any card to view details." },
                { title: "Quick Actions", desc: "One-click access to new qualifiers, properties, and playbooks." },
                { title: "Recent Activity", desc: "Your latest qualifiers and proposals to pick up where you left off." },
              ].map(item => (
                <div key={item.title} style={{ padding: "12px", background: colors.bg, borderRadius: "8px" }}>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: colors.text, marginBottom: "4px" }}>{item.title}</div>
                  <div style={{ fontSize: "13px", color: colors.textMuted }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 style={{ fontSize: "13px", fontWeight: "600", color: colors.accent, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px" }}>
              Tips for Success
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                "Qualify immediately after discovery calls while details are fresh.",
                "Leave the property blank to get smart recommendations based on your inputs.",
                "Review category Playbooks before calls to sound like an expert.",
                "Hit 'Regenerate' with tweaked details for a fresh strategy take.",
                "Email drafts are ready-to-send — just personalize the opening.",
              ].map((tip, i) => (
                <div key={i} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                  <span style={{ color: colors.accent, fontWeight: "700" }}>→</span>
                  <span style={{ fontSize: "13px", color: colors.text, lineHeight: "1.5" }}>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div style={{ padding: "16px 24px", borderTop: `1px solid ${colors.border}` }}>
          <button 
            onClick={() => { setShowHelp(false); setShowOnboarding(true); }}
            style={{
              ...styles.button("secondary"),
              width: "100%",
              justifyContent: "center",
            }}
          >
            View Full Onboarding Guide
          </button>
        </div>
      </div>
    );
  };

  // ============================================================
  // MAIN RENDER
  // ============================================================
  return (
    <div style={styles.app}>
      {renderSidebar()}
      
      <main style={styles.main}>
        {currentPage === "dashboard" && renderDashboard()}
        {currentPage === "qualifier" && renderQualifier()}
        {currentPage === "strategy" && renderStrategy()}
        {currentPage === "proposals" && renderProposals()}
        {currentPage === "properties" && renderProperties()}
        {currentPage === "inventory" && renderInventory()}
        {currentPage === "playbooks" && renderPlaybooks()}
        {currentPage === "admin" && renderAdmin()}
      </main>
      
      {/* Modals & Panels */}
      {renderOnboardingModal()}
      {renderHelpPanel()}
      {showHelp && (
        <div 
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: "400px",
            bottom: 0,
            background: "rgba(0,0,0,0.2)",
            zIndex: 999,
          }}
          onClick={() => setShowHelp(false)}
        />
      )}
    </div>
  );
}
