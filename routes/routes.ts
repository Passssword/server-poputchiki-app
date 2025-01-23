import {Express} from 'express';
import { baseController } from '../source/databaseController.js'
import { ValidationController } from '../source/validationController.js'
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
		baseController.GetUsers()
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
	    console.log(req.body)

		ValidationController.VerifyUniqueLogin(req.body)
			.then( result => {
				console.log(result.message)
				if (result.status == 422 ) {
					return res.json( {
						status: result.status,
						comment: `${result.message}`
					} )
				} else {
					return res.json( {
						status: result.status,
						comment: `${result.message}`
					} )
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
}