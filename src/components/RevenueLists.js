import { useState } from "react";
import RevenueListsForm from "./RevenueListsForm";
import RevenueListsResult from "./RevenueListsResult";
import ListRanking from "./ListRanking";
import { searchPerson, getMovieCredits, getMovieDetails } from "../util/tmdbCall";
import { filterCreditsByRole, filterMovieDetails } from "../util/movieFilters";
import { useMovieStats } from "../util/useMovieStats";

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

            const filteredMovies = filterCreditsByRole(credits, role);

            if (filteredMovies.length === 0) {
            setList([]);
            setHasSearched(true);
            setIsLoading(false);
            return;
            }

            const movieDetails = await Promise.all(
            filteredMovies.map(movie => getMovieDetails(movie.id))
            );

            const sortedMovieDetails = filterMovieDetails(movieDetails)
            .sort((a, b) => new Date(a.release_date) - new Date(b.release_date));

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

    const {
        totals,
        avgBudget,
        avgRevenue,
        avgRuntime,
        avgRating,
        highestBudget,
        highestRevenue,
        highestRuntime,
        highestRating,
        lowestBudget,
        lowestRevenue,
        lowestRuntime,
        lowestRating,
    } = useMovieStats(list);

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

    const alreadyExists = ranking.some(
        person => person.name.toLowerCase() === rankingEntry.name.toLowerCase()
    );

    const handleAddToRanking = () => {
        
        if (alreadyExists) {
            return;
        }

        setRanking(prev => [...prev, rankingEntry]);
    };

    const handleClearLists = () => {
        setRanking([]);
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
            handleAddToRanking={handleAddToRanking}
            alreadyExists={alreadyExists} />
            <ListRanking
            ranking={ranking}
            handleClearLists={handleClearLists} />
        </section>
    )

}

export default RevenueLists;