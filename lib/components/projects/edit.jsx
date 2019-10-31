// Imports
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Button, Form, Message, Modal,
} from 'semantic-ui-react'
import { editProject } from '../../actions'

const EditProject = ({ projectID, projectName, fetchProjects }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [name, setName] = useState(projectName)
  const [error, setError] = useState('')

  const modifyProject = async () => {
    const { errorMsg } = await editProject({ projectID, name })
    if (errorMsg) {
      setError(errorMsg)
    } else {
      fetchProjects()
    }
  }

  useEffect(() => {
    setName(projectName)
    setError('')
  }, [modalOpen])

  return (
    <>
      <Button
        icon="pencil"
        color="yellow"
        size="mini"
        basic
        onClick={() => setModalOpen(!modalOpen)}
      />
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(!modalOpen)}
      >
        <Modal.Header>{`Edit Project # ${projectID}`}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
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
            onClick={() => {
              if (!name) {
                setError('A project name is required!')
              } else {
                modifyProject()
              }
            }}
          />
        </Modal.Actions>
      </Modal>
    </>
  )
}

EditProject.propTypes = {
  projectID: PropTypes.number.isRequired,
  projectName: PropTypes.string.isRequired,
  fetchProjects: PropTypes.func.isRequired,
}

export default EditProject
