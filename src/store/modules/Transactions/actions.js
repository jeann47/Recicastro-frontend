export function loaded() {
    return {
        type: '@tr/LOADED'
    }
}

export function addTransaction(material_id, in_out, price, amount, note) {
  return {
    type: '@tr/NEW',
    payload: { material_id, in_out, price, amount, note },
  };
}

export function updateTransaction(id, material_id, in_out, price, amount, note) {
  return {
    type: '@tr/PUT',
    payload: { id, material_id, in_out, price, amount, note },
  };
}

export function deleteTransaction(id) {
  return {
    type: '@tr/DEL',
    payload: { id },
  };
}

export function addTransactionSuccess(transaction) {
    return {
        type: '@tr/NEW/SUCCESS',
        payload: {transaction}
    }
}

export function getTr() {
    return {
        type: '@tr/ALL'
    }
}

export function setTr(transactions) {
    return {
        type: '@tr/ALL/SET',
        payload: {transactions}
    }
}
