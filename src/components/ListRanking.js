
function ListRanking({ ranking, handleClearLists }) {

    return (
    <>   
        <div className="lists-container">
            <div className="person-ranking-list">
                <p>Total Films Ranking</p>
                <ol>
                    {[...ranking].sort((a,b) => b.movieCount - a.movieCount).map((entry) => {
                        return (
                            <li>
                                <div className="list-entry">
                                        <p>{entry.name}</p>
                                        <p>{entry.movieCount}</p>
                                </div>
                            </li>
                        )
                    })}
                </ol>
            </div>
            <div className="person-ranking-list">
                <p>Total Budget Ranking</p>
                <ol>
                    {[...ranking].sort((a,b) => b.totalBudget - a.totalBudget).map((entry) => {
                        return (
                            <li>
                                <div className="list-entry">
                                        <p>{entry.name}</p>
                                        <p>{`${entry.totalBudget.toLocaleString()} $`}</p>
                                </div>
                            </li>
                        )
                    })}
                </ol>
            </div>
            <div className="person-ranking-list">
                <p>Total Revenue Ranking</p>
                <ol>
                    {[...ranking].sort((a,b) => b.totalRevenue - a.totalRevenue).map((entry) => {
                        return (
                            <li>
                                <div className="list-entry">
                                        <p>{entry.name}</p>
                                        <p>{`${entry.totalRevenue.toLocaleString()} $`}</p>
                                </div>
                            </li>
                        )
                    })}
                </ol>
            </div>
            <div className="person-ranking-list">
                <p>Average Budget Ranking</p>
                <ol>
                    {[...ranking].sort((a,b) => b.avgBudget - a.avgBudget).map((entry) => {
                        return (
                            <li>
                                <div className="list-entry">
                                        <p>{entry.name}</p>
                                        <p>{`${entry.avgBudget.toLocaleString()} $`}</p>
                                </div>
                            </li>
                        )
                    })}
                </ol>
            </div>
            <div className="person-ranking-list">
                <p>Average Revenue Ranking</p>
                <ol>
                    {[...ranking].sort((a,b) => b.avgRevenue - a.avgRevenue).map((entry) => {
                        return (
                            <li>
                                <div className="list-entry">
                                        <p>{entry.name}</p>
                                        <p>{`${entry.avgRevenue.toLocaleString()} $`}</p>
                                </div>
                            </li>
                        )
                    })}
                </ol>
            </div>
            <div className="person-ranking-list">
                <p>Total Runtime Ranking</p>
                <ol>
                    {[...ranking].sort((a,b) => b.totalRuntime - a.totalRuntime).map((entry) => {
                        return (
                            <li>
                                <div className="list-entry">
                                        <p>{entry.name}</p>
                                        <p>{`${entry.totalRuntime} min`}</p>
                                </div>
                            </li>
                        )
                    })}
                </ol>
            </div>
            <div className="person-ranking-list">
                <p>Average Runtime Ranking</p>
                <ol>
                    {[...ranking].sort((a,b) => b.avgRuntime - a.avgRuntime).map((entry) => {
                        return (
                            <li>
                                <div className="list-entry">
                                        <p>{entry.name}</p>
                                        <p>{`${entry.avgRuntime} min`}</p>
                                </div>
                            </li>
                        )
                    })}
                </ol>
            </div>
            <div className="person-ranking-list">
                <p>Average Rating Ranking</p>
                <ol>
                    {[...ranking].sort((a,b) => b.avgRating - a.avgRating).map((entry) => {
                        return (
                            <li>
                                <div className="list-entry">
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
        className="clear-button"
        aria-label="clear lists"
        onClick={handleClearLists} >
            Clear Lists
        </button>
    </>
    );
};

export default ListRanking;