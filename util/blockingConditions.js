export function isBlockingConditionActive (blockingConditions) {
  return !!blockingConditions && blockingConditions.reduce((previous, current) => previous || current)
}
