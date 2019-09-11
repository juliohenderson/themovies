import { GET_MOVIES, GET_MOVIES_SUCCESS } from './constants';

const initialState = {
  list: [],
  page: 0,
  total_pages: 0,
  total_results: 0,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_MOVIES:
      return state;

    case GET_MOVIES_SUCCESS:
      return {
        ...state,
        list: [...state.list, ...action.payload.results],
        page: action.payload.page,
        total_pages: action.payload.total_pages,
        total_results: action.payload.total_results,
      };

    default:
      return state;
  }
}
