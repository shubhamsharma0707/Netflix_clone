import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, imageUrl, backdropUrl } from '../api/tmdb';
import type { MovieDetails as MovieDetailsType } from '../types/movie';
import MovieRow from '../components/MovieRow';
import TrailerModal from '../components/TrailerModal';

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [trailerOpen, setTrailerOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getMovieDetails(Number(id))
      .then(setMovie)
      .catch(console.error)
      .finally(() => setLoading(false));
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="detail-loading">
        <div className="detail-loading__spinner" />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="detail-error">
        <h2>Movie not found</h2>
        <p>Could not load movie details.</p>
      </div>
    );
  }

  const bgUrl = backdropUrl(movie.backdrop_path, 'original');
  const posterUrl = imageUrl(movie.poster_path, 'w500');
  const year = movie.release_date?.split('-')[0] || '';
  const runtime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : '';
  const rating = movie.vote_average.toFixed(1);
  const cast = movie.credits?.cast?.slice(0, 10) || [];
  const hasVideo = movie.videos?.results?.some(
    (v) => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser')
  );

  return (
    <>
      <div className="detail">
        <div
          className="detail__backdrop"
          style={{ backgroundImage: `url(${bgUrl})` }}
        >
          <div className="detail__backdrop-gradient" />
        </div>

        <div className="detail__content">
          <div className="detail__poster">
            <img src={posterUrl} alt={movie.title} />
          </div>

          <div className="detail__info">
            <h1 className="detail__title">{movie.title}</h1>
            {movie.tagline && <p className="detail__tagline">{movie.tagline}</p>}

            <div className="detail__meta">
              <span className="detail__rating">★ {rating}</span>
              <span className="detail__year">{year}</span>
              {runtime && <span className="detail__runtime">{runtime}</span>}
              <span className="detail__status">{movie.status}</span>
            </div>

            <div className="detail__genres">
              {movie.genres?.map((g) => (
                <span key={g.id} className="detail__genre">
                  {g.name}
                </span>
              ))}
            </div>

            <div className="detail__actions">
              {hasVideo && (
                <button
                  className="detail__btn detail__btn--play"
                  onClick={() => setTrailerOpen(true)}
                >
                  ▶ Play Trailer
                </button>
              )}
            </div>

            <p className="detail__overview">{movie.overview}</p>

            {cast.length > 0 && (
              <div className="detail__cast">
                <h3>Cast</h3>
                <div className="detail__cast-list">
                  {cast.map((c) => (
                    <div key={c.id} className="detail__cast-item">
                      <img
                        src={imageUrl(c.profile_path, 'w200')}
                        alt={c.name}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23333" width="100" height="100"/><text fill="%23fff" font-size="40" x="50" y="55" text-anchor="middle">' + c.name.charAt(0) + '</text></svg>';
                        }}
                      />
                      <p className="detail__cast-name">{c.name}</p>
                      <p className="detail__cast-role">{c.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {movie.similar?.results?.length > 0 && (
              <div className="detail__similar">
                <MovieRow
                  title="Similar Movies"
                  movies={movie.similar.results.slice(0, 12)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {trailerOpen && (
        <TrailerModal
          movieId={movie.id}
          onClose={() => setTrailerOpen(false)}
        />
      )}
    </>
  );
}
