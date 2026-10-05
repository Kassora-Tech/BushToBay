export type Vehicle = {
  slug: string;
  name: string;
  seats: number;
  count: number;
  tagline: string;
  description: string;
  image: string;
  features: string[];
  bestFor: string[];
};

export const FLEET: Vehicle[] = [
  {
    slug: "quantum-old",
    name: "Toyota Quantum — Old Shape",
    seats: 14,
    count: 2,
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
    count: 2,
    tagline: "Sleek and modern",
    description:
      "Sleek, modern and comfortable for short or regional travel. The smart choice for smaller groups on the move.",
    image: "/images/fleet-quantum-new.jpeg",
    features: ["Modern styling", "Air conditioning", "USB charging", "Comfort seating"],
    bestFor: ["Regional travel", "Day trips", "Team outings"],
  },
  {
    slug: "sprinter-18",
    name: "Mercedes-Benz Sprinter",
    seats: 18,
    count: 2,
    tagline: "Premium mid-size comfort",
    description:
      "Ideal for professional, church or tour groups looking for added comfort and a touch of class.",
    image: "/images/fleet-sprinter.jpeg",
    features: ["Mercedes reliability", "Reclining seats", "Air conditioning", "PA system"],
    bestFor: ["Corporate groups", "Church groups", "Tour parties"],
  },
  {
    slug: "coaster-gl",
    name: "Toyota Coaster 2.8 GL",
    seats: 22,
    count: 2,
    tagline: "Spacious and reliable",
    description:
      "Spacious and reliable for medium-sized groups and excursions — a proven favourite across Southern Africa.",
    image: "/images/fleet-coaster.jpeg",
    features: ["Generous legroom", "Air conditioning", "Luggage storage", "Seat belts throughout"],
    bestFor: ["Excursions", "Medium groups", "Sports teams"],
  },
  {
    slug: "marcopolo-g6",
    name: "Marcopolo G6",
    seats: 30,
    count: 1,
    tagline: "Long-distance luxury",
    description:
      "Premium coach with reclining seats — designed for long-distance comfort from the bush to the bay.",
    image: "/images/fleet-marcopolo30.jpg",
    features: ["Reclining seats", "Air conditioning", "PA system", "Charging ports"],
    bestFor: ["Long distance", "Tour groups", "Cross-border trips"],
  },
  {
    slug: "hyundai-universe",
    name: "Hyundai Universe",
    seats: 41,
    count: 5,
    tagline: "The big-group specialist",
    description:
      "Our largest fleet of luxury coaches, seating 39 to 41 — a dependable workhorse for school groups, events or large family trips.",
    image: "/images/fleet-hyundai41.jpeg",
    features: ["39/41 full seats", "Air conditioning", "Large luggage bays", "PA system"],
    bestFor: ["School groups", "Events", "Family gatherings"],
  },
  {
    slug: "marcopolo-g7",
    name: "Marcopolo G7",
    seats: 52,
    count: 1,
    tagline: "Top of the line",
    description:
      "Top-of-the-line luxury with reclining seats, air-con and charging ports. Touring, the way it should be.",
    image: "/images/fleet-marcopolo52.jpeg",
    features: ["Full recline seats", "Climate control", "Charging ports", "On-board PA"],
    bestFor: ["Luxury touring", "Corporate events", "Long-haul travel"],
  },
];

export const CONTACT = {
  phone: "+27 83 898 2914",
  phoneHref: "tel:+27838982914",
  phone2: "+27 66 018 9786",
  phone2Href: "tel:+27660189786",
  email: "sales@bushtobay.co.za",
  emailHref: "mailto:sales@bushtobay.co.za",
  location: "Corner Rooibok Road and Henley Drive, Highbury, 1964, Gauteng, South Africa",
};

export const SOCIAL = {
  instagram: "https://instagram.com/bushtobaytravel",
  instagramHandle: "@bushtobaytravel",
  facebook: "https://facebook.com/bushtobaytravel",
};
