// Imports
import React from 'react'
import {
  Container, Header, Icon,
} from 'semantic-ui-react'
import ViewProjects from './projects/view'

const UserProjects = () => (
  <>
    <Container text textAlign="center">
      <Header as="h2" icon>
        <Icon name="settings" />
        Projects
        <Header.Subheader>
          Manage your projects and tasks in this panel
        </Header.Subheader>
      </Header>
    </Container>
    <ViewProjects />
  </>
)

export default UserProjects
