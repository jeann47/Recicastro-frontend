import produce from 'immer';

const INITIAL_STATE = {
    storages: [],
    loading: false,
};

export default function Storage(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
        case '@st/LOADED': {
            draft.loading = false;
            break;
        }
        case '@st/NEW': {
            draft.loading = true;
            break;
        }

        case '@st/NEW/SUCCESS': {
            draft.storages.push(action.payload.storage)
            break;
        }

        case '@st/PUT': {
            draft.loading = true;
            break;
        }
        case '@st/DEL': {
            draft.loading = true;
            break;
        }
        
        case '@st/ALL': {
            draft.loading = true;
            break;
        }
        
        case '@st/ALL/SET': {
            draft.storages = action.payload.storages
            break;
        }
        
        default:
    }
  });
}
