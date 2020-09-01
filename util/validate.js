function containsBooleansOnly(array) {
  return array
    .map((current) => typeof current === 'boolean')
    .reduce((previous, current) => previous && current)
}

function containsStringsOnly(array) {
  return array
    .map((current) => typeof current === 'string')
    .reduce((previous, current) => previous && current)
}

function validateBlockingConditions(conditions) {
  if (!conditions) {
    return true
  }
  if (!Array.isArray(conditions)) {
    console.warn('[Vue-clickoutside-handler:] provided blockingConditions', conditions, 'is not an array.')
    return false
  }
  if (!containsBooleansOnly(conditions)) {
    console.warn('[Vue-clickoutside-handler:] provided blockingConditions', conditions, 'contains non boolean values.')
    return false
  }
  return true
}

function validateExcluded(excluded) {
  if (!excluded) {
    return true
  }
  if (!Array.isArray(excluded)) {
    console.warn('[Vue-clickoutside-handler:] provided excluded', excluded, 'is not an array.')
    return false
  }
  if (!containsStringsOnly(excluded)) {
    console.warn('[Vue-clickoutside-handler:] provided excluded', excluded, 'contains non string values.')
    return false
  }
  return true
}

function validateHandler(handler) {
  if (typeof handler !== 'function') {
    console.warn('[Vue-clickoutside-handler:] provided handler', handler, 'is not a function.')
    return false
  }
  return true
}

export function validate(value) {
  if (typeof value === 'function') {
    return true
  }

  return validateHandler(value.handler)
    && validateExcluded(value.excluded)
    && validateBlockingConditions(value.blockingConditions)
}
