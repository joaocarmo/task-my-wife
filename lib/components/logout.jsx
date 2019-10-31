// Imports
import React, { useState, useContext } from 'react'
import {
  Button, Header, Icon, Menu, Modal,
} from 'semantic-ui-react'
import { AuthContext } from './auth-context'

const Logout = () => {
  const [modalOpen, setModalOpen] = useState(false)

  const { clearAuthUser } = useContext(AuthContext)

  return (
    <>
      <Menu.Item as="a" onClick={() => setModalOpen(!modalOpen)}>
        <Icon name="power" />
      </Menu.Item>
      <Modal
        open={modalOpen}
        basic
        size="small"
        dimmer="blurring"
        onClose={() => setModalOpen(!modalOpen)}
      >
        <Header icon="power" content="Exit the application" />
        <Modal.Content>
          <p>
            You&apos;re about to logout completely. Are you sure?
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            basic
            color="red"
            inverted
            onClick={() => setModalOpen(!modalOpen)}
          >
            <Icon name="remove" />
            No
          </Button>
          <Button color="green" inverted onClick={() => clearAuthUser()}>
            <Icon name="checkmark" />
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  )
}

export default Logout
