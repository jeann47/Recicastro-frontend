export function loaded() {
    return {
        type: '@tr/LOADED'
    }
}

export function addWorkFlow(employee_id) {
  return {
    type: '@wf/NEW',
    payload: { employee_id },
  };
}

export function updateWorkFlow(emp, id, paid) {
  return {
    type: '@wf/PUT',
    payload: { emp, id, paid },
  };
}

export function deleteWorkFlow(id) {
  return {
    type: '@wf/DEL',
    payload: { id },
  };
}

export function addWorkFlowSuccess(workflow) {
    return {
        type: '@wf/NEW/SUCCESS',
        payload: {workflow}
    }
}

export function getWorkFlow() {
    return {
        type: '@wf/ALL'
    }
}

export function getWorkFlowById(id) {
    return {
        type: '@wf/ONE',
        payload: {id}
    }
}

export function setActualWorkFlow(workflow) {
    return {
        type: '@wf/ONE/SET',
        payload: {workflow}
    }
}
export function setWorkFlow(workflows) {
    return {
        type: '@wf/ALL/SET',
        payload: {workflows}
    }
}
