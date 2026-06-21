import React, { useEffect, useState } from "react";
import {
  MapPin, Search, SlidersHorizontal, Bookmark, Home, Map as MapIcon, User,
  List, Star, Check, CheckCircle2, ChevronLeft, ChevronRight, X, Clock,
  Navigation, ShieldCheck, Bell, Settings as SettingsIcon, Camera, Image as ImageIcon,
  MessageSquare, Heart, Lock, Phone, Mail, MessageCircle, Sparkles, ShoppingBag,
  Download, Trash2, Globe, Activity, FileCheck, ThumbsUp, LocateFixed, Shield,
  Eye, ChevronDown, Award
} from "lucide-react";

/* ----------------------------------------------------------------
   Halal Compass — verified halal restaurant & grocery discovery
   Built from Vishnu's mockups. Emerald/teal theme, Toronto.
----------------------------------------------------------------- */

const C = {
  green: "#2E9E60",
  greenDark: "#26824F",
  greenDeep: "#1E6B41",
  headerFrom: "#3FA37C",
  headerTo: "#2C8765",
  mintGrad1: "#DCEFE2",
  mintGrad2: "#EAF3E4",
  mintGrad3: "#F4F7EC",
  certBg: "#E4F3EA",
  certText: "#2E7D4F",
  cream: "#FCF8E8",
  creamBorder: "#EFE7C9",
  star: "#F5B70A",
  text: "#1F2937",
  sub: "#6B7280",
  faint: "#9CA3AF",
  line: "#EAECEF",
  cardShadow: "0 4px 16px rgba(16,40,30,0.06)",
};

function trackEvent(eventName, params = {}) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

const PLACES = {
  kimchi: {
    id: "kimchi", name: "Kimchi House Korean BBQ", type: "restaurant",
    cuisine: "Korean • BBQ", tags: ["Korean", "BBQ", "Asian"],
    rating: 4.2, reviews: 248, price: "$$", distance: "0.8 km", time: "5 min",
    certified: true, certBy: "HCCA", certDate: "Nov 15, 2025",
    address: "123 Main Street, Downtown", hours: "Open • Closes 10:00 PM", openNow: true,
    cuisineLabel: "Korean",
  },
  market: {
    id: "market", name: "Halal Market & Deli", type: "grocery",
    cuisine: "Grocery • Deli", tags: ["Fresh Meat", "Frozen", "Snacks"],
    rating: 4.4, reviews: 87, price: "$", distance: "0.5 km", time: "3 min",
    certified: true, certBy: "ISNA", certDate: "Nov 18, 2025",
    address: "456 Market Street, Downtown", hours: "Open • Closes 9:00 PM", openNow: true,
    priceLabel: "Affordable",
  },
  pasta: {
    id: "pasta", name: "Pasta e Basta", type: "restaurant",
    cuisine: "Italian • Pasta", tags: ["Italian", "Pasta"],
    rating: 4.7, reviews: 192, price: "$$$", distance: "1.2 km", time: "8 min",
    certified: true, certBy: "HMA", certDate: "Nov 10, 2025", promo: true,
    address: "78 Dundas Street W, Downtown", hours: "Closed • Opens 5:00 PM", openNow: false,
  },
  seoul: {
    id: "seoul", name: "Seoul Garden", type: "restaurant",
    cuisine: "Korean • Traditional", tags: ["Korean", "Traditional"],
    rating: 4.5, reviews: 156, price: "$$", distance: "1.4 km", time: "9 min",
    certified: true, certBy: "IFANCA", certDate: "Nov 8, 2025",
    certNumber: "ISNA-2025-SG-00123",
    address: "210 Queen Street W, Downtown", hours: "Open • Closes 10:30 PM", openNow: true,
  },
  jerk: {
    id: "jerk", name: "Island Spice Jerk Grill", type: "restaurant",
    cuisine: "Jamaican • Grill", tags: ["Jamaican", "Jerk", "Caribbean"],
    rating: 4.6, reviews: 121, price: "$$", distance: "1.7 km", time: "11 min",
    certified: true, certBy: "HMA", certDate: "Nov 12, 2025",
    address: "88 College Street, Downtown", hours: "Open • Closes 10:00 PM", openNow: true,
  },
  sushi: {
    id: "sushi", name: "Sakura Halal Sushi", type: "restaurant",
    cuisine: "Japanese • Sushi", tags: ["Japanese", "Sushi", "Asian"],
    rating: 4.3, reviews: 98, price: "$$", distance: "2.0 km", time: "13 min",
    certified: true, certBy: "ISNA", certDate: "Nov 14, 2025",
    address: "312 King Street W, Downtown", hours: "Closed • Opens 4:00 PM", openNow: false,
  },
};
const LIST = [PLACES.kimchi, PLACES.market, PLACES.pasta, PLACES.seoul, PLACES.jerk, PLACES.sushi];

const DEFAULT_FILTERS = {
  certOnly: true,
  placeType: "All",
  openNow: false,
  cuisines: [],
};

const CUISINES = [
  { name: "Korean", flag: "🇰🇷", count: 12, hot: true },
  { name: "Italian", flag: "🇮🇹", count: 8 },
  { name: "Jamaican", flag: "🇯🇲", count: 5 },
  { name: "Japanese", flag: "🇯🇵", count: 7, hot: true },
];

const REVIEWS = [
  { place: "Halal Korean BBQ House", away: "0.8 mi", stars: 5, date: "Nov 18, 2024", text: "Amazing Korean BBQ with verified halal certification. The bulgogi was perfectly marinated." },
  { place: "Mediterranean Grill", away: "1.2 mi", stars: 4, date: "Nov 10, 2024", text: "Great food and authentic flavors. The shawarma was delicious." },
  { place: "Halal Italian Bistro", away: "2.1 mi", stars: 5, date: "Nov 5, 2024", text: "Finally found a halal Italian restaurant! The pasta carbonara was exceptional." },
];

const NOTIFS = [
  { icon: MapPin, color: C.green, title: "New halal restaurant nearby", body: "Halal Korean BBQ House is 0.8 mi away from you", time: "2 hours ago", unread: true },
  { icon: ThumbsUp, color: C.star, title: "Your review was helpful", body: "5 people found your review of Mediterranean Grill helpful", time: "5 hours ago", unread: true },
  { icon: Heart, color: "#E0567A", title: "Someone liked your photo", body: "Sarah liked your photo at Halal Italian Bistro", time: "1 day ago", unread: false },
  { icon: MessageCircle, color: "#5B8DEF", title: "New comment on your review", body: 'Ahmed replied: "Thanks for the recommendation!"', time: "2 days ago", unread: false },
];

const FAQ = [
  {
    q: "What makes a restaurant halal certified?",
    section: "Certification",
    a: "A certified place has halal documentation from a recognized certifying organization. In this prototype, certification details are shown on each place page and certificate screen.",
  },
  {
    q: "How often are certificates verified?",
    section: "Certification",
    a: "Halal Compass shows the most recent verification date available for each listing. This prototype uses sample dates to demonstrate how users would check certification recency.",
  },
  {
    q: "How do I search for halal restaurants near me?",
    section: "Using the App",
    a: "Use the search bar on the results page to search by cuisine, restaurant name, grocery type, or tag. You can also use filters to narrow the list.",
  },
  {
    q: "Can I save my favorite places?",
    section: "Using the App",
    a: "Yes. Tap the bookmark icon on a restaurant or grocery page. Saved places appear in the Saved tab and stay saved on this device.",
  },
];

/* ----------------------- shared UI ----------------------- */

function StatusBar({ dark }) {
  const col = dark ? "#fff" : "#1F2937";
  return (
    <div className="flex items-center justify-between px-5 pt-2 pb-1 text-[13px] font-semibold"
      style={{ color: col }}>
      <span>9:41</span>
      <div className="flex items-center gap-1" style={{ opacity: 0.9 }}>
        <span style={{ fontSize: 11 }}>▮▮▮</span>
        <span style={{ fontSize: 11 }}>📶</span>
        <span style={{ fontSize: 11 }}>🔋</span>
      </div>
    </div>
  );
}

function Stars({ rating, reviews, size = 13 }) {
  return (
    <span className="inline-flex items-center gap-1" style={{ fontSize: size, color: C.text }}>
      <Star size={size + 1} fill={C.star} color={C.star} />
      <span className="font-semibold">{rating}</span>
      {reviews != null && <span style={{ color: C.sub }}>({reviews})</span>}
    </span>
  );
}

function CertPill({ label = "Certified" }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md px-2 py-[2px] text-[11px] font-semibold"
      style={{ background: C.certBg, color: C.certText }}>
      <CheckCircle2 size={12} /> {label}
    </span>
  );
}

