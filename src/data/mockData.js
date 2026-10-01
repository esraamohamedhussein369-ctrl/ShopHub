export const categories = [
  { id: "Electronics", name: "Electronics", icon: "📱", color: "from-blue-500 to-indigo-600" },
  { id: "Fashion", name: "Fashion", icon: "👕", color: "from-pink-500 to-rose-600" },
  { id: "Home & Living", name: "Home & Living", icon: "🏠", color: "from-amber-500 to-orange-600" },
  { id: "Sports", name: "Sports", icon: "⚽", color: "from-emerald-500 to-teal-600" },
  { id: "Books", name: "Books", icon: "📚", color: "from-purple-500 to-indigo-600" },
  { id: "Beauty", name: "Beauty", icon: "💄", color: "from-rose-400 to-pink-600" },
  { id: "Furniture", name: "Furniture", icon: "🪑", color: "from-amber-600 to-yellow-700" },
  { id: "Accessories", name: "Accessories", icon: "🎒", color: "from-violet-500 to-purple-700" },
];

export const priceRangeOptions = [
  { id: "0-50", label: "$0 - $50", min: 0, max: 50 },
  { id: "50-100", label: "$50 - $100", min: 50, max: 100 },
  { id: "100-200", label: "$100 - $200", min: 100, max: 200 },
  { id: "200-500", label: "$200 - $500", min: 200, max: 500 },
  { id: "500+", label: "$500+", min: 500, max: Infinity },
];

export const genderOptions = [
  { id: "Male", label: "Male (♂️)" },
  { id: "Female", label: "Female (♀️)" },
  { id: "Both", label: "Both / Unisex (⚧)" },
];

export const ratingOptions = [
  { stars: 5, label: "5.0 Rating (Exceptional)", minRating: 4.8 },
  { stars: 4, label: "4.0+ Stars (Highly Rated)", minRating: 4.0 },
  { stars: 3, label: "3.0+ Stars (Good Value)", minRating: 3.0 },
];

export const coupons = [
  { code: "SHOP20", discountPercent: 20, description: "20% off all orders" },
  { code: "WELCOME10", discountFixed: 10, description: "$10 off first order" },
  { code: "SUPERDEAL", discountPercent: 30, description: "30% off special flash sale" },
];

export const sampleUser = {
  id: "u_demo_101",
  name: "Alex Morgan",
  email: "alex.morgan@shophub.com",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  memberSince: "March 2023",
  role: "Verified Buyer & Seller",
  tier: "Gold VIP Member",
  addresses: [
    { id: "addr_1", type: "Home (Default)", street: "742 Evergreen Terrace", city: "Springfield", state: "OR", zip: "97477", country: "United States" }
  ],
  orders: [
    {
      id: "ORD-98421",
      date: "May 24, 2024",
      status: "Delivered",
      total: 248.50,
      itemsCount: 3,
      trackingNumber: "TRK-98421-US",
      estimatedDelivery: "Delivered on May 27"
    },
    {
      id: "ORD-87114",
      date: "June 12, 2024",
      status: "In Transit",
      total: 129.99,
      itemsCount: 1,
      trackingNumber: "TRK-87114-US",
      estimatedDelivery: "Arriving tomorrow by 7 PM"
    }
  ]
};

