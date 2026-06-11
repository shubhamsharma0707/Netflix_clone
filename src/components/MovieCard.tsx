import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { imageUrl, backdropUrl } from '../api/tmdb';
import type { Movie } from '../types/movie';

interface Props {
  movie: Movie;
}

export default function MovieCard({ movie }: Props) {
  const [imgError, setImgError] = useState(false);
  const navigate = useNavigate();

  const posterSrc = imageUrl(movie.poster_path, 'w500');
  const fallbackSrc = movie.backdrop_path ? backdropUrl(movie.backdrop_path, 'w300') : '';
  const year = movie.release_date?.split('-')[0] || '';

  return (
    <div
      className="movie-card"
      onClick={() => navigate(`/movie/${movie.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/movie/${movie.id}`)}
    >
      <div className="movie-card__poster">
        {!imgError ? (
          <img
            src={posterSrc}
            alt={movie.title}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : fallbackSrc ? (
          <img
            src={fallbackSrc}
            alt={movie.title}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="movie-card__placeholder">
            <span>{movie.title.charAt(0)}</span>
          </div>
        )}
        <div className="movie-card__overlay">
          <div className="movie-card__info">
            <h3 className="movie-card__title">{movie.title}</h3>
            <div className="movie-card__meta">
              <span className="movie-card__rating">★ {movie.vote_average.toFixed(1)}</span>
              <span className="movie-card__year">{year}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
