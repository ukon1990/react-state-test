import { useQuery } from '@tanstack/react-query';
import tmdbApi from '../api/tmdbApi';
import useUIStore from '../store/useUIStore';
import { Movie } from '../types/Movie';

const fetchMovies = async (searchQuery: string, selectedGenre: number | null): Promise<Movie[]> => {
  let endpoint = '/movie/popular';
  const params: any = {};

  if (searchQuery) {
    endpoint = '/search/movie';
    params.query = searchQuery;
  } else if (selectedGenre) {
    endpoint = '/discover/movie';
    params.with_genres = selectedGenre;
  }

  const response = await tmdbApi.get(endpoint, { params });
  return response.data.results;
};

const useMovies = () => {
  const searchQuery = useUIStore((state) => state.searchQuery);
  const selectedGenre = useUIStore((state) => state.selectedGenre);

  return useQuery({
    queryKey: ['movies', searchQuery, selectedGenre],
    queryFn: () => fetchMovies(searchQuery, selectedGenre),
    staleTime: Infinity,
  });
};

export default useMovies;