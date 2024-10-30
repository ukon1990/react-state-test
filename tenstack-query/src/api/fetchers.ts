import tmdbApi from "./tmdbApi.ts";
import {Movie} from "../types/Movie.ts";
import {Genre} from "../types/Genre.ts";

export const fetchMovies = async (searchQuery: string, selectedGenre: number | null): Promise<Movie[]> => {
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

export const fetchGenres = async (): Promise<Genre[]> => {
    const response = await tmdbApi.get('/genre/movie/list');
    return response.data.genres;
};