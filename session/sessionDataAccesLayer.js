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
    static GetKey (key) { return new Promise( (resolve, reject)=>{
        const sql = `SELECT * FROM sessions WHERE session_key=?`
        db.get(sql, [key], (error, result)=>{
            if (error) {
                reject(error);
              } else {
                resolve(result);
              } }
          )
        })
    }
    static GenerateNewSession () {
        let newKey = this.GenerateSessionKey()
        // сессия новая, поэтому пользователь не определен
        let user_id = null;
        // плюс сутки к текущей дате в милисекундах
        let date = Date.now()+(1*24*60*60*1000)

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