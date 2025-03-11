const sessionController = require("./sessionDataAccesLayer.js").sessionController;

const sessionMiddleware = (req, res, next) => {
    if(req.header('session')) {
        // проверка наличия cookies с полем session
        // проверка ключа на соответствие в базе
        // проверка даты ключа
        // если ключ содержит ссылку на пользователя, возвращаем объект пользователя.
        let data = req.header('session').split('=')
        console.log(data)
        next()
    }else {
        // new session, generate mew key
        let newSessionObject = sessionController.GenerateNewSession()
        sessionController.SaveSession(newSessionObject)
        res.set( {
                    'Cookie': '_session_key='+newSessionObject[0],
                    'expires': newSessionObject[2],
                } )
        next()
    }
}

module.exports.sessionMiddleware = sessionMiddleware;