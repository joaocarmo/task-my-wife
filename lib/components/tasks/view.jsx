// Imports
import moment from 'moment'
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Dimmer, List, Loader, Message,
} from 'semantic-ui-react'
import TaskCard from './task-card'
import NewTask from './new'
import { getTasksForProject } from '../../actions'

const ViewTasks = ({ userID, projectID }) => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const sortTasks = true

  const fetchTasks = async () => {
    setIsLoading(true)
    const { data: newData, errorMsg } = await getTasksForProject({ projectID })
    if (errorMsg) {
      setError(errorMsg)
    } else if (sortTasks) {
      const sortedData = newData.sort(
        ({ deadline: a }, { deadline: b }) => moment.utc(a).diff(moment.utc(b)),
      )
      setData(sortedData)
    } else {
      setData(newData)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (!data.length && projectID) {
      fetchTasks()
    }
  }, [])

  if (isLoading) {
    return (
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    )
  }

  if (error) {
    return (
      <Message
        compact
        negative
        icon="warning"
        header="Error Found"
        content={`There was an error: ${error}`}
      />
    )
  }

  return (
    <>
      {!data.length && (
        <i>
          There are yet no tasks for this project.
        </i>
      )}
      {data.length > 0 && (
        <List verticalAlign="middle">
          {data.map((task) => (
            <TaskCard task={task} key={task.id} fetchTasks={fetchTasks} />
          ))}
        </List>
      )}
      <div style={{ marginTop: '2em', paddingLeft: '1.6em' }}>
        <NewTask
          userID={userID}
          projectID={projectID}
          fetchTasks={fetchTasks}
        />
      </div>
    </>
  )
}

ViewTasks.propTypes = {
  userID: PropTypes.number.isRequired,
  projectID: PropTypes.number.isRequired,
}

export default ViewTasks
