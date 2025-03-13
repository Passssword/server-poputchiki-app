const sessionController = require("./sessionDataAccesLayer.js").sessionController;

const sessionMiddleware = async (req, res, next) => {
    // проверка наличия cookies с полем session
    if(req.header('session')) {
        // проверка ключа на соответствие в базе
        // проверка даты ключа
        // если ключ содержит ссылку на пользователя, возвращаем объект пользователя.
        let data = req.header('session').split('=')
        console.log(data)

        let result = await sessionController.GetKey(data[1])

        // sessionController.GetKey(data[1]).then( result => {
        //     console.log(result)
        // })

        if (!result) { // Если ключа не найдено в базе
            console.log("ключ в базе не найден, создается новая сессия -->")
            let newSessionObject = sessionController.GenerateNewSession()
            sessionController.SaveSession(newSessionObject)
            res.set( {
                        'Cookie': '_session_key='+newSessionObject[0],
                        'expires': newSessionObject[2],
                    } )
            next()
        } else if (result.expiresDate < Date.now() ) {
            // Если дата ключа просроченна
            console.log("Date no valid -->")
            let newSessionObject = sessionController.GenerateNewSession()
            sessionController.SaveSession(newSessionObject)
            res.set( {
                        'Cookie': '_session_key='+newSessionObject[0],
                        'expires': newSessionObject[2],
                    } )
            next()
        } else { // Если ключ найден, проверка пользователя
            if (result.user_id != null) {
                // Пользователь найден
                console.log("Пользователь найден -->")
                console.log("user_id: "+result.user_id)
                next()
            } else {
                // Незарегистрированный пользователь
                console.log("Незарегистрированный пользователь -->")

                req.session = data;
                next()
            }
        } 
    } else {
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