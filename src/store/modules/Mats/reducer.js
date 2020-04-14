import produce from 'immer';

const INITIAL_STATE = {
  materials: [],
  loading: false,
};

export default function Mats(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
        case '@mats/LOADED': {
            draft.loading = false;
            break;
        }
        case '@mats/NEW': {
            draft.loading = true;
            break;
        }

        case '@mats/DEL': {
            draft.loading = true;
            break;
        }
        case '@mats/PUT': {
            draft.loading = true;
            break;
        }

        case '@mats/NEW/SUCCESS': {
            draft.materials.push(action.payload.material)
            break;
        }

        case '@mats/ALL': {
            draft.loading = true;
            break;
        }
        
        case '@mats/ALL/SET': {
            draft.materials = action.payload.materials
            break;
        }
        
        default:
    }
  });
}
