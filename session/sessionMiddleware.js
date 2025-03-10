const sessionController = require("./sessionDataAccesLayer.js").sessionController;

const sessionMiddleware = (req, res, next) => {
    if(req.session_key) {
        // проверка ключа на соответствие в базе
        // проверка даты ключа
        // если ключ содержит ссылку на пользователя, возвращаем объект пользователя.
        next()
    }else {
        // new session, generate mew key
        let newSessionObject = sessionController.GenerateNewSession()
        sessionController.SaveSession(newSessionObject).then( (result) => 
            res.set( {
                    'Cookie': '_session_key='+newSessionObject[0],
                    'expires': newSessionObject[2],
                } )
                next()
                )
    }
}

module.exports.sessionMiddleware = sessionMiddleware;