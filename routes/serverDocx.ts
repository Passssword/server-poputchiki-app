import * as express from 'express';


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

	return router;
}