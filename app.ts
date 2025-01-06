import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as path from 'path'
import { locations } from './source/dataAccessLayer.js'
import { baseController } from './source/databaseController.js'
import {
    RequestWithAddTown,
    RequestWithDeleteTown,
    AdminAddTownModel,
    DeleteTownModel
} from './model/requestModel.ts'
import {addRoutes} from './routes/routes'

export const app = express();


app.use( bodyParser.json() )
app.use( cors() );
app.use(express.static('client'));

addRoutes(app, path, __dirname)

