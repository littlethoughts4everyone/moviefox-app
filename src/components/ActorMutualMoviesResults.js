
function ActorMutualMoviesResults({ mutualMovies, isLoading, hasSearched }) {

    return (
        <div className="movie-list">
            {isLoading && (
                <p>Searching...</p>
            )}

            {hasSearched && mutualMovies.length === 0 ? (
                <p className="empty-message">No mutual movies found</p>
                
            ) : (
            <>
                {mutualMovies.map((movie) => {

                const posterPath = movie.poster ? `https://image.tmdb.org/t/p/original/${movie.poster}` : './black-image.jpg';

                return (
                    <div key={movie.id} className="movie-list-item">

                        {posterPath && (
                        <div className="poster-container">

                            <img
                            src={posterPath}
                            alt={`${movie.title} poster`}
                            className="movie-poster"
                            />

                            <div className="poster-overlay">
                            <p>
                                {new Date(movie.year).toLocaleDateString()}
                            </p>
                            <p>
                                {movie.title}
                            </p>
                            </div>

                        </div>
                        )}
                    </div>
                    );
                })}
            </>)}
        </div>
    );
}

export default ActorMutualMoviesResults;