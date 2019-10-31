export async function authenticateUser({ email, password }) {
  let errorMsg = 'Invalid Credentials'
  try {
    const response = await fetch(
      '/api/v1/auth',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ email, password }),
      },
    )
    const { status, message, data } = await response.json()
    if (status === 'success') {
      if (data && data.length) {
        const [authUser] = data
        if (authUser && typeof authUser === 'object') {
          return { authUser }
        }
      }
    } else {
      console.log(message)
      errorMsg = message
    }
  } catch (error) {
    console.log(error)
    errorMsg = error
  }
  return { errorMsg }
}

export async function createUser({ name, email, password }) {
  let errorMsg = 'Invalid Information'
  try {
    const response = await fetch(
      '/api/v1/users',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      },
    )
    const { status, message, data } = await response.json()
    if (status === 'success') {
      if (data && data.length) {
        const [authUser] = data
        if (authUser && typeof authUser === 'object') {
          return { authUser }
        }
      }
    } else {
      console.log(message)
      errorMsg = message
    }
  } catch (error) {
    console.log(error)
    errorMsg = error
  }
  return { errorMsg }
}
