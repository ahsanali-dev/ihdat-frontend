export const mockProducts = [
  {
    id: "prod-1",
    name: "Zaman Knit Polo",
    price: 4990,
    category: "Shirts",
    description: "A premium knitted polo shirt crafted from 100% fine organic cotton. Features a relaxed collar, subtle ribbed hem, and a breathable knit texture that elevates casual dressing.",
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600",
      "https://images.unsplash.com/photo-1620799139507-2a76f79a2f4d?q=80&w=600",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600"
    ],
    colors: ["#FAF6F0", "#C2B280", "#8A9A86"], // Cream, Sand, Sage
    colorNames: ["Cream", "Sand", "Sage"],
    sizes: ["S", "M", "L", "XL"],
    stock: 25,
    isFeatured: true,
    video: "https://player.vimeo.com/external/540092323.sd.mp4?s=80afcb9d658c14833214b6d3b455b85a3dc26f50&profile_id=165&oauth2_token_id=57447761",
  },
  {
    id: "prod-2",
    name: "Asr Structured Jacket",
    price: 9990,
    category: "Outerwear",
    description: "An elegant, double-breasted tailored jacket built with structured shoulders and custom gold-tone hardware. Crafted from a mid-weight wool blend for a timeless fit.",
    images: [
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=600",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=600"
    ],
    colors: ["#1E1E24", "#3D5A50"], // Charcoal, Deep Forest
    colorNames: ["Charcoal", "Deep Forest"],
    sizes: ["M", "L", "XL"],
    stock: 12,
    isFeatured: true,
    video: "https://player.vimeo.com/external/435674703.sd.mp4?s=7fdf18e19e7a2bda8f2b3e4f6cb65f1cfb0b6cfb&profile_id=165&oauth2_token_id=57447761",
  },
  {
    id: "prod-3",
    name: "Sahar Linen Shirt",
    price: 3990,
    category: "Shirts",
    description: "A lightweight, organic linen button-down shirt. Perfect for warm days, offering ultimate comfort and an easygoing drape. Pre-washed for extra softness.",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=600"
    ],
    colors: ["#FFFFFF", "#7097A8", "#C87A53"], // White, Sky Blue, Terracotta
    colorNames: ["White", "Sky Blue", "Terracotta"],
    sizes: ["S", "M", "L", "XL"],
    stock: 40,
    isFeatured: false,
    video: "https://player.vimeo.com/external/540092323.sd.mp4?s=80afcb9d658c14833214b6d3b455b85a3dc26f50&profile_id=165&oauth2_token_id=57447761",
  },
  {
    id: "prod-4",
    name: "Eesa Oversized Hoodie",
    price: 5490,
    category: "Activewear",
    description: "Heavyweight 450GSM loopback cotton hoodie. Double-lined hood without drawstrings for a clean, minimalist silhouette. Designed with dropped shoulders.",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=600",
      "https://images.unsplash.com/photo-1556821840-416b0864380f?q=80&w=600"
    ],
    colors: ["#09090B", "#B8A390"], // Jet Black, Warm Taupe
    colorNames: ["Jet Black", "Warm Taupe"],
    sizes: ["S", "M", "L", "XL"],
    stock: 18,
    isFeatured: true,
    video: "https://player.vimeo.com/external/435674703.sd.mp4?s=7fdf18e19e7a2bda8f2b3e4f6cb65f1cfb0b6cfb&profile_id=165&oauth2_token_id=57447761",
  },
  {
    id: "prod-5",
    name: "Qalam Pleated Trousers",
    price: 5990,
    category: "Pants",
    description: "Tailored trousers featuring double front pleats and a relaxed, straight-leg cut. Includes side adjusters and a hidden button closure for a smooth waistband.",
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=600",
      "https://images.unsplash.com/photo-1506629082925-63d6314a3389?q=80&w=600"
    ],
    colors: ["#3F2E27", "#D4C5B9"], // Espresso, Sand
    colorNames: ["Espresso", "Sand"],
    sizes: ["30", "32", "34", "36"],
    stock: 15,
    isFeatured: false,
    video: "https://player.vimeo.com/external/540092323.sd.mp4?s=80afcb9d658c14833214b6d3b455b85a3dc26f50&profile_id=165&oauth2_token_id=57447761",
  },
  {
    id: "prod-6",
    name: "Mihrab Silk Scarf",
    price: 2990,
    category: "Accessories",
    description: "A luxury square scarf printed on 100% pure mulberry silk. Featuring abstract geometric patterns inspired by ancient architecture and finished with hand-rolled edges.",
    images: [
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=600",
      "https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?q=80&w=600",
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600"
    ],
    colors: ["#D4AF37", "#7D1D2B"], // Antique Gold, Crimson
    colorNames: ["Antique Gold", "Crimson"],
    sizes: ["One Size"],
    stock: 50,
    isFeatured: true,
    video: "https://player.vimeo.com/external/435674703.sd.mp4?s=7fdf18e19e7a2bda8f2b3e4f6cb65f1cfb0b6cfb&profile_id=165&oauth2_token_id=57447761",
  }
];

