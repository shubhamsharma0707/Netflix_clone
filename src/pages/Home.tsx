import { useState, useEffect } from 'react';
import Banner from '../components/Banner';
import MovieRow from '../components/MovieRow';
import Footer from '../components/Footer';
import { getTrending, getPopular, getTopRated, getNowPlaying, getUpcoming } from '../api/tmdb';
import type { Movie } from '../types/movie';

interface RowData {
  title: string;
  movies: Movie[];
  isLoading: boolean;
}

export default function Home() {
  const [rows, setRows] = useState<Record<string, RowData>>({
    trending: { title: 'Trending Now', movies: [], isLoading: true },
    popular: { title: 'Popular on Netflix', movies: [], isLoading: true },
    topRated: { title: 'Top Rated', movies: [], isLoading: true },
    nowPlaying: { title: 'Now Playing', movies: [], isLoading: true },
    upcoming: { title: 'Coming Soon', movies: [], isLoading: true },
  });

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [trending, popular, topRated, nowPlaying, upcoming] = await Promise.all([
          getTrending(),
          getPopular(),
          getTopRated(),
          getNowPlaying(),
          getUpcoming(),
        ]);

        setRows({
          trending: { title: 'Trending Now', movies: trending.results, isLoading: false },
          popular: { title: 'Popular on Netflix', movies: popular.results, isLoading: false },
          topRated: { title: 'Top Rated', movies: topRated.results, isLoading: false },
          nowPlaying: { title: 'Now Playing', movies: nowPlaying.results, isLoading: false },
          upcoming: { title: 'Coming Soon', movies: upcoming.results, isLoading: false },
        });
      } catch (err) {
        console.error('Failed to fetch movies:', err);
        // Set loading to false even on error so skeleton disappears
        setRows((prev) => {
          const updated = { ...prev };
          for (const key of Object.keys(updated)) {
            updated[key] = { ...updated[key], isLoading: false };
          }
          return updated;
        });
      }
    };

    fetchAll();
  }, []);

  return (
    <div className="home">
      <Banner />
      <div className="home__rows">
        {Object.values(rows).map((row) => (
          <MovieRow
            key={row.title}
            title={row.title}
            movies={row.movies}
            isLoading={row.isLoading}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}
