import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { searchMovies } from '../services/movies';
import { Movie } from '../interfaces/interfaces';

export function useMovies (search: string, sort: boolean) {
    
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<unknown>(null);
    const previousSearch = useRef(search);

    useEffect(() => {
        getMovies('Avengers');
    }, [])

    const getMovies = useCallback(async (search: string) => {
        if (search === previousSearch.current) return;

        try {
            setLoading(true);
            setError(null);
            previousSearch.current = search;
            const newMovies = await searchMovies(search);
            setMovies(newMovies);
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }, [search]);

    const sortedMovies = useMemo(() => {
        return sort
            ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
            : movies;
    }, [sort, movies]);

    return { movies: sortedMovies, loading, error, getMovies }
}