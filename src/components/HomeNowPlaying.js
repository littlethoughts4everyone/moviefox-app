import { useState } from "react";

function HomeNowPlaying({ nowPlaying, isLoading }) {
    const [startIndex, setStartIndex] = useState(0);

    const moviesPerView = 5;

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!nowPlaying || nowPlaying.length === 0) {
        return <p>No movies found</p>;
    }

    const maxIndex = Math.max(0, nowPlaying.length - moviesPerView);

    const next = () => {
        setStartIndex(prev =>
            Math.min(prev + 1, maxIndex)
        );
    };

    const prev = () => {
        setStartIndex(prev =>
            Math.max(prev - 1, 0)
        );
    };

    return (
        <div className={`carousel-container ${startIndex === 0 ? "at-start" : ""} ${startIndex === maxIndex ? "at-end" : ""}`}>

            <button className="arrow left" onClick={prev}>
                ❮
            </button>

            <div className="movie-row" style={{transform: `translateX(-${startIndex * 236}px)`}}>
                {nowPlaying.map((movie) => {
                    const posterPath = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;

                    return (
                        <div
                            key={movie.id}
                            className="trending-movie-container"
                        >
                            <h4>{movie.title}</h4>
                            <img
                                src={posterPath}
                                alt={`${movie.title} poster`}
                            />
                            <p>{`Budget: ${movie.budget.toLocaleString()} $`}</p>
                            <p>{`Revenue: ${movie.revenue.toLocaleString()} $`}</p>
                            <p>{`Runtime: ${movie.runtime} min`}</p>
                            <p>{`Rating: ${movie.vote_average.toFixed(1)}`}</p>
                        </div>
                    );
                })}
            </div>

            <button className="arrow right" onClick={next}>
                ❯
            </button>
        </div>
    );
}

export default HomeNowPlaying;