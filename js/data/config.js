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
    bio: "Video Editor and Motion Graphics Artist with approximately 2 years of professional video editing experience, including over 1 year of freelance work. Experienced in creating engaging video content, developing trend-aware social media edits, and supporting brand and event-based projects through creative visual content. Currently pursuing a B.Sc. in 3D Animation and VFX at AAFT University of Media and Arts.",
    education: "B.Sc. in 3D Animation and VFX (2023 – 2027), AAFT University of Media and Arts, Raipur",
    higherSecondary: "Higher Secondary Education (2022 – 2023), Chhattisgarh Board of Secondary Education (CGBSE)",
    location: "Raipur, Chhattisgarh",
    phone: "+91 7828638613",
    email: "ishant6398@gmail.com",
    languages: ["English", "Hindi"],
    experience: [
      {
        role: "Freelance Video Editor & Motion Graphics Artist",
        period: "2025 – 2026",
        highlights: [
          "Produced and edited video content for diverse creative, event, and social media requirements.",
          "Applied current social media trends and audience-focused editing approaches to maximize viewer engagement.",
          "Developed creative editing concepts with dedicated attention to pacing, visual presentation, and platform-appropriate delivery.",
          "Adapted editing style and visual treatments across multiple projects."
        ]
      },
      {
        role: "Video Editor & Social Media Handler",
        company: "Elvn8 (Clothing Brand Project)",
        period: "Nov 2025 – May 2026",
        highlights: [
          "Primary video editor and social media handler for the emerging clothing brand Elvn8.",
          "Developed creative video concepts and social media content to strengthen online brand presence.",
          "Implemented ongoing social media trends to build viewer retention and attract target audiences.",
          "Contributed directly to brand social growth through trend-led visual content."
        ]
      }
    ],
    selectedProjects: [
      "Promotional Reel – FarmHouse | Villa Omnia",
      "Rajyostav Mela, Raipur — Video content covering the event and its visual highlights"
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
    heroShowreel: "assets/videos/farm-reel.mp4"
  },

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
