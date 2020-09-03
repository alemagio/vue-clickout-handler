export function executorFactory (el, opts) {
  let handler = opts
  let excluded, disabled
  if (typeof opts !== 'function') {
    handler = opts.handler
    excluded = opts.excluded
    disabled = opts.disabled
  }

  return (event) => {
    event.stopPropagation()

    const excludedElements = Array.from(document.querySelectorAll(excluded))

    if (!el.contains(event.target) &&
      !isClickOnExcluded(event.target, excludedElements) &&
      !disabled
    ) {
      handler()
    }
  }
}

function isClickOnExcluded (target, excludedElements) {
  return excludedElements
    .map((excludedEl) => excludedEl.contains(target))
    .reduce((previousValue, currentValue) => previousValue || currentValue, false)
}
