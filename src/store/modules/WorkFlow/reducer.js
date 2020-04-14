import produce from 'immer';

const INITIAL_STATE = {
    workflows: [],
    workflow: {},
    loading: false,
};

export default function WorkFlow(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
        case '@wf/LOADED': {
            draft.loading = false;
            break;
        }
        case '@wf/NEW': {
            draft.loading = true;
            break;
        }

        case '@wf/NEW/SUCCESS': {
            draft.workflows.push(action.payload.workflow)
            break;
        }

        case '@wf/PUT': {
            draft.loading = true;
            break;
        }
        case '@wf/DEL': {
            draft.loading = true;
            break;
        }
        
        case '@wf/ALL': {
            draft.loading = true;
            break;
        }
        case '@wf/ONE': {
            draft.loading = true;
            break;
        }
        
        case '@wf/ALL/SET': {
            draft.workflows = action.payload.workflows
            break;
        }
        case '@wf/ONE/SET': {
            draft.workflow = action.payload.workflow
            break;
        }
        
        default:
    }
  });
}
