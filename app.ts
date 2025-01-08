import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as path from 'path'
import {addRoutes} from './routes/routes'
import {serverDocxRouter} from './routes/serverDocx'
import {advertsRouter} from './routes/advertsRouter'

export const app = express();


app.use( bodyParser.json() )
app.use( cors() );
app.use(express.static('client'));

app.use("/", serverDocxRouter(path, __dirname) )
app.use("/adverts", advertsRouter() )
addRoutes(app, path, __dirname)