const debugPrint = (...args) => {
  if (process.env.NODE_ENV !== 'production') {
    /* eslint-disable-next-line no-console */
    console.log(...args)
  }
}

/*
  Adapted from:
  https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
*/
const storageAvailable = (type) => {
  let storage
  try {
    storage = window[type]
    const x = '__storage_test__'
    storage.setItem(x, x)
    storage.removeItem(x)
    return true
  } catch (e) {
    return e instanceof DOMException && (
      // everything except Firefox
      e.code === 22
      // Firefox
      || e.code === 1014
      // test name field too, because code might not be present
      // everything except Firefox
      || e.name === 'QuotaExceededError'
      // Firefox
      || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
      // acknowledge QuotaExceededError only if there's something already stored
      && (storage && storage.length !== 0)
  }
}

const writeToLS = (key, value) => {
  if (storageAvailable('localStorage')) {
    localStorage.setItem(key, JSON.stringify(value))
  } else {
    debugPrint('localStorage is unavailable')
  }
}

const readFromLS = (key) => {
  if (storageAvailable('localStorage')) {
    return JSON.parse(localStorage.getItem(key))
  }
  debugPrint('localStorage is unavailable')
  return null
}

const deleteFromLS = (key) => {
  if (storageAvailable('localStorage')) {
    localStorage.removeItem(key)
  } else {
    debugPrint('localStorage is unavailable')
  }
}

const clearLS = () => {
  if (storageAvailable('localStorage')) {
    localStorage.clear()
  } else {
    debugPrint('localStorage is unavailable')
  }
}

const getAuthUserFromLS = () => readFromLS('authUser')

const setAuthUserToLS = ({ authUser = {} } = {}) => {
  writeToLS('authUser', authUser)
  return true
}

export {
  debugPrint, storageAvailable, writeToLS, readFromLS, deleteFromLS, clearLS,
  getAuthUserFromLS, setAuthUserToLS,
}
