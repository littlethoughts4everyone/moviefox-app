import { GENRES, STUDIOS } from "../util/genre_studio_data";

function PeopleTriviaResults({ name, genreCount, studioCount, isLoading, hasSearched, showGenreMovieList, showStudioMovieList }) {

    const maxGenreCount = Math.max(...Object.values(genreCount));
    const maxStudioCount = Math.max(...Object.values(studioCount));

    return (
        <div className="diagram-container">
            {isLoading && (
                <p>Searching...</p>
            )}

            {hasSearched && Object.keys(genreCount).length === 0 && (
                <p className="empty-message">No movies found</p>
            )}

            {hasSearched && Object.keys(genreCount).length > 0 && (
                <>
                    <div className="chart-container">
                        <p className="text-shadow">{`Genres of ${name} movies:`}</p>
                        <div id="results-chart-one">
                            <table className="charts-css bar show-labels show-data">
                                <tbody>
                                {Object.entries(genreCount)
                                .filter(([, count]) => count > 0)
                                .sort(([, a], [, b]) => b - a)
                                .map(([key, count]) => {
                                    const size = count / maxGenreCount;

                                    return (
                                        <tr key={key}>
                                            <th scope="row">{GENRES[key].label}</th>
                                            <td className="clickable-cell" style={{ "--size": size }} onClick={() => showGenreMovieList(key)}> <span className="data">{count.toLocaleString()}</span> </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="chart-container">
                        <p className="text-shadow">{`Production companies of ${name} movies:`}</p>
                        <div id="results-chart-two">
                            <table className="charts-css bar show-labels show-data">
                                <tbody>
                                {Object.entries(studioCount)
                                .filter(([, count]) => count > 0)
                                .sort(([, a], [, b]) => b - a)
                                .map(([key, count]) => {
                                    const size = count / maxStudioCount;

                                    return (
                                        <tr key={key} className="clickable-cell">
                                            <th scope="row">{STUDIOS[key].label}</th>
                                            <td style={{ "--size": size }} onClick={() => showStudioMovieList(key)}> <span className="data">{count.toLocaleString()}</span> </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default PeopleTriviaResults;