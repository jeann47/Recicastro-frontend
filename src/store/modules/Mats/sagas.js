import { all, takeLatest, call, put } from 'redux-saga/effects';
import api from '~/Services/api';

import {loaded, getMats, setMats} from './actions'

export function* newMat({payload}) {
  try {
    const res = yield call(api.post, 'material', payload);
    yield put(loaded());
    yield put(getMats());
  } catch (error) {
    console.tron.log(error);
  }
}

export function* delMat({payload}) {
  try {
    yield call(api.delete, `material/${payload.id}`);
    yield put(loaded());
    yield put(getMats());
  } catch (error) {
    console.tron.log(error);
  }
}
export function* putMat({payload}) {
  try {
    yield call(api.put, `material/${payload.id}`, payload);
    yield put(loaded());
    yield put(getMats());
  } catch (error) {
    console.tron.log(error);
  }
}

export function* getMat() {
  try {
    const res = yield call(api.get, `materials`);
    yield put(loaded());
    yield put(setMats(res.data));
  } catch (error) {
    console.tron.log(error);
  }
}


export default all([
  takeLatest('@mats/NEW', newMat),
  takeLatest('@mats/DEL', delMat),
  takeLatest('@mats/ALL', getMat),
  takeLatest('@mats/PUT', putMat),
]);
