// Imports
import React from 'react'
import PropTypes from 'prop-types'
import { AuthContext } from './auth-context'
import LoginForm from './login-form'
import { getAuthUserFromLS, setAuthUserToLS } from '../storage'

class Authentication extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      authUser: getAuthUserFromLS() || {},
    }

    this.handleSetAuthUser = this.handleSetAuthUser.bind(this)
  }

  handleSetAuthUser(authUser) {
    this.setState({ authUser }, () => setAuthUserToLS({ authUser }))
  }

  render() {
    const { authUser } = this.state
    const { children } = this.props
    const userIsAuthenticated = authUser && authUser.email
    return userIsAuthenticated ? (
      <AuthContext.Provider value={authUser}>
        {children}
      </AuthContext.Provider>
    ) : (
      <LoginForm setAuthUser={this.handleSetAuthUser} />
    )
  }
}

Authentication.propTypes = {
  children: PropTypes.node,
}

Authentication.defaultProps = {
  children: null,
}

export default Authentication
