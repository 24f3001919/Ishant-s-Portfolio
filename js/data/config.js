/**
 * Centralized Configuration & Profile Data for Ishant Singh's Portfolio
 * Sourced directly from Ishant Singh's official resume.
 */

export const SITE_CONFIG = {
  author: {
    name: "Ishant Singh",
    shortName: "Ishant",
    role: "Video Editor | Motion Graphics Artist",
    subRole: "Commercials · Events · Visual Design · Trend-Aware Social Edits",
    bio: "Video Editor and Motion Graphics Artist with 2+ years of experience creating engaging visual content for brands, events and social media. Currently pursuing a B.Sc. in 3D Animation and VFX at AAFT University of Media and Arts.",
    education: "B.Sc. in 3D Animation and VFX (2023 – 2027), AAFT University of Media and Arts, Raipur",
    location: "Raipur, Chhattisgarh",
    phone: "+91 7828638613",
    email: "ishant.edit@gmail.com",
    secondaryEmail: "ishant6398@gmail.com",
    languages: ["English", "Hindi"],
    experience: [
      {
        role: "Freelance Video Editor & Motion Graphics Artist",
        period: "2025 – 2026",
        summary: "Video editing, motion graphics and social media content."
      },
      {
        role: "Video Editor & Social Media Handler",
        company: "Elvn8 Clothing Brand",
        period: "Nov 2025 – May 2026",
        summary: "Editing and social media content strategy."
      }
    ],
    software: [
      "Adobe Premiere Pro",
      "Adobe After Effects",
      "DaVinci Resolve",
      "Adobe Photoshop"
    ],
    skills: [
      "Video Editing",
      "Motion Graphics",
      "Visual Design",
      "Interactive Video Editing",
      "Social Media Content Strategy",
      "Trend & Content Research"
    ],
    reference: {
      name: "Mr. Himanshu Pathak",
      title: "Sr. Manager, CRC",
      institution: "AAFT University",
      phone: "+91 9140462422",
      email: "himanshu.p@aaft.edu.in"
    }
  },

  // Centralized asset paths
  assets: {
    profilePhoto: "assets/images/profiles/ishant-profile.jpg",
    heroBanner: "assets/images/hero/hero-banner.svg",
    // Dedicated showreel master video placement (Set to Showreel #1: Ramayan Walk)
    heroShowreel: "ramayana-forest-journey"
  },
  // Formspree endpoint (optional: provide Formspree Form ID e.g. "https://formspree.io/f/YOUR_ID")
  formspreeEndpoint: "",

  // Netflix Profile Options
  profiles: [
    {
      id: "recruiter",
      name: "Recruiter",
      badge: "Hiring Talent",
      color: "#2472e9",
      avatar: "assets/images/profiles/avatar-recruiter.svg",
      welcomeMessage: "Looking to hire? Review Ishant's professional timeline, verified brand commercial edits, and academic VFX credentials."
    },
    {
      id: "client",
      name: "Client",
      badge: "Brand Commercials",
      color: "#e50914",
      avatar: "assets/images/profiles/avatar-client.svg",
      welcomeMessage: "Ready to promote your venue or brand? Explore real promotional work like the Villa Omnia FarmHouse campaign."
    },
    {
      id: "collaborator",
      name: "Collaborator",
      badge: "Creative Partner",
      color: "#2bb857",
      avatar: "assets/images/profiles/avatar-collaborator.svg",
      welcomeMessage: "Fellow editor or director? Explore timeline pacing, event highlights, and Premiere Pro / After Effects workflows."
    },
    {
      id: "guest",
      name: "Guest",
      badge: "Visitor",
      color: "#6c757d",
      avatar: "assets/images/profiles/avatar-guest.svg",
      welcomeMessage: "Welcome! Browse Ishant Singh's Netflix-style creative portfolio catalog."
    }
  ],

  // Exactly the 4 required categories
  categories: [
    "Commercials",
    "Events",
    "3D Motion Graphics",
    "Personal Projects"
  ]
};
