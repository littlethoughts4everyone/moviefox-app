
function PeopleTriviaMovieList({ movieList }) {
  return (
    <div className="movie-list">
      {movieList.map(movie => {
        const posterPath = movie.poster_path
          ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
          : null;

        return (
          <div key={movie.id} className="movie-list-item">
            <h4>{movie.title}</h4>

            {posterPath && (
              <img
                className="movie-list-poster"
                src={posterPath}
                alt={`${movie.title} poster`}
              />
            )}

            <p>{movie.release_date?.slice(0, 4) ?? "—"}</p>
          </div>
        );
      })}
    </div>
  );
}

export default PeopleTriviaMovieList;