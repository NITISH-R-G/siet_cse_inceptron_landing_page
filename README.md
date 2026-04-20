# SIET Inceptron — Cinematic Scroll Landing Page

A premium, high-performance landing page built with Next.js 14, featuring a "buttery smooth" scroll-driven cinematic animation.

**[🌐 View Live Demo](https://nitish-r-g.github.io/siet_cse_inceptron_landing_page/)**

![CSE Inceptron Hero](public/scroll-video.mp4) <!-- Replace with a GIF or Image if available -->

## 🚀 The "Buttery Smooth" Approach

Traditional scroll-driven video animations often feel "choppy" because browsers have to decode video frames on-the-fly as you scroll. This project uses a **Hybrid Video-to-Bitmap Pipeline** to achieve industry-leading performance:

1.  **Stage 1: Buffering** — Loads a single, optimized MP4 video file.
2.  **Stage 2: Pre-Decoding** — Seeks through the video and extracts every frame into GPU-optimized `ImageBitmap` objects.
3.  **Stage 3: Instant Scrubbing** — Once cached, the scroll animation uses these pre-decoded bitmaps, resulting in **zero decode latency**.
4.  **Premium Easing** — Uses Linear Interpolation (LERP) to create a smooth, momentum-based feel.

## ✨ Features

- **Cinematic Zoom-In**: A stunning cosmic zoom-in animation tied directly to the user's scroll position.
- **Transparent Navigation**: A minimalist "Home/Dashboard" navbar that floats seamlessly over the content.
- **Retina Ready**: Canvas rendering scales automatically based on `devicePixelRatio` for pixel-perfect quality.
- **Responsive Design**: Fully optimized for both desktop and mobile scroll interactions.
- **Cindie Mono Typography**: Sleek, modern font integration for a premium aesthetic.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation**: HTML5 Canvas API + Pre-decoded `ImageBitmap`
- **Language**: TypeScript

## 📦 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm / yarn / pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/NITISH-R-G/siet_cse_inceptron_landing_page.git
   cd siet_cse_inceptron_landing_page
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the animation.

## ⚙️ Configuration

You can tune the animation feel in `components/ScrollAnimation.tsx`:

- `LERP_FACTOR`: Controls how "floaty" the scroll feels (default: `0.1`).
- `SCROLL_PX_PER_SECOND`: Controls the scroll duration/speed.
- `TARGET_FPS`: Controls the smoothness of the extracted frame sequence.

## 📜 License

Private project for SIET Inceptron. All rights reserved.
