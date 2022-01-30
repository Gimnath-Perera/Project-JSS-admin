import { put, call, takeEvery } from 'redux-saga/effects';
import _ from 'lodash';

import {
  START_LOADING,
  END_LOADING,
  SET_ERROR_MESSAGE,
  FETCH_JOB_LIST,
  SET_JOB_LIST,
  FETCH_JOB_BY_ID,
  SET_CURRENT_JOB,
  ADD_JOB,
  UPDATE_JOB
} from '../../constants/common-constant';
import {
  fetchJobListApi,
  fetchJobByIdApi,
  createJobApi,
  updateJobApi
} from '../../apis/job.api';

export function* fetchJobList(): any {
  try {
    yield put({ type: START_LOADING });

    const response = yield call(fetchJobListApi);

    yield put({ type: SET_JOB_LIST, payload: response.data.data });

    yield put({ type: END_LOADING });
  } catch (error) {
    yield put({ type: END_LOADING });
    const message = 'Something went wrong. Please try again';
    yield put({ type: SET_ERROR_MESSAGE, payload: message });
  }
}

export function* fetchJobById({
  payload
}: {
  type: typeof FETCH_JOB_BY_ID;
  payload: any;
}): any {
  try {
    yield put({ type: SET_CURRENT_JOB, payload: {} });

    yield put({ type: START_LOADING });

    const response = yield call(fetchJobByIdApi, payload);

    yield put({ type: SET_CURRENT_JOB, payload: response?.data?.data });

    yield put({ type: END_LOADING });
  } catch (error) {
    yield put({ type: END_LOADING });
    const message = 'Something went wrong. Please try again';
    yield put({ type: SET_ERROR_MESSAGE, payload: message });
  }
}

export function* createJob({
  payload
}: {
  type: typeof ADD_JOB;
  payload: any;
}): any {
  try {
    yield put({ type: START_LOADING });

    const newWorker = yield call(createJobApi, payload);

    if (newWorker.data) {
      yield put({ type: FETCH_JOB_LIST });
    }

    yield put({ type: END_LOADING });
  } catch (error) {
    const message = 'Worker add failed';
    yield put({ type: SET_ERROR_MESSAGE, payload: message });
    yield put({ type: END_LOADING });
  }
}

export function* updateJob({
  payload
}: {
  type: typeof UPDATE_JOB;
  payload: any;
}): any {
  try {
    yield put({ type: START_LOADING });

    const response = yield call(updateJobApi, payload);

    yield put({ type: SET_CURRENT_JOB, payload: response.data.data });

    yield put({ type: END_LOADING });
  } catch (error) {
    const message = 'Job add failed';
    yield put({ type: SET_ERROR_MESSAGE, payload: message });
    yield put({ type: END_LOADING });
  }
}

function* jobSaga() {
  yield takeEvery(FETCH_JOB_LIST, fetchJobList);
  yield takeEvery(FETCH_JOB_BY_ID, fetchJobById);
  yield takeEvery(ADD_JOB, createJob);
  yield takeEvery(UPDATE_JOB, updateJob);
}

export default jobSaga;
