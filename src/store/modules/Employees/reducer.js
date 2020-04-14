import produce from 'immer';

const INITIAL_STATE = {
    employees: [],
    workflow: [],
    loading: false,
};

export default function Employee(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
        case '@emp/LOADED': {
            draft.loading = false;
            break;
        }
        case '@emp/NEW': {
            draft.loading = true;
            break;
        }

        case '@emp/NEW/SUCCESS': {
            draft.employees.push(action.payload.employee)
            break;
        }

        case '@emp/ALL': {
            draft.loading = true;
            break;
        }
        case '@emp/PUT': {
            draft.loading = true;
            break;
        }
        case '@emp/DEL': {
            draft.loading = true;
            break;
        }
        case '@emp/wf/GET': {
            draft.loading = true;
            break;
        }
        case '@emp/wf/SET': {
            draft.workflow = action.payload.workflow;
            break;
        }
        
        case '@emp/ALL/SET': {
            draft.employees = action.payload.employees
            break;
        }
        
        default:
    }
  });
}
