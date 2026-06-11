# Netflix Clone

A fully responsive, Netflix-inspired web application built with modern web technologies. This project demonstrates how to build a complex UI with video streaming components, category browsing, and movie details using the TMDB (The Movie Database) API.

## 🚀 Features

- **Dynamic Content**: Fetches real-time movie and TV show data using the TMDB API.
- **Hero Banner**: Displays trending movies with title, description, and play buttons.
- **Movie Rows**: Categorized horizontal scrolling rows for different genres (Action, Comedy, Horror, Romance, Documentaries).
- **Movie Details**: Modal or page view for movie details, trailers, and overview.
- **Search Functionality**: Search modal to find specific movies or TV shows.
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices.

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **Data Fetching**: [Axios](https://axios-http.com/)
- **Styling**: Vanilla CSS with modern flexbox/grid layouts

## ⚙️ Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shubhamsharma0707/Netflix_clone.git
   cd Netflix_clone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy the `.env.example` file to `.env`
   - Get a free API key from [TMDB](https://www.themoviedb.org/settings/api)
   - Add your API key to the `.env` file:
     ```env
     VITE_TMDB_API_KEY=your_api_key_here
     ```

### Development Server

Run the local development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## 📜 Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Compiles TypeScript and builds the app for production.
- `npm run preview`: Previews the built production app locally.
- `npm run lint`: Runs ESLint to check for code quality and style issues.

## 📄 License

This project is open-source and available under the MIT License.
