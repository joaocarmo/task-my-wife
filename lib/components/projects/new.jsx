// Imports
import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Button, Form, Message, Modal, Segment,
} from 'semantic-ui-react'
import { AuthContext } from '../auth-context'
import { createProjectForUser } from '../../actions'

const NewProject = ({ fetchProjects }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const { authUser: { id: userID = '' } = {} } = useContext(AuthContext)

  const createProject = async () => {
    const { errorMsg } = await createProjectForUser({ userID, name })
    if (errorMsg) {
      setError(errorMsg)
    } else {
      fetchProjects()
    }
  }

  useEffect(() => {
    setName('')
    setError('')
    setSuccess(false)
    setIsLoading(false)
  }, [modalOpen])

  return (
    <>
      <Segment basic clearing>
        <Button
          floated="right"
          icon="plus"
          content="New Project"
          color="green"
          onClick={() => setModalOpen(!modalOpen)}
        />
      </Segment>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(!modalOpen)}
      >
        <Modal.Header>Add New Project</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            {success && (
              <Message
                positive
                content="Project added successfully"
              />
            )}
            {error && (
              <Message
                negative
                content={`Error: ${error}`}
              />
            )}
            <Form>
              <Form.Input
                fluid
                label="Project Name"
                placeholder="Project Name"
                value={name}
                onChange={(e, { value }) => { setName(value); setError('') }}
                required
              />
            </Form>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            negative
            content="Close"
            onClick={() => setModalOpen(!modalOpen)}
          />
          <Button
            positive
            content="Save"
            loading={isLoading}
            disabled={isLoading}
            onClick={() => {
              if (!name) {
                setError('A project name is required!')
              } else {
                createProject()
              }
            }}
          />
        </Modal.Actions>
      </Modal>
    </>
  )
}

NewProject.propTypes = {
  fetchProjects: PropTypes.func.isRequired,
}

export default NewProject
