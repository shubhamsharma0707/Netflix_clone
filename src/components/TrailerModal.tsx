import { useEffect, useState } from 'react';
import { getMovieVideos } from '../api/tmdb';

interface Props {
  movieId: number;
  onClose: () => void;
}

export default function TrailerModal({ movieId, onClose }: Props) {
  const [videoKey, setVideoKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getMovieVideos(movieId).then((videos) => {
      if (videos.length > 0) {
        const trailer = videos.find((v) => v.type === 'Trailer' && v.official);
        setVideoKey(trailer?.key || videos[0].key);
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [movieId]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="trailer-modal" onClick={onClose}>
      <div className="trailer-modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="trailer-modal__close" onClick={onClose}>
          ✕
        </button>
        {loading ? (
          <div className="trailer-modal__loading">
            <div className="search-modal__spinner" />
          </div>
        ) : videoKey ? (
          <iframe
            className="trailer-modal__iframe"
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0`}
            title="Movie Trailer"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        ) : (
          <div className="trailer-modal__fallback">
            <p>No trailer available</p>
            <button className="trailer-modal__btn" onClick={onClose}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
