import { Movies } from './components/Movies';
import { useMovies } from './hooks/useMovies';
import { useSearch } from './hooks/useSearch';

const App = () => {
    
    const { search, setSearch, error } = useSearch();
    const { movies, loading, getMovies } = useMovies(search);
    
    // FORMA DESCONTROLADA
    // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();

    //     const { query } = Object.fromEntries(
    //         new window.FormData(e.currentTarget)
    //     );

    //     console.log(query);
    // }

    //FORMA CONTROLADA 1
    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const newQuery = e.target.value;
    //     setQuery(newQuery);

    //     if(newQuery === '') {
    //         setError('No se puede buscar una película vacía');
    //         return
    //     }

    //     if(newQuery.length < 2) {
    //         setError('No se puede buscar una película con menos de 2 caracteres');
    //         return
    //     }

    //     setError(null);
    // }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        getMovies();
    }

    //FORMA CONTROLADA 2
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // const newQuery = e.target.value;
        // if(newQuery.startsWith(' ')) return;
        setSearch(e.target.value);
    }

    return (
        <div className='page'>
            <header>
                <h1>Buscador de películas</h1>
                <form onSubmit={handleSubmit}>
                    <input 
                        type='text'
                        onChange={handleChange}
                        name='query'
                        value={search} 
                        placeholder='Avengers, Star Wars, The Matrix...'
                        required
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
