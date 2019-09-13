import { put, takeLatest } from 'redux-saga/effects';

import {
  GET_MOVIES,
  GET_MOVIES_SUCCESS,
  FIND_MOVIE,
  FIND_MOVIE_SUCCESS,
} from './constants';
import { API_URL, API_KEY, API_LANGUAGE } from '../../../constants';

export function* getMovies(action) {
  const requestURL = `${API_URL}movie/popular?${API_KEY}&${API_LANGUAGE}&page=${action.page}`;

  const response = yield fetch(requestURL)
    .then((res) => res.json())
    .catch((error) => error);

  yield put({
    type: GET_MOVIES_SUCCESS,
    payload: response,
  });
}

export function* findMovie(action) {
  const requestURL = `${API_URL}search/movie?${API_KEY}&${API_LANGUAGE}&query=${action.searchText}&page=${action.page}&include_adult=false`;

  const response = yield fetch(requestURL)
    .then((res) => res.json())
    .catch((error) => error);

  yield put({
    type: FIND_MOVIE_SUCCESS,
    payload: response,
  });
}


export default function* defaultSaga() {
  yield takeLatest(GET_MOVIES, getMovies);
  yield takeLatest(FIND_MOVIE, findMovie);
}
