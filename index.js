import { createBind, createUnbind, createUpdate } from './vueClickOutFactory'

export const VueClickOut = {
  bind: createBind(document),
  update: createUpdate(document),
  unbind: createUnbind(document)
}
