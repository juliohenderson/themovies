import { fork, all } from 'redux-saga/effects';

import homeSaga from '../scenes/home/redux/saga';
export default function* root() {
  yield all([
    fork(homeSaga),
  ]);
}
