const { error } = require("console");

const BaseController = require("./databaseController.js").baseController;
const sessionController = require("../session/sessionDataAccesLayer.js").sessionController;

const checkAuthData = async (userObj, sessionObj) => {
    console.log("вызов функции checkAuthData -->")
    // console.log(`User object: ${userObj.login} ${userObj.password}`)
    // console.log(`Session object: ${sessionObj}`)

    // Проверка пользовательских данных
    let result = await BaseController.SelectUser(userObj.login, userObj.password)
    console.log(`Session object: -->`)
    console.log(sessionObj)
    if (result) {
        // Если пользователь найден, обновляем запись сессии
        return sessionController.updateSession(sessionObj.session_key, result.id)
            .then( result => {
                if(result == "OK") { return {"status": true, "userID": result.id} }
                else { return result }
            } )
    } else {
        console.log("Совпадений в базе не найденно")
        return {"code": false, "UserID": null} }
}

module.exports.checkAuthData = checkAuthData;