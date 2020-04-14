import { all, takeLatest, call, put } from 'redux-saga/effects';
import api from '~/Services/api';

import {loaded, getWorkFlow, setWorkFlow, setActualWorkFlow} from './actions'
import {getHisWorkflow} from '../Employees/actions'

export function* newWf({payload}) {
  try {
    const res = yield call(api.post, 'workflow', payload);
    yield put(loaded());
    yield put(getWorkFlow());
  } catch (error) {
    console.tron.log(error);
  }
}
export function* putWf({payload}) {
  try {
    yield call(api.put, `workflow/${payload.id}`, payload);
    yield put(loaded());
    yield put()
    yield put(getWorkFlow());
    yield put(getHisWorkflow(payload.emp));

  } catch (error) {
    console.tron.log(error);
  }
}
export function* delWf({payload}) {
  try {
    yield call(api.delete, `workflow/${payload.id}`);
    yield put(loaded());
    yield put(getWorkFlow());
  } catch (error) {
    console.tron.log(error);
  }
}

export function* getWf() {
  try {
    const res = yield call(api.get, `workflows`);
    yield put(loaded());
    yield put(setWorkFlow(res.data));
  } catch (error) {
    console.tron.log(error);
  }
}

export function* getById({payload}) {
  try {
    const res = yield call(api.get, `workflow/${payload.id}`);
        yield put(loaded());
    
    const rows = yield res.data.stored.map(store => {
        const buy_price = store.material.buy_price
        const sell_price = store.material.sell_price
        const brute = (sell_price - buy_price) * store.amount
        const liquid = brute - (res.data.employee.salary / res.data.stored.length)
        return {
            id: store.id,
            material: store.material.name,
            amount: store.amount,
            buy_price,
            sell_price,
            brute,
            liquid,
        }
    })
    yield put(setActualWorkFlow({rows, name: res.data.employee.name, date: res.data.createdAt}));
  } catch (error) {
    console.tron.log(error);
  }
}


export default all([
  takeLatest('@wf/NEW', newWf),
  takeLatest('@wf/ALL', getWf),
  takeLatest('@wf/ONE', getById),
  takeLatest('@wf/PUT', putWf),
  takeLatest('@wf/DEL', delWf),
]);
