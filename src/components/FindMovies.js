import { useState, useCallback } from "react";
import FindMoviesForm from "./FindMoviesForm";
import FindMoviesResults from "./FindMoviesResults";
import FindMoviesList from "./FindMoviesList";
import { searchMovies, getMovieDetails } from "../util/tmdbCall";
import { useMovieStats } from "../util/useMovieStats";

function FindMovies() {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState([]);
    const [movieList, setMovieList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearchTerm = (e) => {
        setSearchTerm(e.currentTarget.value);
    };

    const getMovies = async(e) => {
        e.preventDefault();
        setHasSearched(false);
        setIsLoading(true);

        try {
            const movies = await searchMovies(searchTerm);

            if(!movies) {
                setResults([]);
                setHasSearched(true);
                setIsLoading(false);
                return;
            }

            let movieIds = [];

            movies.map((movie) => movieIds.push(movie.id))

            const movieDetails = await Promise.all(
            movieIds.map(id => getMovieDetails(id))
            );

            const filteredMovies = movieDetails.filter((movie) => movie.runtime > 60 && movie.vote_count > 0);

            setResults(filteredMovies);
            setIsLoading(false);
            setHasSearched(true);
        } catch (err) {
            console.error(err);
            setResults([]);
            setHasSearched(true);
            setIsLoading(false);
        }
    };

    const handleAddToMovieList = useCallback((movie) => {
      if (movieList.some((savedMovie) => savedMovie.id === movie.id))
        return;
      setMovieList((prev) => [...prev, movie]);
    },[movieList]);

    const { totals, avgBudget, avgRevenue, avgRuntime, avgRating, profit } = useMovieStats(movieList);

    const handleClearLists = () => {
        setMovieList([]);
    }

    return (
        <section className="section-container">
            <h2>Find Movies</h2>
            <FindMoviesForm
            searchTerm={searchTerm}
            handleSearchTerm={handleSearchTerm}
            getMovies={getMovies} />
            <FindMoviesResults
            results={results}
            isLoading={isLoading}
            hasSearched={hasSearched}
            handleAddToMovieList={handleAddToMovieList} />
            <FindMoviesList
            movieList={movieList}
            totals={totals}
            avgBudget={avgBudget}
            avgRevenue={avgRevenue}
            avgRuntime={avgRuntime}
            avgRating={avgRating}
            profit={profit}
            handleClearLists={handleClearLists} />
        </section>
    );
}

export default FindMovies;

