/**
 * Centralized Configuration & Profile Data for Ishant's Portfolio
 * Edit this file to update profile metadata, tools, and asset paths.
 */

export const SITE_CONFIG = {
  author: {
    name: "Ishant",
    shortName: "Ishant",
    role: "Video Editor & 3D Motion Graphics Artist",
    subRole: "Cinematic Editing · 3D Motion · Commercials · High-Retention Reels",
    bio: "Cinematic cuts, rhythmic timing, silky transitions, and 3D motion design that elevate brands and captivate audiences. Focused on high-impact visual storytelling across commercials, motion identity, and digital-first content.",
    education: "Design & Media Arts / Institute Details Here",
    location: "India / Available Worldwide",
    emailPlaceholder: "ishant.studio.work@gmail.com",
    software: [
      "Adobe After Effects",
      "Adobe Premiere Pro",
      "Blender 3D",
      "Cinema 4D",
      "DaVinci Resolve",
      "Photoshop & Illustrator"
    ],
    skills: [
      "3D Modeling & Animation",
      "Rhythmic Video Editing",
      "Commercial & Brand Films",
      "Vertical High-Retention Reels",
      "Motion Typography & Stings",
      "Sound Design & Audio Mixing",
      "Color Grading & Post-Production"
    ]
  },

  // Centralized asset paths for easy replacement
  assets: {
    profilePhoto: "assets/images/profiles/ishant-profile.jpg",
    heroBanner: "assets/images/hero/hero-banner.svg",
    heroShowreel: "assets/videos/showreel-2026.mp4"
  },

  // Netflix Profile Options
  profiles: [
    {
      id: "recruiter",
      name: "Recruiter",
      badge: "Looking for Talent",
      color: "#4a90e2",
      avatar: "assets/images/profiles/ishant-profile.jpg",
      welcomeMessage: "Looking to hire? Explore full showreels, client commercial edits, and production workflows."
    },
    {
      id: "client",
      name: "Client",
      badge: "Commissioning Work",
      color: "#e50914",
      avatar: "assets/images/profiles/ishant-profile.jpg",
      welcomeMessage: "Ready to elevate your brand? Discover high-converting commercials, product stings, and social campaigns."
    },
    {
      id: "collaborator",
      name: "Collaborator",
      badge: "Creative Partner",
      color: "#46d369",
      avatar: "assets/images/profiles/ishant-profile.jpg",
      welcomeMessage: "Fellow creator or director? Check out the breakdown of 3D pipelines, VFX passes, and timeline pacing."
    },
    {
      id: "guest",
      name: "Guest",
      badge: "Casual Visitor",
      color: "#808080",
      avatar: "assets/images/profiles/ishant-profile.jpg",
      welcomeMessage: "Welcome! Browse through the Netflix-style catalog of Ishant's creative projects."
    }
  ],

  // Portfolio Categories
  categories: [
    "3D Motion Graphics",
    "Video Editing",
    "Commercials",
    "Reels & Shorts"
  ],

  // Background Gradients used for cards and hero backdrops
  gradients: [
    ["#2b1b5e", "#e0679a"],
    ["#f7971e", "#3a1c71"],
    ["#0f4c5c", "#5fc9b8"],
    ["#3a1c71", "#d76d77"],
    ["#134e5e", "#a8c86a"],
    ["#1b1b24", "#e8a06b"],
    ["#1d2b64", "#f0b8d0"],
    ["#4b134f", "#e0604b"],
    ["#232526", "#414345"],
    ["#182848", "#4b6cb7"],
    ["#1d2671", "#c33764"],
    ["#2b5876", "#4e4376"]
  ]
};
