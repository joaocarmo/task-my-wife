// Imports
import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'semantic-ui-react'
import DeleteProject from './delete'
import ViewTasks from '../tasks/view'
import EditProject from './edit'

const ProjectCard = ({
  userID, project: { id, name }, fetchProjects,
}) => (
  <Card>
    <Card.Content>
      <Card.Header>
        {name}
      </Card.Header>
      <Card.Meta>{`Project # ${id}`}</Card.Meta>
      <Card.Description>
        <div style={{ padding: '1.4em 0.2em' }}>
          <ViewTasks userID={userID} projectID={id} />
        </div>
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <EditProject
        projectID={id}
        projectName={name}
        fetchProjects={fetchProjects}
      />
      <DeleteProject projectID={id} fetchProjects={fetchProjects} />
    </Card.Content>
  </Card>
)

ProjectCard.propTypes = {
  userID: PropTypes.number.isRequired,
  project: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    user: PropTypes.number,
  }).isRequired,
  fetchProjects: PropTypes.func.isRequired,
}

export default ProjectCard
