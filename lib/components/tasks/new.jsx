// Imports
import moment from 'moment'
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Button, Form, Message, Modal,
} from 'semantic-ui-react'
import { createTaskForProject } from '../../actions'
import { buttonAsLink } from '../styles'

const NewTask = ({ projectID, userID, fetchTasks }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const dateRegExp = /^20[0-9]{2}-[0-1]{1}[0-9]{1}-[0-3]{1}[0-9]{1}$/

  const createTask = async () => {
    const parsedDeadline = moment.utc(deadline, 'YYYY-MM-DD').toDate()
    const { errorMsg } = await createTaskForProject({
      name, description, userID, projectID, deadline: parsedDeadline,
    })
    if (errorMsg) {
      setError(errorMsg)
    } else {
      fetchTasks()
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
      <button
        type="button"
        style={buttonAsLink}
        onClick={() => setModalOpen(!modalOpen)}
      >
        Add Task
      </button>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(!modalOpen)}
      >
        <Modal.Header>Add New Task</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            {success && (
              <Message
                positive
                content="Task added successfully"
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
                label="Task Name"
                placeholder="Task Name"
                value={name}
                onChange={(e, { value }) => { setName(value); setError('') }}
                required
              />
              <Form.Input
                fluid
                label="Task Description"
                placeholder="Task Description"
                value={description}
                onChange={(e, { value }) => { setDescription(value); setError('') }}
                required
              />
              <Form.Input
                fluid
                label="Task Deadline (YYYY-MM-DD)"
                placeholder="Task Deadline (YYYY-MM-DD)"
                value={deadline}
                error={deadline !== '' && !dateRegExp.test(deadline)}
                onChange={(e, { value }) => { setDeadline(value); setError('') }}
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
                setError('A task name is required!')
              } else if (!description) {
                setError('A task description is required!')
              } else if (!deadline || !dateRegExp.test(deadline)) {
                setError('A valid task deadline is required!')
              } else {
                createTask()
              }
            }}
          />
        </Modal.Actions>
      </Modal>
    </>
  )
}

NewTask.propTypes = {
  projectID: PropTypes.number.isRequired,
  userID: PropTypes.number.isRequired,
  fetchTasks: PropTypes.func.isRequired,
}

export default NewTask
