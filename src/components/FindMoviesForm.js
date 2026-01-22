
function FindMoviesForm({ searchTerm, handleSearchTerm, getMovies}) {

    return (
        <div>
            <div className="form-container">
                <p>Type in a movie title or keyword to find movies.</p>
                <form onSubmit={getMovies}>
                    <input 
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchTerm}
                    placeholder="Movie Title"
                    aria-label="Movie Title"
                    required />
                    <button
                    type="submit"
                    aria-label="Find Movies" >
                        Find Movies
                    </button>
                </form>
            </div>
        </div>
    );
}

export default FindMoviesForm;