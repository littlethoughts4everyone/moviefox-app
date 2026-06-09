
function PeopleTriviaMovieList({ movieList }) {
  return (
    <div className="movie-list">
      {movieList.map(movie => {
        const posterPath = movie.poster_path
          ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
          : null;

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
                    {new Date(movie.release_date).toLocaleDateString()}
                  </p>
                  <p>
                    {movie.tagline}
                  </p>
                </div>

              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default PeopleTriviaMovieList;

// <h4>{movie.title}</h4>
// <p>{movie.release_date?.slice(0, 4) ?? "—"}</p>