const express = require('express')
const sha256 = require('sha256')
const db = require('../database.js')
const responseMsg = require('./response-message.js')

const router = express.Router()

router.get('/', (req, res) => {
  const sql = 'SELECT id, name, email FROM user'
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
  const sql = 'SELECT id, name, email FROM user WHERE id = ?'
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
  if (!req.body.password) {
    errors.push('No password specified')
  }
  if (!req.body.email) {
    errors.push('No email specified')
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
    email: req.body.email,
    password: sha256(req.body.password),
  }
  const sql = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
  const params = [data.name, data.email, data.password]
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
    email: req.body.email,
    password: req.body.password ? sha256(req.body.password) : null,
  }
  db.run(
    `UPDATE user SET
      name = COALESCE(?,name),
      email = COALESCE(?,email),
      password = COALESCE(?,password)
      WHERE id = ?`,
    [data.name, data.email, data.password, req.params.id],
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
        name: data.name,
        email: data.email,
      }
      res.json(responseMsg({ data: resData }))
    },
  )
})

router.delete('/:id', (req, res) => {
  db.run(
    'DELETE FROM user WHERE id = ?',
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

module.exports = router
