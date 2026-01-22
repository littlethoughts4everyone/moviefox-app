
function RevenueListsResult({ 
    name, list, isLoading, hasSearched, totals, 
    avgBudget, avgRevenue, avgRuntime, avgRating, 
    highestBudget, highestRevenue, highestRuntime, highestRating, 
    lowestBudget, lowestRevenue, lowestRuntime, lowestRating, handleAddToRanking }) {

    return (
        <div className="table-container">
            {isLoading && (
                <p>Searching...</p>
            )}

            {hasSearched && list.length === 0 && (
                <p className="empty-message">No movies found</p>
            )}

            {hasSearched && list.length > 0 && (
            <>
                <p>{`These are the films of ${name}.`}</p>
                <div className="results-table">
                    <table>
                        <thead>
                            <tr>
                                <td></td>
                                <td>Release Date</td>
                                <td>Movie Title</td>
                                <td>Budget</td>
                                <td>Revenue</td>
                                <td>Runtime</td>
                                <td>Rating</td>
                            </tr>
                        </thead>
                        <tbody>
                        {list.map((movie, index) => {

                            return (
                                <tr key={movie.id}>
                                    <td>{index + 1}</td>
                                    <td>{new Date(movie.release_date).toLocaleDateString()}</td>
                                    <td>{movie.title}</td>
                                    <td className={movie.budget === highestBudget ? "highest" : movie.budget === lowestBudget ? "lowest" : undefined}>{`${movie.budget.toLocaleString()} $`}</td>
                                    <td className={movie.revenue === highestRevenue ? "highest" : movie.revenue === lowestRevenue ? "lowest" : undefined}>{`${movie.revenue.toLocaleString()} $`}</td>
                                    <td className={movie.runtime === highestRuntime ? "highest" : movie.runtime === lowestRuntime ? "lowest" : undefined}>{`${movie.runtime} min`}</td>
                                    <td className={movie.vote_average === highestRating ? "highest" : movie.vote_average === lowestRating ? "lowest" : undefined}>{movie.vote_average.toFixed(1)}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
                <div className="data-table">
                    <table>
                        <thead>
                            <tr>
                                <td>Total Budget</td>
                                <td>Total Revenue</td>
                                <td>Average Budget</td>
                                <td>Average Revenue</td>
                                <td>Total Runtime</td>
                                <td>Average Runtime</td>
                                <td>Average Rating</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{`${totals.budget.toLocaleString()} $`}</td>
                                <td>{`${totals.revenue.toLocaleString()} $`}</td>
                                <td>{`${avgBudget.toLocaleString()} $`}</td>
                                <td>{`${avgRevenue.toLocaleString()} $`}</td>
                                <td>{`${totals.runtime} min`}</td>
                                <td>{`${avgRuntime} min`}</td>
                                <td>{avgRating}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button 
                onClick={handleAddToRanking}
                className="add-button"
                aria-label="add to ranking" >
                    Add to Ranking
                </button>
            </>)}
        </div>
    );
}

export default RevenueListsResult;
