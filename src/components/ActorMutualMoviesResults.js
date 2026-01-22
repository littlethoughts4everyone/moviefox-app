
function ActorMutualMoviesResults({ mutualMovies, isLoading, hasSearched }) {

    return (
        <div className="results-container">
            {isLoading && (
                <p>Searching...</p>
            )}

            {hasSearched && mutualMovies.length === 0 ? (
                <p className="empty-message">No mutual movies found</p>
                
            ) : (
            <>
                {mutualMovies.map((movie) => {

                    const posterPath = `https://image.tmdb.org/t/p/original/${movie.poster}`;

                    return (
                        <div key={movie.id} className="movie-container">
                            <h3>{movie.title}</h3>
                            <img src={posterPath} alt={`${movie.title} poster`}/>
                            <p>{movie.year.slice(0, 4)}</p>
                        </div>
                    )
                })}
            </>)}
        </div>
    );
}

export default ActorMutualMoviesResults;