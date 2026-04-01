const EXCLUDED_GENRE_IDS = [99, 10770];
const EXCLUDED_TITLE = "Final Cut: Ladies and Gentlemen";

const CREW_JOB_MAP = {
    "Director": "Director",
    "Composer": "Original Music Composer",
    "Cinematographer": "Director of Photography",
};

/**
 * Filters a cast array: removes documentaries, TV movies, uncredited roles,
 * and the known excluded title.
 */
export const filterCastCredits = (cast) =>
    cast.filter(movie =>
        !EXCLUDED_GENRE_IDS.some(id => movie.genre_ids.includes(id)) &&
        movie.original_title !== EXCLUDED_TITLE &&
        !movie.character.includes("uncredited")
    );

/**
 * Filters a crew array by job title, excluding documentaries and TV movies.
 */
export const filterCrewByJob = (crew, job) =>
    crew.filter(movie =>
        !EXCLUDED_GENRE_IDS.some(id => movie.genre_ids.includes(id)) &&
        movie.job === job
    );

/**
 * High-level helper: selects the right filter based on role and
 * returns an array of { id } objects ready to pass to getMovieDetails.
 */
export const filterCreditsByRole = (credits, role) => {
    if (role === "Actor/Actress") {
        return filterCastCredits(credits.cast).map(m => ({ id: m.id }));
    }
    const job = CREW_JOB_MAP[role];
    if (job) {
        return filterCrewByJob(credits.crew, job).map(m => ({ id: m.id }));
    }
    return [];
};

/**
 * Filters detailed movie objects to only include proper theatrical releases
 * with enough votes to be meaningful.
 */
export const filterMovieDetails = (details) =>
    details.filter(movie =>
        movie &&
        movie.runtime > 60 &&
        movie.runtime < 247 &&
        movie.vote_average > 0 &&
        movie.vote_count > 140
    );
