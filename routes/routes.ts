import {Express} from 'express';
import { baseController } from '../source/databaseController.js'
import { ValidationController } from '../source/validationController.js'
import { checkAuthData } from '../source/authorizationController.js'
import {
    RequestWithAddTown,
    RequestWithDeleteTown,
    AdminAddTownModel,
    DeleteTownModel
} from '../model/requestModel.ts'

export const addRoutes = (app: Express, path: any, dirr: any) => {

	app.get('/admin', (req: object, res: object) => {
	    baseController.GetLocations()
	        .then( data => {
	            res.status(200)
	            return res.json( data )
	        })
	        .catch(err => console.log(err))
	});
	app.get('/admin/getUsers', (req: object, res: object) => {
		baseController.GetAllUsers()
	        .then( data => {
	            res.status(200)
	            return res.json( data )
	        })
	        .catch(err => console.log(err))
	})
	app.post('/admin', (req: RequestWithAddTown<AdminAddTownModel>, res: object) => {
	    console.log(req.body)
	    baseController.addTown(req.body, (error) => {
	        if(error) {return console.log(error)}
	    })
	    return res.json( {
	        status: 200,
	        comment: `${req.body} was added to base`
	    } )
	});
	app.post('/admin/addUser', (req: object, res: object) => {
        console.log("Request /admin/addUser POST --->")
		let userObj = req.header('User-Object')

		// Декодирование из base64
		userObj = Buffer.from(userObj, 'base64').toString();
		//------------------------
		
		console.log(JSON.parse(userObj))

		ValidationController.VerifyUniqueLogin(JSON.parse(userObj))
			.then( result => {
				console.log(result.message)
				if (result.status == 422 ) {
					return res.json( {
						status: result.status,
						comment: result.message
					} )
				} else {
					return baseController.selectLastUser().then(lastUserId => {
						return res.json( {
							status: result.status,
							comment: result.message,
							userId: lastUserId
						} )
					})
				}
			})
    })
	app.delete('/towns/:townId', (req: RequestWithDeleteTown<DeleteTownModel>, res: object) => {
	    // res.status(200)
	    console.log("Request DELETE --->")
	    console.log(req.params)
	    const {townId} = req.params

	    baseController.deleteTown(townId, (error) => {
	        if(error) {return console.log(error)}
	    })

	    return res.json( {
	        status: 200,
	        comment: `was deleted to base`
	    } )
	});
	app.delete('/users/:userId', (req: object, res: object) => {
	    // res.status(200)
	    console.log("Request DELETE --->")
	    console.log(req.params)
	    const {userId} = req.params

	    baseController.deleteUser(userId, (error) => {
	        if(error) {return console.log(error)}
	    })

	    return res.json( {
	        status: 200,
	        comment: `was deleted to base`
	    } )
	});
	app.get("/api/1.0/auth", async (req: object, res: object) => {
		console.log("/api/1.0/auth --> Authorization Request")
		
		let userObjString = req.header('User-Object')
		// Декодирование из base64
		userObjString = Buffer.from(userObjString, 'base64').toString();

		let checkStatus = await checkAuthData( JSON.parse(userObjString), req.session )
		if (checkStatus.status) {
			// По учетным данным найденно соответствие
			// Далее нужно привязать UserID к сессии
			res.status(200)
			res.set( {
				'Cookie': '_session_key='+req.session.session_key,
				'expires': req.session.expiresDate,
			} )
			return res.json( {
				status: 200,
				comment: `Authorization success`,
				UserID: checkStatus.UserID
			} )
		} else {
			res.status(401)
			return res.json( {
				status: 401,
				comment: `Authorization error`
			} )
		 }
	
	})
}