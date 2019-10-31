// Imports
import React from 'react'
import {
  Container, Header, Icon,
} from 'semantic-ui-react'

const UserProjects = () => (
  <Container text textAlign="center">
    <Header as="h2" icon>
      <Icon name="settings" />
      Projects
      <Header.Subheader>
        Manage your projects and tasks in this panel
      </Header.Subheader>
    </Header>
  </Container>
)

export default UserProjects
