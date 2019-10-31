// Imports
import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'semantic-ui-react'
import DeleteProject from './delete'
import ViewTasks from '../tasks/view'

const ProjectCard = ({
  userID, project: { id, name }, fetchProjects,
}) => (
  <Card>
    <Card.Content>
      <Card.Header>{name}</Card.Header>
      <Card.Meta>{`Project ID # ${id}`}</Card.Meta>
      <Card.Description>
        <ViewTasks userID={userID} projectID={id} />
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
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
