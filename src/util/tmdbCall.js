const tmdbBaseUrl = 'https://api.themoviedb.org/3';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhM2U4ZjM2ZDdkZjEyYzMzNjA3ZGQ5OTY4YzlhMzg4YiIsIm5iZiI6MTcyNTM5MDk5NS44NDQsInN1YiI6IjY2ZDc2MDkzMzA4ODY3N2NiYzQ0NTEwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EmJgsH9K4k-27ag8B8CgSb587X4XfGotxpz38jL7gaQ'
  }
};

export const searchPerson = async (name) => {
  const encodedName = encodeURIComponent(name.trim());

  try {
    const res = await fetch(
      `${tmdbBaseUrl}/search/person?query=${encodedName}&include_adult=false&language=en-US&page=1`,
      options
    );

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
      `${tmdbBaseUrl}/search/movie?query=${encodedSearchTerm}&include_adult=false&language=en-US&page=1'`,
      options
    );

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
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const res = await fetch(
      `${tmdbBaseUrl}/movie/${movieId}?language=en-US`,
      options
    );
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};




