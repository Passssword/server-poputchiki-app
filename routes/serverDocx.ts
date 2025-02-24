import * as express from 'express';
import { GenerateKey, keyObject } from '../source/encryptionAPI.js'

export const serverDocxRouter = (path: any, dirr: any) => {

	const router = express.Router()

	router.get('/', (req: object, res: object) => {
	    return (
	        // res.type('.html')
	        res.sendFile(path.resolve(dirr, 'client/index.html'))

	    )
	});
	router.get('/docx', (req: object, res: object) => {
	    return (
	        // res.type('.html')
	        res.sendFile(path.resolve(dirr, 'client/docx.html'))
	    )
	});
	router.get('/service-api', (req: object, res: object) => {
		res.status(200)
	    return res.json( keyObject )
	});

	return router;
}