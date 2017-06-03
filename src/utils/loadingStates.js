export function injectLoadingStates(state = {}) {
  return Object.assign({}, state, {
    isLoading: false,
    isLoaded: false,
    hasError: false,
  })
}

export function startLoading(state = {}) {
  return Object.assign({}, state, {
    isLoading: true,
    isLoaded: false,
    hasError: false,
  })
}

export function finishLoading(state = {}) {
  return Object.assign({}, state, {
    isLoading: false,
    isLoaded: true,
    hasError: false,
  })
}

export function errorLoading(state = {}) {
  return Object.assign({}, state, {
    isLoading: false,
    isLoaded: false,
    hasError: true,
  })
}
