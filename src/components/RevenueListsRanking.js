
function RevenueListsRanking({ ranking, handleClearLists }) {

    return (
    <div className="ranking-container">   
        <div className="lists-container">
            <div className="people-ranking-list">
                <h4 className="underline">Total Films Ranking</h4>
                <ol>
                    {[...ranking].sort((a,b) => b.movieCount - a.movieCount).map((entry) => {
                        return (
                            <li>
                                <div className="people-list-entry">
                                        <p>{entry.name}</p>
                                        <p>{entry.movieCount}</p>
                                </div>
                            </li>
                        )
                    })}
                </ol>
            </div>
            <div className="people-ranking-list">
                <h4 className="underline">Total Budget Ranking</h4>
                <ol>
                    {[...ranking].sort((a,b) => b.totalBudget - a.totalBudget).map((entry) => {
                        return (
                            <li>
                                <div className="people-list-entry">
                                        <p>{entry.name}</p>
                                        <p>{`${entry.totalBudget.toLocaleString()} $`}</p>
                                </div>
                            </li>
                        )
                    })}
                </ol>
            </div>
            <div className="people-ranking-list">
                <h4 className="underline">Total Revenue Ranking</h4>
                <ol>
                    {[...ranking].sort((a,b) => b.totalRevenue - a.totalRevenue).map((entry) => {
                        return (
                            <li>
                                <div className="people-list-entry">
                                        <p>{entry.name}</p>
                                        <p>{`${entry.totalRevenue.toLocaleString()} $`}</p>
                                </div>
                            </li>
                        )
                    })}
                </ol>
            </div>
            <div className="people-ranking-list">
                <h4 className="underline">Increase Ranking</h4>
                <ol>
                    {[...ranking].sort((a,b) => b.increase - a.increase).map((entry) => {
                        return (
                            <li>
                                <div className="people-list-entry">
                                        <p>{entry.name}</p>
                                        <p>{`${entry.increase.toFixed()} %`}</p>
                                </div>
                            </li>
                        )
                    })}
                </ol>
            </div>
            <div className="people-ranking-list">
                <h4 className="underline">Average Budget Ranking</h4>
                <ol>
                    {[...ranking].sort((a,b) => b.avgBudget - a.avgBudget).map((entry) => {
                        return (
                            <li>
                                <div className="people-list-entry">
                                        <p>{entry.name}</p>
                                        <p>{`${entry.avgBudget.toLocaleString()} $`}</p>
                                </div>
                            </li>
                        )
                    })}
                </ol>
            </div>
            <div className="people-ranking-list">
                <h4 className="underline">Average Revenue Ranking</h4>
                <ol>
                    {[...ranking].sort((a,b) => b.avgRevenue - a.avgRevenue).map((entry) => {
                        return (
                            <li>
                                <div className="people-list-entry">
                                        <p>{entry.name}</p>
                                        <p>{`${entry.avgRevenue.toLocaleString()} $`}</p>
                                </div>
                            </li>
                        )
                    })}
                </ol>
            </div>
            <div className="people-ranking-list">
                <h4 className="underline">Total Runtime Ranking</h4>
                <ol>
                    {[...ranking].sort((a,b) => b.totalRuntime - a.totalRuntime).map((entry) => {
                        return (
                            <li>
                                <div className="people-list-entry">
                                        <p>{entry.name}</p>
                                        <p>{`${entry.totalRuntime} hrs`}</p>
                                </div>
                            </li>
                        )
                    })}
                </ol>
            </div>
            <div className="people-ranking-list">
                <h4 className="underline">Average Runtime Ranking</h4>
                <ol>
                    {[...ranking].sort((a,b) => b.avgRuntime - a.avgRuntime).map((entry) => {
                        return (
                            <li>
                                <div className="people-list-entry">
                                        <p>{entry.name}</p>
                                        <p>{`${entry.avgRuntime} min`}</p>
                                </div>
                            </li>
                        )
                    })}
                </ol>
            </div>
            <div className="people-ranking-list">
                <h4 className="underline">Average Rating Ranking</h4>
                <ol>
                    {[...ranking].sort((a,b) => b.avgRating - a.avgRating).map((entry) => {
                        return (
                            <li>
                                <div className="people-list-entry">
                                        <p>{entry.name}</p>
                                        <p>{entry.avgRating}</p>
                                </div>
                            </li>
                        )
                    })}
                </ol>
            </div>
        </div>
        <button
        aria-label="clear lists"
        onClick={handleClearLists} >
            Clear Lists
        </button>
    </div>
    );
};

export default RevenueListsRanking;