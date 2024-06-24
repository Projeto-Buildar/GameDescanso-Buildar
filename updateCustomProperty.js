// Função para obter o valor de uma propriedade customizada de um elemento
export function getCustomProperty(elem, prop) {
  return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0
}

// Função para definir o valor de uma propriedade customizada de um elemento
export function setCustomProperty(elem, prop, value) {
  elem.style.setProperty(prop, value)
}

// Função para incrementar o valor de uma propriedade customizada de um elemento
export function incrementCustomProperty(elem, prop, inc) {
  setCustomProperty(elem, prop, getCustomProperty(elem, prop) + inc)
}
