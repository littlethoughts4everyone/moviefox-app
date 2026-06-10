const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const movieCache = new Map();

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
  }
};

export const searchPerson = async (name) => {
  const encodedName = encodeURIComponent(name.trim());

  try {
    const res = await fetch(
      `${tmdbBaseUrl}/search/person?query=${encodedName}&include_adult=false&language=en-US&page=1`,
      options
    );

    if (!res.ok) {
      return null;
    }

    const data = await res.json();

    if (!data.results || data.results.length === 0) {
      return null;
    }

    return data.results[0].id;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const searchMovies = async (searchTerm) => {
  const encodedSearchTerm = encodeURIComponent(searchTerm.trim());

  try {
    const res = await fetch(
      `${tmdbBaseUrl}/search/movie?query=${encodedSearchTerm}&include_adult=false&language=en-US&page=1`,
      options
    );

     if (!res.ok) {
      return null;
    }

    const data = await res.json();

    if (!data.results || data.results.length === 0) {
      return null;
    }

    return data.results;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export const getMovieCredits = async (personId) => {
  try {
    const res = await fetch(
      `${tmdbBaseUrl}/person/${personId}/movie_credits?language=en-US`,
      options
    );

     if (!res.ok) {
      return null;
    }

    return await res.json();

  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getMovieDetails = async (movieId) => {

   if (movieCache.has(movieId)) {
    return movieCache.get(movieId);
  }

  try {
    const res = await fetch(
      `${tmdbBaseUrl}/movie/${movieId}?language=en-US`,
      options
    );

     if (!res.ok) {
      return null;
    }

    const data = await res.json();

    movieCache.set(movieId, data);

    return data;

  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getNowPlaying = async () => {

  try {
    const res = await fetch(
      `${tmdbBaseUrl}/movie/now_playing`,
      options
    );

     if (!res.ok) {
      return null;
    }

    const data = await res.json();

    return data.results;

  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getPopular = async () => {

  try {
    const res = await fetch(
      `${tmdbBaseUrl}/movie/upcoming`,
      options
    );

     if (!res.ok) {
      return null;
    }

    const data = await res.json();

    return data.results;

  } catch (err) {
    console.error(err);
    return null;
  }
};




