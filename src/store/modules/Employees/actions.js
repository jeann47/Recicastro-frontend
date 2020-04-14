export function loaded() {
    return {
        type: '@emp/LOADED'
    }
}

export function addEmployee(name, salary) {
  return {
    type: '@emp/NEW',
    payload: { name, salary },
  };
}

export function addEmployeeSuccess(employee) {
    return {
        type: '@emp/NEW/SUCCESS',
        payload: {employee}
    }
}

export function getEmployee() {
    return {
        type: '@emp/ALL'
    }
}

export function getHisWorkflow(id) {
    return {
        type: '@emp/wf/GET',
        payload: {id}
    }
}

export function setHisWorkflow(workflow) {
    return {
        type: '@emp/wf/SET',
        payload: {workflow}
    }
}

export function updateEmployee(id, name, salary) {
    return {
        type: '@emp/PUT',
        payload: { id, name, salary },
    }
}
export function deleteEmployee(id) {
    return {
        type: '@emp/DEL',
        payload: { id },
    }
}

export function setEmployee(employees) {
    return {
        type: '@emp/ALL/SET',
        payload: {employees}
    }
}
