import { useRef } from 'react';
import { Movies } from './components/Movies';
import { useMovies } from './hooks/useMovies';

const App = () => {

    const { movies } = useMovies();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (inputRef.current !== null) {
            const value = inputRef.current.value;
            console.log(value);
        }
    }
    
    return (
        <div className='page'>
            <header>
                <h1>Buscador de películas</h1>
                <form onSubmit={handleSubmit}>
                    <input ref={inputRef} type='text' placeholder='Avengers, Star Wars, The Matrix...'/>
                    <button type='submit'>Buscar</button>
                </form>
            </header>

            <main>
                <Movies movies={movies}/>
            </main>
        </div>
    )
}

export default App;
