import test from 'ava'
import { bind, unbind, update } from '../lib/vueClickOut.js'
import { executorFactory } from '../lib/executorFactory.js'

test('it should return if binding is not valid', t => {
  t.plan(1)

  const el = {}
  const binding = {}

  bind(el, binding)
  t.pass()
})

test('it should register listeners when value is a function', t => {
  t.plan(3)

  global.document = {
    addEventListener (eventName, cb) {
      t.pass()
    }
  }

  const el = {}
  const binding = {
    value: () => {}
  }

  bind(el, binding)

  t.is(
    el.__vueOutsideHandler__.handleOutsideClick.toString(),
    executorFactory(el, binding.value).toString()
  )
})

test('it should remove listeners', t => {
  t.plan(3)

  global.document = {
    removeEventListener (eventName, cb) {
      t.pass()
    }
  }

  const el = {
    __vueOutsideHandler__: {
      handleOutsideClick: 'not empty'
    }
  }
  const binding = {
    value: () => {}
  }

  unbind(el)

  t.is(
    el.__vueOutsideHandler__,
    undefined
  )
})


test('it should reset listeners', t => {
  t.plan(5)

  global.document = {
    addEventListener (eventName, cb) {
      t.pass()
    },
    removeEventListener (eventName, cb) {
      t.pass()
    }
  }

  const el = {
    __vueOutsideHandler__: {
      handleOutsideClick: 'not empty'
    }
  }
  const binding = {
    value: () => {}
  }

  update(el, binding)

  t.is(
    el.__vueOutsideHandler__.handleOutsideClick.toString(),
    executorFactory(el, binding.value).toString()
  )
})
