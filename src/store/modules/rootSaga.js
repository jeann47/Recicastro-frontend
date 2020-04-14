import { all } from 'redux-saga/effects';

import mats from './Mats/sagas';
import transactions from './Transactions/sagas';
import employees from './Employees/sagas';
import WorkFlow from './WorkFlow/sagas';
import Storage from './Stored/sagas';

export default function* rootSaga() {
  return yield all([mats, transactions, employees, WorkFlow, Storage]);
}
