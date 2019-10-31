// Imports
import moment from 'moment'
import React from 'react'
import PropTypes from 'prop-types'
import { List } from 'semantic-ui-react'

const TaskCard = ({
  task: {
    name, description, complete, deadline,
  }, fetchTasks,
}) => (
  <List.Item>
    <List.Icon name={complete ? 'check square outline' : 'square outline'} />
    <List.Content>
      <List.Header>
        {name}
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
