import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as path from 'path'
import {addRoutes} from './routes/routes'
import {serverDocxRouter} from './routes/serverDocx'
import {advertsRouter} from './routes/advertsRouter'
import {checkCookie} from './session/cookie.js'

export const app = express();
const corsOptions = {
  exposedHeaders: ['Authorization', 'Cookie'],
};

app.use( bodyParser.json() )
app.use( cors(corsOptions) );
app.use(express.static('client'));
app.use(checkCookie)

app.use("/", serverDocxRouter(path, __dirname) )
app.use("/adverts", advertsRouter() )
addRoutes(app, path, __dirname)