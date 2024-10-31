import {useQuery} from '@tanstack/react-query';
import tmdbApi from '../api/tmdbApi';
import {Genre} from '../types/Genre';

const fetchGenres = async (): Promise<Genre[]> => {
  const response = await tmdbApi.get('/genre/movie/list');
  return response.data.genres;
};

const useGenres = () => {
  return useQuery({
    queryKey: ['genres'],
    queryFn: fetchGenres,
    staleTime: Infinity,
  });
};

export default useGenres;