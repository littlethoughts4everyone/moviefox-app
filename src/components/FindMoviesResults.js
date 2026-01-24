
function FindMoviesResults({ results, isLoading, hasSearched, handleAddToMovieList }) {

    return (
        <div className="results-container">
            {isLoading && (
                <p>Searching...</p>
            )}

            {hasSearched && results.length === 0 ? (
                <p className="empty-message">No movies found</p>
                
            ) : (
            <>
                {results.map((movie) => {

                    const posterPath = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;

                    return (
                        <div key={movie.id} className="movie-result-container">
                            <h4>{movie.title}</h4>
                            <img className="movie-list-poster" src={posterPath} alt={`${movie.title} poster`}/>
                            <p>{movie.release_date.slice(0, 4)}</p>
                            <p>{`Budget: ${movie.budget.toLocaleString()} $`}</p>
                            <p>{`Revenue: ${movie.revenue.toLocaleString()} $`}</p>
                            <p>{`Runtime: ${movie.runtime} min`}</p>
                            <p>{`Rating: ${movie.vote_average.toFixed(1)}`}</p>
                            <button 
                            onClick={() => handleAddToMovieList(movie)}
                            className="add-movie-button"
                            aria-label="add to movie list" >
                                Add to Movie List
                            </button>
                        </div>
                    )
                })}
            </>)}
        </div>
    );
}

export default FindMoviesResults;