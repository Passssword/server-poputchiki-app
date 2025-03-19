const BaseController = require("./databaseController.js").baseController;

const checkAuthData = async (userObj, sessionObj) => {
    console.log("вызов функции checkAuthData -->")
    console.log(`User object: ${userObj.login} ${userObj.password}`)
    console.log(`Session object: ${sessionObj}`)
    // Проверка пользовательских данных
    let result = await BaseController.SelectUser(userObj.login, userObj.password)
    // BaseController.SelectUser(userObj.login, userObj.password)
    //     .then( data => {console.log(data)} )
    if (result) {
        console.log("Result: -->")
        console.log(result)
        
        return {"status": true, "userID": result.id}
    } else {
        console.log("Совпадений в базе не найденно")
        return {"code": false, "UserID": null} }
}

module.exports.checkAuthData = checkAuthData;