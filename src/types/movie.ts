export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  popularity: number;
  original_language: string;
  adult: boolean;
  video: boolean;
}

export interface MovieDetails extends Movie {
  genres: { id: number; name: string }[];
  runtime: number | null;
  tagline: string | null;
  budget: number;
  revenue: number;
  status: string;
  homepage: string | null;
  production_companies: {
    id: number;
    name: string;
    logo_path: string | null;
  }[];
  videos: {
    results: Video[];
  };
  credits: {
    cast: CastMember[];
    crew: CrewMember[];
  };
  similar: {
    results: Movie[];
  };
  recommendations: {
    results: Movie[];
  };
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

export type MovieCategory = 'popular' | 'now_playing' | 'top_rated' | 'upcoming' | 'trending';
