// Imports
import React from 'react'
import {
  Container, Segment,
} from 'semantic-ui-react'
import TopBar from './top-bar'
import UserProjects from './user-projects'

const TaskManager = () => (
  <>
    <TopBar />
    <Container>
      <Segment>
        <UserProjects />
      </Segment>
    </Container>
  </>
)

export default TaskManager
