import { validate } from "./service/validate"

function isBlockingConditionActive (blockingConditions) {
  return !!blockingConditions && blockingConditions.reduce((previous, current) => previous || current)
}

function handleOutsideClickFactory (handler, excluded, blockingConditions) {
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

export const VueClickOut = {
  bind (el, binding) {
    if (!validate(binding.value)) {
      return;
    }

    const handleOutsideClick
    if (typeof binding.value === 'function') {
      handleOutsideClick = handleOutsideClickFactory(binding.value)
    } else {
      handleOutsideClick = handleOutsideClickFactory(
        binding.value.handler,
        binding.value.excluded,
        binding.value.blockingConditions
      )
    }

    el.__vueOutsideHandler__ = { handleOutsideClick }
    // Register click/touchstart event listeners on the whole page
    document.addEventListener('click', handleOutsideClick)
    document.addEventListener('touchstart', handleOutsideClick)
  },

  unbind (el) {
    document.removeEventListener('click', el.__vueOutsideHandler__.handleOutsideClick)
    document.removeEventListener('touchstart', el.__vueOutsideHandler__.handleOutsideClick)
    delete el.__vueOutsideHandler__
  }
}
