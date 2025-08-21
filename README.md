# Open Creative Playground

A creative React playground for experimenting with interactive visuals, shaders, and audio. Built with Vite, TypeScript, and Tailwind CSS.

## Features

- Interactive 3D scenes using Three.js
- Custom GLSL shaders (see `src/shaders/`)
- Audio visualizations and now-playing integration
- Modern UI with Tailwind CSS
- Modular page structure for easy prototyping

## Getting Started

### Prerequisites

- Node.js (v16 or newer recommended)
- npm or yarn

### Installation

```bash
npm install
# or
yarn install
```

### Running the Dev Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

### Building for Production

```bash
npm run build
# or
yarn build
```

### Project Structure

```
public/           # Static assets
src/
  assets/         # Images, audio, etc.
  pages/          # Main app pages (e.g., wavy-car, got, home)
  shaders/        # GLSL shader code
  utils/          # Utility functions
  App.tsx         # Main app component
  main.tsx        # Entry point
```

## Notable Pages

- `/wavy-car` — 3D wavy car mesh with custom shader
- `/now-playing` — Animated now-playing widget with circular shimmer loading
  - To set up your own Spotify API for this page, see this helpful guide: [Getting the Currently Playing Song from Spotify](https://khalilstemmler.com/articles/tutorials/getting-the-currently-playing-song-spotify/)
- `/got` — Game of Thrones themed visuals

## Custom Shaders

GLSL shaders are in `src/shaders/`. See `wavy-car-shader.ts` for an example of a vertex and fragment shader.

## License

MIT

---
Made with ❤️ for creative coding.
