import axios from 'axios';
import type { Movie, MovieDetails, TMDBResponse, Video } from '../types/movie';

// You need a TMDB API key. Get yours free at https://www.themoviedb.org/settings/api
const API_KEY = import.meta.env.VITE_TMDB_API_KEY || 'YOUR_TMDB_API_KEY_HERE';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

export const imageUrl = (path: string | null, size: 'w200' | 'w300' | 'w500' | 'original' = 'w500'): string => {
  if (!path) return '';
  return `${IMG_BASE_URL}/${size}${path}`;
};

export const backdropUrl = (path: string | null, size: 'w300' | 'w780' | 'w1280' | 'original' = 'w1280'): string => {
  if (!path) return '';
  return `${IMG_BASE_URL}/${size}${path}`;
};

// Fetch popular movies
export const getPopular = async (page = 1): Promise<TMDBResponse> => {
  const { data } = await api.get<TMDBResponse>('/movie/popular', { params: { page } });
  return data;
};

// Fetch now playing movies
export const getNowPlaying = async (page = 1): Promise<TMDBResponse> => {
  const { data } = await api.get<TMDBResponse>('/movie/now_playing', { params: { page } });
  return data;
};

// Fetch top rated movies
export const getTopRated = async (page = 1): Promise<TMDBResponse> => {
  const { data } = await api.get<TMDBResponse>('/movie/top_rated', { params: { page } });
  return data;
};

// Fetch upcoming movies
export const getUpcoming = async (page = 1): Promise<TMDBResponse> => {
  const { data } = await api.get<TMDBResponse>('/movie/upcoming', { params: { page } });
  return data;
};

// Fetch trending movies (daily)
export const getTrending = async (page = 1): Promise<TMDBResponse> => {
  const { data } = await api.get<TMDBResponse>('/trending/movie/day', { params: { page } });
  return data;
};

// Fetch movie details
export const getMovieDetails = async (movieId: number): Promise<MovieDetails> => {
  const { data } = await api.get<MovieDetails>(`/movie/${movieId}`, {
    params: {
      append_to_response: 'videos,credits,similar,recommendations',
    },
  });
  return data;
};

// Search movies
export const searchMovies = async (query: string, page = 1): Promise<TMDBResponse> => {
  const { data } = await api.get<TMDBResponse>('/search/movie', { params: { query, page } });
  return data;
};

// Fetch movie trailers
export const getMovieVideos = async (movieId: number): Promise<Video[]> => {
  const { data } = await api.get<{ results: Video[] }>(`/movie/${movieId}/videos`);
  return data.results.filter((v) => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser'));
};

// Fetch genres
export const getGenres = async () => {
  const { data } = await api.get<{ genres: { id: number; name: string }[] }>('/genre/movie/list');
  return data.genres;
};
