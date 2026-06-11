import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchMovies, imageUrl } from '../api/tmdb';
import type { Movie } from '../types/movie';

interface Props {
  onClose: () => void;
}

export default function SearchModal({ onClose }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const doSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const data = await searchMovies(q);
      setResults(data.results.slice(0, 12));
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => doSearch(query), 300);
    return () => clearTimeout(timer);
  }, [query, doSearch]);

  const selectMovie = (id: number) => {
    onClose();
    navigate(`/movie/${id}`);
  };

  return (
    <div className="search-modal" onClick={onClose}>
      <div className="search-modal__content" onClick={(e) => e.stopPropagation()}>
        <div className="search-modal__input-wrapper">
          <svg className="search-modal__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            className="search-modal__input"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="search-modal__close" onClick={onClose}>
            ✕
          </button>
        </div>

        {loading && (
          <div className="search-modal__loading">
            <div className="search-modal__spinner" />
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="search-modal__results">
            {results.map((movie) => (
              <div
                key={movie.id}
                className="search-modal__result"
                onClick={() => selectMovie(movie.id)}
              >
                <img
                  src={imageUrl(movie.poster_path, 'w200')}
                  alt={movie.title}
                  className="search-modal__result-img"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <div className="search-modal__result-info">
                  <h4>{movie.title}</h4>
                  <p>{movie.release_date?.split('-')[0]} · ★ {movie.vote_average.toFixed(1)}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && query && results.length === 0 && (
          <div className="search-modal__empty">
            No movies found for "{query}"
          </div>
        )}

        {!query && (
          <div className="search-modal__hint">
            Start typing to search movies...
          </div>
        )}
      </div>
    </div>
  );
}
