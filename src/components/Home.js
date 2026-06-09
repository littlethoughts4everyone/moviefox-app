import { useEffect, useState } from "react";
import { getNowPlaying, getPopular, getMovieDetails } from "../util/tmdbCall";
import HomeNowPlaying from "./HomeNowPlaying";
import HomePopular from "./HomePopular";

function Home() {

    const [nowPlaying, setNowPlaying] = useState([]);
    const [popular, setPopular] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const loadNowPlaying = async () => {
            setIsLoading(true);

            const movies = await getNowPlaying();

            let movieIds = [];
            
            movies.map((movie) => movieIds.push(movie.id))
            
            const movieDetails = await Promise.all(
                movieIds.map(id => getMovieDetails(id))
            );

            setNowPlaying(movieDetails);
            setIsLoading(false);
        };

        const loadPopular = async () => {
            setIsLoading(true);

            const movies = await getPopular();

            let movieIds = [];
            
            movies.map((movie) => movieIds.push(movie.id))
            
            const movieDetails = await Promise.all(
                movieIds.map(id => getMovieDetails(id))
            );

            setPopular(movieDetails);
            setIsLoading(false);
        };

        loadNowPlaying();
        loadPopular();
    }, []);

    return (
        <section className="section-container">
            <h2>Now in Theatres</h2>
            <HomeNowPlaying
            nowPlaying={nowPlaying}
            isLoading={isLoading} />
            <h2>Popular Movies</h2>
            <HomePopular
            popular={popular}
            isLoading={isLoading} />
        </section>
    );
}

export default Home;