import { all, takeLatest, call, put } from 'redux-saga/effects';
import api from '~/Services/api';

import {loaded, setEmployee, setHisWorkflow, getEmployee} from './actions'

export function* newEmployee({payload}) {
  try {
    const res = yield call(api.post, 'employee', payload);
    yield put(loaded());
    yield put(getEmployee());
  } catch (error) {
    console.tron.log(error);
  }
}

export function* getEmployees() {
  try {
    const res = yield call(api.get, `employees`);
    yield put(loaded());
    yield put(setEmployee(res.data));
  } catch (error) {
    console.tron.log(error);
  }
}
export function* putEmployee({payload}) {
  try {
    yield call(api.put, `employee/${payload.id}`, payload);
    yield put(loaded());
    yield put(getEmployee());
  } catch (error) {
    console.tron.log(error);
  }
}

export function* delEmployee({payload}) {
  try {
    yield call(api.delete, `employee/${payload.id}`, payload);
    yield put(loaded());
    yield put(getEmployee());
  } catch (error) {
    console.tron.log(error);
  }
}
export function* getEmployeeWorkFlow({payload}) {
  try {
    const res = yield call(api.get, `employee/${payload.id}`);
    yield put(loaded());
    const table = yield res.data.workflows.map(day => {
        let ammo = 0;
        day.stored.forEach(store => ammo += store.amount)
        return  {
            id: day.id,
            date: day.createdAt,
            paid: day.paid ? 'Pago' : 'Não pago',
            stored: day.stored.length, 
            stored_amount: ammo
        }
    })
    yield put(setHisWorkflow(table));
  } catch (error) {
    console.tron.log(error);
  }
}


export default all([
  takeLatest('@emp/NEW', newEmployee),
  takeLatest('@emp/ALL', getEmployees),
  takeLatest('@emp/wf/GET', getEmployeeWorkFlow),
  takeLatest('@emp/PUT', putEmployee),
  takeLatest('@emp/DEL', delEmployee),
]);
