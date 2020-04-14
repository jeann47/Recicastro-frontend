import React, {useEffect} from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Main from '~/Pages/Main';
import Balance from '~/Pages/Balance';
import Material from '~/Pages/Material';
import Employee from '~/Pages/Employee';
import WorkFlow from '~/Pages/WorkFlow';

import {getEmployee} from '~/store/modules/Employees/actions'
import {getMats} from '~/store/modules/Mats/actions'
import {getWorkFlow} from '~/store/modules/WorkFlow/actions'
import {getStorage} from '~/store/modules/Stored/actions'
import {getTr} from '~/store/modules/Transactions/actions'

export default function Routes() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getStorage())
        dispatch(getEmployee())
        dispatch(getMats())
        dispatch(getWorkFlow())
        dispatch(getTr())
    }, [])
  return (
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/balance" component={Balance} />
      <Route path="/mats" component={Material} />
      <Route path="/func" component={Employee} />
      <Route path="/workflow" component={WorkFlow} />
    </Switch>
  );
}
