import { useState, useRef } from 'react';
import MovieCard from './MovieCard';
import type { Movie } from '../types/movie';

interface Props {
  title: string;
  movies: Movie[];
  isLoading?: boolean;
}

export default function MovieRow({ title, movies, isLoading }: Props) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const scroll = (dir: 'left' | 'right') => {
    if (!rowRef.current) return;
    const amount = rowRef.current.clientWidth * 0.8;
    rowRef.current.scrollBy({
      left: dir === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  const onScroll = () => {
    if (!rowRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
    setShowLeft(scrollLeft > 10);
    setShowRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  if (isLoading) {
    return (
      <div className="movie-row">
        <h2 className="movie-row__title">{title}</h2>
        <div className="movie-row__loader">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="movie-row__skeleton" />
          ))}
        </div>
      </div>
    );
  }

  if (movies.length === 0) return null;

  return (
    <div className="movie-row">
      <h2 className="movie-row__title">{title}</h2>
      <div className="movie-row__container">
        {showLeft && (
          <button
            className="movie-row__arrow movie-row__arrow--left"
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            ‹
          </button>
        )}
        <div
          className="movie-row__items"
          ref={rowRef}
          onScroll={onScroll}
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        {showRight && movies.length > 5 && (
          <button
            className="movie-row__arrow movie-row__arrow--right"
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            ›
          </button>
        )}
      </div>
    </div>
  );
}
