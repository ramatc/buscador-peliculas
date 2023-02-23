import { useState } from 'react';
import { searchMovies } from '../services/movies';
import { Movie } from '../interfaces/interfaces';

export function useMovies (search: string) {
    
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<unknown>(null)

    const getMovies = async () => {
        try {
            setLoading(true);
            setError(null);
            const newMovies = await searchMovies(search);
            setMovies(newMovies);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    return { movies, loading, error, getMovies }
}