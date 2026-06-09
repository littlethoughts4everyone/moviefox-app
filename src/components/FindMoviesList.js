
function FindMoviesList({ movieList, totals, avgBudget, avgRevenue, avgRuntime, avgRating, profit, increase, handleClearLists }) {
    return (
    <div className="ranking-container"> 
        <div className="lists-container">
            <div className="ranking-list">
                <h4 className="underline">Budget Ranking</h4>
                <ol>
                    {[...movieList].sort((a,b) => b.budget - a.budget).map((entry) => {
                        return (
                            <li>
                                <div className="list-entry">
                                    <p className="list-title">{entry.title} </p>
                                    <p className="list-value">{`${entry.budget.toLocaleString()} $`}</p>
                                </div>
                            </li>
                        )
                    })}
                </ol>
            </div>
            <div className="ranking-list">
                <h4 className="underline">Revenue Ranking</h4>
                <ol>
                    {[...movieList].sort((a,b) => b.revenue - a.revenue).map((entry) => {
                        return (
                            <li>
                                <div className="list-entry">
                                    <p className="list-title">{entry.title} </p>
                                    <p className="list-value">{`${entry.revenue.toLocaleString()} $`}</p>
                                </div>
                            </li>
                        )
                    })}
                </ol>
            </div>
            <div className="ranking-list">
                <h4 className="underline">Runtime Ranking</h4>
                <ol>
                    {[...movieList].sort((a,b) => b.runtime - a.runtime).map((entry) => {
                        return (
                            <li>
                                <div className="list-entry">
                                    <p className="list-title">{entry.title} </p>
                                    <p className="list-value">{`${entry.runtime.toLocaleString()} min`}</p>
                                </div>
                            </li>
                        )
                    })}
                </ol>
            </div>
            <div className="ranking-list">
                <h4 className="underline">Rating Ranking</h4>
                <ol>
                    {[...movieList].sort((a,b) => b.vote_average - a.vote_average).map((entry) => {
                        return (
                            <li>
                                <div className="list-entry">
                                    <p className="list-title">{entry.title} </p>
                                    <p className="list-value">{entry.vote_average.toFixed(1)}</p>
                                </div>
                            </li>
                        )
                    })}
                </ol>
            </div>
            <div className="ranking-list">
                <h4 className="underline">All Movies</h4>
                <ul>
                    <li>
                        <div className="all-entry">
                            <p className="list-title">Total Budget:</p>
                            <p className="list-value">{`${totals.budget.toLocaleString()} $`}</p>
                        </div>
                    </li>
                    <li>
                        <div className="all-entry">
                            <p className="list-title">Total Revenue:</p>
                            <p className="list-value">{`${totals.revenue.toLocaleString()} $`}</p>
                        </div>
                    </li>
                    <li>
                        <div className="all-entry">
                            <p className="list-title">Profit:</p>
                            <p className="list-value">{`${profit.toLocaleString()} $`}</p>
                        </div>
                    </li>
                    <li>
                        <div className="all-entry">
                            <p className="list-title">Increase:</p>
                            <p className="list-value">{`${increase.toFixed()} %`}</p>
                        </div>
                    </li>
                    <li>
                        <div className="all-entry">
                            <p className="list-title">Average Budget:</p>
                            <p className="list-value">{`${avgBudget.toLocaleString()} $`}</p>
                        </div>
                    </li>
                    <li>
                        <div className="all-entry">
                            <p className="list-title">Average Revenue:</p>
                            <p className="list-value">{`${avgRevenue.toLocaleString()} $`}</p>
                        </div>
                    </li>
                    <li>
                        <div className="all-entry">
                            <p className="list-title">Total Runtime:</p>
                            <p className="list-value">{`${totals.runtime} min`}</p>
                        </div>
                    </li>
                    <li>
                        <div className="all-entry">
                            <p className="list-title">Average Runtime:</p>
                            <p className="list-value">{`${avgRuntime} min`}</p>
                        </div>
                    </li>
                    <li>
                        <div className="all-entry">
                            <p className="list-title">Average Rating:</p>
                            <p className="list-value">{avgRating}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <button
        aria-label="clear lists"
        onClick={handleClearLists} >
            Clear Lists
        </button>
    </div>
    );
}

export default FindMoviesList;