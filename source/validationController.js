const BaseController = require("./databaseController.js")

class ValidationController {
    static VerifyUniqueLogin (login) {
        BaseController.GetUsers().then( data => {
            console.log(data)
        })
        return true;
    }
}

module.exports.ValidationController = ValidationController;