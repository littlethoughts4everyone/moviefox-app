import { useState } from "react";
import ActorMutualMoviesForm from "./ActorMutualMoviesForm";
import ActorMutualMoviesResults from "./ActorMutualMoviesResults";
import { searchPerson, getMovieCredits } from "../util/tmdbCall";

function ActorMutualMovies() {

    const [nameA, setNameA] = useState("");
    const [nameB, setNameB] = useState("");
    const [mutualMovies, setMutualMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const handleNameChangeA = (e) => {
        setNameA(e.currentTarget.value)
    };

    const handleNameChangeB = (e) => {
        setNameB(e.currentTarget.value)
    };

    const getMutualMovieCredits = async(e) => {
        e.preventDefault();
        setHasSearched(false);
        setIsLoading(true); 

        try {
            const personIdA = await searchPerson(nameA);
            const personIdB = await searchPerson(nameB);

            if (!personIdA || !personIdB) {
            setMutualMovies([]); 
            setHasSearched(true);
            setIsLoading(false);
            return;     
            }

            const creditsA = await getMovieCredits(personIdA);
            const creditsB = await getMovieCredits(personIdB);

            if (!creditsA || !creditsB) {
            setMutualMovies([]); 
            setHasSearched(true);
            setIsLoading(false);
            return;     
            }

            let movieCreditsA = [];
            let movieCreditsB = [];
            let mutualCredits = [];

            creditsA.cast.map((movie) => movieCreditsA.push({"id": movie.id, "title": movie.original_title, "year": movie.release_date, "poster": movie.poster_path, "genreIds": movie.genre_ids}));
            creditsA.crew.map((movie) => movieCreditsA.push({"id": movie.id, "title": movie.original_title, "year": movie.release_date, "poster": movie.poster_path, "genreIds": movie.genre_ids}));
            creditsB.cast.map((movie) => movieCreditsB.push({"id": movie.id, "title": movie.original_title, "year": movie.release_date, "poster": movie.poster_path, "genreIds": movie.genre_ids}));
            creditsB.crew.map((movie) => movieCreditsB.push({"id": movie.id, "title": movie.original_title, "year": movie.release_date, "poster": movie.poster_path, "genreIds": movie.genre_ids}));
        
            for (let i = 0; i < movieCreditsA.length; i++) {
                for (let j = 0; j < movieCreditsB.length; j++) {
                    if (movieCreditsA[i].id === movieCreditsB[j].id) {
                        mutualCredits.push({"id": movieCreditsA[i].id, "title": movieCreditsA[i].title, "year": movieCreditsA[i].year, "poster": movieCreditsA[i].poster, "genreIds": movieCreditsA[i].genreIds});
                    };
                }
            }

            const uniqueMutualCredits = [...new Map(mutualCredits.map(credit => [credit.id, credit])).values()];

            const filteredMutualCredits = uniqueMutualCredits.filter(credit => !credit.genreIds.includes(99) && credit.title !== "Final Cut: Hölgyeim és uraim");

            setMutualMovies(filteredMutualCredits);
            setHasSearched(true);
            setIsLoading(false);
        } catch (err) {
            console.error(err);
            setMutualMovies([]);
            setHasSearched(true);
            setIsLoading(false);
        }};

    return (
        <section className='section-container'>
            <h2>Find Mutual Movies</h2>
            <ActorMutualMoviesForm
            nameA={nameA}
            nameB={nameB}
            handleNameChangeA={handleNameChangeA}
            handleNameChangeB={handleNameChangeB}
            getMutualMovieCredits={getMutualMovieCredits} />
            <ActorMutualMoviesResults
            mutualMovies={mutualMovies}
            isLoading={isLoading}
            hasSearched={hasSearched} />
        </section>
    );
}

export default ActorMutualMovies;