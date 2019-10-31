const express = require('express')
const db = require('../database.js')
const responseMsg = require('./response-message.js')

const router = express.Router()

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM project'
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
  const sql = 'SELECT * FROM project WHERE id = ?'
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
  if (!req.body.user) {
    errors.push('No user specified')
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
    user: req.body.user,
  }
  const sql = 'INSERT INTO project (name, user) VALUES (?,?)'
  const params = [data.name, data.user]
  db.run(sql, params, function (err) {
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
  }
  db.run(
    'UPDATE project SET name = COALESCE(?,name) WHERE id = ?',
    [data.name, req.params.id],
    function (err) {
      if (err) {
        res.status(400).json(responseMsg({
          status: 'error',
          message: res.message,
        }))
        return
      }
      const resData = {
        id: req.params.id,
        name: data.name,
      }
      res.json(responseMsg({ data: resData }))
    },
  )
})

router.delete('/:id', (req, res) => {
  db.run(
    'DELETE FROM project WHERE id = ?',
    req.params.id,
    function (err) {
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
  const sql = 'SELECT * FROM project WHERE user = ?'
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