export const products = [
  // ================= ELECTRONICS (6) =================
  {
    id: "p1",
    title: "Sony WH-1000XM5 Wireless Noise-Canceling Headphones",
    description: "Industry-leading noise cancellation with two processors and 8 microphones. Magnificent crystal-clear hands-free calling with 4 beamforming microphones and precise voice pickup technology. Up to 30 hours of battery life with quick 3-minute charging for 3 hours of playback.",
    price: 349.99,
    originalPrice: 399.99,
    category: "Electronics",
    gender: "Both",
    condition: "New",
    rating: 4.9,
    reviewCount: 428,
    stock: 18,
    salesToday: 142,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=80"
    ],
    sellerName: "TechStore Pro",
    sellerAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    sellerRating: 4.9,
    sellerSales: 12450,
    isBestSeller: true,
    isNew: false,
    isOnSale: true,
    hasCountdown: true,
    variants: {
      colors: ["Midnight Black", "Silver Gray", "Midnight Blue"],
      sizes: ["Standard"]
    },
    specs: {
      "Battery Life": "30 Hours ANC ON",
      "Connectivity": "Bluetooth 5.2 / 3.5mm AUX",
      "Weight": "250g",
      "Warranty": "2 Years Official"
    },
    createdAt: "2024-01-15"
  },
  {
    id: "p2",
    title: "Keychron K2 Pro QMK Wireless Mechanical Keyboard",
    description: "Full customization freedom with QMK/VIA programmable mechanical keys. Hot-swappable tactile Gateron G Pro switches, south-facing RGB backlighting, sound-absorbing foam, and seamless connection with up to 3 devices across Mac and Windows.",
    price: 99.00,
    originalPrice: 129.00,
    category: "Electronics",
    gender: "Both",
    condition: "New",
    rating: 4.8,
    reviewCount: 265,
    stock: 9,
    salesToday: 89,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=900&q=80"
    ],
    sellerName: "CyberPeripherals",
    sellerAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80",
    sellerRating: 4.8,
    sellerSales: 8320,
    isBestSeller: true,
    isNew: true,
    isOnSale: true,
    hasCountdown: true,
    variants: {
      colors: ["Carbon Grey", "Retro White", "Cyber Neon"],
      sizes: ["Brown Tactile", "Red Linear", "Blue Clicky"]
    },
    specs: {
      "Switch Type": "Hot-swappable Gateron",
      "Keycaps": "Double-shot PBT",
      "Battery": "4000 mAh Li-polymer",
      "Layout": "75% Compact"
    },
    createdAt: "2024-02-10"
  },
  {
    id: "p3",
    title: "Apple MacBook Air 15-inch M3 Chip (16GB, 512GB)",
    description: "Strikingly thin and fast with the groundbreaking M3 chip, delivering superhuman performance for creative multitasking and gaming. Up to 18 hours of battery life and a stunning 15.3-inch Liquid Retina display with 500 nits of brightness.",
    price: 1399.00,
    originalPrice: 1499.00,
    category: "Electronics",
    gender: "Both",
    condition: "New",
    rating: 4.95,
    reviewCount: 512,
    stock: 6,
    salesToday: 54,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=900&q=80"
    ],
    sellerName: "Apple Authorized Hub",
    sellerAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    sellerRating: 5.0,
    sellerSales: 21900,
    isBestSeller: true,
    isNew: true,
    isOnSale: false,
    hasCountdown: false,
    variants: {
      colors: ["Midnight", "Starlight", "Space Gray", "Silver"],
      sizes: ["512GB SSD", "1TB SSD"]
    },
    specs: {
      "Processor": "Apple M3 (8-core CPU, 10-core GPU)",
      "Memory": "16GB Unified RAM",
      "Display": "15.3-inch Liquid Retina",
      "Weight": "1.51 kg"
    },
    createdAt: "2024-03-01"
  },
  {
    id: "p4",
    title: "DJI Mini 4 Pro 4K HDR Ultra-Light Foldable Drone",
    description: "Under 249g regulation-friendly drone featuring omnidirectional obstacle sensing, 4K/60fps HDR true vertical shooting, 20km FHD video transmission, and flagship ActiveTrack 360° tracking capability.",
    price: 759.00,
    originalPrice: 859.00,
    category: "Electronics",
    gender: "Both",
    condition: "New",
    rating: 4.7,
    reviewCount: 189,
    stock: 12,
    salesToday: 38,
    image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=900&q=80"
    ],
    sellerName: "AeroTech Innovations",
    sellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    sellerRating: 4.8,
    sellerSales: 4500,
    isBestSeller: false,
    isNew: true,
    isOnSale: true,
    hasCountdown: true,
    variants: {
      colors: ["Arctic White"],
      sizes: ["Standard Combo", "Fly More Plus Combo"]
    },
    specs: {
      "Flight Time": "34 - 45 Minutes",
      "Camera Sensor": "1/1.3-inch CMOS 48MP",
      "Range": "20 km O4 Video",
      "Takeoff Weight": "249g"
    },
    createdAt: "2024-02-20"
  },
  {
    id: "p5",
    title: "Anker Prime 20,000mAh 200W GaN Fast Power Bank",
    description: "Charge 3 power-hungry devices simultaneously at blazing speeds. Features two high-power USB-C ports delivering up to 100W each and intelligent digital smart display showing real-time voltage and battery health.",
    price: 89.99,
    originalPrice: 129.99,
    category: "Electronics",
    gender: "Both",
    condition: "New",
    rating: 4.85,
    reviewCount: 310,
    stock: 25,
    salesToday: 95,
    image: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&q=80"
    ],
    sellerName: "TechStore Pro",
    sellerAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    sellerRating: 4.9,
    sellerSales: 12450,
    isBestSeller: false,
    isNew: false,
    isOnSale: true,
    hasCountdown: false,
    variants: {
      colors: ["Space Black"],
      sizes: ["20,000mAh", "27,650mAh"]
    },
    specs: {
      "Total Output": "200W Maximum",
      "Ports": "2x USB-C + 1x USB-A",
      "Display": "Smart TFT Color Screen"
    },
    createdAt: "2024-01-25"
  },
  {
    id: "p6",
    title: "Samsung Galaxy Watch 6 Classic 47mm LTE",
    description: "Iconic rotating bezel design with advanced sleep coaching, body composition analysis (BIA), heart health ECG monitoring, and sapphire crystal glass with military-grade ruggedness.",
    price: 299.99,
    originalPrice: 399.99,
    category: "Electronics",
    gender: "Both",
    condition: "New",
    rating: 4.65,
    reviewCount: 195,
    stock: 14,
    salesToday: 41,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=900&q=80"
    ],
    sellerName: "Galaxy Direct",
    sellerAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
    sellerRating: 4.7,
    sellerSales: 9100,
    isBestSeller: false,
    isNew: false,
    isOnSale: true,
    hasCountdown: true,
    variants: {
      colors: ["Silver Titanium", "Obsidian Black"],
      sizes: ["43mm Bluetooth", "47mm LTE"]
    },
    specs: {
      "Screen": "1.5-inch Super AMOLED Sapphire",
      "Durability": "IP68 + 5ATM + MIL-STD-810H",
      "OS": "Wear OS Powered by Samsung"
    },
    createdAt: "2024-01-18"
  },

  // ================= FASHION (5) =================
  {
    id: "p7",
    title: "Classic Full-Grain Leather Biker Jacket",
    description: "A timeless biker silhouette crafted from hand-buffed full-grain Italian lambskin with quilted shoulder accents, silky breathable lining, and custom heavy-duty antique brass YKK zippers.",
    price: 199.00,
    originalPrice: 289.00,
    category: "Fashion",
    gender: "Both",
    condition: "New",
    rating: 4.9,
    reviewCount: 384,
    stock: 11,
    salesToday: 67,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=900&q=80"
    ],
    sellerName: "Heritage Leather Co.",
    sellerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    sellerRating: 4.9,
    sellerSales: 6200,
    isBestSeller: true,
    isNew: false,
    isOnSale: true,
    hasCountdown: true,
    variants: {
      colors: ["Vintage Brown", "Midnight Black", "Cognac Tan"],
      sizes: ["S", "M", "L", "XL", "XXL"]
    },
    specs: {
      "Material": "100% Full-Grain Lambskin",
      "Lining": "100% Cupro Breathable Twill",
      "Care": "Professional Leather Clean"
    },
    createdAt: "2024-01-10"
  },
  {
    id: "p8",
    title: "Tailored Italian Merino Wool Overcoat",
    description: "Double-breasted structured coat cut from pure 480gsm Italian virgin wool. Features sharp peaked lapels, genuine horn buttons, deep handwarmer pockets, and an internal passport pocket.",
    price: 320.00,
    originalPrice: 420.00,
    category: "Fashion",
    gender: "Male",
    condition: "New",
    rating: 4.85,
    reviewCount: 142,
    stock: 8,
    salesToday: 29,
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=900&q=80"
    ],
    sellerName: "Savile Row Direct",
    sellerAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    sellerRating: 4.9,
    sellerSales: 3400,
    isBestSeller: false,
    isNew: true,
    isOnSale: true,
    hasCountdown: false,
    variants: {
      colors: ["Camel", "Charcoal Gray", "Navy Blue"],
      sizes: ["38R", "40R", "42R", "44R"]
    },
    specs: {
      "Fabric": "100% Virgin Merino Wool",
      "Weight": "480 GSM Winter Grade",
      "Origin": "Made in Biella, Italy"
    },
    createdAt: "2024-02-05"
  },
  {
    id: "p9",
    title: "Pure French Linen Summer Wrap Dress",
    description: "Effortlessly breezy midi dress woven from 100% certified Normandy flax linen. Features an adjustable wrap tie belt, flattering V-neckline, and deep hidden side seam pockets.",
    price: 78.50,
    originalPrice: 98.00,
    category: "Fashion",
    gender: "Female",
    condition: "New",
    rating: 4.7,
    reviewCount: 219,
    stock: 22,
    salesToday: 73,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80"
    ],
    sellerName: "Maison De Lin",
    sellerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    sellerRating: 4.8,
    sellerSales: 5120,
    isBestSeller: true,
    isNew: false,
    isOnSale: true,
    hasCountdown: false,
    variants: {
      colors: ["Sage Green", "Warm Terracotta", "Crisp White", "Navy"],
      sizes: ["XS", "S", "M", "L", "XL"]
    },
    specs: {
      "Fabric": "100% French Linen (OEKO-TEX)",
      "Fit": "True to size, Regular A-line",
      "Care": "Cold machine wash, hang dry"
    },
    createdAt: "2024-01-20"
  },
  {
    id: "p10",
    title: "Vintage Retro Runner Sneakers in Suede & Mesh",
    description: "Heritage 80s track aesthetic reimagined with ultra-plush EVA foam midsoles, supple cowhide suede overlays, breathable mesh uppers, and non-marking gum waffle outsoles.",
    price: 110.00,
    originalPrice: 135.00,
    category: "Fashion",
    gender: "Both",
    condition: "New",
    rating: 4.75,
    reviewCount: 312,
    stock: 19,
    salesToday: 82,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=900&q=80"
    ],
    sellerName: "Stride Athletics",
    sellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    sellerRating: 4.7,
    sellerSales: 7400,
    isBestSeller: true,
    isNew: true,
    isOnSale: true,
    hasCountdown: false,
    variants: {
      colors: ["Crimson / Off-White", "Forest Green / Cream", "Triple Stealth Black"],
      sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"]
    },
    specs: {
      "Upper": "Premium Suede + Ripstop Mesh",
      "Insole": "Ergonomic Ortholite Cushion",
      "Outsole": "Natural Gum Rubber"
    },
    createdAt: "2024-02-15"
  },
  {
    id: "p11",
    title: "100% Mongolian Cashmere Crewneck Sweater",
    description: "Unmatched softness and featherweight warmth spun from 2-ply grade-A Mongolian cashmere fibers. Finished with ribbed collar, cuffs, and hem.",
    price: 145.00,
    originalPrice: 185.00,
    category: "Fashion",
    gender: "Female",
    condition: "New",
    rating: 4.9,
    reviewCount: 168,
    stock: 14,
    salesToday: 35,
    image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=900&q=80"
    ],
    sellerName: "Nomad Cashmere",
    sellerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    sellerRating: 4.9,
    sellerSales: 4100,
    isBestSeller: false,
    isNew: false,
    isOnSale: true,
    hasCountdown: false,
    variants: {
      colors: ["Oatmeal Heather", "Dusty Rose", "Charcoal", "Emerald"],
      sizes: ["XS", "S", "M", "L"]
    },
    specs: {
      "Yarn": "Grade-A 100% Cashmere 15.5 Micron",
      "Gauge": "12GG 2-Ply Tight Knit"
    },
    createdAt: "2024-01-28"
  },

  // ================= HOME & LIVING (5) =================
  {
    id: "p12",
    title: "Minimalist Smart LED Desk Lamp with Wireless Charging",
    description: "Sleek aircraft-grade anodized aluminum architect lamp with stepless touch dimming, adjustable color temperature (2700K - 6500K), built-in 15W Qi fast charging base, and auto-ambient sensor.",
    price: 64.99,
    originalPrice: 89.99,
    category: "Home & Living",
    gender: "Both",
    condition: "New",
    rating: 4.8,
    reviewCount: 230,
    stock: 16,
    salesToday: 64,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80"
    ],
    sellerName: "Lumina Living",
    sellerAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    sellerRating: 4.8,
    sellerSales: 8900,
    isBestSeller: true,
    isNew: false,
    isOnSale: true,
    hasCountdown: true,
    variants: {
      colors: ["Space Gray", "Matte White", "Brushed Brass"],
      sizes: ["Standard"]
    },
    specs: {
      "Power": "12W LED (800 Lumens)",
      "Wireless Output": "15W Fast Qi",
      "CRI": "Ra > 95 Eye-Care"
    },
    createdAt: "2024-02-02"
  },
  {
    id: "p13",
    title: "Artisanal Ceramic Pour-Over Coffee Brewer Set",
    description: "Handcrafted stoneware pour-over dripper with dual-wall heat retention, matching 600ml glass server, precision olive wood collar, and 50 unbleached Japanese paper filters.",
    price: 48.00,
    originalPrice: 62.00,
    category: "Home & Living",
    gender: "Both",
    condition: "New",
    rating: 4.9,
    reviewCount: 178,
    stock: 20,
    salesToday: 45,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80"
    ],
    sellerName: "Roast & Craft Workshop",
    sellerAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80",
    sellerRating: 4.9,
    sellerSales: 4300,
    isBestSeller: false,
    isNew: true,
    isOnSale: true,
    hasCountdown: false,
    variants: {
      colors: ["Matte Speckled Grey", "Terracotta Sand", "Forest Glaze"],
      sizes: ["600ml (2-4 Cups)"]
    },
    specs: {
      "Material": "High-fired Ceramic + Borosilicate Glass",
      "Dishwasher Safe": "Yes (excluding wood collar)"
    },
    createdAt: "2024-02-18"
  },
  {
    id: "p14",
    title: "Ultrasonic Essential Oil Aromatherapy Diffuser",
    description: "Whisper-quiet (less than 20dB) cold-mist aroma diffuser with 500ml reservoir, 7 ambient mood lighting options, waterless auto-shutoff safety, and wireless remote control.",
    price: 36.99,
    originalPrice: 49.99,
    category: "Home & Living",
    gender: "Both",
    condition: "New",
    rating: 4.6,
    reviewCount: 285,
    stock: 35,
    salesToday: 51,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=80"
    ],
    sellerName: "Aura Home Sanctuary",
    sellerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    sellerRating: 4.7,
    sellerSales: 6100,
    isBestSeller: false,
    isNew: false,
    isOnSale: true,
    hasCountdown: false,
    variants: {
      colors: ["Dark Walnut", "Light Natural Oak", "Pure Ceramic White"],
      sizes: ["500ml Tank"]
    },
    specs: {
      "Run Time": "Up to 14 Hours Continuous",
      "Coverage": "Up to 450 sq ft",
      "Timer Modes": "1H / 3H / 6H / ON"
    },
    createdAt: "2024-01-12"
  },
  {
    id: "p15",
    title: "Organic 100% Bamboo Lyocell Luxury Sheet Set",
    description: "Silky soft 400 thread count organic bamboo lyocell bed sheets with thermo-regulating coolness, hypoallergenic weave, and deep 18-inch pockets fitting pillow-top mattresses.",
    price: 119.00,
    originalPrice: 159.00,
    category: "Home & Living",
    gender: "Both",
    condition: "New",
    rating: 4.9,
    reviewCount: 410,
    stock: 15,
    salesToday: 58,
    image: "https://images.unsplash.com/photo-1616627547584-bf28cee262db?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1616627547584-bf28cee262db?auto=format&fit=crop&w=900&q=80"
    ],
    sellerName: "Haven Sleep Co.",
    sellerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    sellerRating: 4.9,
    sellerSales: 8900,
    isBestSeller: true,
    isNew: false,
    isOnSale: true,
    hasCountdown: true,
    variants: {
      colors: ["Cloud White", "Sage Mist", "Slate Navy", "Sandstone"],
      sizes: ["Queen Set", "King Set", "Cal King Set"]
    },
    specs: {
      "Fabric": "100% Bamboo Viscose Lyocell",
      "Certifications": "OEKO-TEX Standard 100",
      "Includes": "1 Fitted, 1 Flat, 2 Pillowcases"
    },
    createdAt: "2024-01-22"
  },
  {
    id: "p16",
    title: "Hand-Blown Sculptural Glass Flower Vase",
    description: "Contemporary fluid curves hand-shaped by master artisans. Distinctive amber and smoke gradient glass that catches natural sunlight beautifully.",
    price: 42.00,
    originalPrice: 55.00,
    category: "Home & Living",
    gender: "Both",
    condition: "New",
    rating: 4.75,
    reviewCount: 94,
    stock: 12,
    salesToday: 21,
    image: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=900&q=80"
    ],
    sellerName: "Atelier Form",
    sellerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    sellerRating: 4.8,
    sellerSales: 2100,
    isBestSeller: false,
    isNew: true,
    isOnSale: false,
    hasCountdown: false,
    variants: {
      colors: ["Amber Glow", "Smoke Grey", "Emerald Bottle"],
      sizes: ["10 inch Medium", "14 inch Tall"]
    },
    specs: {
      "Material": "Thick-walled borosilicate glass",
      "Craft": "Hand-blown individual pieces"
    },
    createdAt: "2024-02-28"
  },

  // ================= SPORTS (4) =================
  {
    id: "p17",
    title: "HydroGrip Non-Slip Natural Rubber Pro Yoga Mat",
    description: "Laser-aligned positioning system on open-cell natural tree rubber surface providing unbeatable wet and dry grip. 5mm thick high-density cushion protecting joints.",
    price: 68.00,
    originalPrice: 88.00,
    category: "Sports",
    gender: "Both",
    condition: "New",
    rating: 4.85,
    reviewCount: 340,
    stock: 24,
    salesToday: 79,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=900&q=80"
    ],
    sellerName: "Prana Athletics",
    sellerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    sellerRating: 4.9,
    sellerSales: 9400,
    isBestSeller: true,
    isNew: false,
    isOnSale: true,
    hasCountdown: false,
    variants: {
      colors: ["Deep Teal", "Midnight Purple", "Charcoal Black"],
      sizes: ["72\" x 26\" (5mm Extra Wide)"]
    },
    specs: {
      "Material": "Eco-friendly Biodegradable Tree Rubber",
      "Weight": "2.8 kg Heavy-Duty"
    },
    createdAt: "2024-01-30"
  },
  {
    id: "p18",
    title: "Carbon Fiber Pro Trail Running Shoes",
    description: "Full-length curved carbon fiber propulsion plate sandwiched between nitrogen-infused supercritical foam. Vibram Megagrip lugged outsole for wet alpine mud.",
    price: 185.00,
    originalPrice: 220.00,
    category: "Sports",
    gender: "Both",
    condition: "New",
    rating: 4.8,
    reviewCount: 156,
    stock: 10,
    salesToday: 32,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=900&q=80"
    ],
    sellerName: "Summit Peak Sports",
    sellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    sellerRating: 4.8,
    sellerSales: 4120,
    isBestSeller: false,
    isNew: true,
    isOnSale: true,
    hasCountdown: false,
    variants: {
      colors: ["Acid Yellow / Cobalt", "Obsidian / Orange", "White / Cyan"],
      sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"]
    },
    specs: {
      "Drop": "6mm Stack Height 36mm/30mm",
      "Weight": "235g (Men's Size 9)",
      "Outsole": "Vibram Megagrip 4.5mm Lugs"
    },
    createdAt: "2024-02-14"
  },
  {
    id: "p19",
    title: "Smart Quick-Adjustable Dumbbells Set (5-52.5 lbs)",
    description: "Replace 15 pairs of traditional weights with a simple turn of the selector dial. Heavy-duty interlocking steel plates with ergonomic knurled alloy handle.",
    price: 299.00,
    originalPrice: 380.00,
    category: "Sports",
    gender: "Both",
    condition: "New",
    rating: 4.9,
    reviewCount: 520,
    stock: 7,
    salesToday: 48,
    image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=900&q=80"
    ],
    sellerName: "IronForge Fitness",
    sellerAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
    sellerRating: 4.9,
    sellerSales: 11000,
    isBestSeller: true,
    isNew: false,
    isOnSale: true,
    hasCountdown: true,
    variants: {
      colors: ["Stealth Black / Red Accent"],
      sizes: ["Single Dumbbell (52.5 lbs)", "Pair with Base Docks (105 lbs Total)"]
    },
    specs: {
      "Weight Range": "5 to 52.5 lbs per dumbbell",
      "Increments": "2.5 lb micro adjustments",
      "Material": "Machined Alloy Steel + Heavy Composite"
    },
    createdAt: "2024-01-05"
  },
  {
    id: "p20",
    title: "Titanium Vacuum Insulated Water Bottle (32oz)",
    description: "Ultralight aerospace-grade Grade 1 titanium double-wall insulation keeping beverages icy for 36 hours or steaming hot for 18 hours with zero metallic taste.",
    price: 54.00,
    originalPrice: 70.00,
    category: "Sports",
    gender: "Both",
    condition: "New",
    rating: 4.75,
    reviewCount: 164,
    stock: 28,
    salesToday: 40,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80"
    ],
    sellerName: "Summit Peak Sports",
    sellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    sellerRating: 4.8,
    sellerSales: 4120,
    isBestSeller: false,
    isNew: true,
    isOnSale: true,
    hasCountdown: false,
    variants: {
      colors: ["Raw Sandblasted Titanium", "Matte Midnight", "Aurora Anodized"],
      sizes: ["24 oz", "32 oz Wide Mouth"]
    },
    specs: {
      "Capacity": "32 oz (950 ml)",
      "Insulation": "Double-Wall Vacuum Sealed",
      "Weight": "Only 240 grams"
    },
    createdAt: "2024-02-12"
  },

  // ================= BOOKS (3) =================
  {
    id: "p21",
    title: "Atomic Habits: An Easy & Proven Way to Build Good Habits",
    description: "Hardcover Deluxe Collector's Edition with ribbon marker and gold gilded edges. The landmark #1 New York Times bestseller by James Clear with actionable frameworks for daily 1% compounding gains.",
    price: 21.99,
    originalPrice: 28.00,
    category: "Books",
    gender: "Both",
    condition: "New",
    rating: 4.95,
    reviewCount: 890,
    stock: 45,
    salesToday: 134,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=80"
    ],
    sellerName: "Page & Bound Books",
    sellerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    sellerRating: 4.9,
    sellerSales: 15300,
    isBestSeller: true,
    isNew: false,
    isOnSale: true,
    hasCountdown: false,
    variants: {
      colors: ["Collector's Hardcover", "Trade Paperback", "Audiobook Edition"],
      sizes: ["Standard Book"]
    },
    specs: {
      "Author": "James Clear",
      "Pages": "320 Pages",
      "Publisher": "Avery / Penguin Random House",
      "ISBN": "978-0735211292"
    },
    createdAt: "2024-01-08"
  },
  {
    id: "p22",
    title: "The Psychology of Money: Timeless Lessons on Wealth, Greed & Happiness",
    description: "Morgan Housel shares 19 short stories exploring the strange ways people think about money and teaches you how to make better sense of one of life’s most important topics.",
    price: 18.50,
    originalPrice: 24.99,
    category: "Books",
    gender: "Both",
    condition: "New",
    rating: 4.9,
    reviewCount: 640,
    stock: 30,
    salesToday: 88,
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=900&q=80"
    ],
    sellerName: "Page & Bound Books",
    sellerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    sellerRating: 4.9,
    sellerSales: 15300,
    isBestSeller: true,
    isNew: false,
    isOnSale: true,
    hasCountdown: false,
    variants: {
      colors: ["Paperback Edition", "Hardcover Library Binding"],
      sizes: ["Standard Book"]
    },
    specs: {
      "Author": "Morgan Housel",
      "Pages": "256 Pages",
      "Publisher": "Harriman House"
    },
    createdAt: "2024-01-14"
  },
  {
    id: "p23",
    title: "Designing Data-Intensive Applications by Martin Kleppmann",
    description: "The definitive guide to the architecture, principles, and trade-offs of reliable, scalable, and maintainable systems. Essential reading for software engineers and systems architects.",
    price: 44.99,
    originalPrice: 59.99,
    category: "Books",
    gender: "Both",
    condition: "New",
    rating: 4.95,
    reviewCount: 410,
    stock: 18,
    salesToday: 42,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80"
    ],
    sellerName: "TechPress Direct",
    sellerAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80",
    sellerRating: 4.9,
    sellerSales: 6400,
    isBestSeller: false,
    isNew: false,
    isOnSale: true,
    hasCountdown: false,
    variants: {
      colors: ["Original English Paperback", "Hardcover Reference"],
      sizes: ["Standard Book"]
    },
    specs: {
      "Author": "Martin Kleppmann",
      "Pages": "616 Pages",
      "Publisher": "O'Reilly Media"
    },
    createdAt: "2024-02-01"
  },

  // ================= BEAUTY (4) =================
  {
    id: "p24",
    title: "Multi-Molecular Hyaluronic Acid Hydrating Glow Serum",
    description: "5 molecular weights of hyaluronic acid combined with niacinamide and provitamin B5 to deliver 72-hour deep dermal hydration, plumping fine lines and restoring skin elasticity.",
    price: 34.00,
    originalPrice: 48.00,
    category: "Beauty",
    gender: "Both",
    condition: "New",
    rating: 4.85,
    reviewCount: 480,
    stock: 35,
    salesToday: 112,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80"
    ],
    sellerName: "Botanica Lab Organics",
    sellerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    sellerRating: 4.9,
    sellerSales: 13400,
    isBestSeller: true,
    isNew: false,
    isOnSale: true,
    hasCountdown: true,
    variants: {
      colors: ["Standard Formulation"],
      sizes: ["30ml Dropper", "60ml Value Size"]
    },
    specs: {
      "Skin Type": "All Skin Types / Sensitive Safe",
      "Cruelty-Free": "Yes, Leaping Bunny Certified",
      "Volume": "30ml (1.0 fl oz)"
    },
    createdAt: "2024-01-16"
  },
  {
    id: "p25",
    title: "Brazilian Natural Rose Quartz Gua Sha & Facial Roller Set",
    description: "100% authentic Grade-A Brazilian rose quartz stones hand-carved to relieve facial tension, reduce morning puffiness, promote lymphatic drainage, and enhance serum absorption.",
    price: 28.50,
    originalPrice: 38.00,
    category: "Beauty",
    gender: "Female",
    condition: "New",
    rating: 4.8,
    reviewCount: 290,
    stock: 22,
    salesToday: 65,
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=900&q=80"
    ],
    sellerName: "Luxe Stone Beauty",
    sellerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    sellerRating: 4.8,
    sellerSales: 5900,
    isBestSeller: false,
    isNew: false,
    isOnSale: true,
    hasCountdown: false,
    variants: {
      colors: ["Soft Rose Quartz", "Green Aventurine Jade", "Black Obsidian"],
      sizes: ["2-Piece Gift Set"]
    },
    specs: {
      "Material": "100% Raw Certified Quartz Stone",
      "Frame": "Zinc Alloy Rust-Proof Rose Gold Frame"
    },
    createdAt: "2024-01-24"
  },
  {
    id: "p26",
    title: "Organic Peptide & Shea Butter Lip Treatment Trio",
    description: "Deeply restorative lip conditioning therapy packed with tripeptides, raw African shea butter, squalane, and vitamin E. Nourishes dry lips with zero stickiness and subtle sheer gloss.",
    price: 24.00,
    originalPrice: 32.00,
    category: "Beauty",
    gender: "Both",
    condition: "New",
    rating: 4.75,
    reviewCount: 195,
    stock: 40,
    salesToday: 55,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=80"
    ],
    sellerName: "Botanica Lab Organics",
    sellerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    sellerRating: 4.9,
    sellerSales: 13400,
    isBestSeller: false,
    isNew: true,
    isOnSale: false,
    hasCountdown: false,
    variants: {
      colors: ["Vanilla Glaze + Berry Tint + Mint Cocoa Trio"],
      sizes: ["3x 15ml Tubes"]
    },
    specs: {
      "Formula": "100% Vegan & Cruelty Free",
      "Finish": "Non-sticky high gloss shine"
    },
    createdAt: "2024-02-22"
  },
  {
    id: "p27",
    title: "Invisible Silk Daily Mineral Sunscreen SPF 50 PA++++",
    description: "Weightless 100% non-nano zinc oxide mineral sunscreen that melts effortlessly into all skin tones with zero white cast, no greasy residue, and blue-light protection.",
    price: 32.00,
    originalPrice: 40.00,
    category: "Beauty",
    gender: "Both",
    condition: "New",
    rating: 4.9,
    reviewCount: 340,
    stock: 26,
    salesToday: 82,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80"
    ],
    sellerName: "Soleil Dermatology",
    sellerAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80",
    sellerRating: 4.9,
    sellerSales: 8200,
    isBestSeller: true,
    isNew: true,
    isOnSale: true,
    hasCountdown: false,
    variants: {
      colors: ["Universal Clear Matte Finish"],
      sizes: ["50ml Bottle", "100ml Jumbo Pump"]
    },
    specs: {
      "SPF": "Broad Spectrum SPF 50 PA++++",
      "Water Resistance": "80 Minutes Sweatproof"
    },
    createdAt: "2024-02-17"
  },

  // ================= FURNITURE (2) =================
  {
    id: "p28",
    title: "Ergonomic Pro Mesh Executive Office Chair",
    description: "German-engineered dynamic 4D lumbar support conforming automatically to spinal posture. 3D adjustable armrests, breathable Korean mesh, 135° recline, and Class 4 gas lift.",
    price: 279.00,
    originalPrice: 389.00,
    category: "Furniture",
    gender: "Both",
    condition: "New",
    rating: 4.85,
    reviewCount: 310,
    stock: 9,
    salesToday: 44,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=900&q=80"
    ],
    sellerName: "ErgoForm Studios",
    sellerAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
    sellerRating: 4.8,
    sellerSales: 5600,
    isBestSeller: true,
    isNew: false,
    isOnSale: true,
    hasCountdown: true,
    variants: {
      colors: ["All Black Stealth", "Silver Gray & White", "Slate Navy"],
      sizes: ["Standard High-Back with Headrest"]
    },
    specs: {
      "Max Capacity": "330 lbs (150 kg)",
      "Warranty": "5-Year Full Mechanism Replacement"
    },
    createdAt: "2024-01-19"
  },
  {
    id: "p29",
    title: "Solid Natural White Oak Nordic Coffee Table",
    description: "Sustainably harvested FSC-certified solid white oak coffee table with softly rounded corners, dual tiered fluted storage shelf, and non-toxic matte polyurethane organic wax finish.",
    price: 249.00,
    originalPrice: 320.00,
    category: "Furniture",
    gender: "Both",
    condition: "New",
    rating: 4.8,
    reviewCount: 88,
    stock: 5,
    salesToday: 18,
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=900&q=80"
    ],
    sellerName: "Nordic Craft Furniture",
    sellerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    sellerRating: 4.9,
    sellerSales: 2900,
    isBestSeller: false,
    isNew: true,
    isOnSale: true,
    hasCountdown: false,
    variants: {
      colors: ["Natural White Oak", "Smoked Walnut"],
      sizes: ["44\" Length x 22\" Depth"]
    },
    specs: {
      "Material": "100% Solid White Oak",
      "Dimensions": "44\"L x 22\"W x 17\"H",
      "Assembly": "Simple 10-minute screw-in legs"
    },
    createdAt: "2024-02-25"
  },

  // ================= ACCESSORIES (1) =================
  {
    id: "p30",
    title: "Full-Grain Leather Voyager Duffle & Weekender Bag",
    description: "Hand-stitched premium 5oz full-grain pull-up cowhide leather weekender bag. Features separate vented shoe compartment, waterproof padded 16-inch laptop sleeve, solid brass hardware, and removable padded shoulder strap.",
    price: 189.00,
    originalPrice: 249.00,
    category: "Accessories",
    gender: "Both",
    condition: "New",
    rating: 4.92,
    reviewCount: 275,
    stock: 14,
    salesToday: 59,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80"
    ],
    sellerName: "Heritage Leather Co.",
    sellerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    sellerRating: 4.9,
    sellerSales: 6200,
    isBestSeller: true,
    isNew: false,
    isOnSale: true,
    hasCountdown: false,
    variants: {
      colors: ["Cognac Brown", "Espresso Black", "Heritage Olive Canvas + Leather"],
      sizes: ["45L Carry-On Approved"]
    },
    specs: {
      "Dimensions": "21.5\" x 12\" x 11\"",
      "Capacity": "45 Liters",
      "Hardware": "Solid Antique Brass YKK"
    },
    createdAt: "2024-01-20"
  }
];

export function getProductById(id) {
  return products.find((p) => String(p.id) === String(id)) || null;
}

export function getRelatedProducts(product, limit = 4) {
  if (!product) return [];
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
}

export function getBestSellers(limit = 8) {
  return products.filter((p) => p.isBestSeller).slice(0, limit);
}

export function getSaleProducts(limit = 8) {
  return products.filter((p) => p.isOnSale).slice(0, limit);
}

export function matchesPriceRange(price, rangeId) {
  const range = priceRangeOptions.find((r) => r.id === rangeId);
  if (!range) return true;
  return price >= range.min && price < range.max;
}
