
function CharacterGuessingGameResult({ result, isLoading, hasSearched, handleDrop, answers, calculateScore, score }) {
    
    const usedCharacterIds = new Set(Object.values(answers).map(movie => movie.id));

    return (
        <div className="guessing-container">
            {isLoading && (
                <p>Searching...</p>
            )}

            {hasSearched && result.length === 0 && (
                <p className="empty-message">No movies found</p>
            )}

            {hasSearched && result.length > 0 && (
            <>
                <p>Drop the character names to the empty fields under the movie posters. Press the "Get Score" button to check your answers. Have fun!</p>
                <div className="game-container">
                    <div className="character-container">
                        {result.map((movie) => {
                            const isUsed = usedCharacterIds.has(movie.id);

                            return (
                                <div 
                                key={movie.id} 
                                className={`drag-container ${isUsed ? "used" : ""}`}
                                draggable
                                onDragStart={(e) => {e.dataTransfer.setData("application/json",JSON.stringify(movie));}}> 
                                    <p>{movie.character}</p>
                                </div>
                            )
                        })}
                    </div>
                    <div className="check-container">
                        {[...result].sort((a, b) => new Date(a.release_date) - new Date(b.release_date)).map((movie) => {

                            const posterPath = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;

                            return (
                                <div key={movie.id} className="solution-container">
                                    <img className="small-image" src={posterPath} alt={`${movie.title} poster`} />
                                    <div 
                                    className={`drop-container ${score ? answers[movie.id]?.character === movie.character ? "correct" : "wrong" : ""}`}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={(e) => {const data = JSON.parse(e.dataTransfer.getData("application/json")); handleDrop(movie.id, data);}}>
                                        {answers[movie.id] ? (
                                        <p>{answers[movie.id].character}</p>
                                        ) : (
                                        <p></p>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </>
            )}
            {hasSearched && result.length > 0 && (
            <button
                className="score-button"
                aria-label="Get Score"
                onClick={calculateScore}>
                Get Score
            </button>
            )}
            {score && (
            <p className="score">
                You got {score.correct} out of {score.total} correct!
            </p>
            )}
        </div>
    );
}

export default CharacterGuessingGameResult;