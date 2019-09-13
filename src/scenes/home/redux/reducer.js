import {
  GET_MOVIES,
  GET_MOVIES_SUCCESS,
  FIND_MOVIE_SUCCESS,
  HANDLE_CHANGE,
} from './constants';

const initialState = {
  list: [],
  page: 0,
  totalPages: 0,
  totalResults: 0,
  searchText: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_MOVIES:
      return state;

    case HANDLE_CHANGE:
      return {
        ...state,
        searchText: action.searchText,
      };

    case GET_MOVIES_SUCCESS:
      return {
        ...state,
        list: action.payload.page > 1
          ? [...state.list, ...action.payload.results] : action.payload.results,
        page: action.payload.page,
        totalPages: action.payload.total_pages,
        totalResults: action.payload.total_results,
      };

    case FIND_MOVIE_SUCCESS:
      return {
        ...state,
        list: action.payload.page > 1
          ? [...state.list, ...action.payload.results] : action.payload.results,
        page: action.payload.page,
        totalPages: action.payload.total_pages,
        totalResults: action.payload.total_results,
      };

    default:
      return state;
  }
}
