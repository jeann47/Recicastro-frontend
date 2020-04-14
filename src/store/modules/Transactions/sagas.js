import { all, takeLatest, call, put } from 'redux-saga/effects';
import api from '~/Services/api';

import {loaded, getTr, setTr, addTransactionSuccess} from './actions'

export function* newTr({payload}) {
  try {
    yield call(api.post, 'transaction', payload);
    yield put(loaded());
    yield put(getTr());
  } catch (error) {
    console.tron.log(error);
  }
}
export function* putTra({payload}) {
  try {
    yield call(api.put, `transaction/${payload.id}`, payload);
    yield put(loaded());
    yield put(getTr());
  } catch (error) {
    console.tron.log(error);
  }
}
export function* delTra({payload}) {
  try {
    yield call(api.delete, `transaction/${payload.id}`);
    yield put(loaded());
    yield put(getTr());
  } catch (error) {
    console.tron.log(error);
  }
}

export function* getTra() {
  try {
    const res = yield call(api.get, `transactions`);
    yield put(loaded());
    yield put(setTr(res.data));
  } catch (error) {
    console.tron.log(error);
  }
}


export default all([
  takeLatest('@tr/NEW', newTr),
  takeLatest('@tr/ALL', getTra),
  takeLatest('@tr/PUT', putTra),
  takeLatest('@tr/DEL', delTra),
]);
