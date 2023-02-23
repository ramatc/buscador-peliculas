import { useState, useCallback } from 'react';
import debounce from 'just-debounce-it';
import { Movies } from './components/Movies';
import { useMovies } from './hooks/useMovies';
import { useSearch } from './hooks/useSearch';

const App = () => {
    const [sort, setSort] = useState<boolean>(false);
    const { search, setSearch, error } = useSearch();
    const { movies, loading, getMovies } = useMovies(search, sort);

    const debouncedGetMovies = useCallback(
        debounce((search: string) => {
            getMovies(search);
        }, 350)
    , []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        getMovies(search);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearch = e.target.value;
        setSearch(newSearch);
        setSort(false);

        debouncedGetMovies(newSearch);
    }

    return (
        <div className='page'>
            <header>
                <h1>Buscador de películas:</h1>
                <form onSubmit={handleSubmit}>
                    <input 
                        type='text'
                        onChange={handleChange}
                        name='query'
                        value={search} 
                        placeholder='Avengers, Star Wars, The Matrix...'
                        required
                    />
                    <input
                        type='checkbox'
                        onChange={() => setSort(!sort)}
                        checked={sort}
                        disabled={movies === null || movies === undefined}
                    />
                    <button type='submit'>Buscar</button>
                </form>
                {error && <p className='error'>{error}</p>}
            </header>

            <main>
                {
                    loading ? <p>Cargando...</p> : <Movies movies={movies}/>
                }
            </main>
        </div>
    )
}

export default App;