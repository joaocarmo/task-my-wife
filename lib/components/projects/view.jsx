// Imports
import React, { useState, useContext, useEffect } from 'react'
import {
  Card, Dimmer, Loader, Message, Segment,
} from 'semantic-ui-react'
import { AuthContext } from '../auth-context'
import NewProject from './new'
import ProjectCard from './project-card'
import { getProjectsForUser } from '../../actions'

const ViewProjects = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const { authUser: { id: userID = '' } = {} } = useContext(AuthContext)

  const fetchProjects = async () => {
    setIsLoading(true)
    const { data: newData, errorMsg } = await getProjectsForUser({ userID })
    if (errorMsg) {
      setError(errorMsg)
    } else {
      setData(newData)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (!data.length && userID) {
      fetchProjects()
    }
  }, [])

  if (isLoading) {
    return (
      <Segment basic>
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
        <div style={{ padding: '12em' }} />
      </Segment>
    )
  }

  if (error) {
    return (
      <Segment basic>
        <Message
          negative
          icon="warning"
          header="Error Found"
          content={`There was an error: ${error}`}
        />
      </Segment>
    )
  }

  return (
    <>
      <NewProject fetchProjects={fetchProjects} />
      <Segment basic>
        {!data.length && (
          <Message
            header="Still Nowhere in an Empty Vastness"
            content="It looks like you don't have projects yet. Create your first!"
          />
        )}
        {data.length && (
          <Card.Group>
            {data.map((project) => (
              <ProjectCard
                project={project}
                fetchProjects={fetchProjects}
                key={project.id}
              />
            ))}
          </Card.Group>
        )}
      </Segment>
    </>
  )
}

export default ViewProjects
