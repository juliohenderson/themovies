import { GET_MOVIES } from './constants';

export function getMovies(page) {
  return {
    type: GET_MOVIES,
    page,
  };
}
