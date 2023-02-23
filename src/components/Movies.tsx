import { Movie } from '../interfaces/interfaces';

interface props {
    movies: Array<Movie>;
}

function ListOfMovies ({ movies }: props) {
  return (
    <ul className='movies'>
        {
            movies.map((movie: Movie) => (
                <li className='movie' key={movie.id}>
                    <h3>{movie.title}</h3>
                    <p>{movie.year}</p>
                    <img src={movie.poster} alt={movie.title}/>
                </li>
            ))
        }
    </ul>
    )
}

function NoMovieResults () {
    return (
        <p>No se encontraron películas para esta búsqueda</p>
    )
}

export function Movies ({ movies }: props) {
    const hasMovies = movies?.length > 0;

    return (
        hasMovies
        ? <ListOfMovies movies={movies}/>
        : <NoMovieResults/>
    )
}