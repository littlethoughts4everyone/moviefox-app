
function CharacterGuessingGameForm({ actor, handleActorChange, playGame }) {

    return (
        <div className="form-container">
            <p>Type in the name of an actor or actress with who you want to play the game.</p>
            <form onSubmit={playGame}>
                <input 
                type="text"
                value={actor}
                onChange={handleActorChange}
                placeholder="Actor Name"
                aria-label="Actor Name"
                required />
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