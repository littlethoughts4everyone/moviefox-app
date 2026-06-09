
function CharacterGuessingGameForm({ actor, handleActorChange, playGame, mode, handleModeChange }) {

    return (
        <div className="form-container">
            <p className="text-shadow">Search for an actor or actress to play the game.</p>
            <p className="text-shadow">The easier the mode the more popular the movies. If you can't find any movies, try a harder mode.</p>
            <form onSubmit={playGame}>
                <input 
                type="text"
                value={actor}
                onChange={handleActorChange}
                placeholder="Actor Name"
                aria-label="Actor Name"
                required />
                <select
                name="gamemode"
                value={mode}
                onChange={handleModeChange}
                aria-label="Game Mode" >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                    <option value="Random 10">Random 10</option>    
                </select>
                <button
                type="submit"
                aria-label="Play Game" >
                    Play Game
                </button>
            </form>
        </div>
    );
}

export default CharacterGuessingGameForm;