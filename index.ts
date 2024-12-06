import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as path from 'path'
import { locations } from './source/dataAccessLayer.js'
import { baseController } from './source/databaseController.js'

const app = express();
const port = 34587;

app.use( bodyParser.json() )
app.use( cors() );
app.use(express.static('client'));

app.get('/', (req: object, res: object) => {
    return (
        // res.type('.html')
        res.sendFile(path.resolve(__dirname, 'client/index.html'))
    )
});
app.get('/docx', (req: object, res: object) => {
    return (
        // res.type('.html')
        res.sendFile(path.resolve(__dirname, 'client/docx.html'))
    )
});
app.get('/adverts', (req: object, res: object) => {
    baseController.GetAdverts()
        .then( data => {
            res.status(200)
            return res.json( data )
        })
        .catch(err => console.log(err))
});
app.post('/adverts', (req: object, res: object) => {
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
app.get('/admin', (req: object, res: object) => {
    baseController.GetLocations()
        .then( data => {
            res.status(200)
            return res.json( data )
        })
        .catch(err => console.log(err))
});
app.post('/admin', (req: object, res: object) => {
    console.log(req.body)
    baseController.addTown(req.body, (error) => {
        if(error) {return console.log(error)}
    })
    return res.json( {
        status: 200,
        comment: `${req.body} was added to base`
    } )
});
app.delete('/towns/:townId', (req: object, res: object) => {
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
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});