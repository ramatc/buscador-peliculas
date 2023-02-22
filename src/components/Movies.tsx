type Movie = {
    id: string;
    title: string;
    year: string;
    poster: string;
    type: string;
}

type Movies = {
    movies: Array<Movie>;
}

function ListOfMovies ({ movies }: Movies) {
  return (
    <ul>
        {
            movies.map((movie: Movie) => (
                <li key={movie.id}>
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

export function Movies ({ movies }: Movies) {
    const hasMovies = movies?.length > 0;

    return (
        hasMovies
        ? <ListOfMovies movies={movies}/>
        : <NoMovieResults/>
    )
}