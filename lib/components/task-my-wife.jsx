// Imports
import React from 'react'
import Authentication from './auth-provider'
import TaskManager from './task-manager'

const TaskMyWife = () => (
  <Authentication>
    <TaskManager />
  </Authentication>
)

export default TaskMyWife
