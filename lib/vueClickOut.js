import { validate } from './validate.js'
import { executorFactory } from './executorFactory.js'

export function bind (el, binding) {
  if (!validate(binding.value)) {
    return
  }

  const handleOutsideClick = executorFactory(el, binding.value)

  el.__vueOutsideHandler__ = { handleOutsideClick }
  // Register click/touchstart event listeners on the whole page
  document.addEventListener('click', handleOutsideClick)
  document.addEventListener('touchstart', handleOutsideClick)
}

export function unbind (el) {
  document.removeEventListener('click', el.__vueOutsideHandler__.handleOutsideClick)
  document.removeEventListener('touchstart', el.__vueOutsideHandler__.handleOutsideClick)
  delete el.__vueOutsideHandler__
}

export function update (el, binding, vnode, oldVnode) {
  unbind(el)
  bind(el, binding)
}
