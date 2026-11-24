# Ishant – Personal Creative Portfolio (Netflix & Google Themes)

A responsive, modular personal portfolio website crafted for **Ishant (Video Editor & 3D Motion Graphics Artist)**. Features a cinematic **Netflix-inspired browsing experience** and a clean **Google-inspired search engine experience**, complete with interactive profile selection, carousels, responsive project modal with video player, search filtering, and clean placeholder assets.

---

## 🚀 Quick Start

Run the site locally with either Python or Node.js:

```bash
# Option 1: Python (built-in, no install required)
python3 -m http.server 3000

# Option 2: npm / npx
npm start
```
Then open `http://localhost:3000` in your web browser.

---

## 🎨 Experiences & Features

### 1. Netflix Experience
- **Cinematic "Who's watching?" screen**: Choose between *Recruiter*, *Client*, *Collaborator*, and *Guest*.
- **Dynamic Sticky Navbar**: Darkens automatically upon scroll; displays Ishant branding, section navigation, and active profile indicator with a quick "Switch Profile" action.
- **Cinematic Hero Carousel**: Crossfades through featured showreels and projects with *Play Showreel* and *More Info* actions, pagination dots, and a "Now Featured" quick indicator.
- **Top 8 Projects This Week**: Netflix-style numbered cards (`1` to `8`) with custom Bebas Neue typography.
- **Portfolio Categories**:
  - `3D Motion Graphics`
  - `Video Editing`
  - `Commercials`
  - `Reels & Shorts`
- **Card Hover Effects**: Hover cards expand with action buttons (▶ Play, + My List, ♥ Like), match score, and duration.
- **About Ishant**: Profile photo frame, bio, roles, education, location, software tools, and creative specializations.
- **"Request a New Title" Contact Form**: Interactive inquiry form with feedback status.

### 2. Google Search Experience
- **Google Homepage**: Multi-color *Ishant* brand logo, search bar with autocomplete suggestions, *Ishant Search*, *I'm Feeling Lucky* (opens a random project modal), and quick capability chips.
- **Google Search Results**:
  - **All Tab**: Search query stats, Proof of work featured snippet carousel, organic result cards with duration tags, expandable *People also ask* accordions, and sticky desktop *Knowledge Panel* with profile photo and direct action buttons.
  - **Videos Tab**: Category filter chips (*All*, *3D Motion Graphics*, *Video Editing*, *Commercials*, *Reels & Shorts*) with responsive video card grid.
  - **About Tab**: Expanded knowledge panel and biography breakdown.
  - **Contact Tab**: Google Material-style contact form.

### 3. Video Preview Modal
- Universal modal supporting both Netflix dark mode and Google clean theme.
- Displays project title, category, match rating, 4K UHD badge, tags, and full description.
- Plays HTML5 `<video>` when mp4 files are present, or runs an interactive simulated preview with playback controls and scrub bar.
- Fully accessible with keyboard ESC and backdrop dismiss.

---

## 📁 Project Structure

```
├── index.html                           # Main entry point with semantic markup
├── package.json                         # npm start scripts
├── README.md                            # Documentation & asset specifications
├── css/
│   ├── base.css                         # Global variables, typography, theme switcher bar
│   ├── netflix.css                      # Netflix layout, hero carousel, rails, cards
│   ├── google.css                       # Google search home, results, knowledge panel, tabs
│   └── modal.css                        # Universal video player and project details modal
├── js/
│   ├── app.js                           # App orchestrator, hotkeys (Shift+T), theme state
│   ├── data/
│   │   ├── config.js                    # Author bio, tools, profiles, asset paths
│   │   └── projects.js                  # Projects catalog with titles, tags, and metadata
│   └── components/
│       ├── netflixTheme.js              # Netflix UI renderer & event handling
│       ├── googleTheme.js               # Google UI renderer, search logic, tabs
│       └── projectModal.js              # Video player and modal manager
└── assets/
    ├── images/
    │   ├── icons/
    │   │   └── favicon.svg              # Tab icon
    │   ├── profiles/
    │   │   ├── ishant-profile.svg       # Ishant main profile photo (replace here)
    │   │   ├── avatar-recruiter.svg     # Recruiter profile icon
    │   │   ├── avatar-client.svg        # Client profile icon
    │   │   ├── avatar-collaborator.svg  # Collaborator profile icon
    │   │   └── avatar-guest.svg         # Guest profile icon
    │   ├── hero/
    │   │   └── hero-banner.svg          # Hero banner backdrop
    │   └── thumbnails/                  # 12 project thumbnails (16:9 aspect ratio)
    └── videos/                          # Video files (MP4 format)
```

---

## 📋 Asset Replacement Guide

Whenever you have real assets ready, you can drop them into the exact paths below or tell me and I will update them for you:

### 1. Profile & Hero Images
| Asset Description | Expected Path | Recommended Format & Aspect Ratio |
| :--- | :--- | :--- |
| **Ishant Main Profile Photo** | `assets/images/profiles/ishant-profile.jpg` | JPG / PNG / WebP (3:4 portrait or square, min 800×1066px) |
| **Homepage Hero Showreel / Banner** | `assets/images/hero/hero-banner.jpg` | JPG / WebP (16:9 landscape, min 1920×1080px) |
| **Profile Avatars** | `assets/images/profiles/avatar-[name].svg` | SVG / PNG (Square 200×200px) |

### 2. Project Thumbnails (16:9 Landscape)
Drop files into `assets/images/thumbnails/` (or update filenames in `js/data/projects.js`):
1. `neon-city-teaser.jpg` (3D Motion Graphics)
2. `brand-launch-film.jpg` (Commercials)
3. `reel-2026.jpg` (Video Editing)
4. `product-spin-360.jpg` (3D Motion Graphics)
5. `travel-vlog-edit.jpg` (Video Editing)
6. `music-video-cut.jpg` (Video Editing)
7. `logo-reveal-pack.jpg` (3D Motion Graphics)
8. `short-form-reels.jpg` (Reels & Shorts)
9. `ad-spot-summer.jpg` (Commercials)
10. `festival-recap.jpg` (Reels & Shorts)
11. `title-sequence.jpg` (3D Motion Graphics)
12. `brand-story.jpg` (Commercials)

### 3. Video Files (MP4)
Drop MP4 videos into `assets/videos/`:
1. `showreel-2026.mp4` (Hero showreel)
2. `neon-city-teaser.mp4`
3. `brand-launch-film.mp4`
4. `reel-2026.mp4`
5. `product-spin-360.mp4`
6. `travel-vlog-edit.mp4`
7. `music-video-cut.mp4`
8. `logo-reveal-pack.mp4`
9. `short-form-reels.mp4`
10. `ad-spot-summer.mp4`
11. `festival-recap.mp4`
12. `title-sequence.mp4`
13. `brand-story.mp4`

*Note: In `js/data/projects.js`, set `hasRealVideo: true` for any project as soon as its real video file is placed in `assets/videos/`.*
