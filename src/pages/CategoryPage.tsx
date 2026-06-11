import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import Footer from '../components/Footer';
import { getPopular, getTopRated, getNowPlaying, getUpcoming, getTrending } from '../api/tmdb';
import type { Movie } from '../types/movie';

const categoryInfo: Record<string, { label: string; fetcher: (page: number) => Promise<{ results: Movie[]; total_pages: number }> }> = {
  popular: { label: 'Popular Movies', fetcher: getPopular },
  trending: { label: 'Trending Now', fetcher: getTrending },
  top_rated: { label: 'Top Rated', fetcher: getTopRated },
  now_playing: { label: 'Now Playing', fetcher: getNowPlaying },
  upcoming: { label: 'Coming Soon', fetcher: getUpcoming },
};

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const info = category ? categoryInfo[category] : null;

  useEffect(() => {
    if (!info) return;
    setLoading(true);
    info
      .fetcher(page)
      .then((data) => {
        setMovies(data.results);
        setTotalPages(data.total_pages);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
    window.scrollTo(0, 0);
  }, [category, page]);

  if (!info) {
    return (
      <div className="category-page category-page--empty">
        <h2>Category not found</h2>
      </div>
    );
  }

  return (
    <div className="category-page">
      <div className="category-page__header">
        <h1>{info.label}</h1>
      </div>

      {loading ? (
        <div className="category-page__grid">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="category-page__skeleton" />
          ))}
        </div>
      ) : (
        <>
          <div className="category-page__grid">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="category-page__pagination">
              <button
                className="category-page__page-btn"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                ← Previous
              </button>
              <span className="category-page__page-info">
                Page {page} of {totalPages > 500 ? '500+' : totalPages}
              </span>
              <button
                className="category-page__page-btn"
                disabled={page >= totalPages || page >= 500}
                onClick={() => setPage((p) => p + 1)}
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}

      <Footer />
    </div>
  );
}
