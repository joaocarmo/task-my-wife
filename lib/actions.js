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

export async function getProjectsForUser({ userID }) {
  let errorMsg = 'Unknown Problem'
  try {
    const response = await fetch(
      `/api/v1/projects/user/${userID}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'GET',
      },
    )
    const { status, message, data } = await response.json()
    if (status === 'success') {
      if (data) {
        return { data }
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

export async function createProjectForUser({ userID, name }) {
  let errorMsg = 'Unknown Problem'
  try {
    const response = await fetch(
      '/api/v1/projects',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ name, user: userID }),
      },
    )
    const { status, message, data } = await response.json()
    if (status === 'success') {
      if (data) {
        return { data }
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

export async function deleteProjectForUser({ projectID }) {
  let errorMsg = 'Unknown Problem'
  try {
    const response = await fetch(
      `/api/v1/projects/${projectID}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'DELETE',
      },
    )
    const { status, message, data } = await response.json()
    if (status === 'success') {
      if (data) {
        return { data }
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

export async function getTasksForProject({ projectID }) {
  let errorMsg = 'Unknown Problem'
  try {
    const response = await fetch(
      `/api/v1/tasks/project/${projectID}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'GET',
      },
    )
    const { status, message, data } = await response.json()
    if (status === 'success') {
      if (data) {
        return { data }
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
