import { useState } from "react";
import RevenueListsForm from "./RevenueListsForm";
import RevenueListsResult from "./RevenueListsResult";
import ListRanking from "./ListRanking";
import { searchPerson, getMovieCredits, getMovieDetails } from "../util/tmdbCall";

function RevenueLists() {
    const [name, setName] = useState("");
    const [role, setRole] = useState("Actor/Actress");
    const [list, setList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [ranking, setRanking] = useState([]);

    const handleNameChange = (e) => {
        setName(e.currentTarget.value);
    };

    const handleRoleChange = (e) => {
        setRole(e.currentTarget.value);
    }

   const getRevenueList = async (e) => {
        e.preventDefault();
        setHasSearched(false);
        setIsLoading(true); 

        try {
            const personId = await searchPerson(name);

            if (!personId) {
            setList([]); 
            setHasSearched(true);
            setIsLoading(false);
            return;     
            }

            const credits = await getMovieCredits(personId);

            if (!credits) {
            setList([]);
            setHasSearched(true);
            setIsLoading(false);
            return;
            }

            let filteredMovies = [];

            if (role === "Actor/Actress") {
            filteredMovies = credits.cast
                .filter(
                movie =>
                    !movie.genre_ids.includes(99) &&
                    !movie.genre_ids.includes(10770) &&
                    movie.original_title !== "Final Cut: Hölgyeim és uraim" &&
                    !movie.character.includes("uncredited")
                )
                .map(movie => ({ id: movie.id }));
            } else if (role === "Director") {
            filteredMovies = credits.crew
                .filter(
                movie =>
                    !movie.genre_ids.includes(99) &&
                    !movie.genre_ids.includes(10770) &&
                    movie.job === "Director"
                )
                .map(movie => ({ id: movie.id }));
            } else if (role === "Composer") {
            filteredMovies = credits.crew
                .filter(
                movie =>
                    !movie.genre_ids.includes(99) &&
                    !movie.genre_ids.includes(10770) &&
                    movie.job === "Original Music Composer"
                )
                .map(movie => ({ id: movie.id }));
            } else if (role === "Cinematographer") {
            filteredMovies = credits.crew
                .filter(
                movie =>
                    !movie.genre_ids.includes(99) &&
                    !movie.genre_ids.includes(10770) &&
                    movie.job === "Director of Photography"
                )
                .map(movie => ({ id: movie.id }));
            }

            if (filteredMovies.length === 0) {
            setList([]);
            setHasSearched(true);
            setIsLoading(false);
            return;
            }

            const movieDetails = await Promise.all(
            filteredMovies.map(movie => getMovieDetails(movie.id))
            );

            const sortedMovieDetails = movieDetails
            .filter(
                movie =>
                movie &&
                movie.runtime > 60 &&
                movie.runtime < 247 &&
                movie.vote_average > 0 &&
                movie.vote_count > 140
            )
            .sort(
                (a, b) =>
                new Date(a.release_date) - new Date(b.release_date)
            );

            setList(sortedMovieDetails);
            setHasSearched(true);
            setIsLoading(false);
        } catch (err) {
            console.error(err);
            setList([]);
            setHasSearched(true);
            setIsLoading(false);
        }
    };

    const totals = list.reduce(
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

    const counts = list.reduce(
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

    const highestBudget = list.reduce((max, movie) => Math.max(max, movie.budget || 0), 0);
    const highestRevenue = list.reduce((max, movie) => Math.max(max, movie.revenue || 0), 0);
    const highestRuntime = list.reduce((max, movie) => Math.max(max, movie.runtime || 0), 0);
    const highestRating = list.reduce((max, movie) => Math.max(max, movie.vote_average || 0), 0);

    const lowestBudget = Math.min(...list.map(movie => movie.budget).filter(budget => budget > 0));
    const lowestRevenue = Math.min(...list.map(movie => movie.revenue).filter(revenue => revenue > 0));
    const lowestRuntime = Math.min(...list.map(movie => movie.runtime || 0));
    const lowestRating = Math.min(...list.map(movie => movie.vote_average || 0));

    const avgBudget = counts.budget > 0 ? Math.round(totals.budget / counts.budget) : 0;
    const avgRevenue = counts.revenue > 0 ? Math.round(totals.revenue / counts.revenue) : 0;
    const avgRuntime = counts.runtime > 0 ? Math.round(totals.runtime / counts.runtime) : 0;
    const avgRating = counts.rating > 0 ? (totals.rating / counts.rating).toFixed(2) : "N/A";

    const rankingEntry = {
        name: name,
        movieCount: list.length,
        totalBudget: totals.budget,
        totalRevenue: totals.revenue,
        totalRuntime: totals.runtime,
        avgBudget: avgBudget,
        avgRevenue: avgRevenue,
        avgRuntime: avgRuntime,
        avgRating: avgRating,
    };

    const handleAddToRanking = () => {
        setRanking(prev => [...prev, rankingEntry]);
    }

    return (
        <section className="section-container">
            <h2>Find Data Lists</h2>
            <RevenueListsForm 
            name={name}
            handleNameChange={handleNameChange}
            getRevenueList={getRevenueList}
            role={role}
            handleRoleChange={handleRoleChange} />
            <RevenueListsResult
            name={name}
            list={list}
            isLoading={isLoading}
            hasSearched={hasSearched}
            totals={totals}
            avgBudget={avgBudget}
            avgRevenue={avgRevenue}
            avgRuntime={avgRuntime}
            avgRating={avgRating}
            highestBudget={highestBudget}
            highestRevenue={highestRevenue}
            highestRuntime={highestRuntime}
            highestRating={highestRating}
            lowestBudget={lowestBudget}
            lowestRevenue={lowestRevenue}
            lowestRuntime={lowestRuntime}
            lowestRating={lowestRating}
            handleAddToRanking={handleAddToRanking} />
            <ListRanking
            ranking={ranking} />
        </section>
    )

}

export default RevenueLists;