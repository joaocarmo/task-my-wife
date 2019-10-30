const sqlite3 = require('sqlite3').verbose()
const sha256 = require('sha256')

const dbSource = 'db.sqlite'
const createUserTable = `\
CREATE TABLE user (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name text,
email text UNIQUE,
password text,
CONSTRAINT email_unique UNIQUE (email)
)`
const createProjectTable = `\
CREATE TABLE project (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name text,
user INTEGER
)`
const createTaskTable = `\
CREATE TABLE task (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name text,
description text,
user INTEGER,
project INTEGER,
complete INTEGER,
created date,
deadline date
)`

const handleUserTableExists = (db) => (error) => {
  if (error) {
    // Table already created
  } else {
    console.log('User table created.')
    // Table just created, create the admin account
    const insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
    db.run(insert, ['admin', 'admin@localhost', sha256('admin')])
  }
}

const handleProjectTableExists = (db) => (error) => {
  if (error) {
    // Table already created
  } else {
    console.log('Project table created.')
    // Table just created, create sample project
    const insert = 'INSERT INTO project (name, user) VALUES (?,?)'
    db.run(insert, ['First Project', 1])
  }
}

const handleTaskTableExists = (db) => (error) => {
  if (error) {
    // Table already created
  } else {
    console.log('Task table created.')
    // Table just created, create sample task
    const now = new Date()
    const future = new Date()
    future.setDate(future.getDate() + 14)
    const insert = `INSERT INTO task (
      name, description, user, project, complete, created, deadline) VALUES (
      ?,?,?,?,?,?,?)`
    db.run(insert, [
      'First Task',
      'Complete this first',
      1,
      1,
      0,
      now,
      future,
    ])
  }
}

const db = new sqlite3.Database(dbSource, (error) => {
  if (error) {
    // Cannot open database
    console.error(error.message)
    throw error
  } else {
    console.log('Connected to the SQLite database.')
    db.run(createUserTable, handleUserTableExists(db))
    db.run(createProjectTable, handleProjectTableExists(db))
    db.run(createTaskTable, handleTaskTableExists(db))
  }
})


module.exports = db
