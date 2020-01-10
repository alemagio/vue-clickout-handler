import {validator} from "./service/validator";

export const VueClickOut = {
  bind (el, binding) {
    if (!validator.validate(binding.value)) {
      return;
    }

    const { handler, excluded, blockingConditions } = binding.value;

    const handleOutsideClick = (event) => {
      event.stopPropagation();

      let clickedOnExcludedEl = false;
      if (!!excluded) {
        const excludedElements = excluded.flatMap(() => Array.from(document.querySelectorAll(excluded)));
        clickedOnExcludedEl = excludedElements
          .map((excludedEl) => excludedEl.contains(event.target))
          .reduce((previousValue, currentValue) => previousValue || currentValue);
      }

      if (!el.contains(event.target)
        && !clickedOnExcludedEl
        && !(!!blockingConditions && blockingConditions.reduce((previous, current) => previous || current))
      ) {
        handler();
      }
    };

    el.__vueOutsideHandler__ = {
      handleOutsideClick: handleOutsideClick,
    };
    // Register click/touchstart event listeners on the whole page
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
  },

  unbind (el) {
    document.removeEventListener('click', el.__vueOutsideHandler__.handleOutsideClick);
    document.removeEventListener('touchstart', el.__vueOutsideHandler__.handleOutsideClick);
    delete el.__vueOutsideHandler__;
  }
};
