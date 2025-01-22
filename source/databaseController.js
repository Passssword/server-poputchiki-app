//----------------------------------------
//---------- Base Controller -------------
//----------------------------------------

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('base.db')

db.serialize( () => {
    const adverts = `
        CREATE TABLE IF NOT EXISTS adverts(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          startPoint TEXT NOT NULL,
          endPoint TEXT NOT NULL,
          dateCreate TEXT,
          auto TEXT,
          comment TEXT
          )
    `
    const towns = `
        CREATE TABLE IF NOT EXISTS towns(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          town TEXT NOT NULL
          )
    `
    const users = `
        CREATE TABLE IF NOT EXISTS users(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          login TEXT NOT NULL,
          password TEXT NOT NULL
          )
    `
    db.run(adverts)
    db.run(towns)
    db.run(users)
} )

class baseController {
    static GetAdverts () { return new Promise( (resolve, reject)=>{
            db.all('SELECT * FROM adverts', (error, result)=>{
            if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }) })
    }
    static GetLocations () { return new Promise( (resolve, reject)=>{
        db.all('SELECT * FROM towns', (error, result)=>{
        if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }) })
    }

    static create (data, callback) {
      const dataArray = [data.startPoint, data.endPoint, data.date, data.auto, data.comment]
      const sql = `INSERT INTO adverts( startPoint, endPoint, dateCreate, auto, comment ) VALUES( ?, ?, ?, ?, ?)`
      db.run(sql, dataArray )
      console.log("CREATE NEW ITEM...")
    }

    static addTown (data) {
      const dataArray = [data.town]
      const sql = `INSERT INTO towns(town) VALUES(?)`
      db.run(sql, dataArray)
    }

    static deleteTown (id) {
      const sql = `DELETE FROM towns WHERE id=${id}`
      db.run(sql)
    }
    static addUser (data) {
      console.log(data.login)
      console.log(data.password)
      const dataArray = [data.login, data.password]
      const sql = `INSERT INTO users(login, password) VALUES( ?, ? )`
      db.run(sql, dataArray)
    }
}

module.exports = db;
module.exports.baseController = baseController;