import produce from 'immer';

const INITIAL_STATE = {
    transactions: {
        all: [],
        sum: 0
    },
  loading: false,
};

export default function Transactions(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
        case '@tr/LOADED': {
            draft.loading = false;
            break;
        }
        case '@tr/NEW': {
            draft.loading = true;
            break;
        }

        case '@tr/NEW/SUCCESS': {
            draft.transactions.push(action.payload.transaction)
            break;
        }

        case '@tr/PUT': {
            draft.loading = true;
            break;
        }
        case '@tr/DEL': {
            draft.loading = true;
            break;
        }
        
        case '@tr/ALL': {
            draft.loading = true;
            break;
        }
        
        case '@tr/ALL/SET': {
            draft.transactions = action.payload.transactions
            break;
        }
        
        default:
    }
  });
}
