/**
 * Projects Data Source
 * Sourced directly from Ishant Singh's extracted Google Drive portfolio.
 * Categorized into: Commercials, Events, 3D Motion Graphics, Personal Projects.
 */

export const PROJECTS = [
  // ==========================================
  // 1. Commercials
  // ==========================================
  {
    id: "villa-omnia-resort",
    title: "Promotional Reel – Villa Omnia",
    category: "Commercials",
    role: "Lead Video Editor & Colorist",
    software: ["Adobe Premiere Pro", "After Effects", "DaVinci Resolve"],
    duration: "1:18",
    year: "2026",
    match: "99% Match",
    tags: ["Commercial", "Promotional Reel", "FarmHouse", "Villa Omnia", "Brand Video"],
    description: "Official promotional reel for luxury farmhouse staycation Villa Omnia, featuring architectural walk-throughs, pool highlights, and motion title overlays.",
    fullDescription: "Produced for digital marketing and client conversion. Highlights architectural luxury, private outdoor spaces, and resort amenities with dynamic pacing and custom typography.",
    thumbnail: "assets/images/thumbnails/farm-reel.jpg",
    videoUrl: "assets/videos/farm-reel.mp4",
    hasRealVideo: true,
    isHeroFeatured: true,
    isVertical: true
  },
  {
    id: "luxe-hair-studio",
    title: "Luxe Hair Studio Commercial",
    category: "Commercials",
    role: "Commercial Video Editor & Sound Designer",
    software: ["Adobe Premiere Pro", "After Effects"],
    duration: "0:30",
    year: "2026",
    match: "98% Match",
    tags: ["Commercial", "Beauty & Salon", "Color Grading", "Music Sync", "Social Ad"],
    description: "Promotional beauty salon commercial highlighting precision hair styling, color transformation reveals, and synchronized beat cuts.",
    fullDescription: "High-retention commercial edit showcasing hair styling transformations, studio ring lighting, and crisp color science tailored for brand social promotion.",
    thumbnail: "assets/images/thumbnails/hairstylist-reel.jpg",
    videoUrl: "assets/videos/hairstylist-reel.mp4",
    hasRealVideo: true,
    isHeroFeatured: true,
    isVertical: true
  },

  // ==========================================
  // 2. Events
  // ==========================================
  {
    id: "college-event",
    title: "Campus Summit Keynote Event",
    category: "Events",
    role: "Event Video Editor & Audio Mixer",
    software: ["Adobe Premiere Pro", "Adobe Audition"],
    duration: "0:36",
    year: "2026",
    match: "97% Match",
    tags: ["Event Coverage", "Auditorium", "Speaker Highlights", "Campus", "Audio Sync"],
    description: "Auditorium seminar recap featuring speaker presentation coverage, stage spotlights, and audience interaction cutaways.",
    fullDescription: "Comprehensive academic event coverage featuring lapel audio synchronization, stage lighting dynamics, and responsive audience cutaways.",
    thumbnail: "assets/images/thumbnails/college-event.jpg",
    videoUrl: "assets/videos/college-event.mp4",
    hasRealVideo: true,
    isHeroFeatured: true,
    isVertical: true
  },
  {
    id: "sacred-bonds-wedding",
    title: "Wedding Ceremony Highlights",
    category: "Events",
    role: "Wedding Film Editor & Colorist",
    software: ["Adobe Premiere Pro", "DaVinci Resolve"],
    duration: "0:49",
    year: "2026",
    match: "99% Match",
    tags: ["Wedding Event", "Rituals", "Emotional Edit", "Filmic Color", "Ceremony"],
    description: "Cinematic traditional wedding ceremony edit capturing sacred rituals, family emotions, and warm filmic tones.",
    fullDescription: "Story-focused wedding event film capturing traditional rituals, bride and groom expressions, and family blessings with tender pacing and warm grading.",
    thumbnail: "assets/images/thumbnails/wedding-may.jpg",
    videoUrl: "assets/videos/wedding-may.mp4",
    hasRealVideo: true,
    isHeroFeatured: true,
    isVertical: true
  },
  {
    id: "golden-hour-reception",
    title: "Wedding Reception Highlights",
    category: "Events",
    role: "Event Editor & Motion Designer",
    software: ["Adobe Premiere Pro", "After Effects"],
    duration: "0:33",
    year: "2026",
    match: "96% Match",
    tags: ["Reception Event", "Evening Pyro", "Stage Entry", "Couple Highlights"],
    description: "Evening wedding reception recap with glamorous entry pyro effects, couple portraits, and speed-ramped transitions.",
    fullDescription: "High-energy reception event montage showcasing glamorous stage entry, celebration lighting, and couple highlights.",
    thumbnail: "assets/images/thumbnails/wedding-aug.jpg",
    videoUrl: "assets/videos/wedding-aug.mp4",
    hasRealVideo: true,
    isHeroFeatured: false,
    isVertical: true
  },
  {
    id: "sangeet-night-dance",
    title: "Sangeet Celebration Dance",
    category: "Events",
    role: "Video Editor & Rhythm Cutter",
    software: ["Adobe Premiere Pro"],
    duration: "0:35",
    year: "2026",
    match: "96% Match",
    tags: ["Sangeet Event", "Stage Choreography", "Music & Dance", "Festive"],
    description: "Vibrant wedding sangeet performance edit synchronized to stage beats, festive lighting, and energetic group choreography.",
    fullDescription: "Dynamic wedding sangeet performance recap featuring synchronized cuts to dance rhythms, stage lighting flair, and audience applause.",
    thumbnail: "assets/images/thumbnails/sangeet.jpg",
    videoUrl: "assets/videos/sangeet.mp4",
    hasRealVideo: true,
    isHeroFeatured: false,
    isVertical: true
  },
  {
    id: "divine-echoes-bhajan",
    title: "Cultural Bhajan Mahotsav",
    category: "Events",
    role: "Cultural Event Editor & Colorist",
    software: ["Adobe Premiere Pro", "DaVinci Resolve"],
    duration: "0:44",
    year: "2026",
    match: "98% Match",
    tags: ["Cultural Event", "Petal Procession", "Devotional Gathering", "Crowd Energy"],
    description: "High-energy devotional cultural gathering featuring flower petal processions, crowd atmosphere, and traditional music.",
    fullDescription: "Cultural and devotional festival edit capturing thousands of flower petals cascading over attendees, vibrant traditional chanting, and authentic crowd atmosphere.",
    thumbnail: "assets/images/thumbnails/bhajan-reel.jpg",
    videoUrl: "assets/videos/bhajan-reel.mp4",
    hasRealVideo: true,
    isHeroFeatured: false,
    isVertical: true
  },
  {
    id: "spiritual-glow-khatu-shyam",
    title: "Temple Festival Celebration",
    category: "Events",
    role: "Event Video Editor",
    software: ["Adobe Premiere Pro"],
    duration: "0:30",
    year: "2026",
    match: "97% Match",
    tags: ["Festival Event", "Temple Darshan", "Atmospheric Lights", "Devotion"],
    description: "Spiritual temple festival recap highlighting deity darshan, decorative lighting, and rhythmic devotional transitions.",
    fullDescription: "A rhythmic devotional event cut spotlighting sacred temple celebrations, illuminated flags, floral decorations, and sea of devotees.",
    thumbnail: "assets/images/thumbnails/khatu-shyam.jpg",
    videoUrl: "assets/videos/khatu-shyam.mp4",
    hasRealVideo: true,
    isHeroFeatured: false,
    isVertical: true
  },

  // ==========================================
  // 3. Personal Projects
  // ==========================================
  {
    id: "mountain-escape",
    title: "Mountain Escape Travel Reel",
    category: "Personal Projects",
    role: "Director & Creative Editor",
    software: ["Adobe Premiere Pro", "DaVinci Resolve"],
    duration: "0:27",
    year: "2026",
    match: "99% Match",
    tags: ["Travel Diary", "Nature & Mountains", "Cinematic Portrait", "Whip Pans"],
    description: "Scenic travel video journal shot in lush mountain valleys and canyons, featuring smooth whip pans and nature portraiture.",
    fullDescription: "Personal creative travel diary capturing deep canyon vistas, winding mountain roads, and genuine moments with natural outdoor color grading and atmospheric sound design.",
    thumbnail: "assets/images/thumbnails/couples-reel.jpg",
    videoUrl: "assets/videos/couples-reel.mp4",
    hasRealVideo: true,
    isHeroFeatured: false,
    isVertical: true
  },
  {
    id: "friends-nights-lifestyle",
    title: "Friends & Nights Lifestyle Edit",
    category: "Personal Projects",
    role: "Video Editor & Visual Effects",
    software: ["Adobe Premiere Pro", "After Effects"],
    duration: "1:08",
    year: "2026",
    match: "95% Match",
    tags: ["Lifestyle Cut", "Social Gathering", "Flash FX", "Music Sync"],
    description: "Creative youth lifestyle edit featuring nightclub lights, creative flash photography transitions, and rhythmic music synchronization.",
    fullDescription: "High-voltage lifestyle creative cut packed with nightclub strobe effects, laughter, group moments, and synchronized beat-drops.",
    thumbnail: "assets/images/thumbnails/group-reel.jpg",
    videoUrl: "assets/videos/group-reel.mp4",
    hasRealVideo: true,
    isHeroFeatured: false,
    isVertical: true
  },

  // ==========================================
  // 4. Featured Long-Format Continue Watching
  // ==========================================
  {
    id: "khatu-shyam-full-highlight",
    title: "Khatu Shyam Bhajan Mahotsav – Full Event Highlight",
    category: "Continue Watching",
    role: "Lead Event Film Editor & Sound Designer",
    software: ["Adobe Premiere Pro", "DaVinci Resolve", "After Effects"],
    formatLabel: "FEATURED LONG-FORMAT FILM",
    duration: "06:30",
    rawDurationSeconds: 390,
    year: "2026",
    match: "99% Match",
    tags: ["Long-Format", "Event Film", "Khatu Shyam", "Devotional Kirtan", "Full Highlight", "Multi-Cam Edit"],
    description: "Extended 6:30 long-format cinematic film capturing the sacred floral shringar, devotional bhajan performances, crowd energy, and spiritual atmosphere of the Khatu Shyam Mahotsav.",
    fullDescription: "Master cinematic cut crafted for long-format storytelling. Features multi-sequence pacing, live audio mastering, devotional bhajan sync, slow-motion floral offerings, and seamless scene transitions capturing the full evening celebration.",
    thumbnail: "assets/images/thumbnails/continue-watching-highlight.jpg",
    videoUrl: "assets/videos/highlight-final-optimized.mp4",
    hasRealVideo: true,
    isVertical: false
  }
];

export const CONTINUE_WATCHING_PROJECT = PROJECTS.find(p => p.id === "khatu-shyam-full-highlight");
