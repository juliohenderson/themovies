import { GET_MOVIES, FIND_MOVIE, HANDLE_CHANGE } from './constants';

export function getMovies(page) {
  return {
    type: GET_MOVIES,
    page,
  };
}

export function findMovie(searchText, page) {
  return {
    type: FIND_MOVIE,
    searchText,
    page,
  };
}

export function handleChange(searchText) {
  return {
    type: HANDLE_CHANGE,
    searchText,
  };
}
