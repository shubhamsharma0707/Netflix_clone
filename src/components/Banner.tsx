import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTrending, backdropUrl } from '../api/tmdb';
import type { Movie } from '../types/movie';

export default function Banner() {
  const [movie, setMovie] = useState<Movie | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getTrending().then((res) => {
      const movies = res.results.filter((m) => m.backdrop_path);
      if (movies.length > 0) {
        setMovie(movies[Math.floor(Math.random() * Math.min(5, movies.length))]);
      }
    });
  }, []);

  if (!movie) return <div className="banner banner--loading" />;

  const bgUrl = backdropUrl(movie.backdrop_path, 'original');
  const year = movie.release_date?.split('-')[0] || '';

  const truncate = (str: string, n: number) =>
    str.length > n ? str.slice(0, n) + '...' : str;

  return (
    <div
      className="banner"
      style={{ backgroundImage: `url(${bgUrl})` }}
    >
      <div className="banner__gradient" />
      <div className="banner__contents">
        <h1 className="banner__title">{movie.title}</h1>
        <div className="banner__meta">
          <span className="banner__rating">★ {movie.vote_average.toFixed(1)}</span>
          <span className="banner__year">{year}</span>
          <span className="banner__badge">{movie.adult ? '18+' : 'PG-13'}</span>
        </div>
        <p className="banner__description">{truncate(movie.overview, 200)}</p>
        <div className="banner__buttons">
          <button
            className="banner__btn banner__btn--play"
            onClick={() => navigate(`/movie/${movie.id}`)}
          >
            ▶ Play
          </button>
          <button
            className="banner__btn banner__btn--info"
            onClick={() => navigate(`/movie/${movie.id}`)}
          >
            ℹ More Info
          </button>
        </div>
      </div>
    </div>
  );
}
