// Imports
import React from 'react'
import PropTypes from 'prop-types'
import { AuthContext } from './auth-context'
import LoginForm from './login-form'
import { getAuthUserFromLS, setAuthUserToLS, clearLS } from '../storage'

class Authentication extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      authUser: getAuthUserFromLS() || {},
    }

    this.handleSetAuthUser = this.handleSetAuthUser.bind(this)
    this.clearAuthUser = this.clearAuthUser.bind(this)
  }

  handleSetAuthUser(authUser) {
    this.setState({ authUser }, () => setAuthUserToLS({ authUser }))
  }

  clearAuthUser() {
    this.setState({ authUser: {} }, () => clearLS())
  }

  render() {
    const { authUser } = this.state
    const { children } = this.props
    const userIsAuthenticated = authUser && authUser.email
    return userIsAuthenticated ? (
      <AuthContext.Provider
        value={{ authUser, clearAuthUser: this.clearAuthUser }}
      >
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
