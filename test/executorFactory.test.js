import test from 'ava'
import { executorFactory } from '../lib/executorFactory.js'

test('handler only: it should not execute handler if clicked inside el', t => {
  t.plan(1)

  global.document = {
    querySelectorAll (excluded) {
      return []
    }
  }
  const event = {
    target: 'target',
    stopPropagation () {
      t.pass()
    }
  }
  const el = {
    contains (target) {
      return true
    }
  }
  const handler = () => t.fail('should not be here')

  executorFactory(el, handler)(event)
})

test('handler only: it should execute handler if clicked outside el', t => {
  t.plan(2)

  global.document = {
    querySelectorAll (excluded) {
      return []
    }
  }
  const event = {
    target: 'target',
    stopPropagation () {
      t.pass()
    }
  }
  const el = {
    contains (target) {
      return false
    }
  }
  const handler = () => t.pass()

  executorFactory(el, handler)(event)
})

test('options handler: it should not execute handler if clicked inside el', t => {
  t.plan(1)

  global.document = {
    querySelectorAll (excluded) {
      return []
    }
  }
  const event = {
    target: 'target',
    stopPropagation () {
      t.pass()
    }
  }
  const el = {
    contains (target) {
      return true
    }
  }
  const handler = () => t.fail('should not be here')

  executorFactory(el, { handler })(event)
})

test('options handler: it should execute handler if clicked outside el', t => {
  t.plan(2)

  global.document = {
    querySelectorAll (excluded) {
      return []
    }
  }
  const event = {
    target: 'target',
    stopPropagation () {
      t.pass()
    }
  }
  const el = {
    contains (target) {
      return false
    }
  }
  const handler = () => t.pass()

  executorFactory(el, { handler })(event)
})

test('options handler and excluded: it should not execute handler if clicked inside el', t => {
  t.plan(1)

  const excludedEl = {
    contains (target) {
      return true
    }
  }
  global.document = {
    querySelectorAll (excluded) {
      return [excludedEl]
    }
  }
  const event = {
    target: 'target',
    stopPropagation () {
      t.pass()
    }
  }
  const el = {
    contains (target) {
      return true
    }
  }
  const handler = () => t.fail('should not be here')

  executorFactory(el, { handler, excluded: ['#excluded'] })(event)
})

test('options handler: it should not execute handler if clicked outside el but inside excluded', t => {
  t.plan(1)

  const excludedEl = {
    contains (target) {
      return true
    }
  }
  global.document = {
    querySelectorAll (excluded) {
      return [excludedEl]
    }
  }
  const event = {
    target: 'target',
    stopPropagation () {
      t.pass()
    }
  }
  const el = {
    contains (target) {
      return false
    }
  }
  const handler = () => t.fail('should not be here')

  executorFactory(el, { handler, excluded: ['#excluded'] })(event)
})

test('options handler and excluded: it should execute handler if clicked outside el and excluded', t => {
  t.plan(2)

  const excludedEl = {
    contains (target) {
      return false
    }
  }
  global.document = {
    querySelectorAll (excluded) {
      return [excludedEl]
    }
  }
  const event = {
    target: 'target',
    stopPropagation () {
      t.pass()
    }
  }
  const el = {
    contains (target) {
      return false
    }
  }
  const handler = () => t.pass()

  executorFactory(el, { handler, excluded: ['#excluded'] })(event)
})

test('options handler and excluded and disabled: it should not execute handler if clicked outside el and excluded and disabled is true', t => {
  t.plan(1)

  const excludedEl = {
    contains (target) {
      return false
    }
  }
  global.document = {
    querySelectorAll (excluded) {
      return [excludedEl]
    }
  }
  const event = {
    target: 'target',
    stopPropagation () {
      t.pass()
    }
  }
  const el = {
    contains (target) {
      return false
    }
  }
  const handler = () => t.fail('should not be here')

  executorFactory(el, { handler, excluded: ['#excluded'], disabled: true })(event)
})

test('options handler and excluded and disabled: it should execute handler if clicked outside el and excluded and disabled is false', t => {
  t.plan(2)

  const excludedEl = {
    contains (target) {
      return false
    }
  }
  global.document = {
    querySelectorAll (excluded) {
      return [excludedEl]
    }
  }
  const event = {
    target: 'target',
    stopPropagation () {
      t.pass()
    }
  }
  const el = {
    contains (target) {
      return false
    }
  }
  const handler = () => t.pass()

  executorFactory(el, { handler, excluded: ['#excluded'], disabled: false })(event)
})
