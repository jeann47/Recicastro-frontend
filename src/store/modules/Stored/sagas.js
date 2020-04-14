import { all, takeLatest, call, put } from 'redux-saga/effects';
import {isSameDay} from 'date-fns'
import {useSelector} from 'react-redux'
import api from '~/Services/api';

import {loaded, getStorage, setStorage} from './actions'

export function* newSt({payload}) {
  try {    
    const res = yield call(api.post, 'storage', payload);
    yield put(loaded());
    yield put(getStorage());
  } catch (error) {
    console.tron.log(error);
  }
}
export function* putSt({payload}) {
  try {
    yield call(api.put, `storage/${payload.id}`, payload);
    yield put(loaded());
    yield put(getStorage());
  } catch (error) {
    console.tron.log(error);
  }
}
export function* delSt({payload}) {
  try {
    yield call(api.delete, `storage/${payload.id}`);
    yield put(loaded());
    yield put(getStorage());
  } catch (error) {
    console.tron.log(error);
  }
}

export function* getSt() {
  try {
    const res = yield call(api.get, `storages`);
    yield put(loaded());
    yield put(setStorage(res.data));
  } catch (error) {
    console.tron.log(error);
  }
}



export default all([
  takeLatest('@st/NEW', newSt),
  takeLatest('@st/ALL', getSt),
  takeLatest('@st/PUT', putSt),
  takeLatest('@st/DEL', delSt),
]);
