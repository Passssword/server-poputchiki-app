import * as express from 'express';
import { baseController } from '../source/databaseController.js'

export const advertsRouter = () => {

	const router = express.Router()

	router.get('/', (req: object, res: object) => {
	    baseController.GetAdverts()
	        .then( data => {
	            res.status(200)
	            return res.json( data )
	        })
	        .catch(err => console.log(err))
	});
	router.post('/', (req: object, res: object) => {
	    // const reqBody = JSON.parse(req.body)
	    console.log("Request POST --->")
	    console.log(req.body)
	    baseController.create(req.body, (error) => {
	        if(error) {return console.log(error)}
	    })
	    return res.json( {
	        status: 200,
	        comment: "data is sending"
	    } )
	});

	return router;
}