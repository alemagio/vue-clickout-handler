import { validate } from "./util/validate"
import { handleOutsideClickFactory } from './util/handlerFactory'

export function createBind (document) {
  return  (el, binding) => {
    if (!validate(binding.value)) {
      return;
    }

    const handleOutsideClick = handleOutsideClickFactory(el, binding.value, document)

    el.__vueOutsideHandler__ = { handleOutsideClick }
    // Register click/touchstart event listeners on the whole page
    document.addEventListener('click', handleOutsideClick)
    document.addEventListener('touchstart', handleOutsideClick)
  }
}

export function createUnbind (document) {
  return (el) => {
    document.removeEventListener('click', el.__vueOutsideHandler__.handleOutsideClick)
    document.removeEventListener('touchstart', el.__vueOutsideHandler__.handleOutsideClick)
    delete el.__vueOutsideHandler__
  }
}

export function createUpdate (document) {
  return (el, binding, vnode, oldVnode) => {
    document.removeEventListener('click', el.__vueOutsideHandler__.handleOutsideClick)
    document.removeEventListener('touchstart', el.__vueOutsideHandler__.handleOutsideClick)
    delete el.__vueOutsideHandler__

    const handleOutsideClick = handleOutsideClickFactory(el, binding.value, document)

    el.__vueOutsideHandler__ = { handleOutsideClick }
    // Register click/touchstart event listeners on the whole page
    document.addEventListener('click', handleOutsideClick)
    document.addEventListener('touchstart', handleOutsideClick)
  }
}
