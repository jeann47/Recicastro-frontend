import { combineReducers } from 'redux';

import mats from './Mats/reducer';
import transactions from './Transactions/reducer';
import employees from './Employees/reducer';
import WorkFlow from './WorkFlow/reducer';
import Storage from './Stored/reducer';

export default combineReducers({ mats, transactions, employees, WorkFlow, Storage });
