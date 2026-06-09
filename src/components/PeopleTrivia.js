import { useState } from "react";
import PeopleTriviaForm from "./PeopleTriviaForm";
import PeopleTriviaResults from "./PeopleTriviaResults";
import PeopleTriviaMovieList from "./PeopleTriviaMovieList";
import { searchPerson, getMovieCredits, getMovieDetails } from "../util/tmdbCall";
import { GENRES, STUDIOS } from "../util/genre_studio_data";
import { filterCreditsByRole, filterMovieDetails } from "../util/movieFilters";

function PeopleTrivia() {
    const [formInput, setFormInput] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("Actor/Actress");
    const [details, setDetails] = useState([]);
    const [genreCount, setGenreCount] = useState([]);
    const [studioCount, setStudioCount] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [movieList, setMovieList] = useState([]);

    const handleNameChange = (e) => {
        setFormInput(e.currentTarget.value)
    };

    const handleRoleChange = (e) => {
        setRole(e.currentTarget.value);
    }

    const getPeopleTrivia = async(e) => {
        e.preventDefault();
        setMovieList([]);
        setHasSearched(false);
        setIsLoading(true);

        try {
            const personId = await searchPerson(formInput);

            if (!personId) {
            setDetails([]);
            setGenreCount([]); 
            setStudioCount([]); 
            setHasSearched(true);
            setIsLoading(false);
            return;     
            }

            const credits = await getMovieCredits(personId);

            if (!credits) {
            setDetails([]);
            setGenreCount([]); 
            setStudioCount([]);
            setHasSearched(true);
            setIsLoading(false);
            return;
            }

            const filteredMovies = filterCreditsByRole(credits, role);

            if (filteredMovies.length === 0) {
            setGenreCount([]); 
            setStudioCount([]);
            setHasSearched(true);
            setIsLoading(false);
            return;
            }

            const movieDetails = await Promise.all(
            filteredMovies.map(movie => getMovieDetails(movie.id))
            );

            const sortedMovieDetails = filterMovieDetails(movieDetails)
            .sort((a, b) => a.release_date.localeCompare(b.release_date));

            const genreTotals = sortedMovieDetails.reduce((acc, movie) => {
                movie.genres.forEach(({ id }) => {
                    const entry = Object.entries(GENRES).find(
                    ([, genre]) => genre.id === id
                    );

                    if (entry) {
                        const [key] = entry;
                        acc[key]++;
                    }
                });

                return acc;
                }, Object.fromEntries(Object.keys(GENRES).map(key => [key, 0])
            ));

           const studioTotals = sortedMovieDetails.reduce((acc, movie) => {
                movie.production_companies.forEach(company => {
                    const entry = Object.entries(STUDIOS).find(
                    ([, studio]) => studio.ids.includes(company.id)
                    );

                    if (entry) {
                        const [key] = entry;
                        acc[key]++;
                    }
                });

                 return acc;
                }, Object.fromEntries(Object.keys(STUDIOS).map(key => [key, 0])
            ));

            setName(formInput);
            setDetails(sortedMovieDetails);
            setGenreCount(genreTotals); 
            setStudioCount(studioTotals);
            setHasSearched(true);
            setIsLoading(false);
        } catch (err) {
            console.error(err)
            setHasSearched(true);
            setIsLoading(false);
        }
    };

    const showGenreMovieList = (genreKey) => {
        const genreId = GENRES[genreKey].id;

        const movies = details.filter(movie =>
            movie.genres.some(genre => genre.id === genreId)
        );

        setMovieList(movies);
    };

    const showStudioMovieList = (studioKey) => {
        const studioIds = STUDIOS[studioKey].ids;

        const movies = details.filter(movie =>
            movie.production_companies.some(company =>
            studioIds.includes(company.id)
            )
        );

        setMovieList(movies);
    };

    return (
        <section>
            <h2>Find People Trivia</h2>
            <PeopleTriviaForm 
            formInput={formInput}
            handleNameChange={handleNameChange}
            getPeopleTrivia={getPeopleTrivia}
            role={role}
            handleRoleChange={handleRoleChange} />
            <PeopleTriviaResults
            name={name}
            genreCount={genreCount}
            studioCount={studioCount}
            isLoading={isLoading}
            hasSearched={hasSearched}
            showGenreMovieList={showGenreMovieList}
            showStudioMovieList={showStudioMovieList} />
            <PeopleTriviaMovieList
            movieList={movieList} />
        </section>
    )
};

export default PeopleTrivia;