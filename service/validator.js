export const validator = (function () {
  const containsBooleansOnly = function containsBooleansOnly(array) {
    return array
      .map((current) => typeof current === 'boolean')
      .reduce((previous, current) => previous && current);
  };

  const containsStringsOnly = function containsStringsOnly(array) {
    return array
      .map((current) => typeof current === 'string')
      .reduce((previous, current) => previous && current);
  };

  const validate = function validate(value) {
    return validateHandler(value.handler)
      && validateExcluded(value.excluded)
      && validateBlockingConditions(value.blockingConditions);
  };

  const validateBlockingConditions = function validateBlockingConditions(conditions) {
    if (!conditions) {
      return true;
    }
    if (!Array.isArray(conditions)) {
      // eslint-disable-next-line
      console.warn('[Vue-outside-handler:] provided blockingConditions', conditions, 'is not an array.');
      return false
    }
    if (!containsBooleansOnly(conditions)) {
      // eslint-disable-next-line
      console.warn('[Vue-outside-handler:] provided blockingConditions', conditions, 'contains non boolean values.');
      return false
    }
    return true;
  };

  const validateExcluded = function validateExcluded(excluded) {
    if (!excluded) {
      return true;
    }
    if (!Array.isArray(excluded)) {
      // eslint-disable-next-line
      console.warn('[Vue-outside-handler:] provided excluded', excluded, 'is not an array.');
      return false
    }
    if (!containsStringsOnly(excluded)) {
      // eslint-disable-next-line
      console.warn('[Vue-outside-handler:] provided excluded', excluded, 'contains non string values.');
      return false
    }
    return true;
  };

  const validateHandler = function validateHandler(handler) {
    if (typeof handler !== 'function') {
      // eslint-disable-next-line
      console.warn('[Vue-outside-handler:] provided handler', handler, 'is not a function.');
      return false
    }
    return true;
  };

  return {
    validate: validate,
  };
}());
