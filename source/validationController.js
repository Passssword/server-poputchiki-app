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
                return BaseController.addUser(requestData, (error) => {
                    if(error) {console.log(error)}
                }).then( data => {
                    return {
                        status: 200,
                        message: data
                    };
                })
                
            }
            
        })  
    }
}

module.exports.ValidationController = ValidationController;