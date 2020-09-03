function containsStringsOnly (array) {
  return array
    .map((current) => typeof current === 'string')
    .reduce((previous, current) => previous && current)
}

function validateDisabled (disabled) {
  if (disabled === undefined) {
    return true
  }
  if (typeof disabled !== 'boolean') {
    console.warn('[Vue-clickoutside-handler:] provided disabled option', disabled, 'is not a boolean.')
    return false
  }
  return true
}

function validateExcluded (excluded) {
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

function validateHandler (handler) {
  if (typeof handler !== 'function') {
    console.warn('[Vue-clickoutside-handler:] provided handler', handler, 'is not a function.')
    return false
  }
  return true
}

const SUPPORTED_OPTIONS = ['handler', 'excluded', 'disabled']

export function validate (options) {
  options = options || {}

  if (typeof options === 'function') {
    return true
  }

  for (const opt of Object.keys(options)) {
    if (!SUPPORTED_OPTIONS.includes(opt)) {
      console.warn('[Vue-clickoutside-handler:] provided option', opt, 'is not a supported.')
      return false
    }
  }

  return validateHandler(options.handler) &&
    validateExcluded(options.excluded) &&
    validateDisabled(options.disabled)
}
