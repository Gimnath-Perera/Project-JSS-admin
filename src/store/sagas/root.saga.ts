import { all } from 'redux-saga/effects';

import AuthSaga from './auth.saga';
import CommonSaga from './common.saga';
import WorkerSaga from './worker.saga';

export default function* rootSaga() {
  yield all([AuthSaga(), CommonSaga(), WorkerSaga()]);
}
