// Imports
import moment from 'moment'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, List } from 'semantic-ui-react'
import { markTaskComplete } from '../../actions'

const TaskCard = ({
  task: {
    id, name, description, complete, created, deadline,
  }, fetchTasks,
}) => {
  const [isCompleting, setIsCompleting] = useState(false)

  const completeTask = async () => {
    setIsCompleting(true)
    const { errorMsg } = await markTaskComplete({ taskID: id })
    if (errorMsg) {
      console.log(errorMsg)
    } else {
      await fetchTasks()
    }
    setIsCompleting(false)
  }

  return (
    <List.Item style={{ cursor: 'default' }}>
      {!complete && (
        <List.Content floated="right">
          <Button.Group size="mini">
            <Button
              icon="check"
              color="green"
              basic
              onClick={() => completeTask()}
              loading={isCompleting}
              disabled={isCompleting}
            />
            <Button icon="trash" color="red" basic />
          </Button.Group>
        </List.Content>
      )}
      <List.Icon name={complete ? 'check square outline' : 'square outline'} />
      <List.Content>
        <List.Header>
          {`[${moment.utc(created).format('YYYY-MM-DD')}] ${name}`}
        </List.Header>
        <List.Description>
          {description}
          {!complete && (
            <>
              <br />
              <i style={{ color: 'grey' }}>
                {`Due ${moment.utc(deadline).fromNow()}`}
              </i>
            </>
          )}
        </List.Description>
      </List.Content>
    </List.Item>
  )
}

TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    user: PropTypes.number,
    project: PropTypes.number,
    complete: PropTypes.number,
    created: PropTypes.number,
    deadline: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  }).isRequired,
  fetchTasks: PropTypes.func.isRequired,
}

export default TaskCard
