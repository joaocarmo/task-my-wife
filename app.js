const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const fallback = require('express-history-api-fallback')
const authRouter = require('./routes/authenticate')
const usersRouter = require('./routes/users')
const projectsRouter = require('./routes/projects')
const tasksRouter = require('./routes/tasks')

const apiVersion = '/api/v1'
const rootPath = path.join(__dirname, 'public')
const indexFile = 'index.html'
const app = express()

const appDevEnv = process.env.NODE_ENV === 'development'

app.use(logger(appDevEnv ? 'dev' : 'combined'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(rootPath))
app.use(`${apiVersion}/auth`, authRouter)
app.use(`${apiVersion}/users`, usersRouter)
app.use(`${apiVersion}/projects`, projectsRouter)
app.use(`${apiVersion}/tasks`, tasksRouter)
app.use(fallback(indexFile, { root: rootPath }))

module.exports = app
