// Imports
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button, Form, Grid, Header, Message, Segment,
} from 'semantic-ui-react'
import { authenticateUser } from '../actions'

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
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const authenticate = async () => {
    const authUser = await authenticateUser(email, password)
    console.log(authUser)
    if (authUser) {
      setAuthUser(authUser)
    } else {
      setError(true)
    }
  }

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Login to your account
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
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
              onClick={() => authenticate()}
            >
              Login
            </Button>
            {error && (
              <Message
                negative
                content="There was a problem. Please, try again."
              />
            )}
          </Segment>
        </Form>
        <Message>
          Don&apos;t have an account ?
          {' '}
          <button type="button" style={buttonAsLink}>
            Create One
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
