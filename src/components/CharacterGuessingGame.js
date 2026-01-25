import { useState } from "react";
import { searchPerson, getMovieCredits } from "../util/tmdbCall";
import CharacterGuessingGameForm from "./CharacterGuessingGameForm";
import CharacterGuessingGameResult from "./CharacterGuessingGameResult";

function CharacterGuessingGame() {
    const [actor, setActor] = useState("");
    const [mode, setMode] = useState("Easy");
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [result, setResult] = useState([]);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(null);

    const handleActorChange = (e) => {
        setActor(e.currentTarget.value)
    };

    const handleModeChange = (e) => {
        setMode(e.currentTarget.value);
    }

    const playGame = async(e) => {
        e.preventDefault();
        setIsLoading(true);
        setHasSearched(false);
        setAnswers({});
        setScore(null)

        try {
            const personId = await searchPerson(actor);
            
            if (!personId) {
                setResult([]); 
                setHasSearched(true);
                setIsLoading(false);
                return;     
            }
            
            const credits = await getMovieCredits(personId);
            
            if (!credits) {
                setResult([]); 
                setHasSearched(true);
                setIsLoading(false);
                return;     
            }

            let filteredCredits = [];

            filteredCredits = credits.cast.filter(movie =>
                !movie.genre_ids.includes(99) &&
                !movie.genre_ids.includes(10770) &&
                !movie.character.includes("uncredited")
                ).map(movie => ({ 
                    id: movie.id,
                    title: movie.title,
                    character: movie.character,
                    poster_path: movie.poster_path,
                    release_date: movie.release_date,
                    popularity: movie.popularity,
                    vote_count: movie.vote_count
            }));

            if (filteredCredits.length === 0) {
                setResult([]); 
                setHasSearched(true);
                setIsLoading(false);
                return;
            };

            let modeCredits = [];

            if (mode === "Easy") {
            modeCredits = filteredCredits.filter(movie => movie.popularity > 9)
            } else if (mode === "Medium") {
            modeCredits = filteredCredits.filter(movie => movie.popularity > 6)
            } else if (mode === "Hard") {
            modeCredits = filteredCredits.filter(movie => movie.vote_count > 140)
            } else if (mode === "Random 10") {
                const eligibleCredits = filteredCredits.filter(movie => movie.vote_count > 140)

                modeCredits = [...eligibleCredits].sort(() => 0.5 - Math.random()).slice(0, 10);
            };
        
        if (modeCredits.length === 0) {
            setResult([]);
        } else {
            setResult(modeCredits);
        }
        setIsLoading(false);
        setHasSearched(true);
        } catch (err) {
            console.error(err);
            setResult([]);
            setIsLoading(false);
            setHasSearched(true);
        }
    };

    const handleDrop = (targetMovie, draggedCharacter) => {
        setAnswers(prev => ({...prev,[targetMovie]: draggedCharacter}));
    };

    const calculateScore = () => {
        let correct = 0;

        result.forEach(movie => {
            const placed = answers[movie.id];

            if (placed && placed.character === movie.character) {
                correct++;
            }
        });

        setScore({
            correct,
            total: result.length
        });
    };

    return (
        <section className="gaming-section-container">
            <h2>Character Guessing Game</h2>
            <CharacterGuessingGameForm
            actor={actor}
            handleActorChange={handleActorChange}
            mode={mode}
            handleModeChange={handleModeChange}
            playGame={playGame} />
            <CharacterGuessingGameResult 
            result={result}
            isLoading={isLoading}
            hasSearched={hasSearched}
            handleDrop={handleDrop}
            answers={answers}
            calculateScore={calculateScore}
            score={score} />
        </section>
    );
}

export default CharacterGuessingGame;