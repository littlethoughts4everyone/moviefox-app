import { useState, useCallback } from "react";
import FindMoviesForm from "./FindMoviesForm";
import FindMoviesResults from "./FindMoviesResults";
import FindMoviesList from "./FindMoviesList";
import { searchMovies, getMovieDetails } from "../util/tmdbCall";

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

    const totals = movieList.reduce(
        (acc, movie) => {
        acc.budget += movie.budget || 0;
        acc.revenue += movie.revenue || 0;
        acc.runtime += movie.runtime || 0;

        const rating = Number(movie.vote_average);

        if (!Number.isNaN(rating)) {
            acc.rating += rating;
        }

        return acc;
        },
        {
            budget: 0,
            revenue: 0,
            runtime: 0,
            rating: 0,
        }
    );

    const counts = movieList.reduce(
        (acc, movie) => {
        if (movie.budget > 0) acc.budget++;
        if (movie.revenue > 0) acc.revenue++;
        if (movie.runtime > 0) acc.runtime++;

        const rating = Number(movie.vote_average);
        if (!Number.isNaN(rating)) acc.rating++;

        return acc;
        },
        {
            budget: 0,
            revenue: 0,
            runtime: 0,
            rating: 0,
        }
    );

    const avgBudget = counts.budget > 0 ? Math.round(totals.budget / counts.budget) : 0;
    const avgRevenue = counts.revenue > 0 ? Math.round(totals.revenue / counts.revenue) : 0;
    const avgRuntime = counts.runtime > 0 ? Math.round(totals.runtime / counts.runtime) : 0;
    const avgRating = counts.rating > 0 ? (totals.rating / counts.rating).toFixed(2) : "N/A";
    const profit = totals.revenue - totals.budget;

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
            profit={profit} />
        </section>
    );
}

export default FindMovies;

