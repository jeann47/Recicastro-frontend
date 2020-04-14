export function loaded() {
    return {
        type: '@st/LOADED'
    }
}

export function addStorage(material_id, amount, employee_id, date, sold) {
  return {
    type: '@st/NEW',
    payload: { material_id, amount, employee_id, date, sold },
  };
}

export function updateStorage(id, sold) {
  return {
    type: '@st/PUT',
    payload: { id, sold },
  };
}

export function deleteStorage(id) {
  return {
    type: '@st/DEL',
    payload: { id },
  };
}

export function addStorageSuccess(storage) {
    return {
        type: '@st/NEW/SUCCESS',
        payload: {storage}
    }
}

export function getStorage() {
    return {
        type: '@st/ALL'
    }
}

export function setStorage(storages) {
    return {
        type: '@st/ALL/SET',
        payload: {storages}
    }
}
