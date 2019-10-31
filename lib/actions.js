export async function authenticateUser(email, password) {
  try {
    const response = await fetch(
      '/auth',
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
        if (typeof authUser === 'object') {
          return authUser
        }
      }
    } else {
      console.log(message)
    }
  } catch (error) {
    console.log(error)
  }
  return null
}

export function foobar() {}
