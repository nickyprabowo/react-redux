export const loadCred = () => {
  try {
    const serializedState = localStorage.getItem('login')

    if (serializedState === null) {
      return undefined
    }

    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export const saveCred = (state, cb = (serializedState) => {}) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('login', serializedState)

    cb(serializedState)
  } catch (err) {
    //
  }
}

export const deleteCred = () => {
  try {
    localStorage.clear('login')
  } catch (err) {
    //
  }
}