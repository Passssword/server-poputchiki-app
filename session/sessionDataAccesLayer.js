const crypto = require("crypto");

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('session/sessions.db')

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
    static GenerateNewSession () {
        let newKey = this.GenerateSessionKey()
        // сессия новая, поэтому пользователь не определен
        let user_id = null;
        // плюс сутки к текущей дате в милисекундах
        let date = Date.now()+(1*24*60*60*1000)
        let expires = new Date(date)
        console.log(`Miliseconds: ${date}`)
        console.log(`Date format: ${typeof expires.toString()}`)

        return [newKey, user_id, date]
    }
    static SaveSession (sessionObj) {
        
        const sql = `INSERT INTO sessions(session_key, user_id, expiresDate) VALUES( ?, ?, ? )`
        return new Promise( (resolve, reject) => {
            db.run(sql, sessionObj, (err) => {
            if (err) {
                console.log(err)
                reject(err)
            }
            else {
                console.log("Совпадений не найденно, создана новая сессия")
                resolve(sessionObj)}
            })  
        })
    }
}

module.exports = db;
module.exports.sessionController = sessionController;