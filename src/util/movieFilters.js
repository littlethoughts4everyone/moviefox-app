// removes documentaries and TV movies
const EXCLUDED_GENRE_IDS = [99, 10770];
const EXCLUDED_TITLES = ["Final Cut: Ladies and Gentlemen", "To Each His Own Cinema"];

const CREW_JOB_MAP = {
    "Director": "Director",
    "Composer": "Original Music Composer",
    "Cinematographer": "Director of Photography",
};

export const filterCastCredits = (cast) =>
    cast.filter(movie =>
        !EXCLUDED_GENRE_IDS.some(id => movie.genre_ids.includes(id)) &&
        !EXCLUDED_TITLES.some(title => movie.title.includes(title)) &&
        !movie.character.includes("uncredited") &&
        movie.vote_average > 0 &&
        movie.vote_count > 140
    );

// filters crew array by job title
export const filterCrewByJob = (crew, job) =>
    crew.filter(movie =>
        movie.job === job &&
        !EXCLUDED_GENRE_IDS.some(id => movie.genre_ids.includes(id)) &&
        !EXCLUDED_TITLES.some(title => movie.title.includes(title)) &&
        movie.vote_average > 0 &&
        movie.vote_count > 140
    );

// selects right filter based on role and returns array of { id } objects ready to pass to getMovieDetails
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

// filters movie objects to only include proper theatrical releases with enough votes to be meaningful
export const filterMovieDetails = (details) =>
    details.filter(movie =>
        movie &&
        movie.runtime > 60 &&
        movie.runtime < 247
    );
