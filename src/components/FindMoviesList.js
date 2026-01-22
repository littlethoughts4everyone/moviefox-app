
function FindMoviesList({ movieList, totals, avgBudget, avgRevenue, avgRuntime, avgRating, profit }) {
    return (
        <div className="lists-container">
            <div className="movie-ranking-list">
                <p>Budget Ranking</p>
                <ol>
                    {movieList.sort((a,b) => b.budget - a.budget).map((entry) => {
                        return (
                            <li>
                                <div className="list-entry">
                                    <p>{entry.title} </p>
                                    <p>{`${entry.budget.toLocaleString()} $`}</p>
                                </div>
                            </li>
                        )
                    })}
                </ol>
            </div>
            <div className="movie-ranking-list">
                <p>Revenue Ranking</p>
                <ol>
                    {movieList.sort((a,b) => b.revenue - a.revenue).map((entry) => {
                        return (
                            <li>
                                <div className="list-entry">
                                    <p>{entry.title} </p>
                                    <p>{`${entry.revenue.toLocaleString()} $`}</p>
                                </div>
                            </li>
                        )
                    })}
                </ol>
            </div>
            <div className="movie-ranking-list">
                <p>Runtime Ranking</p>
                <ol>
                    {movieList.sort((a,b) => b.runtime - a.runtime).map((entry) => {
                        return (
                            <li>
                                <div className="list-entry">
                                    <p>{entry.title} </p>
                                    <p>{`${entry.runtime.toLocaleString()} min`}</p>
                                </div>
                            </li>
                        )
                    })}
                </ol>
            </div>
            <div className="movie-ranking-list">
                <p>Rating Ranking</p>
                <ol>
                    {movieList.sort((a,b) => b.vote_average - a.vote_average).map((entry) => {
                        return (
                            <li>
                                <div className="list-entry">
                                    <p>{entry.title} </p>
                                    <p>{entry.vote_average.toFixed(1)}</p>
                                </div>
                            </li>
                        )
                    })}
                </ol>
            </div>
            <div className="movie-ranking-list">
                <ul>
                    <li>
                        <div className="list-entry">
                            <p>Total Budget:</p>
                            <p>{`${totals.budget.toLocaleString()} $`}</p>
                        </div>
                    </li>
                    <li>
                        <div className="list-entry">
                            <p>Total Revenue:</p>
                            <p>{`${totals.revenue.toLocaleString()} $`}</p>
                        </div>
                    </li>
                    <li>
                        <div className="list-entry">
                            <p>Profit:</p>
                            <p>{`${profit.toLocaleString()} $`}</p>
                        </div>
                    </li>
                    <li>
                        <div className="list-entry">
                            <p>Average Budget:</p>
                            <p>{`${avgBudget.toLocaleString()} $`}</p>
                        </div>
                    </li>
                    <li>
                        <div className="list-entry">
                            <p>Average Revenue:</p>
                            <p>{`${avgRevenue.toLocaleString()} $`}</p>
                        </div>
                    </li>
                    <li>
                        <div className="list-entry">
                            <p>Total Runtime:</p>
                            <p>{`${totals.runtime} min`}</p>
                        </div>
                    </li>
                    <li>
                        <div className="list-entry">
                            <p>Average Runtime:</p>
                            <p>{`${avgRuntime} min`}</p>
                        </div>
                    </li>
                    <li>
                        <div className="list-entry">
                            <p>Average Rating:</p>
                            <p>{avgRating}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default FindMoviesList;