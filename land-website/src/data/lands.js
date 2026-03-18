import img1 from '../assets/images/vlcsnap-2026-03-10-19h43m59s652.png';
import img2 from '../assets/images/vlcsnap-2026-03-10-19h44m54s079.png';
import img3 from '../assets/images/vlcsnap-2026-03-10-19h45m24s567.png';
import img4 from '../assets/images/vlcsnap-2026-03-10-19h46m05s181.png';

export const property = {
  id: 1,
  name: "Beach Land",
  tagline: "Premium Beachside Investment Opportunity",
  location: "Kirumampakkam, Pondicherry",
  address: "Kirumampakkam Revenue Panithittu Village, Reddichavady, Pondicherry, Tamil Nadu",
  price: null,
  pricePerAcre: null,
  size: 12.5,
  type: "Commercial",
  status: "Available",
  description: "A rare investment opportunity to acquire a large parcel of 12.5 acres of beachside land located near Reddichavady, Pondicherry. The property is strategically positioned in a fast-developing coastal tourism corridor, surrounded by premium hospitality developments and upcoming infrastructure.",
  detailedDescription: "This exceptional 12.5-acre beachside property represents a unique investment opportunity in one of Pondicherry's most promising coastal corridors. Located near the prestigious Reddichavady area, the land benefits from its proximity to major hospitality developments including the upcoming Taj Hotel.\n\nThe property offers excellent potential for resort development, luxury villa projects, eco-tourism initiatives, or strategic long-term investment. With 25 feet of road connectivity and essential utilities available nearby, this land is primed for immediate development.\n\nPondicherry's tourism sector is experiencing significant growth, making this an ideal time to invest in the region's hospitality infrastructure. The peaceful coastal location combined with excellent connectivity makes it perfect for discerning developers and investors alike.",
  
  images: [
    img1,
    img2,
    img3,
    img4
  ],
  
  droneVideo: null,
  droneThumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
  
  videos: [],

  features: [
    "Prime Location: Near Reddichavady, Pondicherry",
    "Large Land Parcel: 12.5 Acres",
    "Road Access: 25-ft Road Connectivity",
    "Tourism Zone: Near Taj Hotel & Club Mahindra",
    "High Investment Potential",
    "Ideal for Resort & Villa Development",
    "Eco-Tourism Project Opportunity",
    "Peaceful Coastal Area",
    "Good Connectivity to Main Road & City",
    "Patta Land - Clear Title"
  ],

  specifications: {
    propertyType: "Beachside Commercial Land",
    landArea: "12.5 Acres",
    location: "Reddichavady, Pondicherry",
    ownershipType: "Patta Land",
    roadAccess: "30 Feet Wide Road",
    utilities: "Electricity & Water Available",
    suitableUse: "Resort Development, Villa Project, Eco-Tourism, Investment",
    proximity: "Near Upcoming Taj Hotel",
    tourismGrowth: "High Appreciation Potential"
  },

  locationDetails: {
    coordinates: "11.8218510, 79.8035350",
    nearestCity: "Pondicherry (Puducherry)",
    distanceToAirport: "Pondicherry Airport - 15 km",
    distanceToRailway: "Pondicherry Railway Station - 12 km",
    nearbyAttractions: "Paradise Beach, Auroville, Promenade Beach, Sri Aurobindo Ashram",
    development: "Fast-Developing Coastal Tourism Corridor",
    nearbyPlaces: "Club Mahindra - 3 km, Mahatma Gandhi Hospital - 8 km"
  },

  documents: [
    { name: "Patta Certificate", size: "Available" },
    { name: "Survey Report", size: "Available" },
    { name: "Title Deed", size: "Available" },
    { name: "Location Map", size: "Available" }
  ],

  agents: [
     {
      name: "Mahesh",
      phone: "+91 93606 91650"
    },
    {
      name: "Madhan",
      phone: "+91 63857 36744"
    },
    {
      name: "Lebin",
      phone: "+91 99946 08039"
    }
   
  ]
};

export const lands = [property];

export const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    location: "Beverly Hills, CA",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    rating: 5,
    text: "The team made the entire process seamless. Found our dream property in Malibu within weeks. Highly recommended!"
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "San Jose, CA",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    rating: 5,
    text: "Professional, transparent, and excellent communication throughout. This was my best real estate experience."
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    location: "Austin, TX",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    rating: 5,
    text: "As a first-time buyer, I appreciated the guidance and support. They found exactly what I was looking for."
  }
];

export const features = [
  {
    icon: "🗺️",
    title: "Verified Listings",
    description: "Every property is thoroughly vetted and verified by our expert team."
  },
  {
    icon: "💰",
    title: "Competitive Pricing",
    description: "Get the best market rates with our price match guarantee."
  },
  {
    icon: "🤝",
    title: "Expert Guidance",
    description: "Professional support from inquiry to closing and beyond."
  },
  {
    icon: "📋",
    title: "Legal Assistance",
    description: "Complete legal support for a worry-free transaction."
  },
  {
    icon: "🔍",
    title: "Due Diligence",
    description: "Comprehensive property reports and background checks."
  },
  
];
