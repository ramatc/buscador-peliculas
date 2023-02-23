const API_KEY = 'b1ad67a6';

export const searchMovies = async (search: string) => {
    if(search === '') return null

    try {
        const response = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}&s=${search}`)
        const json = await response.json();

        const movies = json.Search;

        return movies?.map((movie: any) => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster,
            type: movie.Type
        }))

    } catch (error) {
        throw new Error('Error searching movies');
    }
}