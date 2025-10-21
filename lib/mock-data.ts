export interface Listing {
  id: string
  title: string
  description: string
  price: number
  type: "good" | "rental" | "service" | "membership"
  category: string
  seller: {
    id: string
    name: string
    avatar: string
    rating: number
    bio?: string
    website?: string
    links?: { label: string; url: string }[]
    location?: string
    memberSince?: string
  }
  images: string[]
  condition?: "new" | "like-new" | "good" | "fair"
  rentalPeriod?: "hourly" | "daily" | "weekly" | "monthly"
  deposit?: number
  available: boolean
  createdAt: string
  serviceType?: "consulting" | "design" | "development" | "coaching" | "other"
  hourlyRate?: number
  skills?: string[]
  membershipDuration?: "monthly" | "quarterly" | "yearly"
  benefits?: string[]
  communitySize?: number
}

export const mockListings: Listing[] = [
  {
    id: "1",
    title: "Sleep Starter Pack",
    description:
      "Complete bundle: blackout curtains, white noise machine, sleep mask, and premium earplugs. Everything you need for quality sleep.",
    price: 89.99,
    type: "good",
    category: "Wellness",
    seller: {
      id: "seller1",
      name: "Sarah Chen",
      avatar: "/diverse-woman-portrait.png",
      rating: 4.9,
      bio: "Sleep optimization specialist and wellness entrepreneur. Helping NS members get better rest.",
      website: "https://sleepwell.ns",
      links: [
        { label: "Twitter", url: "https://twitter.com/sarahchen" },
        { label: "Instagram", url: "https://instagram.com/sleepwell" },
      ],
      location: "Network School Campus",
      memberSince: "2024-06",
    },
    images: ["/sleep-bundle.jpg"],
    condition: "new",
    available: true,
    createdAt: "2025-01-15",
  },
  {
    id: "2",
    title: '27" 4K Monitor',
    description: "Dell UltraSharp 4K monitor, perfect for work or gaming. Includes stand and cables.",
    price: 15,
    type: "rental",
    category: "Electronics",
    seller: {
      id: "seller2",
      name: "Mike Johnson",
      avatar: "/man.jpg",
      rating: 4.8,
      bio: "Tech enthusiast renting out quality equipment to fellow NS members.",
      location: "Network School Campus",
      memberSince: "2024-08",
    },
    images: ["/4k-monitor.jpg"],
    condition: "like-new",
    rentalPeriod: "daily",
    deposit: 100,
    available: true,
    createdAt: "2025-01-14",
  },
  {
    id: "3",
    title: "Mountain Bike",
    description: "Trek mountain bike, great for trails and commuting. Helmet included.",
    price: 25,
    type: "rental",
    category: "Sports",
    seller: {
      id: "seller3",
      name: "Alex Rivera",
      avatar: "/diverse-group.png",
      rating: 5.0,
      bio: "Outdoor adventure guide and bike enthusiast.",
      location: "Network School Campus",
      memberSince: "2024-07",
    },
    images: ["/mountain-bike-trail.png"],
    condition: "good",
    rentalPeriod: "daily",
    deposit: 200,
    available: true,
    createdAt: "2025-01-13",
  },
  {
    id: "4",
    title: "Mechanical Keyboard",
    description: "Custom mechanical keyboard with Cherry MX switches. RGB backlit.",
    price: 120,
    type: "good",
    category: "Electronics",
    seller: {
      id: "seller4",
      name: "Jamie Lee",
      avatar: "/diverse-group.png",
      rating: 4.7,
      location: "Network School Campus",
      memberSince: "2024-09",
    },
    images: ["/mechanical-keyboard.png"],
    condition: "like-new",
    available: true,
    createdAt: "2025-01-12",
  },
  {
    id: "5",
    title: "Standing Desk",
    description: "Electric standing desk, adjustable height. Great condition.",
    price: 30,
    type: "rental",
    category: "Furniture",
    seller: {
      id: "seller5",
      name: "Taylor Kim",
      avatar: "/diverse-group.png",
      rating: 4.9,
      location: "Network School Campus",
      memberSince: "2024-05",
    },
    images: ["/standing-desk-setup.png"],
    condition: "good",
    rentalPeriod: "monthly",
    deposit: 150,
    available: true,
    createdAt: "2025-01-11",
  },
  {
    id: "6",
    title: "Yoga Mat & Blocks Set",
    description: "Premium yoga mat with two blocks and carrying strap. Barely used.",
    price: 35,
    type: "good",
    category: "Wellness",
    seller: {
      id: "seller6",
      name: "Morgan Davis",
      avatar: "/diverse-group.png",
      rating: 4.8,
      location: "Network School Campus",
      memberSince: "2024-10",
    },
    images: ["/rolled-yoga-mat.png"],
    condition: "like-new",
    available: true,
    createdAt: "2025-01-10",
  },
  {
    id: "7",
    title: "Full-Stack Web Development",
    description:
      "Expert full-stack development services. Specializing in Next.js, React, Node.js, and modern web technologies. Available for consulting, code reviews, and project development.",
    price: 150,
    type: "service",
    category: "Services",
    serviceType: "development",
    hourlyRate: 150,
    skills: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
    seller: {
      id: "seller7",
      name: "Jordan Park",
      avatar: "/diverse-group.png",
      rating: 5.0,
      bio: "Senior full-stack engineer with 8+ years of experience. Previously at Vercel and Stripe. Building the future of web applications.",
      website: "https://jordanpark.dev",
      links: [
        { label: "GitHub", url: "https://github.com/jordanpark" },
        { label: "Twitter", url: "https://twitter.com/jordanpark" },
        { label: "Portfolio", url: "https://jordanpark.dev/work" },
      ],
      location: "Network School Campus",
      memberSince: "2024-03",
    },
    images: ["/developer-coding-on-laptop.jpg"],
    available: true,
    createdAt: "2025-01-16",
  },
  {
    id: "8",
    title: "UI/UX Design & Branding",
    description:
      "Professional design services for startups and products. From brand identity to complete product design systems. Let's make your product beautiful and intuitive.",
    price: 120,
    type: "service",
    category: "Services",
    serviceType: "design",
    hourlyRate: 120,
    skills: ["Figma", "UI Design", "UX Research", "Branding", "Design Systems", "Prototyping"],
    seller: {
      id: "seller8",
      name: "Casey Martinez",
      avatar: "/diverse-woman-portrait.png",
      rating: 4.9,
      bio: "Product designer passionate about creating delightful user experiences. Worked with YC startups and Fortune 500 companies.",
      website: "https://caseymartinez.design",
      links: [
        { label: "Dribbble", url: "https://dribbble.com/caseymartinez" },
        { label: "Twitter", url: "https://twitter.com/caseydesigns" },
        { label: "Portfolio", url: "https://caseymartinez.design/portfolio" },
      ],
      location: "Network School Campus",
      memberSince: "2024-04",
    },
    images: ["/designer-working-on-ui-mockups.jpg"],
    available: true,
    createdAt: "2025-01-15",
  },
  {
    id: "9",
    title: "Business Strategy Consulting",
    description:
      "Strategic consulting for early-stage startups. Help with go-to-market strategy, fundraising prep, product positioning, and growth planning. 1-on-1 sessions or ongoing advisory.",
    price: 200,
    type: "service",
    category: "Services",
    serviceType: "consulting",
    hourlyRate: 200,
    skills: ["Strategy", "GTM Planning", "Fundraising", "Product Market Fit", "Growth", "Operations"],
    seller: {
      id: "seller9",
      name: "Sam Okafor",
      avatar: "/man.jpg",
      rating: 5.0,
      bio: "Former VP of Strategy at a unicorn startup. Helped 20+ companies raise Series A. Now advising NS founders on building sustainable businesses.",
      website: "https://samokafor.com",
      links: [
        { label: "LinkedIn", url: "https://linkedin.com/in/samokafor" },
        { label: "Twitter", url: "https://twitter.com/samokafor" },
        { label: "Calendar", url: "https://cal.com/samokafor" },
      ],
      location: "Network School Campus",
      memberSince: "2024-02",
    },
    images: ["/business-meeting-strategy.png"],
    available: true,
    createdAt: "2025-01-14",
  },
  {
    id: "10",
    title: "Personal Fitness Coaching",
    description:
      "Personalized fitness coaching and training programs. Specializing in strength training, mobility, and sustainable fitness habits. In-person or remote sessions available.",
    price: 80,
    type: "service",
    category: "Services",
    serviceType: "coaching",
    hourlyRate: 80,
    skills: ["Strength Training", "Mobility", "Nutrition", "Program Design", "Injury Prevention"],
    seller: {
      id: "seller10",
      name: "Riley Thompson",
      avatar: "/diverse-group.png",
      rating: 4.9,
      bio: "Certified personal trainer and movement coach. Helping NS members build strength and healthy habits that last.",
      website: "https://rileyfitness.com",
      links: [
        { label: "Instagram", url: "https://instagram.com/rileyfitness" },
        { label: "YouTube", url: "https://youtube.com/rileyfitness" },
      ],
      location: "Network School Campus",
      memberSince: "2024-06",
    },
    images: ["/fitness-training.png"],
    available: true,
    createdAt: "2025-01-13",
  },
  {
    id: "11",
    title: "Arc - AI Builders Community",
    description:
      "Join Arc, the premier AI builders community at Network School. Weekly workshops, exclusive access to AI infrastructure, collaborative projects, and a tight-knit group of AI founders and engineers.",
    price: 200,
    type: "membership",
    category: "Memberships",
    membershipDuration: "monthly",
    benefits: [
      "Weekly AI workshops and technical deep-dives",
      "Access to shared GPU compute credits ($500/month)",
      "Private Discord with 50+ AI builders",
      "Monthly demo days and feedback sessions",
      "Exclusive partnerships with AI companies",
      "Collaborative project opportunities",
      "Priority access to AI events and conferences",
    ],
    communitySize: 52,
    seller: {
      id: "seller11",
      name: "Arc Community",
      avatar: "/ai-neural-network-logo.png",
      rating: 5.0,
      bio: "Arc is a community of AI builders, researchers, and founders pushing the boundaries of what's possible with artificial intelligence. We learn together, build together, and ship together.",
      website: "https://arc.ns.com",
      links: [
        { label: "Twitter", url: "https://twitter.com/arcbuilders" },
        { label: "GitHub", url: "https://github.com/arc-community" },
        { label: "Discord", url: "https://discord.gg/arc" },
      ],
      location: "Network School Campus",
      memberSince: "2024-01",
    },
    images: ["/ai-community-workshop-collaboration.jpg"],
    available: true,
    createdAt: "2025-01-10",
  },
  {
    id: "12",
    title: "Commons - Regenerative Living",
    description:
      "Commons is a community dedicated to regenerative living, permaculture, and sustainable practices. Learn to grow food, build with natural materials, and live in harmony with nature.",
    price: 150,
    type: "membership",
    category: "Memberships",
    membershipDuration: "monthly",
    benefits: [
      "Access to community garden and greenhouse",
      "Weekly permaculture workshops",
      "Shared tools and equipment library",
      "Monthly farm-to-table dinners",
      "Composting and waste reduction programs",
      "Natural building workshops",
      "Seed library and plant exchanges",
    ],
    communitySize: 38,
    seller: {
      id: "seller12",
      name: "Commons Collective",
      avatar: "/green-leaf-nature-logo.jpg",
      rating: 4.9,
      bio: "Commons is building a regenerative future, one garden bed at a time. We're a community of growers, makers, and earth stewards learning to live sustainably.",
      website: "https://commons.ns.com",
      links: [
        { label: "Instagram", url: "https://instagram.com/commonsns" },
        { label: "Newsletter", url: "https://commons.ns.com/newsletter" },
      ],
      location: "Network School Campus",
      memberSince: "2024-02",
    },
    images: ["/community-garden-permaculture.jpg"],
    available: true,
    createdAt: "2025-01-09",
  },
]

export const categories = [
  { id: "electronics", name: "Electronics", count: 24 },
  { id: "furniture", name: "Furniture", count: 18 },
  { id: "wellness", name: "Wellness", count: 15 },
  { id: "sports", name: "Sports & Outdoors", count: 12 },
  { id: "books", name: "Books & Learning", count: 31 },
  { id: "kitchen", name: "Kitchen & Dining", count: 9 },
  { id: "clothing", name: "Clothing", count: 22 },
  { id: "services", name: "Services", count: 18 },
  { id: "memberships", name: "Memberships", count: 6 },
  { id: "other", name: "Other", count: 7 },
]
