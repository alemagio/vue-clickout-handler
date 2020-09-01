import { isBlockingConditionActive } from './blockingConditions'

export function handleOutsideClickFactory (el, value, document) {
  let handler = value
  let excluded, blockingConditions
  if (typeof value !== 'function') {
    handler = value.handler
    excluded = value.excluded
    blockingConditions = value.blockingConditions
  }

  return (event) => {
    event.stopPropagation()

    let clickedOnExcludedEl = false
    if (!!excluded) {
      const excludedElements = excluded.flatMap(() => Array.from(document.querySelectorAll(excluded)))
      clickedOnExcludedEl = excludedElements
        .map((excludedEl) => excludedEl.contains(event.target))
        .reduce((previousValue, currentValue) => previousValue || currentValue)
    }

    if (!el.contains(event.target)
      && !clickedOnExcludedEl
      && !isBlockingConditionActive(blockingConditions)
    ) {
      handler()
    }
  }
}
