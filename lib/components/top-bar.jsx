// Imports
import React, { useContext } from 'react'
import {
  Container, Icon, Menu,
} from 'semantic-ui-react'
import { AuthContext } from './auth-context'
import Logout from './logout'

const TopBar = () => {
  const { authUser } = useContext(AuthContext)

  return (
    <Menu borderless inverted size="large" style={{ borderRadius: 0 }}>
      <Container>
        <Menu.Item header>
          <Icon name="tasks" />
          Task My Wife
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Icon name="user" />
            {authUser && authUser.name ? authUser.name : 'Anonymous'}
          </Menu.Item>
          <Logout />
        </Menu.Menu>
      </Container>
    </Menu>
  )
}

export default TopBar
