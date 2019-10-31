// Imports
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button, Form, Grid, Header, Message, Segment,
} from 'semantic-ui-react'
import { authenticateUser, createUser } from '../actions'

const buttonAsLink = {
  background: 'none',
  border: 'none',
  padding: 0,
  fontFamily: 'arial, sans-serif',
  color: '#069',
  textDecoration: 'underline',
  cursor: 'pointer',
}

const LoginForm = ({ setAuthUser }) => {
  const [page, setPage] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const authenticate = async () => {
    const { authUser, errorMsg } = await authenticateUser({ email, password })
    if (authUser) {
      setAuthUser(authUser)
    } else {
      setError(errorMsg)
    }
  }

  const create = async () => {
    const { authUser, errorMsg } = await createUser({ name, email, password })
    if (authUser) {
      setAuthUser(authUser)
    } else {
      setError(errorMsg)
    }
  }

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          {
            page === 'login'
              ? 'Login to your account'
              : 'Create a new account'
          }
        </Header>
        <Form size="large">
          <Segment stacked>
            {page === 'create' && (
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Name"
                value={name}
                onChange={(e, { value }) => { setName(value); setError(false) }}
              />
            )}
            <Form.Input
              fluid
              icon="at"
              iconPosition="left"
              placeholder="E-mail"
              value={email}
              error={email !== '' && !/.+@.+/.test(email)}
              onChange={(e, { value }) => { setEmail(value); setError(false) }}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e, { value }) => { setPassword(value); setError(false) }}
            />
            <Button
              color="teal"
              fluid
              size="large"
              onClick={() => (page === 'login' ? authenticate() : create())}
            >
              {
                page === 'login'
                  ? 'Login'
                  : 'Create'
              }
            </Button>
            {error && (
              <Message
                negative
                content={`There was a problem: ${error}. Please, try again.`}
              />
            )}
          </Segment>
        </Form>
        <Message>
          {
            page === 'login'
              ? 'Don\'t have an account ? '
              : 'Already have an account ? '
          }
          <button
            type="button"
            style={buttonAsLink}
            onClick={() => {
              setPage(page === 'login' ? 'create' : 'login')
              setError(false)
            }}
          >
            {
              page === 'login'
                ? 'Create One'
                : 'Login'
            }
          </button>
          {' '}
          now !
        </Message>
      </Grid.Column>
    </Grid>
  )
}

LoginForm.propTypes = {
  setAuthUser: PropTypes.func.isRequired,
}

export default LoginForm
