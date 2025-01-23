const BaseController = require("./databaseController.js").baseController;

class ValidationController {
    
    static async VerifyUniqueLogin (requestData) {
        return BaseController.GetUsers().then( data => {
            
            if ( data.find( item => item.login == requestData.login) ){
                return {
                    status: 422,
                    message: 'В базе найдено совпадение, создание новой записи запрещенно'
                };
            } else {
                BaseController.addUser(requestData, (error) => {
                    if(error) {console.log(error)}
                })
                return {
                    status: 200,
                    message: 'Совпадений не найденно, создается новая запись'
                };
            }
            
        })  
    }
}

module.exports.ValidationController = ValidationController;