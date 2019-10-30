const express = require('express')
const sha256 = require('sha256')
const db = require('../database.js')
const responseMsg = require('./response-message.js')

const router = express.Router()

router.post('/', (req, res) => {
  const errors = []
  if (!req.body.password) {
    errors.push('No password specified')
  }
  if (!req.body.email) {
    errors.push('No email specified')
  }
  if (errors.length) {
    res.status(400).json(responseMsg({
      status: 'error',
      message: errors.join(','),
    }))
    return
  }
  const data = {
    email: req.body.email,
    password: sha256(req.body.password),
  }
  const sql = 'SELECT id, name, email FROM user WHERE email = ? AND password = ?'
  const params = [data.email, data.password]
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

module.exports = router
