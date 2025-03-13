const BaseController = require("./databaseController.js").baseController;

const checkAuthData = async (userObj, sessionObj) => {
    console.log("вызов функции checkAuthData -->")
    console.log(`User object: ${userObj}`)
    console.log(`Session object: ${sessionObj}`)
    // Проверка пользовательских данных
    let result = await BaseController.SelectUser(userObj.login, userObj.password)
    if (result) { console.log(`Result: ${result}`) }
}

module.exports.checkAuthData = checkAuthData;