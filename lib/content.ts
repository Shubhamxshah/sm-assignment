export type Tab = "home" | "workshops" | "shop" | "recipes" | "yoga";

export const member = {
  name: "Shubham",
  streakDay: 26,
  streakGoal: 100,
  yogaGoal: "Full body stretch",
  workshopDay: 3,
};

export type Slide = {
  src: string;
  alt: string;
  fit: "contain" | "cover";
  caption?: string;
  tab: Tab;
  section?: string;
};

export const carouselSlides: Slide[] = [
  {
    src: "/farm.webp",
    alt: "Fresh off the farm: oils, spices, dry fruits, sweeteners and seeds",
    fit: "contain" as const,
    tab: "shop",
    section: "spice-box",
  },
  {
    src: "/daily-yoga.webp",
    alt: "Daily yoga classes you can practice from home",
    fit: "contain" as const,
    tab: "yoga",
    section: "stretch",
  },
  {
    src: "/juice-sh.jpeg",
    alt: "Cold-pressed satvic juices being poured and tasted",
    fit: "cover" as const,
    caption: "Beetroot-carrot juice",
    tab: "recipes",
    section: "juice",
  },
  {
    src: "/subha.jpeg",
    alt: "Two hosts greeting the day with a namaste",
    fit: "cover" as const,
    caption: "Heal yourself challenge",
    tab: "workshops",
    section: "retreats",
  },
];

export const categories = [
  { id: "workshops", label: "Explore workshops", tab: "workshops" as const },
  { id: "yoga", label: "Daily Yoga Session", tab: "yoga" as const },
  { id: "shop", label: "Shop satvic food", tab: "shop" as const },
  { id: "potlucks", label: "Potlucks around you", tab: "home" as const, section: "potlucks" },
  { id: "recipes", label: "satvic recipes", tab: "recipes" as const },
  { id: "retreats", label: "Retreats", tab: "workshops" as const, section: "retreats" },
];

export const products = [
  {
    id: "body-butter",
    name: "Nourishing Body Butter",
    price: 560,
    compareAt: 800,
    off: 30,
    image: "/butter.jxl",
    imageAlt: "Nourishing body butter",
    imageClass: "object-cover",
  },
  {
    id: "millet-mix",
    name: "Millet Breakfast Mix",
    price: 375,
    compareAt: 500,
    off: 25,
    image: "/shop-millets.webp",
    imageAlt: "Millet range arranged across a map of India",
    imageClass: "object-contain",
  },
  {
    id: "juice-set",
    name: "Rainbow Juice Set",
    price: 510,
    compareAt: 600,
    off: 15,
    image: "/juice-sh.jpeg",
    imageAlt: "Glasses of red, green, and orange cold-pressed juice",
    imageClass: "object-contain",
  },
  {
    id: "spice-box",
    name: "Farm Spice Box",
    price: 640,
    compareAt: 800,
    off: 20,
    image: "/farm.webp",
    imageAlt: "Farm pouches of spices, seeds, and coconut oil",
    imageClass: "object-contain",
  },
];

export const workshops = [
  {
    id: "cooking",
    title: "Ultimate Health challenge",
    when: "Saturday · 9:00 AM",
    image: "/namaste.jpeg",
    imageAlt: "Hosts welcoming a cooking circle",
  },
  {
    id: "juice",
    title: "Juice fast",
    when: "Sunday · 7:30 AM",
    image: "/juice-sh.jpeg",
    imageAlt: "Fresh juices for the cleanse circle",
  },
  {
    id: "retreat",
    title: "Heal yourself challenge",
    when: "14–16 Nov · overnight",
    image: "/subha.jpeg",
    imageAlt: "Farm produce for the retreat kitchen",
  },
];

export const yogaSessions = [
  {
    id: "stretch",
    title: "Full body stretch",
    detail: "Today’s goal · 20 min",
    image: "/daily-yoga.webp",
    imageAlt: "Daily yoga class hosts seated in practice",
    imageClass: "object-cover object-right",
  },
  {
    id: "breath",
    title: "Morning breath",
    detail: "Alternate nostril · 12 min",
    image: "/yog.jpg",
    imageAlt: "A guided morning breathing practice",
  },
  {
    id: "restore",
    title: "Evening restore",
    detail: "Wind down · 18 min",
    image: "/yog.jpeg",
    imageAlt: "People joining a live evening session from home",
  },
];

export const testimonials = [
  {
    id: "meera",
    quote: "Day 26, and the morning stretch is the easiest part of my day now.",
    name: "Meera",
    handle: "meera",
    city: "Pune",
    time: "2h",
    avatar: "/tweets/meera-avatar.jpg",
    image: "/tweets/meera.jpg",
    imageAlt: "A morning stretch on a mat by a sunlit window",
    replies: 18,
    reposts: 6,
    likes: 124,
  },
  {
    id: "arjun",
    quote: "Workshop day 3 changed how I shop for groceries.",
    name: "Arjun",
    handle: "arjun",
    city: "Jaipur",
    time: "6h",
    avatar: "/tweets/arjun-avatar.jpg",
    image: "/tweets/arjun.jpg",
    imageAlt: "Millets, greens, tomatoes, and ginger in a cloth bag",
    replies: 9,
    reposts: 3,
    likes: 86,
  },
  {
    id: "leela",
    quote: "The potluck was the first time I cooked for strangers and left with friends.",
    name: "Leela",
    handle: "leela",
    city: "Bengaluru",
    time: "1d",
    avatar: "/tweets/leela-avatar.jpg",
    image: "/tweets/leela.jpg",
    imageAlt: "Friends sharing dinner on a terrace at night",
    replies: 27,
    reposts: 11,
    likes: 203,
  },
];

export const recipes = [
  {
    id: "khichdi",
    title: "Millet khichdi",
    time: "25 min",
    image: "/shop-millets.webp",
    imageAlt: "Millets and grains for khichdi",
  },
  {
    id: "juice",
    title: "Beetroot-carrot juice",
    time: "10 min",
    image: "/juice-sh.jpeg",
    imageAlt: "A jug of beetroot juice",
  },
  {
    id: "ladoo",
    title: "Roasted seed ladoo",
    time: "20 min",
    image: "/farm.webp",
    imageAlt: "Seeds and dry fruits for ladoos",
  },
];

export const potluck = {
  happening: true,
  title: "Indiranagar terrace potluck",
  when: "Saturday · 5:30 PM",
  detail: "Satvic dinner · 6 seats left",
  image: "/upcomingBg.webp",
  imageAlt: "A community gathering joining from home and in person",
};

export function mediaSrc(src: string) {
  return src.endsWith(".jxl") ? src.replace(/\.jxl$/, ".webp") : src;
}

export function inr(amount: number) {
  return `₹${amount.toLocaleString("en-IN")}`;
}
