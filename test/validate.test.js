
import test from 'ava'
import { validate } from '../lib/validate.js'

test('it should return false with empty value', t => {
  t.false(validate())
})

test('it should return true with function as value', t => {
  t.true(validate(function () {}))
})

test('it should return false with unsupported option', t => {
  t.false(validate({ foo: 'bar' }))
})

test('it should return false if handler is not a function', t => {
  t.false(validate({ handler: 'non function' }))
})

test('it should return true if handler is a function and other fields are not defined', t => {
  t.true(validate({ handler: () => {} }))
})

test('it should return false if excluded is not an array', t => {
  t.false(validate({ handler: () => {}, excluded: 3 }))
})

test('it should return false if excluded contains non string values', t => {
  t.false(validate({ handler: () => {}, excluded: ['string', 3] }))
})

test('it should return true if excluded is an array of strings', t => {
  t.true(validate({ handler: () => {}, excluded: ['string', 'another string'] }))
})

test('it should return false if disabled is not a boolean', t => {
  t.false(validate({ handler: () => {}, excluded: ['string', 'another string'], disabled: 'not a boolean' }))
})

test('it should return true if disabled option is not defined', t => {
  t.true(validate({ handler: () => {}, excluded: ['string', 'another string'] }))
})

test('it should return true with complete valid options', t => {
  t.true(validate({ handler: () => {}, excluded: ['string', 'another string'], disabled: true }))
})
