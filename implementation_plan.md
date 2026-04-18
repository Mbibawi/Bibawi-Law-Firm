# Implementation Plan: Law Firm Portal Transformation (Consolidated)

This document consolidates all instructions and technical decisions made during the transformation of Maître Mina Bibawi's Blogger archive into a premium, professional law firm portal.

## 1. Data Pipeline & Hierarchy

### Nested Content Splitting
- **Objective**: Transform consolidated Blogger entries into a hierarchical structure.
- **Logic**: The parser (`scripts/parse-blog.js`) detects `<article>` tags within a post's content.
- **Root Pages**: The main Blogger page becomes a "Root" container (Intro text + Children list).
- **Sub-Posts**: Each `<article>` becomes a standalone post linked via `parentId`.

### ID Normalization
- **Prefix Removal**: Strip `tag:blogger.com,1999:blog-` from all Blogger IDs.
- **URL-Safe Hierarchy**: Use `__` as a separator for sub-articles (e.g., `[ParentID]__SubjectID`).
    - > [!IMPORTANT]
    - > We transitioned from `#` to `__` to prevent browser routing issues where fragments were being ignored.

## 2. Professional Branding & UI

### Visual Identity
- **Logo**: Luxury minimalist design for "Mina Bibawi - Avocat à la Cour" (Navy/Gold).
- **Hero Image**: High-end corporate/legal office scene with a Parisian aesthetic.
- **Color Palette**: 
  - Primary: Midnight Navy (`#0a192f`)
  - Accent: Gold (`#c5a059`)
  - background: Pearl White/Soft Gray.
- **Typography**: `Playfair Display` (Serif) for headings; `Montserrat` (Sans) for body.

### UX Architecture
- **Persistent Navigation**: Bilingual menu (French-English) except for "باللغة العربية".
- **Landing Page**: Section-based layout. Each section is a "Practice Area" showcasing a Root Page's content.
- **Explorer View**: Root pages display their introduction followed by a chronological list of sub-articles.

## 3. High-End Technical Features

### Custom Audio Streaming
- **Source**: Google Drive hosted audio.
- **Player**: Custom CSS-based player integrated into `PostDetail`.
- **Streaming Fix**: Use `https://docs.google.com/uc?export=open&id=[ID]` to ensure browser streaming instead of forcing a download.
    - > [!WARNING]
    - > Audio files must be shared in Google Drive as **"Anyone with the link can view"**.

### Bilingual Support
- Directional support (`rtl` vs `ltr`) dynamically assigned based on content language detection.
- Unified interface that respects both scripts seamlessly.

## 4. Implementation Status

### Completed
- [x] Hierarchical Parser (`scripts/parse-blog.js`)
- [x] Premium Design System (`index.css`)
- [x] Generated & Integrated Assets (Logo/Hero)
- [x] Redesigned Components (Header, Hero, PostList, PostDetail, AudioPlayer)
- [x] Routing & Audio ID Fixes

### Verification Plan
- **Data Integrity**: Verify `posts.ts` contains 9 structured entries.
- **Navigation**: Verify clicking practice areas on Home leads to the Section Explorer.
- **Audio**: Verify that clicking "Play" on a public file initiates a stream.
