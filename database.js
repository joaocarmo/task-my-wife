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

const handleTableExists = (db) => (error) => {
  if (error) {
    // Table already created
  } else {
    // Table just created, creating some rows
    const insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
    db.run(insert, ['admin', 'admin@localhost', sha256('admin')])
  }
}

const db = new sqlite3.Database(dbSource, (error) => {
  if (error) {
    // Cannot open database
    console.error(error.message)
    throw error
  } else {
    console.log('Connected to the SQLite database.')
    db.run(createUserTable, handleTableExists(db))
  }
})


module.exports = db
