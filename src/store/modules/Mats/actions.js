export function loaded() {
    return {
        type: '@mats/LOADED'
    }
}

export function addMaterial(name, type, sell_price) {
  return {
    type: '@mats/NEW',
    payload: { name, type, sell_price },
  };
}

export function addMatSuccess(material) {
    return {
        type: '@mats/NEW/SUCCESS',
        payload: {material}
    }
}

export function deleteMaterial(id) {
    return {
        type: '@mats/DEL',
        payload: {id}
    }
}
export function updateMaterial(id, name, type, sell_price) {
    return {
        type: '@mats/PUT',
        payload: {id, name, type, sell_price}
    }
}

export function getMats() {
    return {
        type: '@mats/ALL'
    }
}

export function setMats(materials) {
    return {
        type: '@mats/ALL/SET',
        payload: {materials}
    }
}
