
function FindMoviesForm({ searchTerm, handleSearchTerm, getMovies}) {

    return (
        <div className="form-container">
            <p className="text-shadow">Search for a movie to get its data.</p>
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
                aria-label="Search Movies" >
                    Search
                </button>
            </form>
        </div>
    );
}

export default FindMoviesForm;