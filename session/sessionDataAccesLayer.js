const crypto = require("crypto");

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(__dirname+'session/sessions.db')

db.serialize( () => {
    const sessions = `
        CREATE TABLE IF NOT EXISTS sessions(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          session_key TEXT NOT NULL,
          user_id NUMBER,
          expiresDate TEXT
          )
    `
    db.run(sessions)
} )

class sessionController {
    static GenerateSessionKey () {
        return crypto.randomBytes(32).toString("hex")
    }
    static saveSession (key) {
        let dataArray = ['KSIJS6shs7qd7djs', '', '']
        const sql = `INSERT INTO sessions(session_key, user_id, expiresDate) VALUES( ?, ?, ? )`
        return new Promise( (resolve, reject) => {
            db.run(sql, dataArray, (err) => {
            if (err) {
                console.log(err)
                reject(err)
            }
            else {resolve("Совпадений не найденно, создана новая запись")}
            })  
        })
    }
}

module.exports = db;
module.exports.sessionController = sessionController;