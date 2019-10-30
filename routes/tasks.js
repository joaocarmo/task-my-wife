const express = require('express')
const db = require('../database.js')
const responseMsg = require('./response-message.js')

const router = express.Router()

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM task'
  const params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json(responseMsg({
        status: 'error',
        message: err.message,
      }))
      return
    }
    res.json(responseMsg({ data: rows }))
  })
})

router.get('/:id', (req, res) => {
  const sql = 'SELECT * FROM task WHERE id = ?'
  const params = [req.params.id]
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json(responseMsg({
        status: 'error',
        message: err.message,
      }))
      return
    }
    res.json(responseMsg({ data: row }))
  })
})

router.post('/', (req, res) => {
  const errors = []
  if (!req.body.name) {
    errors.push('No name specified')
  }
  if (!req.body.description) {
    errors.push('No description specified')
  }
  if (!req.body.user) {
    errors.push('No user specified')
  }
  if (!req.body.project) {
    errors.push('No project specified')
  }
  if (!req.body.deadline) {
    errors.push('No deadline specified')
  }
  if (errors.length) {
    res.status(400).json(responseMsg({
      status: 'error',
      message: errors.join(', '),
    }))
    return
  }
  const data = {
    name: req.body.name,
    description: req.body.description,
    user: req.body.user,
    project: req.body.project,
    complete: 0,
    created: new Date(),
    deadline: req.body.deadline,
  }
  const sql = `INSERT INTO task (
    name, description, user, project, complete, created, deadline) VALUES (
    ?,?,?,?,?,?,?)`
  const params = [
    data.name,
    data.description,
    data.user,
    data.project,
    data.complete,
    data.created,
    data.deadline,
  ]
  db.run(sql, params, (err) => {
    if (err) {
      res.status(400).json(responseMsg({
        status: 'error',
        message: err.message,
      }))
      return
    }
    res.json(responseMsg({
      data: { ...data, id: this.lastID },
    }))
  })
})

router.patch('/:id', (req, res) => {
  const data = {
    name: req.body.name,
    description: req.body.description,
    user: req.body.user,
    project: req.body.project,
    complete: req.body.complete,
    deadline: req.body.deadline,
  }
  db.run(
    `UPDATE task SET
      name = COALESCE(?,name),
      description = COALESCE(?,description),
      user = COALESCE(?,user),
      project = COALESCE(?,project),
      complete = COALESCE(?,complete),
      deadline = COALESCE(?,deadline)
      WHERE id = ?`,
    [
      data.name,
      data.description,
      data.user,
      data.project,
      data.complete,
      data.deadline,
      req.params.id,
    ],
    (err) => {
      if (err) {
        res.status(400).json(responseMsg({
          status: 'error',
          message: res.message,
        }))
        return
      }
      const resData = {
        id: req.params.id,
        ...data,
      }
      res.json(responseMsg({ data: resData }))
    },
  )
})

router.delete('/:id', (req, res) => {
  db.run(
    'DELETE FROM task WHERE id = ?',
    req.params.id,
    (err) => {
      if (err) {
        res.status(400).json(responseMsg({
          status: 'error',
          message: res.message,
        }))
        return
      }
      res.json(responseMsg())
    },
  )
})

router.get('/user/:id', (req, res) => {
  const sql = 'SELECT * FROM task WHERE user = ?'
  const params = [req.params.id]
  db.all(sql, params, (err, row) => {
    if (err) {
      res.status(400).json(responseMsg({
        status: 'error',
        message: err.message,
      }))
      return
    }
    res.json(responseMsg({ data: row }))
  })
})

router.get('/project/:id', (req, res) => {
  const sql = 'SELECT * FROM task WHERE project = ?'
  const params = [req.params.id]
  db.all(sql, params, (err, row) => {
    if (err) {
      res.status(400).json(responseMsg({
        status: 'error',
        message: err.message,
      }))
      return
    }
    res.json(responseMsg({ data: row }))
  })
})

module.exports = router
