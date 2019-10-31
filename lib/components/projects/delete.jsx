// Imports
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button, Icon, Header, Modal,
} from 'semantic-ui-react'
import { deleteProjectForUser } from '../../actions'

const DeleteProject = ({ projectID, fetchProjects }) => {
  const [modalOpen, setModalOpen] = useState(false)

  const deleteProject = async () => {
    const { errorMsg } = await deleteProjectForUser({ projectID })
    if (errorMsg) {
      console.log(errorMsg)
    } else {
      setModalOpen(false)
      await fetchProjects()
    }
  }

  return (
    <>
      <Button
        basic
        color="red"
        content="Delete"
        size="small"
        onClick={() => setModalOpen(!modalOpen)}
      />
      <Modal
        open={modalOpen}
        basic
        size="small"
        dimmer="blurring"
        onClose={() => setModalOpen(!modalOpen)}
      >
        <Header icon="power" content="Delete project" />
        <Modal.Content>
          <p>
            {`You're about to completely remove project # ${projectID}. Are you sure?`}
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
          <Button color="green" inverted onClick={() => deleteProject()}>
            <Icon name="checkmark" />
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  )
}

DeleteProject.propTypes = {
  projectID: PropTypes.number.isRequired,
  fetchProjects: PropTypes.func.isRequired,
}

export default DeleteProject