export const mockOrders = [
  {
    id: "ORD-9481",
    customer: {
      name: "Ali Ahmed",
      email: "ali@example.com",
      phone: "+92 300 1234567",
      address: "House 12, Street 3, F-8/2",
      city: "Islamabad",
      postalCode: "44000"
    },
    items: [
      {
        productId: "prod-1",
        name: "Zaman Knit Polo",
        price: 4990,
        color: "Cream",
        size: "M",
        quantity: 2,
        image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600"
      },
      {
        productId: "prod-6",
        name: "Mihrab Silk Scarf",
        price: 2990,
        color: "Antique Gold",
        size: "One Size",
        quantity: 1,
        image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=600"
      }
    ],
    totalAmount: 12970, // (4990 * 2) + 2990
    status: "Pending",
    createdAt: "2026-06-21T10:15:30Z"
  },
  {
    id: "ORD-8392",
    customer: {
      name: "Ayesha Khan",
      email: "ayesha@example.com",
      phone: "+92 321 9876543",
      address: "Flat 4B, Askari 11",
      city: "Lahore",
      postalCode: "54000"
    },
    items: [
      {
        productId: "prod-2",
        name: "Asr Structured Jacket",
        price: 9990,
        color: "Charcoal",
        size: "L",
        quantity: 1,
        image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=600"
      }
    ],
    totalAmount: 9990,
    status: "Processing",
    createdAt: "2026-06-22T08:30:00Z"
  },
  {
    id: "ORD-2710",
    customer: {
      name: "Zainab Malik",
      email: "zainab@example.com",
      phone: "+92 333 4567890",
      address: "Defense Phase 6, Street 15",
      city: "Karachi",
      postalCode: "75500"
    },
    items: [
      {
        productId: "prod-3",
        name: "Sahar Linen Shirt",
        price: 3990,
        color: "White",
        size: "S",
        quantity: 1,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=600"
      },
      {
        productId: "prod-5",
        name: "Qalam Pleated Trousers",
        price: 5990,
        color: "Espresso",
        size: "32",
        quantity: 1,
        image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600"
      }
    ],
    totalAmount: 9980, // 3990 + 5990
    status: "Shipped",
    createdAt: "2026-06-20T14:45:00Z"
  },
  {
    id: "ORD-1122",
    customer: {
      name: "Bilal Tariq",
      email: "bilal@example.com",
      phone: "+92 300 9876543",
      address: "House 45, Sector G-11/1",
      city: "Islamabad",
      postalCode: "44000"
    },
    items: [
      {
        productId: "prod-4",
        name: "Zaman Knit Hoodie",
        price: 4990,
        color: "Olive",
        size: "M",
        quantity: 1,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600"
      }
    ],
    totalAmount: 4990,
    status: "Delivered",
    createdAt: "2026-06-21T18:20:00Z"
  },
  {
    id: "ORD-3344",
    customer: {
      name: "Mariam Yusuf",
      email: "mariam@example.com",
      phone: "+92 321 4561230",
      address: "Apartment 12, Cavalry Ground",
      city: "Lahore",
      postalCode: "54000"
    },
    items: [
      {
        productId: "prod-6",
        name: "Mihrab Silk Scarf",
        price: 2990,
        color: "Antique Gold",
        size: "One Size",
        quantity: 2,
        image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=600"
      }
    ],
    totalAmount: 5980,
    status: "Pending",
    createdAt: "2026-06-22T09:10:00Z"
  },
  {
    id: "ORD-5566",
    customer: {
      name: "Hamza Niaz",
      email: "hamza@example.com",
      phone: "+92 333 1234567",
      address: "Street 5, Askari 5",
      city: "Rawalpindi",
      postalCode: "46000"
    },
    items: [
      {
        productId: "prod-1",
        name: "Zaman Knit Polo",
        price: 4990,
        color: "Cream",
        size: "L",
        quantity: 1,
        image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600"
      }
    ],
    totalAmount: 4990,
    status: "Cancelled",
    createdAt: "2026-06-22T11:40:00Z"
  },
  {
    id: "ORD-7788",
    customer: {
      name: "Sana Malik",
      email: "sana@example.com",
      phone: "+92 301 7654321",
      address: "House 204, Phase 3, DHA",
      city: "Karachi",
      postalCode: "75500"
    },
    items: [
      {
        productId: "prod-2",
        name: "Asr Structured Jacket",
        price: 9990,
        color: "Charcoal",
        size: "M",
        quantity: 1,
        image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=600"
      }
    ],
    totalAmount: 9990,
    status: "Processing",
    createdAt: "2026-06-22T13:15:00Z"
  }
];

export const mockUsers = [
  { id: "usr-1", name: "Ali Ahmed", email: "ali@example.com", role: "customer", registeredAt: "2026-04-12" },
  { id: "usr-2", name: "Ayesha Khan", email: "ayesha@example.com", role: "customer", registeredAt: "2026-05-18" },
  { id: "usr-3", name: "Zainab Malik", email: "zainab@example.com", role: "customer", registeredAt: "2026-06-01" },
  { id: "usr-4", name: "Admin Ihdat", email: "admin@ihdat.com", role: "admin", registeredAt: "2026-01-01" },
  { id: "usr-5", name: "Bilal Tariq", email: "bilal@example.com", role: "customer", registeredAt: "2026-06-05" },
  { id: "usr-6", name: "Mariam Yusuf", email: "mariam@example.com", role: "customer", registeredAt: "2026-06-10" },
  { id: "usr-7", name: "Hamza Niaz", email: "hamza@example.com", role: "customer", registeredAt: "2026-06-12" },
  { id: "usr-8", name: "Sana Malik", email: "sana@example.com", role: "customer", registeredAt: "2026-06-15" }
];
