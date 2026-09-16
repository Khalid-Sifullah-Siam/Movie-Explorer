# 🎬 MovieExplorer

A fully responsive movie/TV show explorer application built with React, Tailwind CSS, and the TVMaze API.

## Features

- **Home Page** — Cinematic hero banner with CTA, navbar, and footer
- **Movie Listing Page** — Browse all shows or search by title with live search
- **Movie Cards** — Responsive grid with poster, rating, year, and details button
- **Movie Details Modal** — Full show info with backdrop image, genres, summary, and metadata
- **Responsive Design** — Mobile-first layout from 1 to 4 columns

## Tech Stack

- **React** (Vite)
- **Tailwind CSS v4**
- **React Router DOM**
- **TVMaze API**

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd movie-explorer

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

## API

This project uses the [TVMaze API](https://www.tvmaze.com/api):

| Endpoint | Description |
|---|---|
| `GET /shows` | Fetch all shows |
| `GET /search/shows?q=:query` | Search shows by title |
| `GET /shows/:id` | Get show details |

## Project Structure

```
src/
├── api/
│   └── tvmaze.js           # API helper functions
├── components/
│   ├── Navbar.jsx           # Navigation bar
│   ├── Footer.jsx           # Footer
│   ├── HeroBanner.jsx       # Home hero section
│   ├── SearchBar.jsx        # Search input
│   ├── MovieCard.jsx        # Show card
│   ├── MovieGrid.jsx        # Responsive grid
│   └── MovieModal.jsx       # Details modal
├── pages/
│   ├── HomePage.jsx         # Landing page
│   └── MovieListingPage.jsx # Browse & search page
├── App.jsx                  # Router setup
├── main.jsx                 # Entry point
└── index.css                # Tailwind + global styles
```

## License

© 2026 MovieExplorer. All rights reserved.
