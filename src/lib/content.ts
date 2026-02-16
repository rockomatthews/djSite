export type CTA = {
  label: string;
  href: string;
  variant: "contained" | "outlined" | "text";
};

export const siteContent = {
  brand: {
    name: "DJ Park City",
    tagline: "",
    location: "Park City, Utah",
    phone: "+1 (435) 901-0628",
    phoneLink: "tel:+14359010628",
    smsLink: "sms:+14359010628",
    bookingUrl: "#contact",
    email: "bookings@djnova.com",
  },
  hero: {
    headline: "Turn your night into a headline.",
    subheadline:
      "Modern mixes, seamless transitions, and a vibe tailored to your crowd.",
    ctas: [
      { label: "Call Now", href: "tel:+14359010628", variant: "contained" },
      { label: "Text Me", href: "sms:+14359010628", variant: "outlined" },
      {
        label: "Book Now",
        href: "#contact",
        variant: "contained",
      },
    ] satisfies CTA[],
    video: {
      youtubeId: "temQ82314DM",
      posterUrl: "/globe.svg",
      is360: true,
    },
    musicToggleLabel: "Music",
  },
  mediaPreview: {
    title: "Featured Mix",
    description:
      "A 90-second preview of signature transitions and crowd-building energy.",
    tracklist: ["Deep house opener", "Afro tech build", "Classic sing-along"],
  },
  services: [
    {
      title: "Weddings",
      description:
        "From ceremony to last dance, curated sets and MC support throughout.",
    },
    {
      title: "Corporate & Brand Events",
      description:
        "Professional, on-brand soundtracks for launches, galas, and conferences.",
    },
    {
      title: "Nightlife & Private Parties",
      description: "High-impact club sets, birthdays, and VIP celebrations.",
    },
  ],
  testimonials: [
    {
      quote:
        "Best DJ we have booked in years. The dance floor never emptied.",
      name: "Amelia R.",
      event: "Wedding Reception",
      rating: 5,
    },
    {
      quote: "The mix was flawless and the energy kept building all night.",
      name: "Marcus J.",
      event: "Rooftop Party",
      rating: 5,
    },
  ],
  gallery: [
    { title: "Club Residency", caption: "Late-night peak energy." },
    { title: "Sunset Lounge", caption: "Golden hour grooves." },
    { title: "Wedding Finale", caption: "Confetti, classics, and champagne." },
  ],
  galleryImages: [
    "/gallery/1.JPG",
    "/gallery/2.jpeg",
    "/gallery/3.JPG",
    "/gallery/4.JPG",
    "/gallery/5.JPG",
    "/gallery/6.JPG",
    "/gallery/7.jpeg",
    "/gallery/8.JPG",
  ],
  about: {
    headline: "Your soundtrack, crafted live.",
    bio:
      "DJ Nova blends house, open-format, and throwbacks with a focus on flow. From intimate gatherings to packed dance floors, every set is tailored.",
    stats: [
      { label: "Events Played", value: "250+" },
      { label: "Cities", value: "18" },
      { label: "Years Experience", value: "10" },
    ],
  },
  contact: {
    availability:
      "Now booking 2026 events. Weekends fill fast — secure your date early.",
    formHint:
      "Tell us your date, venue, and vibe. We reply within 24 hours.",
  },
  soundcloud: {
    tracks: [
      {
        title: "Soul Makossa (Money) [UK Radio Edit]",
        url: "https://soundcloud.com/yolandabecool/soul-makossa-money-yolanda-be-cool-dcup",
      },
    ],
  },
  googleReviews: {
    placeId: "YOUR_GOOGLE_PLACE_ID",
    reviews: [
      {
        author: "Amelia R.",
        rating: 5,
        time: "2 months ago",
        text:
          "Best DJ we have booked in years. The dance floor never emptied.",
      },
      {
        author: "Marcus J.",
        rating: 5,
        time: "4 months ago",
        text: "The mix was flawless and the energy kept building all night.",
      },
      {
        author: "Jasmine K.",
        rating: 5,
        time: "6 months ago",
        text: "Professional, punctual, and the playlist was perfect.",
      },
    ],
  },
};
