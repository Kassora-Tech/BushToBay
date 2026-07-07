export type Vehicle = {
  slug: string;
  name: string;
  seats: number;
  tagline: string;
  description: string;
  image: string;
  features: string[];
  bestFor: string[];
};

export const FLEET: Vehicle[] = [
  {
    slug: "hyundai-h1",
    name: "Hyundai H1",
    seats: 7,
    tagline: "Executive shuttle",
    description:
      "Perfect for airport transfers, VIPs and small private groups. Discreet, comfortable and always on time.",
    image: "/images/fleet-h1.jpg",
    features: ["Air conditioning", "Leather comfort seats", "Luggage space", "Professional driver"],
    bestFor: ["Airport transfers", "VIP travel", "Small groups"],
  },
  {
    slug: "quantum-classic",
    name: "Toyota Quantum — Classic",
    seats: 14,
    tagline: "The dependable workhorse",
    description:
      "A practical, budget-friendly option for community and school trips without compromising on safety.",
    image: "/images/fleet-quantum-old.jpeg",
    features: ["Air conditioning", "Seat belts throughout", "Budget friendly", "Clean interior"],
    bestFor: ["Community trips", "School runs", "Local shuttles"],
  },
  {
    slug: "quantum-new",
    name: "Toyota Quantum — New Shape",
    seats: 14,
    tagline: "Sleek and modern",
    description:
      "Sleek, modern and comfortable for short or regional travel. The smart choice for smaller groups on the move.",
    image: "/images/fleet-quantum-new.jpeg",
    features: ["Modern styling", "Air conditioning", "USB charging", "Comfort seating"],
    bestFor: ["Regional travel", "Day trips", "Team outings"],
  },
  {
    slug: "sprinter-21",
    name: "Mercedes-Benz Sprinter",
    seats: 21,
    tagline: "Premium mid-size comfort",
    description:
      "Ideal for professional, church or tour groups looking for added comfort and a touch of class.",
    image: "/images/fleet-sprinter.jpeg",
    features: ["Mercedes reliability", "Reclining seats", "Air conditioning", "PA system"],
    bestFor: ["Corporate groups", "Church groups", "Tour parties"],
  },
  {
    slug: "coaster-23",
    name: "Toyota Coaster",
    seats: 23,
    tagline: "Spacious and reliable",
    description:
      "Spacious and reliable for medium-sized groups and excursions — a proven favourite across Southern Africa.",
    image: "/images/fleet-coaster.jpeg",
    features: ["Generous legroom", "Air conditioning", "Luggage storage", "Seat belts throughout"],
    bestFor: ["Excursions", "Medium groups", "Sports teams"],
  },
  {
    slug: "marcopolo-30",
    name: "Luxury Marcopolo",
    seats: 30,
    tagline: "Long-distance luxury",
    description:
      "Premium coach with reclining seats — designed for long-distance comfort from the bush to the bay.",
    image: "/images/fleet-marcopolo30.jpg",
    features: ["Reclining seats", "Air conditioning", "PA system", "Charging ports"],
    bestFor: ["Long distance", "Tour groups", "Cross-border trips"],
  },
  {
    slug: "hyundai-41",
    name: "Hyundai Bus",
    seats: 41,
    tagline: "The big-group specialist",
    description:
      "A dependable workhorse for school groups, events or large family trips — space for everyone and everything.",
    image: "/images/fleet-hyundai41.jpeg",
    features: ["41 full seats", "Air conditioning", "Large luggage bays", "PA system"],
    bestFor: ["School groups", "Events", "Family gatherings"],
  },
  {
    slug: "marcopolo-g7",
    name: "Marcopolo G7",
    seats: 52,
    tagline: "Top of the line",
    description:
      "Top-of-the-line luxury with reclining seats, air-con and charging ports. Touring, the way it should be.",
    image: "/images/fleet-marcopolo52.jpeg",
    features: ["Full recline seats", "Climate control", "Charging ports", "On-board PA"],
    bestFor: ["Luxury touring", "Corporate events", "Long-haul travel"],
  },
  {
    slug: "bus-60",
    name: "60-Seater Coach",
    seats: 60,
    tagline: "Maximum capacity",
    description:
      "Perfect for maximum capacity — rallies, large school trips and mega group bookings at unbeatable value.",
    image: "/images/fleet-bus60.jpeg",
    features: ["60 seats", "Air conditioning", "PA system", "Seat belts throughout"],
    bestFor: ["Rallies", "Mega bookings", "Large school trips"],
  },
];

export const CONTACT = {
  phone: "+27 83 898 2914",
  phoneHref: "tel:+27838982914",
  phone2: "+27 66 018 9786",
  phone2Href: "tel:+27660189786",
  email: "sales@bushtobay.co.za",
  emailHref: "mailto:sales@bushtobay.co.za",
  location: "Gauteng, South Africa",
};
