
function ActorMutualMoviesForm({ nameA, nameB, handleNameChangeA, handleNameChangeB, getMutualMovieCredits}) {

    return (
        <div className="form-container">
            <p>Type in the name of two actors, actresses or directors to find out, 
                if they ever worked on a movie together</p>
            <form onSubmit={getMutualMovieCredits}>
                <input 
                type="text"
                value={nameA}
                onChange={handleNameChangeA}
                placeholder="Name A"
                aria-label="Name A"
                required />
                <input 
                type="text"
                value={nameB}
                onChange={handleNameChangeB}
                placeholder="Name B"
                aria-label="Name B"
                required />
                <button
                type="submit"
                aria-label="Find Movies" >
                    Find Movies
                </button>
            </form>
        </div>
    );
}

export default ActorMutualMoviesForm;