function BottomNav({ active, go }) {
  const items = [
    { id: "home", label: "Home", icon: Home },
    { id: "map", label: "Map", icon: MapIcon },
    { id: "saved", label: "Saved", icon: Bookmark },
    { id: "profile", label: "Profile", icon: User },
  ];
  return (
    <div className="flex items-stretch justify-around border-t bg-white px-2 pt-2 pb-3"
      style={{ borderColor: C.line }}>
      {items.map((it) => {
        const on = active === it.id;
        const Icon = it.icon;
        return (
          <button key={it.id} onClick={() => go(it.id)}
            className="flex flex-1 flex-col items-center gap-1 py-1">
            <Icon size={20} color={on ? C.green : C.faint} strokeWidth={on ? 2.4 : 2} />
            <span className="text-[11px]" style={{ color: on ? C.green : C.faint, fontWeight: on ? 600 : 500 }}>
              {it.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function BackHeader({ title, back, dark, right }) {
  return (
    <div className="flex items-center justify-between px-4 py-3"
      style={dark ? { background: `linear-gradient(135deg, ${C.headerFrom}, ${C.headerTo})` } : {}}>
      <button onClick={back} className="p-1 -ml-1">
        <ChevronLeft size={24} color={dark ? "#fff" : C.text} />
      </button>
      <span className="text-[15px] font-semibold" style={{ color: dark ? "#fff" : C.text }}>{title}</span>
      <div className="w-7 flex justify-end">{right}</div>
    </div>
  );
}

function PrimaryBtn({ children, onClick, icon: Icon, style }) {
  return (
    <button onClick={onClick}
      className="flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-[15px] font-semibold text-white active:opacity-90"
      style={{ background: C.green, ...style }}>
      {Icon && <Icon size={18} />} {children}
    </button>
  );
}

function CourseDisclaimer() {
  return (
    <div
      className="rounded-2xl border px-3.5 py-3 text-left"
      style={{
        background: "rgba(255,255,255,0.68)",
        borderColor: C.creamBorder,
        boxShadow: C.cardShadow,
      }}
    >
      <div className="flex items-start gap-2">
        <ShieldCheck size={16} color={C.green} className="mt-0.5 flex-shrink-0" />
        <div>
          <div className="text-[12px] font-bold" style={{ color: C.text }}>
            Course project notice
          </div>
          <div className="mt-0.5 text-[11px] leading-relaxed" style={{ color: C.sub }}>
            This website is for an MSE 543 course project and collects interaction data,
            such as page visits and clicks, to evaluate user experience.
          </div>
        </div>
      </div>
    </div>
  );
}

function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="pointer-events-none absolute inset-x-4 bottom-20 z-30 flex justify-center">
      <div
        className="flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-semibold text-white shadow-lg"
        style={{ background: C.greenDeep }}
      >
        <CheckCircle2 size={16} color="#fff" />
        {message}
      </div>
    </div>
  );
}

/* ----------------------- screens ----------------------- */

function Landing({ go }) {
  return (
    <div className="flex h-full flex-col"
      style={{ background: `linear-gradient(160deg, ${C.mintGrad1} 0%, ${C.mintGrad2} 45%, ${C.mintGrad3} 100%)` }}>
      <StatusBar />
      <div className="flex flex-1 flex-col items-center px-7 pt-10 text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-3xl shadow-lg"
          style={{ background: `linear-gradient(145deg, ${C.headerFrom}, ${C.greenDeep})` }}>
          <Navigation size={42} color="#fff" fill="#ffffff22" />
        </div>
        <h1 className="mt-6 text-[20px] font-bold" style={{ color: C.greenDeep }}>Welcome to Halal Compass</h1>
        <p className="mt-3 text-[13px] leading-relaxed" style={{ color: C.sub }}>
          Discover verified halal restaurants and grocery stores. Explore Korean, Italian,
          Jamaican, and more cuisines with complete confidence.
        </p>

        <div className="mt-7 grid w-full grid-cols-2 gap-3">
          {[
            { icon: ShieldCheck, t: "Verified Certs", s: "100% Authentic", bg: C.certBg, ic: C.green },
            { icon: MapPin, t: "Nearby Places", s: "Live locations", bg: "#FDEFD9", ic: "#E08A1E" },
          ].map((b) => (
            <div key={b.t} className="flex flex-col items-start gap-2 rounded-2xl bg-white/70 p-4 text-left"
              style={{ boxShadow: C.cardShadow }}>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: b.bg }}>
                <b.icon size={18} color={b.ic} />
              </div>
              <div>
                <div className="text-[13px] font-semibold" style={{ color: C.text }}>{b.t}</div>
                <div className="text-[11px]" style={{ color: C.sub }}>{b.s}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto w-full space-y-3 pb-8 pt-6">
          <CourseDisclaimer />

          <PrimaryBtn icon={LocateFixed} onClick={() => go("home")}>Use Current Location</PrimaryBtn>
          <button onClick={() => go("home")}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border bg-white/60 py-3.5 text-[15px] font-semibold"
            style={{ borderColor: C.green, color: C.greenDark }}>
            <Search size={17} /> Search a City
          </button>
        </div>
      </div>
    </div>
  );
}

function HomeScreen({ go, setQuery, resetFilters }) {
  return (
    <div className="flex h-full flex-col bg-white">
      <StatusBar />
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="rounded-3xl p-5 text-white"
          style={{ background: `linear-gradient(135deg, ${C.headerFrom}, ${C.headerTo})` }}>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-[15px] font-bold">
                <Sparkles size={15} /> Discover Halal
              </div>
              <div className="mt-1 text-[13px] opacity-90">Explore Cuisines</div>
              <div className="mt-3 flex items-center gap-1 text-[12px] opacity-90">
                <MapPin size={13} /> Downtown, Toronto
              </div>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
              <MapPin size={18} color="#fff" />
            </div>
          </div>
        </div>

        <button onClick={() => { setQuery(""); resetFilters(); go("list"); }}
          className="mt-4 flex w-full items-center gap-3 rounded-2xl border bg-white px-4 py-3.5"
          style={{ borderColor: C.line, boxShadow: C.cardShadow }}>
          <span className="flex h-7 w-7 items-center justify-center rounded-full" style={{ background: C.certBg }}>
            <Search size={15} color={C.green} />
          </span>
          <span className="text-[14px]" style={{ color: C.faint }}>Search halal food or grocery</span>
        </button>

        <div className="mt-5 flex items-center justify-between">
          <h2 className="text-[16px] font-bold" style={{ color: C.text }}>Popular Cuisines</h2>
          <button onClick={() => go("filter")} className="flex items-center gap-0.5 text-[13px] font-semibold" style={{ color: C.green }}>
            Filters <ChevronRight size={15} />
          </button>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          {CUISINES.map((c) => (
            <button key={c.name} onClick={() => { setQuery(c.name); resetFilters(); go("list"); }}
              className="relative flex flex-col items-center rounded-2xl border bg-white p-4"
              style={{ borderColor: C.line, boxShadow: C.cardShadow }}>
              {c.hot && (
                <span className="absolute right-2 top-2 rounded-full px-2 py-[1px] text-[9px] font-bold text-white"
                  style={{ background: "#F08C2E" }}>🔥 Hot</span>
              )}
              <span className="text-3xl">{c.flag}</span>
              <span className="mt-2 text-[14px] font-semibold" style={{ color: C.text }}>{c.name}</span>
              <span className="text-[12px]" style={{ color: C.sub }}>{c.count} places</span>
            </button>
          ))}
        </div>
        <div className="mt-4 text-[14px] font-semibold" style={{ color: C.faint }}>More Cuisines</div>
      </div>
    </div>
  );
}

function ListCard({ p, go, open }) {
  return (
    <button onClick={open}
      className="flex w-full gap-3 rounded-2xl border p-3 text-left"
      style={{ background: C.cream, borderColor: C.creamBorder }}>
      <div className="flex h-[68px] w-[68px] flex-shrink-0 items-center justify-center rounded-xl"
        style={{ background: "#F2EBCE", color: C.faint, fontSize: 11 }}>Photo</div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="text-[15px] font-bold leading-tight" style={{ color: C.text }}>{p.name}</div>
          {p.promo && <span className="rounded-md px-1.5 py-[1px] text-[10px] font-bold text-white" style={{ background: "#E0A93B" }}>Promo</span>}
        </div>
        <div className="text-[12px]" style={{ color: C.sub }}>{p.cuisine}</div>
        <div className="mt-1.5 flex items-center gap-2">
          {p.certified && <CertPill />}
          <span className="text-[11px]" style={{ color: C.faint }}>{p.certDate}</span>
        </div>
        <div className="mt-1.5 flex items-center gap-2 text-[12px]" style={{ color: C.sub }}>
          <Stars rating={p.rating} reviews={p.reviews} size={12} />
          <span>•</span><span>{p.price}</span><span>•</span><span>{p.distance}</span>
        </div>
      </div>
    </button>
  );
}

function ListScreen({ go, back, ctx, query, setQuery, filters, setFilters }) {
  const normalizedQuery = query.trim().toLowerCase();

  const filteredPlaces = LIST.filter((p) => {
    const searchableText = [
      p.name,
      p.type,
      p.cuisine,
      p.price,
      p.address,
      p.certBy,
      ...(p.tags || []),
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch = !normalizedQuery || searchableText.includes(normalizedQuery);
    const matchesCertification = !filters.certOnly || p.certified;
    const matchesPlaceType =
      filters.placeType === "All" ||
      (filters.placeType === "Restaurants" && p.type === "restaurant") ||
      (filters.placeType === "Grocery" && p.type === "grocery");
    const matchesOpenNow = !filters.openNow || p.openNow;
    const matchesCuisine =
      filters.cuisines.length === 0 ||
      filters.cuisines.some((c) => searchableText.includes(c.toLowerCase()));

    return matchesSearch && matchesCertification && matchesPlaceType && matchesOpenNow && matchesCuisine;
  });

  const resultLabel = `${filteredPlaces.length} place${filteredPlaces.length === 1 ? "" : "s"} found`;

  useEffect(() => {
    if (!normalizedQuery) return;

    const timeoutId = setTimeout(() => {
      trackEvent("search_performed", {
        search_query: query.trim(),
        result_count: filteredPlaces.length,
        certified_only: filters.certOnly,
        place_type: filters.placeType,
        open_now: filters.openNow,
        cuisines: filters.cuisines.join(",") || "none",
      });
    }, 700);

    return () => clearTimeout(timeoutId);
  }, [normalizedQuery, query, filteredPlaces.length, filters.certOnly, filters.placeType, filters.openNow, filters.cuisines]);

  const toggleCuisineFilter = (cuisine) => {
    setFilters((current) => ({
      ...current,
      cuisines: current.cuisines.includes(cuisine)
        ? current.cuisines.filter((c) => c !== cuisine)
        : [...current.cuisines, cuisine],
    }));
  };

  const hasActiveExtraFilters =
    filters.openNow || filters.placeType !== "All" || filters.cuisines.length > 0;

  const handleSearchChange = (e) => {
    setQuery(e.target.value);

    // Keep typed search predictable. If a user starts a new search while older
    // filters are still active, clear the extra filters so the query is not
    // accidentally blocked by a previous cuisine/type/open-now selection.
    if (hasActiveExtraFilters) {
      setFilters(DEFAULT_FILTERS);
    }
  };

  return (
    <div className="flex h-full flex-col bg-white">
      <StatusBar />

      <div className="px-4 pb-3 pt-1">
        <div className="mb-3 flex items-center gap-2">
          <button
            onClick={back}
            className="-ml-1 flex h-9 w-9 items-center justify-center"
            aria-label="Go back"
          >
            <ChevronLeft size={24} color={C.text} />
          </button>

          <div>
            <div className="text-[15px] font-bold" style={{ color: C.text }}>
              Search Results
            </div>
            <div className="text-[12px]" style={{ color: C.sub }}>
              Verified halal places near you
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div
            className="flex flex-1 items-center gap-2 rounded-full border px-3.5 py-2.5"
            style={{ borderColor: C.line }}
          >
            <Search size={16} color={C.faint} />
            <input
              value={query}
              onChange={handleSearchChange}
              placeholder="Search halal food or grocery"
              className="w-full bg-transparent text-[13px] outline-none"
              style={{ color: C.text }}
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="flex h-5 w-5 items-center justify-center rounded-full"
                style={{ background: "#F3F4F6" }}
                aria-label="Clear search"
              >
                <X size={12} color={C.faint} />
              </button>
            )}
          </div>

          <button
            onClick={() => go("filter")}
            className="flex h-10 w-10 items-center justify-center rounded-full text-white"
            style={{ background: C.green }}
            aria-label="Open filters"
          >
            <SlidersHorizontal size={17} />
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-[13px] font-semibold" style={{ color: C.sub }}>
            {resultLabel}
          </span>
          <button
            onClick={() => go("map")}
            className="flex items-center gap-1 text-[13px] font-semibold"
            style={{ color: C.green }}
          >
            <MapIcon size={14} /> Map View
          </button>
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setFilters((current) => ({ ...current, certOnly: !current.certOnly }))}
            className="shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[12px] font-semibold"
            style={filters.certOnly ? { background: C.green, color: "#fff" } : { border: `1px solid ${C.line}`, color: C.sub }}
          >
            Certified
          </button>

          <button
            onClick={() => setFilters((current) => ({ ...current, openNow: !current.openNow }))}
            className="shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[12px] font-semibold"
            style={filters.openNow ? { background: C.green, color: "#fff" } : { border: `1px solid ${C.line}`, color: C.sub }}
          >
            Open Now
          </button>

          <button
            onClick={() => setFilters((current) => ({ ...current, placeType: current.placeType === "Grocery" ? "All" : "Grocery" }))}
            className="shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[12px] font-semibold"
            style={filters.placeType === "Grocery" ? { background: C.green, color: "#fff" } : { border: `1px solid ${C.line}`, color: C.sub }}
          >
            Grocery
          </button>

          {["Korean", "Italian", "Jamaican", "Japanese"].map((f) => {
            const active = filters.cuisines.includes(f);
            return (
              <button
                key={f}
                onClick={() => toggleCuisineFilter(f)}
                className="shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[12px] font-semibold"
                style={active ? { background: C.green, color: "#fff" } : { border: `1px solid ${C.line}`, color: C.sub }}
              >
                {f}
              </button>
            );
          })}

          {hasActiveExtraFilters && (
            <button
              onClick={() => setFilters(DEFAULT_FILTERS)}
              className="shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[12px] font-semibold"
              style={{ border: `1px solid ${C.line}`, color: C.green }}
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 pb-4">
        {filteredPlaces.length === 0 ? (
          <div className="mt-16 rounded-2xl border px-5 py-8 text-center" style={{ borderColor: C.line }}>
            <Search size={34} color={C.faint} className="mx-auto" />
            <div className="mt-3 text-[14px] font-semibold" style={{ color: C.text }}>
              No places found
            </div>
            <div className="mt-1 text-[12px] leading-relaxed" style={{ color: C.sub }}>
              Try changing your search or clearing a few filters.
            </div>
            <div className="mt-4 flex justify-center gap-2">
              <button
                onClick={() => setQuery("")}
                className="rounded-xl px-4 py-2 text-[13px] font-semibold"
                style={{ border: `1px solid ${C.line}`, color: C.sub }}
              >
                Clear Search
              </button>
              <button
                onClick={() => setFilters(DEFAULT_FILTERS)}
                className="rounded-xl px-4 py-2 text-[13px] font-semibold text-white"
                style={{ background: C.green }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        ) : (
          filteredPlaces.map((p) => (
            <ListCard
              key={p.id}
              p={p}
              go={go}
              open={() => {
                ctx.setActive(p);
                go(p.type === "grocery" ? "grocery" : "restaurant");
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}

function FilterScreen({ back, filters, applyFilters }) {
  const [certOnly, setCertOnly] = useState(filters.certOnly);
  const [placeType, setPlaceType] = useState(filters.placeType);
  const [openNow, setOpenNow] = useState(filters.openNow);
  const [cuisines, setCuisines] = useState(filters.cuisines);

  const toggle = (c) =>
    setCuisines((s) => (s.includes(c) ? s.filter((x) => x !== c) : [...s, c]));

  const resetDraft = () => {
    setCertOnly(DEFAULT_FILTERS.certOnly);
    setPlaceType(DEFAULT_FILTERS.placeType);
    setOpenNow(DEFAULT_FILTERS.openNow);
    setCuisines(DEFAULT_FILTERS.cuisines);
  };

  const apply = () => {
    applyFilters({ certOnly, placeType, openNow, cuisines });
  };

  return (
    <div className="flex h-full flex-col bg-white">
      <StatusBar dark />
      <div className="flex items-center justify-between px-4 py-3"
        style={{ background: `linear-gradient(135deg, ${C.headerFrom}, ${C.headerTo})` }}>
        <button onClick={back}><X size={22} color="#fff" /></button>
        <span className="text-[15px] font-semibold text-white">Filters</span>
        <button onClick={resetDraft}
          className="text-[13px] font-semibold text-white opacity-90">Reset</button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <Section label="Certification" />
        <button onClick={() => setCertOnly(v => !v)}
          className="flex w-full items-center gap-3 rounded-2xl border p-4"
          style={{ borderColor: certOnly ? C.green : C.line, background: certOnly ? C.certBg : "#fff" }}>
          <span className="flex h-6 w-6 items-center justify-center rounded-full"
            style={{ background: certOnly ? C.green : "#E5E7EB" }}>
            <Check size={14} color="#fff" />
          </span>
          <span className="text-left">
            <span className="block text-[14px] font-semibold" style={{ color: C.text }}>Certified only</span>
            <span className="block text-[12px]" style={{ color: C.sub }}>Show only verified halal places</span>
          </span>
        </button>

        <Section label="Place Type" className="mt-5" />
        <div className="flex gap-2">
          {["All", "Restaurants", "Grocery"].map((t) => (
            <button key={t} onClick={() => setPlaceType(t)}
              className="flex-1 rounded-xl py-2.5 text-[13px] font-semibold"
              style={placeType === t ? { background: C.green, color: "#fff" } : { border: `1px solid ${C.line}`, color: C.sub }}>{t}</button>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-[14px] font-bold" style={{ color: C.text }}>Maximum Distance</span>
          <span className="text-[13px] font-semibold" style={{ color: C.green }}>5 km</span>
        </div>
        <div className="mt-4 h-1.5 rounded-full" style={{ background: "#E5E7EB" }}>
          <div className="h-full rounded-full" style={{ width: "45%", background: C.green }} />
        </div>
        <div className="mt-1 flex justify-between text-[11px]" style={{ color: C.faint }}><span>1 km</span><span>10 km</span></div>

        <button onClick={() => setOpenNow(v => !v)}
          className="mt-5 flex w-full items-center gap-3 rounded-2xl border p-4" style={{ borderColor: openNow ? C.green : C.line, background: openNow ? C.certBg : "#fff" }}>
          <span className="flex h-5 w-5 items-center justify-center rounded-full border-2"
            style={{ borderColor: openNow ? C.green : "#CBD5E1", background: openNow ? C.green : "#fff" }}>
            {openNow && <Check size={12} color="#fff" />}
          </span>
          <span className="text-[14px] font-semibold" style={{ color: C.text }}>Open now</span>
        </button>

        <Section label="Cuisines" className="mt-5" />
        <div className="grid grid-cols-2 gap-2.5">
          {["Korean", "Italian", "Jamaican", "Japanese"].map((c) => (
            <button key={c} onClick={() => toggle(c)}
              className="rounded-xl py-2.5 text-[13px] font-semibold"
              style={cuisines.includes(c) ? { background: C.certBg, color: C.certText, border: `1px solid ${C.green}` } : { border: `1px solid ${C.line}`, color: C.sub }}>{c}</button>
          ))}
        </div>
      </div>
      <div className="border-t px-4 py-3" style={{ borderColor: C.line }}>
        <PrimaryBtn onClick={apply}>Apply Filters</PrimaryBtn>
      </div>
    </div>
  );
}

function Section({ label, className = "" }) {
  return <div className={`mb-3 text-[14px] font-bold ${className}`} style={{ color: C.text }}>{label}</div>;
}

function RestaurantDetails({ go, back, ctx }) {
  const p = ctx.active || PLACES.kimchi;
  const isSaved = ctx.saved.has(p.id);
  return (
    <div className="flex h-full flex-col bg-white">
      <div className="relative h-56"
        style={{ background: `linear-gradient(135deg, #F2B441, #E97D3C 60%, ${C.greenDeep})` }}>
        <StatusBar dark />
        <div className="flex items-center justify-between px-4">
          <button onClick={back} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/30">
            <ChevronLeft size={20} color="#fff" />
          </button>
          <button onClick={() => ctx.toggleSave(p.id)} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/30">
            <Bookmark size={18} color="#fff" fill={isSaved ? "#fff" : "transparent"} />
          </button>
        </div>
        <div className="absolute inset-x-0 bottom-6 text-center text-[13px] text-white/70">Restaurant Photo</div>
      </div>

      <div className="-mt-6 flex-1 overflow-y-auto rounded-t-3xl bg-white px-4 pt-5 pb-4">
        <h1 className="text-[18px] font-bold" style={{ color: C.text }}>{p.name}</h1>
        <div className="mt-2 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span key={t} className="rounded-full px-3 py-1 text-[12px] font-semibold" style={{ background: C.certBg, color: C.certText }}>{t}</span>
          ))}
        </div>

        <button onClick={() => go("certificate")}
          className="mt-3 flex w-full items-center justify-between rounded-2xl border p-3.5"
          style={{ background: C.certBg, borderColor: C.green }}>
          <span className="flex items-center gap-2">
            <ShieldCheck size={22} color={C.green} />
            <span className="text-left">
              <span className="flex items-center gap-1 text-[14px] font-bold" style={{ color: C.certText }}>Halal Certified <Sparkles size={13} /></span>
              <span className="block text-[12px]" style={{ color: C.certText }}>Verified {p.certDate}</span>
            </span>
          </span>
          <ChevronRight size={18} color={C.certText} />
        </button>

        <div className="mt-3 grid grid-cols-3 gap-2.5">
          <Stat top={<Stars rating={p.rating} size={13} />} bottom={`${p.reviews} reviews`} bg="#FEF7E6" />
          <Stat top={<span className="font-bold" style={{ color: C.text }}>{p.price}</span>} bottom="Price" bg="#EAF6EF" />
          <Stat top={<span className="font-bold" style={{ color: C.text }}>{p.distance}</span>} bottom={p.time} bg="#EAF1FB" />
        </div>

        <InfoRow icon={MapPin} title="Address" body={p.address} />
        <InfoRow icon={Clock} title="Hours" body={p.hours} />
          <ReviewSummary p={p} go={go} />
        <ReviewSummary p={p} go={go} />
      </div>
      <div className="grid grid-cols-2 gap-2 border-t px-4 py-3" style={{ borderColor: C.line }}>
        <button
          onClick={() => go("writeReview")}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border py-3.5 text-[14px] font-semibold"
          style={{ borderColor: C.green, color: C.green }}
        >
          <MessageSquare size={17} /> Write Review
        </button>
        <button
          onClick={() => ctx.openDirections(p)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-[14px] font-semibold text-white active:opacity-90"
          style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})` }}
        >
          <Navigation size={17} /> Directions
        </button>
      </div>
    </div>
  );
}
function Stat({ top, bottom, bg }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl py-3" style={{ background: bg }}>
      <div className="text-[13px]">{top}</div>
      <div className="mt-0.5 text-[11px]" style={{ color: C.sub }}>{bottom}</div>
    </div>
  );
}
function InfoRow({ icon: Icon, title, body }) {
  return (
    <div className="mt-3 flex items-start gap-3">
      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl" style={{ background: "#EEF4FB" }}>
        <Icon size={17} color="#5B8DEF" />
      </span>
      <div>
        <div className="text-[13px] font-semibold" style={{ color: C.text }}>{title}</div>
        <div className="text-[12px]" style={{ color: C.sub }}>{body}</div>
      </div>
    </div>
  );
}


function ReviewSummary({ p, go }) {
  return (
    <div className="mt-4 rounded-2xl border p-3.5" style={{ borderColor: C.line, background: "#fff" }}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-[13px] font-bold" style={{ color: C.text }}>Reviews</div>
          <div className="mt-0.5 flex items-center gap-2 text-[12px]" style={{ color: C.sub }}>
            <Stars rating={p.rating} reviews={p.reviews} size={12} />
            <span>•</span>
            <span>Community feedback</span>
          </div>
        </div>
        <button
          onClick={() => go("placeReviews")}
          className="shrink-0 rounded-xl px-3 py-2 text-[12px] font-semibold"
          style={{ background: C.certBg, color: C.certText }}
        >
          View Reviews
        </button>
      </div>
    </div>
  );
}

function GroceryDetails({ go, back, ctx }) {
  const p = ctx.active || PLACES.market;
  return (
    <div className="flex h-full flex-col bg-white">
      <StatusBar />
      <div className="flex items-center justify-between px-4 py-2">
        <button onClick={back}><ChevronLeft size={22} color={C.text} /></button>
        <button onClick={() => ctx.toggleSave(p.id)}>
          <Bookmark size={20} color={C.text} fill={ctx.saved.has(p.id) ? C.text : "transparent"} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="mx-4 flex h-44 flex-col items-center justify-center rounded-2xl" style={{ background: "#EDEFF2", color: C.faint }}>
          <ShoppingBag size={30} />
          <span className="mt-2 text-[12px]">Store Photo</span>
        </div>
        <div className="px-4 pt-4">
          <div className="flex items-center gap-2">
            <h1 className="text-[16px] font-bold" style={{ color: C.text }}>{p.name}</h1>
            <span className="rounded-md px-2 py-[1px] text-[11px] font-semibold" style={{ background: "#E7EEFB", color: "#5B8DEF" }}>Grocery</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span key={t} className="rounded-md px-2.5 py-1 text-[12px]" style={{ background: "#F3F4F6", color: C.sub }}>{t}</span>
            ))}
          </div>

          <div className="mt-3 flex items-center gap-2 rounded-2xl border p-3"
            style={{ background: C.certBg, borderColor: C.green }}>
            <ShieldCheck size={20} color={C.green} />
            <div>
              <div className="text-[13px] font-bold" style={{ color: C.certText }}>✓ Halal Certified</div>
              <div className="text-[11px]" style={{ color: C.certText }}>Last verified: November 18, 2025</div>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2.5">
            <Stat top={<Stars rating={p.rating} size={13} />} bottom={`${p.reviews} reviews`} bg="#F3F4F6" />
            <Stat top={<span className="font-bold" style={{ color: C.text }}>{p.price}</span>} bottom="Affordable" bg="#F3F4F6" />
            <Stat top={<span className="font-bold" style={{ color: C.text }}>{p.distance}</span>} bottom={p.time} bg="#F3F4F6" />
          </div>
          <InfoRow icon={MapPin} title="Address" body={p.address} />
          <InfoRow icon={Clock} title="Hours" body={p.hours} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 border-t px-4 py-3" style={{ borderColor: C.line }}>
        <button
          onClick={() => go("writeReview")}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border py-3.5 text-[14px] font-semibold"
          style={{ borderColor: C.green, color: C.green }}
        >
          <MessageSquare size={17} /> Write Review
        </button>
        <button
          onClick={() => ctx.openDirections(p)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-[14px] font-semibold text-white active:opacity-90"
          style={{ background: C.green }}
        >
          <Navigation size={17} /> Directions
        </button>
      </div>
    </div>
  );
}

function CertificateScreen({ back, ctx }) {
  const p = ctx.active || PLACES.seoul;
  const certificateNumber = p.certNumber || `${p.certBy || "HC"}-2025-${p.id.toUpperCase()}-0427`;

  useEffect(() => {
    trackEvent("certificate_viewed", {
      place_id: p.id,
      place_name: p.name,
      place_type: p.type,
      certifier: p.certBy || "unknown",
      certificate_number: certificateNumber,
    });
  }, [p.id, p.name, p.type, p.certBy, certificateNumber]);

  return (
    <div className="flex h-full flex-col bg-white">
      <StatusBar dark />
      <BackHeader title="Halal Certificate" back={back} dark />
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="rounded-2xl border p-4" style={{ borderColor: C.green, background: C.certBg, boxShadow: C.cardShadow }}>
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white">
              <ShieldCheck size={24} color={C.green} />
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <div className="text-[14px] font-bold" style={{ color: C.certText }}>{p.name}</div>
                <span className="rounded-full px-2 py-[1px] text-[10px] font-bold text-white" style={{ background: C.green }}>
                  Active
                </span>
              </div>
              <div className="mt-0.5 text-[12px] leading-relaxed" style={{ color: C.certText }}>
                Verified halal certification for this {p.type === "grocery" ? "grocery store" : "restaurant"}.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex h-60 flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-white" style={{ borderColor: "#D8DEE6" }}>
          <FileCheck size={42} color={C.green} />
          <div className="mt-3 text-[14px] font-semibold" style={{ color: C.text }}>Certificate Preview</div>
          <div className="mt-1 text-center text-[12px] leading-relaxed" style={{ color: C.faint }}>
            Official document placeholder<br />for the course prototype
          </div>
        </div>

        <div className="mt-4 rounded-2xl border p-4" style={{ borderColor: C.line }}>
          <div className="text-[13px] font-bold" style={{ color: C.text }}>Verification details</div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <CertDetail label="Status" value="Active" highlight />
            <CertDetail label="Certified By" value={p.certBy || "HCCA"} />
            <CertDetail label="Certificate No." value={certificateNumber} wide />
            <CertDetail label="Last Verified" value={p.certDate} />
            <CertDetail label="Valid Until" value="Nov 15, 2026" />
          </div>
        </div>

        <div className="mt-4 rounded-2xl p-4" style={{ background: "#F7FCF9" }}>
          <div className="flex items-start gap-2">
            <CheckCircle2 size={17} color={C.green} className="mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-[13px] font-bold" style={{ color: C.text }}>What this means</div>
              <div className="mt-1 text-[12px] leading-relaxed" style={{ color: C.sub }}>
                This place is marked as halal certified in Halal Compass. Users can check the certifier, certificate number, and latest verification date before deciding where to eat or shop.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CertDetail({ label, value, highlight, wide }) {
  return (
    <div className={wide ? "col-span-2" : ""}>
      <div className="text-[11px]" style={{ color: C.sub }}>{label}</div>
      <div className="mt-0.5 text-[13px] font-semibold break-words" style={{ color: highlight ? C.green : C.text }}>{value}</div>
    </div>
  );
}

function MapScreen({ go, back, ctx, setQuery, resetFilters, showToast }) {
  const [selectedId, setSelectedId] = useState("kimchi");
  const [mapFilter, setMapFilter] = useState("All");
  const [mapZoom, setMapZoom] = useState(1);

  const baseMapWidth = 620;
  const baseMapHeight = 720;

  // Coordinates are on a larger fake map canvas so the user can pan around.
  // They intentionally stay away from the bottom card safe zone.
  const pinLayout = {
    kimchi: { left: 330, top: 230 },
    market: { left: 190, top: 325 },
    pasta: { left: 475, top: 320 },
    seoul: { left: 350, top: 450 },
    jerk: { left: 155, top: 505 },
    sushi: { left: 520, top: 190 },
  };

  const mapPlaces = LIST.filter((p) => {
    if (mapFilter === "Restaurants") return p.type === "restaurant";
    if (mapFilter === "Grocery") return p.type === "grocery";
    if (mapFilter === "Open Now") return p.openNow;
    if (mapFilter === "Certified") return p.certified;
    return true;
  });

  const selected = mapPlaces.find((p) => p.id === selectedId) || mapPlaces[0] || PLACES.kimchi;

  useEffect(() => {
    if (!mapPlaces.some((p) => p.id === selectedId) && mapPlaces.length > 0) {
      setSelectedId(mapPlaces[0].id);
    }
  }, [mapFilter, mapPlaces, selectedId]);

  const openListFromMap = () => {
    resetFilters?.();
    setQuery?.("");
    go("list");
  };

  const viewSelectedDetails = () => {
    ctx.setActive(selected);
    go(selected.type === "grocery" ? "grocery" : "restaurant");
  };

  const zoomIn = () => {
    setMapZoom((z) => {
      const next = Math.min(1.5, Number((z + 0.15).toFixed(2)));
      if (next === z) showToast?.("Maximum map zoom reached");
      return next;
    });
  };

  const zoomOut = () => {
    setMapZoom((z) => {
      const next = Math.max(0.75, Number((z - 0.15).toFixed(2)));
      if (next === z) showToast?.("Minimum map zoom reached");
      return next;
    });
  };

  return (
    <div className="flex h-full min-h-0 flex-col" style={{ background: "#DDE5DC" }}>
      <StatusBar />
      <div className="px-4 pb-2 pt-1">
        <div className="flex items-center gap-2">
          <button onClick={back} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow" aria-label="Go back">
            <ChevronLeft size={20} color={C.text} />
          </button>
          <button onClick={openListFromMap} className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-white px-3.5 py-2.5 text-left shadow">
            <Search size={15} color={C.faint} className="shrink-0" />
            <span className="truncate text-[13px]" style={{ color: C.faint }}>Search halal near me</span>
          </button>
          <button onClick={openListFromMap} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow" aria-label="Open list view">
            <List size={18} color={C.text} />
          </button>
        </div>
        <div className="mt-2 flex items-center gap-1 text-[12px] font-semibold" style={{ color: C.greenDeep }}>
          <span className="h-2 w-2 rounded-full" style={{ background: C.green }} /> Downtown, Toronto • {mapPlaces.length} place{mapPlaces.length !== 1 ? "s" : ""}
        </div>
        <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
          {["All", "Certified", "Open Now", "Restaurants", "Grocery"].map((f) => {
            const active = mapFilter === f;
            return (
              <button
                key={f}
                onClick={() => setMapFilter(f)}
                className="shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-[12px] font-semibold shadow-sm"
                style={active ? { background: C.green, color: "#fff" } : { background: "#fff", color: C.sub }}
              >
                {f}
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden">
        <div className="absolute inset-0 overflow-auto overscroll-contain pb-56 pr-8">
          <div
            className="relative"
            style={{
              width: baseMapWidth * mapZoom,
              height: baseMapHeight * mapZoom,
              minWidth: "100%",
              minHeight: "100%",
            }}
          >
            <div
              className="relative h-[720px] w-[620px]"
              style={{
                transform: `scale(${mapZoom})`,
                transformOrigin: "top left",
                backgroundColor: "#DDE5DC",
                backgroundImage: "linear-gradient(#cdd6cb 1px, transparent 1px), linear-gradient(90deg, #cdd6cb 1px, transparent 1px)",
                backgroundSize: "44px 44px",
              }}
            >
              <div className="absolute left-[120px] top-[135px] h-[360px] w-[380px] rounded-[42px] border border-white/60 opacity-55" />
              <div className="absolute left-[70px] top-[270px] h-5 w-[470px] rounded-full bg-white/35" />
              <div className="absolute left-[300px] top-[80px] h-[435px] w-5 rounded-full bg-white/35" />
              <div className="absolute left-[115px] top-[560px] h-4 w-[405px] -rotate-12 rounded-full bg-white/30" />
              <div className="absolute left-[420px] top-[100px] h-[300px] w-4 rotate-45 rounded-full bg-white/25" />

              {mapPlaces.map((p) => {
                const pos = pinLayout[p.id] || { left: 310, top: 310 };
                const isSelected = selected.id === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedId(p.id)}
                    className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform active:scale-95"
                    style={{ left: pos.left, top: pos.top, zIndex: isSelected ? 12 : 8 }}
                    aria-label={`Select ${p.name}`}
                  >
                    <span
                      className="flex items-center justify-center rounded-full shadow-lg"
                      style={{
                        width: isSelected ? 48 : 38,
                        height: isSelected ? 48 : 38,
                        background: isSelected ? C.green : "#fff",
                        border: `3px solid ${isSelected ? "#fff" : C.green}`,
                      }}
                    >
                      <MapPin size={isSelected ? 23 : 19} color={isSelected ? "#fff" : C.green} fill={isSelected ? "#ffffff22" : "transparent"} />
                    </span>
                    {isSelected && (
                      <span className="mt-1 block max-w-[100px] truncate rounded-full bg-white px-2 py-[2px] text-[10px] font-semibold shadow" style={{ color: C.text }}>
                        {p.name}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="absolute right-4 top-4 z-20 flex flex-col items-center gap-2">
          <button
            onClick={() => showToast?.("Map recentered to Downtown, Toronto")}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg"
            aria-label="Recenter map"
          >
            <LocateFixed size={19} color={C.green} />
          </button>

          <div className="overflow-hidden rounded-full bg-white shadow-lg">
            <button
              onClick={zoomIn}
              className="flex h-9 w-11 items-center justify-center text-[20px] font-bold"
              style={{ color: C.green }}
              aria-label="Zoom in"
            >
              +
            </button>
            <div className="border-y px-2 py-1 text-center text-[10px] font-semibold" style={{ borderColor: C.line, color: C.sub }}>
              {Math.round(mapZoom * 100)}%
            </div>
            <button
              onClick={zoomOut}
              className="flex h-9 w-11 items-center justify-center text-[22px] font-bold"
              style={{ color: C.green }}
              aria-label="Zoom out"
            >
              −
            </button>
          </div>
        </div>

        <div className="absolute inset-x-3 bottom-3 z-30 rounded-2xl bg-white p-4 shadow-xl">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="truncate text-[15px] font-bold" style={{ color: C.text }}>{selected.name}</div>
              <div className="text-[12px]" style={{ color: C.sub }}>{selected.cuisine}</div>
            </div>
            <span className="shrink-0 rounded-md px-2 py-[2px] text-[10px] font-bold" style={{ background: selected.type === "grocery" ? "#E7EEFB" : C.certBg, color: selected.type === "grocery" ? "#5B8DEF" : C.certText }}>
              {selected.type === "grocery" ? "Grocery" : "Restaurant"}
            </span>
          </div>
          <div className="mt-1.5 flex items-center gap-2">
            {selected.certified && <CertPill label="Halal Certified" />}
            <span className="text-[11px]" style={{ color: selected.openNow ? C.green : C.faint }}>{selected.openNow ? "Open now" : "Closed"}</span>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-[12px]" style={{ color: C.sub }}>
            <Stars rating={selected.rating} reviews={null} size={12} />
            <span>•</span><span>{selected.price}</span><span>•</span><span>{selected.distance}</span><span>•</span><span>{selected.time}</span>
          </div>
          <div className="mt-1 flex items-center gap-1 text-[11px]" style={{ color: C.faint }}>
            <MapPin size={11} className="shrink-0" /> <span className="truncate">{selected.address}</span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button onClick={viewSelectedDetails}
              className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-[14px] font-semibold text-white" style={{ background: C.green }}>
              <Navigation size={15} /> View Details
            </button>
            <button onClick={() => ctx.openDirections(selected)}
              className="flex w-full items-center justify-center gap-2 rounded-xl border py-2.5 text-[14px] font-semibold" style={{ borderColor: C.green, color: C.green }}>
              <MapIcon size={15} /> Directions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SavedScreen({ go, ctx }) {
  const items = LIST.filter((p) => ctx.saved.has(p.id));
  const tabs = ["All", "Favorites", "To Try"];
  const [tab, setTab] = useState("All");
  return (
    <div className="flex h-full flex-col bg-white">
      <StatusBar />
      <div className="px-4 pt-1">
        <h1 className="text-[20px] font-bold" style={{ color: C.text }}>Saved Places</h1>
        <div className="text-[12px]" style={{ color: C.sub }}>{items.length} place{items.length !== 1 ? "s" : ""} saved</div>
        <div className="mt-3 flex gap-2">
          {tabs.map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className="rounded-full px-4 py-1.5 text-[12px] font-semibold"
              style={tab === t ? { background: C.green, color: "#fff" } : { border: `1px solid ${C.line}`, color: C.sub }}>
              {t}{t === "All" ? ` (${items.length})` : ""}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-3 flex-1 space-y-3 overflow-y-auto px-4 pb-4">
        {items.length === 0 ? (
          <div className="mt-20 text-center">
            <Bookmark size={40} color={C.faint} className="mx-auto" />
            <div className="mt-3 text-[14px] font-semibold" style={{ color: C.text }}>No saved places yet</div>
            <div className="text-[12px]" style={{ color: C.sub }}>Tap the bookmark on any place to save it here.</div>
          </div>
        ) : items.map((p) => (
          <ListCard key={p.id} p={p} go={go} open={() => { ctx.setActive(p); go(p.type === "grocery" ? "grocery" : "restaurant"); }} />
        ))}
      </div>
    </div>
  );
}

function ProfileScreen({ go }) {
  const rows = [
    { icon: MessageSquare, label: "My Reviews", to: "reviews" },
    { icon: ImageIcon, label: "My Photos", to: "photos" },
    { icon: Bookmark, label: "Saved Places", to: "saved" },
  ];
  return (
    <div className="flex h-full flex-col bg-white">
      <StatusBar />
      <div className="flex-1 overflow-y-auto px-4 pt-1 pb-4">
        <h1 className="text-[20px] font-bold" style={{ color: C.text }}>Profile</h1>
        <button onClick={() => go("signin")} className="mt-3 flex w-full items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: C.certBg }}>
            <User size={22} color={C.green} />
          </span>
          <span className="text-left">
            <span className="block text-[15px] font-semibold" style={{ color: C.text }}>Guest User</span>
            <span className="block text-[12px] font-semibold" style={{ color: C.green }}>Sign in or create account</span>
          </span>
        </button>

        <div className="mt-4 grid grid-cols-3 gap-3 rounded-2xl border p-3" style={{ borderColor: C.line }}>
          {[["8", "Saved"], ["24", "Visited"], ["3", "Reviews"]].map(([n, l]) => (
            <div key={l} className="text-center">
              <div className="text-[18px] font-bold" style={{ color: C.text }}>{n}</div>
              <div className="text-[12px]" style={{ color: C.sub }}>{l}</div>
            </div>
          ))}
        </div>

        <div className="mt-5 text-[12px] font-bold tracking-wide" style={{ color: C.faint }}>MY ACTIVITY</div>
        <div className="mt-2">
          {rows.map((r) => <NavRow key={r.label} {...r} go={go} />)}
        </div>

        <div className="mt-5 text-[12px] font-bold tracking-wide" style={{ color: C.faint }}>SETTINGS</div>
        <div className="mt-2">
          <NavRow icon={Bell} label="Notifications" to="notifications" go={go} />
          <NavRow icon={SettingsIcon} label="Settings" to="settings" go={go} />
          <NavRow icon={Shield} label="About Halal Certification" to="about" go={go} />
          <NavRow icon={MessageCircle} label="Help & FAQ" to="help" go={go} />
        </div>
      </div>
    </div>
  );
}
function NavRow({ icon: Icon, label, to, go }) {
  return (
    <button onClick={() => go(to)} className="flex w-full items-center gap-3 py-3">
      <Icon size={18} color={C.sub} />
      <span className="flex-1 text-left text-[14px]" style={{ color: C.text }}>{label}</span>
      <ChevronRight size={17} color={C.faint} />
    </button>
  );
}

function PhotosScreen({ back }) {
  const grad = ["#E8A04E,#C9742E", "#7FB36B,#4E8A3C", "#E2B05A,#C98C2E", "#D9603F,#B0432A", "#E8C24E,#D98C2E", "#C97A52,#9A4E2E"];
  return (
    <div className="flex h-full flex-col bg-white">
      <StatusBar />
      <BackHeader title="" back={back} />
      <div className="px-4 -mt-1">
        <div className="text-[15px] font-bold" style={{ color: C.text }}>My Photos</div>
        <div className="text-[12px]" style={{ color: C.sub }}>6 photos uploaded</div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 px-4 pb-4">
        {grad.map((g, i) => (
          <div key={i} className="flex aspect-square items-center justify-center rounded-xl" style={{ background: `linear-gradient(135deg, ${g})` }}>
            <Camera size={22} color="#ffffffcc" />
          </div>
        ))}
      </div>
    </div>
  );
}

function PlaceReviewsScreen({ back, go, ctx, userReviews = [] }) {
  const p = ctx.active || PLACES.kimchi;
  const matchingUserReviews = userReviews.filter((r) => r.place === p.name);
  const sampleReviews = [
    {
      id: `${p.id}-sample-1`,
      place: p.name,
      away: p.distance,
      stars: Math.round(p.rating),
      date: "Nov 20, 2025",
      text: "Helpful certification details and a smooth experience. I liked being able to check the halal information before visiting.",
      type: p.type === "grocery" ? "Grocery" : "Restaurant",
    },
    {
      id: `${p.id}-sample-2`,
      place: p.name,
      away: p.distance,
      stars: Math.max(4, Math.round(p.rating) - 1),
      date: "Nov 12, 2025",
      text: p.type === "grocery"
        ? "Good halal grocery selection and easy to compare with nearby options."
        : "Good food and the halal certification card made the choice feel more trustworthy.",
      type: p.type === "grocery" ? "Grocery" : "Restaurant",
    },
  ];
  const reviews = [...matchingUserReviews, ...sampleReviews];

  return (
    <div className="flex h-full min-h-0 flex-col bg-white">
      <StatusBar />
      <BackHeader title="Reviews" back={back} />

      <div className="shrink-0 px-4 -mt-1 pb-3">
        <div className="text-[16px] font-bold" style={{ color: C.text }}>{p.name}</div>
        <div className="mt-1 flex items-center gap-2 text-[12px]" style={{ color: C.sub }}>
          <Stars rating={p.rating} reviews={p.reviews} size={12} />
          <span>•</span>
          <span>{p.cuisine}</span>
        </div>
        <button
          onClick={() => go("writeReview")}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-[14px] font-semibold text-white"
          style={{ background: C.green }}
        >
          <MessageSquare size={17} /> Write a Review
        </button>
      </div>

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 pb-20">
        {reviews.map((r, idx) => (
          <div key={r.id || `${r.place}-${idx}`} className="rounded-2xl border p-4" style={{ borderColor: r.userCreated ? C.green : C.line, background: r.userCreated ? "#F7FCF9" : "#fff" }}>
            <div className="flex items-start justify-between gap-2">
              <div className="text-[14px] font-bold" style={{ color: C.text }}>{r.place}</div>
              {r.userCreated && (
                <span className="rounded-full px-2 py-[1px] text-[10px] font-bold" style={{ background: C.certBg, color: C.certText }}>New</span>
              )}
            </div>
            <div className="mt-0.5 flex items-center gap-2 text-[11px]">
              <span className="rounded px-1.5 py-[1px] font-semibold" style={{ background: C.certBg, color: C.certText }}>{r.type || (p.type === "grocery" ? "Grocery" : "Restaurant")}</span>
              <span style={{ color: C.faint }}>📍 {r.away || p.distance}</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span>{Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={13} className="inline" fill={i < r.stars ? C.star : "transparent"} color={i < r.stars ? C.star : "#D1D5DB"} />
              ))}</span>
              <span className="text-[11px]" style={{ color: C.faint }}>{r.date}</span>
            </div>
            <div className="mt-1.5 text-[12px] leading-relaxed" style={{ color: C.sub }}>{r.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WriteReviewScreen({ back, go, ctx, addReview, showToast }) {
  const place = ctx.active || PLACES.kimchi;
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");

  const submit = () => {
    const trimmed = text.trim();

    if (!rating) {
      showToast("Please select a star rating");
      return;
    }

    if (trimmed.length < 10) {
      showToast("Please write a short review first");
      return;
    }

    addReview({
      id: `review-${Date.now()}`,
      place: place.name,
      away: place.distance || "Nearby",
      stars: rating,
      date: "Today",
      text: trimmed,
      type: place.type === "grocery" ? "Grocery" : "Restaurant",
      userCreated: true,
    });

    go("reviews");
  };

  return (
    <div className="flex h-full flex-col bg-white">
      <StatusBar />
      <BackHeader title="Write a Review" back={back} />

      <div className="flex-1 overflow-y-auto px-4 pb-4 -mt-1">
        <div className="rounded-2xl border p-4" style={{ borderColor: C.line, boxShadow: C.cardShadow }}>
          <div className="text-[14px] font-bold" style={{ color: C.text }}>{place.name}</div>
          <div className="mt-0.5 text-[12px]" style={{ color: C.sub }}>{place.cuisine} • {place.distance}</div>
          <div className="mt-2"><CertPill label="Halal Certified" /></div>
        </div>

        <div className="mt-5">
          <div className="text-[14px] font-bold" style={{ color: C.text }}>How was your experience?</div>
          <div className="mt-3 flex gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => setRating(n)}
                className="flex h-11 w-11 items-center justify-center rounded-xl border"
                style={{ borderColor: n <= rating ? C.star : C.line, background: n <= rating ? "#FEF7E6" : "#fff" }}
                aria-label={`${n} star rating`}
              >
                <Star size={22} fill={n <= rating ? C.star : "transparent"} color={n <= rating ? C.star : C.faint} />
              </button>
            ))}
          </div>
          <div className="mt-2 text-[12px]" style={{ color: C.sub }}>{rating} out of 5 stars</div>
        </div>

        <div className="mt-5">
          <label className="text-[14px] font-bold" style={{ color: C.text }}>Write your review</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Share what stood out, such as food quality, service, certification confidence, or grocery selection."
            className="mt-2 h-40 w-full resize-none rounded-2xl border bg-white p-3 text-[13px] leading-relaxed outline-none"
            style={{ borderColor: C.line, color: C.text }}
          />
          <div className="mt-1 text-[11px]" style={{ color: C.faint }}>Minimum 10 characters for this prototype.</div>
        </div>
      </div>

      <div className="border-t px-4 py-3" style={{ borderColor: C.line }}>
        <PrimaryBtn icon={MessageSquare} onClick={submit}>Post Review</PrimaryBtn>
      </div>
    </div>
  );
}

function ReviewsScreen({ back, userReviews = [] }) {
  const allReviews = [...userReviews, ...REVIEWS];
  const avg = allReviews.length
    ? (allReviews.reduce((sum, r) => sum + Number(r.stars || 0), 0) / allReviews.length).toFixed(1)
    : "0.0";

  return (
    <div className="flex h-full min-h-0 flex-col bg-white">
      <StatusBar />
      <BackHeader title="" back={back} />
      <div className="shrink-0 flex items-center justify-between px-4 -mt-1">
        <div>
          <div className="text-[15px] font-bold" style={{ color: C.text }}>My Reviews</div>
          <div className="text-[12px]" style={{ color: C.sub }}>{allReviews.length} review{allReviews.length !== 1 ? "s" : ""} written</div>
        </div>
        <Stars rating={avg} reviews={null} />
      </div>
      <div className="mt-3 min-h-0 flex-1 space-y-3 overflow-y-auto px-4 pb-20">
        {allReviews.map((r, idx) => (
          <div key={r.id || `${r.place}-${idx}`} className="rounded-2xl border p-4" style={{ borderColor: r.userCreated ? C.green : C.line, background: r.userCreated ? "#F7FCF9" : "#fff" }}>
            <div className="flex items-start justify-between gap-2">
              <div className="text-[14px] font-bold" style={{ color: C.text }}>{r.place}</div>
              {r.userCreated && (
                <span className="rounded-full px-2 py-[1px] text-[10px] font-bold" style={{ background: C.certBg, color: C.certText }}>
                  New
                </span>
              )}
            </div>
            <div className="mt-0.5 flex items-center gap-2 text-[11px]">
              <span className="rounded px-1.5 py-[1px] font-semibold" style={{ background: C.certBg, color: C.certText }}>{r.type || "Restaurant"}</span>
              <span style={{ color: C.faint }}>📍 {r.away}</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span>{Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={13} className="inline" fill={i < r.stars ? C.star : "transparent"} color={i < r.stars ? C.star : "#D1D5DB"} />
              ))}</span>
              <span className="text-[11px]" style={{ color: C.faint }}>{r.date}</span>
            </div>
            <div className="mt-1.5 text-[12px] leading-relaxed" style={{ color: C.sub }}>{r.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NotificationsScreen({ back, showToast }) {
  return (
    <div className="flex h-full flex-col bg-white">
      <StatusBar />
      <BackHeader title="Notifications" back={back} right={<SettingsIcon size={18} color={C.sub} />} />
      <div className="flex gap-2 px-4 pb-2">
        <span className="rounded-full px-3 py-1 text-[12px] font-semibold text-white" style={{ background: C.green }}>All</span>
        <span className="rounded-full px-3 py-1 text-[12px] font-semibold" style={{ border: `1px solid ${C.line}`, color: C.sub }}>Unread (2)</span>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-2">
        {NOTIFS.map((n, i) => (
          <div key={i} className="flex items-start gap-3 border-b py-3.5" style={{ borderColor: C.line }}>
            <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full" style={{ background: `${n.color}1A` }}>
              <n.icon size={17} color={n.color} />
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-semibold" style={{ color: C.text }}>{n.title}</span>
                {n.unread && <span className="h-2 w-2 rounded-full" style={{ background: C.green }} />}
              </div>
              <div className="text-[12px]" style={{ color: C.sub }}>{n.body}</div>
              <div className="mt-0.5 text-[11px]" style={{ color: C.faint }}>{n.time}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t px-4 py-3" style={{ borderColor: C.line }}>
        <button
          onClick={() => showToast("All notifications marked as read") }
          className="w-full rounded-xl py-2.5 text-[13px] font-semibold"
          style={{ background: "#F3F4F6", color: C.sub }}
        >
          Mark all as read
        </button>
      </div>
    </div>
  );
}

function SettingsScreen({ back, go, showToast }) {
  const [toggles, setToggles] = useState({ reviews: true, photos: true, location: true, activity: false });
  const flip = (k) => setToggles((t) => ({ ...t, [k]: !t[k] }));
  return (
    <div className="flex h-full flex-col bg-white">
      <StatusBar />
      <BackHeader title="" back={back} />
      <div className="flex-1 overflow-y-auto px-4 pb-4 -mt-1">
        <SettingsGroup label="Account Security" sub="Privacy & Security">
          <SettingRow icon={Lock} label="Change Password" onClick={() => showToast("Password change is not available in this prototype")} />
          <SettingRow icon={Shield} label="Two-Factor Authentication" onClick={() => showToast("Two-factor authentication is not available in this prototype")} />
        </SettingsGroup>
        <SettingsGroup label="Privacy Settings">
          <ToggleRow icon={Eye} label="Show Reviews Publicly" sub="Others can see your reviews" on={toggles.reviews} onClick={() => flip("reviews")} />
          <ToggleRow icon={ImageIcon} label="Show Photos Publicly" sub="Others can see your photos" on={toggles.photos} onClick={() => flip("photos")} />
          <ToggleRow icon={MapPin} label="Share Location" sub="Find nearby halal places" on={toggles.location} onClick={() => flip("location")} />
          <ToggleRow icon={Activity} label="Show Activity Status" sub="Let others see when you're active" on={toggles.activity} onClick={() => flip("activity")} />
        </SettingsGroup>
        <SettingsGroup label="Data Management">
          <SettingRow icon={Download} label="Download My Data" onClick={() => showToast("Prototype data download prepared")} />
          <SettingRow icon={Trash2} label="Delete Account" danger onClick={() => showToast("Account deletion is disabled in this prototype")} />
        </SettingsGroup>
      </div>
    </div>
  );
}
function SettingsGroup({ label, sub, children }) {
  return (
    <div className="mt-4">
      {sub && <div className="text-[12px] font-semibold" style={{ color: C.text }}>{sub}</div>}
      <div className="mt-2 text-[12px] font-bold tracking-wide" style={{ color: C.faint }}>{label.toUpperCase()}</div>
      <div className="mt-1">{children}</div>
    </div>
  );
}
function SettingRow({ icon: Icon, label, danger, onClick }) {
  return (
    <button onClick={onClick} className="flex w-full items-center gap-3 py-3">
      <Icon size={17} color={danger ? "#DC2626" : C.sub} />
      <span className="flex-1 text-left text-[14px]" style={{ color: danger ? "#DC2626" : C.text }}>{label}</span>
      <ChevronRight size={16} color={C.faint} />
    </button>
  );
}
function ToggleRow({ icon: Icon, label, sub, on, onClick }) {
  return (
    <div className="flex items-center gap-3 py-3">
      <Icon size={17} color={C.sub} />
      <div className="flex-1">
        <div className="text-[14px]" style={{ color: C.text }}>{label}</div>
        <div className="text-[11px]" style={{ color: C.faint }}>{sub}</div>
      </div>
      <button onClick={onClick} className="relative h-6 w-11 rounded-full transition-colors"
        style={{ background: on ? C.green : "#D1D5DB" }}>
        <span className="absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all" style={{ left: on ? 22 : 2 }} />
      </button>
    </div>
  );
}

function AboutScreen({ back }) {
  const reqs = [
    { t: "Halal Ingredients", b: "All ingredients must be halal, including meats from properly slaughtered animals and no pork or alcohol-based products." },
    { t: "Proper Slaughter", b: "Animals must be slaughtered according to Islamic law (zabiha), with the name of Allah invoked and specific requirements met." },
    { t: "Separation", b: "Halal food must be kept separate from non-halal food during storage, preparation, and cooking to avoid cross-contamination." },
  ];
  return (
    <div className="flex h-full flex-col bg-white">
      <StatusBar />
      <BackHeader title="About Halal Certification" back={back} />
      <div className="flex-1 overflow-y-auto px-4 pb-4 -mt-1">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: C.certBg }}>
          <Shield size={22} color={C.green} />
        </div>
        <h2 className="mt-3 text-[15px] font-bold" style={{ color: C.text }}>What is Halal Certification?</h2>
        <p className="mt-1.5 text-[13px] leading-relaxed" style={{ color: C.sub }}>
          Halal certification ensures that food products and services comply with Islamic dietary laws.
          This means the food is permissible (halal) according to Islamic principles and free from
          prohibited (haram) substances.
        </p>
        <h3 className="mt-5 text-[14px] font-bold" style={{ color: C.text }}>Key Requirements</h3>
        <div className="mt-2 space-y-4">
          {reqs.map((r) => (
            <div key={r.t} className="flex gap-3">
              <CheckCircle2 size={20} color={C.green} className="flex-shrink-0" />
              <div>
                <div className="text-[14px] font-bold" style={{ color: C.text }}>{r.t}</div>
                <div className="text-[12px] leading-relaxed" style={{ color: C.sub }}>{r.b}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HelpScreen({ back, showToast }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="flex h-full flex-col bg-white">
      <StatusBar />
      <BackHeader title="Help & FAQ" back={back} />
      <div className="flex-1 overflow-y-auto px-4 pb-4 -mt-1">
        <div className="flex items-center gap-2 rounded-xl border px-3.5 py-2.5" style={{ borderColor: C.line }}>
          <Search size={15} color={C.faint} />
          <span className="text-[13px]" style={{ color: C.faint }}>Search for help...</span>
        </div>
        <div className="mt-4 text-[13px] font-bold" style={{ color: C.text }}>Contact Support</div>
        <div className="mt-2 grid grid-cols-3 gap-3">
          {[
            { i: MessageCircle, l: "Chat", m: "Prototype support chat opened" },
            { i: Mail, l: "Email", m: "Prototype support email opened" },
            { i: Phone, l: "Call", m: "Prototype support call started" },
          ].map((x) => (
            <button
              key={x.l}
              onClick={() => showToast(x.m)}
              className="flex flex-col items-center gap-1.5 rounded-2xl border py-3"
              style={{ borderColor: C.line }}
            >
              <x.i size={20} color={C.green} />
              <span className="text-[12px]" style={{ color: C.text }}>{x.l}</span>
            </button>
          ))}
        </div>
        {["Certification", "Using the App"].map((sec) => (
          <div key={sec} className="mt-4">
            <div className="text-[13px] font-bold" style={{ color: C.text }}>{sec}</div>
            <div className="mt-2 space-y-2">
              {FAQ.filter((f) => f.section === sec).map((f) => (
                <div
                  key={f.q}
                  className="rounded-xl border"
                  style={{ borderColor: C.line }}
                >
                  <button
                    onClick={() => setOpen(open === f.q ? null : f.q)}
                    className="flex w-full items-center justify-between px-3.5 py-3 text-left"
                  >
                    <span className="text-[13px]" style={{ color: C.text }}>{f.q}</span>
                    <ChevronDown size={16} color={C.faint} style={{ transform: open === f.q ? "rotate(180deg)" : "none" }} />
                  </button>
                  {open === f.q && (
                    <div className="px-3.5 pb-3 text-[12px] leading-relaxed" style={{ color: C.sub }}>
                      {f.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ----------------------- auth ----------------------- */

function Field({ label, placeholder, type = "text", icon: Icon, hint }) {
  return (
    <div className="mt-3">
      <label className="text-[12px] font-semibold" style={{ color: C.text }}>{label}</label>
      <div className="mt-1 flex items-center gap-2 rounded-xl border px-3 py-2.5" style={{ borderColor: C.line }}>
        {Icon && <Icon size={15} color={C.faint} />}
        <input type={type} placeholder={placeholder}
          className="w-full bg-transparent text-[14px] outline-none" style={{ color: C.text }} />
      </div>
      {hint && <div className="mt-1 text-[11px]" style={{ color: C.faint }}>{hint}</div>}
    </div>
  );
}

function SignIn({ back, go, showToast }) {
  return (
    <div className="flex h-full flex-col bg-white">
      <StatusBar />
      <BackHeader title="" back={back} />
      <div className="flex-1 overflow-y-auto px-5 -mt-1">
        <h1 className="text-[18px] font-bold" style={{ color: C.text }}>Welcome back</h1>
        <p className="text-[13px]" style={{ color: C.sub }}>Sign in to continue to Halal Compass</p>
        <Field label="Email" placeholder="your@email.com" icon={Mail} />
        <Field label="Password" placeholder="Enter your password" type="password" icon={Lock} />
        <button onClick={() => go("forgot")} className="mt-1.5 block w-full text-right text-[12px] font-semibold" style={{ color: C.green }}>Forgot password?</button>
        <div className="mt-3"><PrimaryBtn onClick={() => go("home")}>Sign in</PrimaryBtn></div>
        <div className="my-3 flex items-center gap-3">
          <div className="h-px flex-1" style={{ background: C.line }} />
          <span className="text-[12px]" style={{ color: C.faint }}>or</span>
          <div className="h-px flex-1" style={{ background: C.line }} />
        </div>
        <OAuth label="Continue with Google" showToast={showToast} />
        <OAuth label="Continue with Apple" dark showToast={showToast} />
        <div className="mt-5 text-center text-[12px]" style={{ color: C.sub }}>
          Don't have an account? <button onClick={() => go("signup")} className="font-semibold" style={{ color: C.green }}>Sign up</button>
        </div>
      </div>
    </div>
  );
}
function OAuth({ label, dark, showToast }) {
  return (
    <button
      onClick={() => showToast("Social sign-in is not available in this prototype")}
      className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border py-3 text-[14px] font-semibold"
      style={{ borderColor: C.line, color: C.text }}
    >
      <span className="h-4 w-4 rounded-sm" style={{ background: dark ? "#111" : "#EA4335" }} />{label}
    </button>
  );
}

function SignUp({ back, go }) {
  return (
    <div className="flex h-full flex-col bg-white">
      <StatusBar />
      <BackHeader title="" back={back} />
      <div className="flex-1 overflow-y-auto px-5 -mt-1 pb-4">
        <h1 className="text-[18px] font-bold" style={{ color: C.text }}>Create account</h1>
        <p className="text-[13px]" style={{ color: C.sub }}>Join Halal Compass to discover verified halal food</p>
        <Field label="Full Name" placeholder="Your name" icon={User} />
        <Field label="Email" placeholder="your@email.com" icon={Mail} />
        <Field label="Password" placeholder="Create a password" type="password" icon={Lock} hint="Must be at least 8 characters" />
        <Field label="Confirm Password" placeholder="Confirm your password" type="password" icon={Lock} />
        <div className="mt-3 flex items-start gap-2">
          <span className="mt-0.5 flex h-4 w-4 items-center justify-center rounded border" style={{ borderColor: C.green }}><Check size={11} color={C.green} /></span>
          <span className="text-[12px]" style={{ color: C.sub }}>
            I agree to the <span className="font-semibold" style={{ color: C.green }}>Terms of Service</span> and <span className="font-semibold" style={{ color: C.green }}>Privacy Policy</span>
          </span>
        </div>
        <div className="mt-4"><PrimaryBtn onClick={() => go("home")}>Create Account</PrimaryBtn></div>
        <div className="mt-4 text-center text-[12px]" style={{ color: C.sub }}>
          Already have an account? <button onClick={() => go("signin")} className="font-semibold" style={{ color: C.green }}>Sign in</button>
        </div>
      </div>
    </div>
  );
}

function Forgot({ back, go }) {
  return (
    <div className="flex h-full flex-col bg-white">
      <StatusBar />
      <BackHeader title="" back={back} />
      <div className="flex flex-1 flex-col px-5 -mt-1">
        <h1 className="text-[18px] font-bold" style={{ color: C.text }}>Forgot password?</h1>
        <p className="text-[13px]" style={{ color: C.sub }}>No worries, we'll send you reset instructions</p>
        <Field label="Email" placeholder="your@email.com" icon={Mail} />
        <div className="mt-4"><PrimaryBtn onClick={() => go("signin")}>Reset password</PrimaryBtn></div>
        <div className="mt-auto pb-6 text-center text-[12px]" style={{ color: C.sub }}>
          Remember your password? <button onClick={() => go("signin")} className="font-semibold" style={{ color: C.green }}>Sign in</button>
        </div>
      </div>
    </div>
  );
}

/* ----------------------- app shell ----------------------- */

const DEFAULT_SAVED_IDS = ["pasta", "kimchi", "market"];
const SAVED_STORAGE_KEY = "halalCompassSavedPlaces";
const REVIEWS_STORAGE_KEY = "halalCompassUserReviews";

function getInitialSavedPlaces() {
  if (typeof window === "undefined") return new Set(DEFAULT_SAVED_IDS);

  try {
    const stored = window.localStorage.getItem(SAVED_STORAGE_KEY);
    if (!stored) return new Set(DEFAULT_SAVED_IDS);

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return new Set(DEFAULT_SAVED_IDS);

    return new Set(parsed.filter((id) => LIST.some((place) => place.id === id)));
  } catch {
    return new Set(DEFAULT_SAVED_IDS);
  }
}

function savePlacesToStorage(savedSet) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(Array.from(savedSet)));
  } catch {
    // Local storage may be unavailable in some browser privacy modes.
  }
}

function getInitialUserReviews() {
  if (typeof window === "undefined") return [];

  try {
    const stored = window.localStorage.getItem(REVIEWS_STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((review) => review && review.place && review.text);
  } catch {
    return [];
  }
}

function saveReviewsToStorage(reviews) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
  } catch {
    // Local storage may be unavailable in some browser privacy modes.
  }
}

const TAB_ROOTS = { home: "home", list: "home", map: "map", saved: "saved", profile: "profile" };
const NO_NAV = new Set(["landing", "filter", "restaurant", "grocery", "certificate", "signin", "signup", "forgot", "photos", "reviews", "placeReviews", "writeReview", "notifications", "settings", "about", "help"]);

export default function App() {
  const [stack, setStack] = useState(["landing"]);
  const [active, setActive] = useState(null);
  const [saved, setSaved] = useState(getInitialSavedPlaces);
  const [toast, setToast] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [userReviews, setUserReviews] = useState(getInitialUserReviews);

  useEffect(() => {
    savePlacesToStorage(saved);
  }, [saved]);

  useEffect(() => {
    saveReviewsToStorage(userReviews);
  }, [userReviews]);

  useEffect(() => {
    if (!toast) return;

    const timer = window.setTimeout(() => setToast(""), 1800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const screen = stack[stack.length - 1];
  const go = (s) => {
    if (["home", "saved", "profile"].includes(s)) {
      setStack([s]);
    } else {
      setStack((st) => [...st, s]);
    }
  };

  const goTab = (s) => {
    setStack([s]);
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const back = () =>
    setStack((st) => {
      if (st.length > 1) return st.slice(0, -1);
      if (st[0] !== "home" && st[0] !== "landing") return ["home"];
      return st;
    });
  const applyFilters = (nextFilters) => {
    trackEvent("filters_applied", {
      certified_only: nextFilters.certOnly,
      place_type: nextFilters.placeType,
      open_now: nextFilters.openNow,
      cuisines: nextFilters.cuisines.join(",") || "none",
    });
    setFilters(nextFilters);
    setToast("Filters applied");
    setStack((st) => {
      if (st[st.length - 2] === "list") return st.slice(0, -1);
      return [...st.slice(0, -1), "list"];
    });
  };

  const toggleSave = (id) => {
    const place = LIST.find((p) => p.id === id);

    setSaved((s) => {
      const next = new Set(s);
      const alreadySaved = next.has(id);

      if (alreadySaved) {
        next.delete(id);
        setToast(`${place?.name || "Place"} removed from saved`);
      } else {
        trackEvent("place_saved", {
          place_id: id,
          place_name: place?.name || "Unknown place",
          place_type: place?.type || "unknown",
        });
        next.add(id);
        setToast(`${place?.name || "Place"} saved`);
      }

      return next;
    });
  };

  const openDirections = (place) => {
    if (!place) return;

    const query = encodeURIComponent(`${place.name} ${place.address || "Toronto"}`);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;

    trackEvent("directions_clicked", {
      place_id: place.id,
      place_name: place.name,
      place_type: place.type,
      address: place.address || "Toronto",
    });
    setToast("Opening directions in Google Maps...");
    window.open(mapsUrl, "_blank", "noopener,noreferrer");
  };

  const addReview = (review) => {
    trackEvent("review_posted", {
      place_name: review.place,
      place_type: review.type || "unknown",
      rating: review.stars,
      review_length: review.text?.length || 0,
    });
    setUserReviews((existing) => [review, ...existing]);
    setToast("Review posted");
  };

  const ctx = { active, setActive, saved, toggleSave, openDirections };

  const screens = {
    landing: <Landing go={go} />,
    home: <HomeScreen go={go} setQuery={setSearchQuery} resetFilters={resetFilters} />,
    list: <ListScreen go={go} back={back} ctx={ctx} query={searchQuery} setQuery={setSearchQuery} filters={filters} setFilters={setFilters} />,
    filter: <FilterScreen back={back} filters={filters} applyFilters={applyFilters} />,
    restaurant: <RestaurantDetails go={go} back={back} ctx={ctx} />,
    grocery: <GroceryDetails go={go} back={back} ctx={ctx} />,
    certificate: <CertificateScreen back={back} ctx={ctx} />,
    map: <MapScreen go={go} back={back} ctx={ctx} setQuery={setSearchQuery} resetFilters={resetFilters} showToast={setToast} />,
    saved: <SavedScreen go={go} ctx={ctx} />,
    profile: <ProfileScreen go={go} />,
    photos: <PhotosScreen back={back} />,
    reviews: <ReviewsScreen back={back} userReviews={userReviews} />,
    placeReviews: <PlaceReviewsScreen back={back} go={go} ctx={ctx} userReviews={userReviews} />,
    writeReview: <WriteReviewScreen back={back} go={go} ctx={ctx} addReview={addReview} showToast={setToast} />,
    notifications: <NotificationsScreen back={back} showToast={setToast} />,
    settings: <SettingsScreen back={back} go={go} showToast={setToast} />,
    about: <AboutScreen back={back} />,
    help: <HelpScreen back={back} showToast={setToast} />,
    signin: <SignIn back={back} go={go} showToast={setToast} />,
    signup: <SignUp back={back} go={go} />,
    forgot: <Forgot back={back} go={go} />,
  };

  const showNav = !NO_NAV.has(screen);
  const activeTab = TAB_ROOTS[screen] || "home";

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4"
      style={{ background: "#F4F5F7", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      <div className="relative flex flex-col overflow-hidden rounded-[44px] border-[10px] border-black bg-white shadow-2xl"
        style={{ width: 390, height: 800 }}>
        <div className="absolute left-1/2 top-0 z-20 h-6 w-36 -translate-x-1/2 rounded-b-2xl bg-black" />
        <div className="flex h-full flex-col">
          <div className="flex-1 overflow-hidden">{screens[screen]}</div>
          {showNav && <BottomNav active={activeTab} go={goTab} />}
        </div>
        <Toast message={toast} />
      </div>
    </div>
  );
}
