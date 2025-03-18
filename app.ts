import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as path from 'path'
import {addRoutes} from './routes/routes'
import {serverDocxRouter} from './routes/serverDocx'
import {advertsRouter} from './routes/advertsRouter'
import {cookieMiddleware} from './session/cookieMiddleware.js'
import {sessionMiddleware} from './session/sessionMiddleware.js'

export const app = express();

 const corsOptions = {
  origin: 'http://localhost:3000',
  exposedHeaders: ['Authorization', 'Cookie'],
  credentials: true
};

app.use( bodyParser.json() )
app.use( cors(corsOptions) );
app.use(express.static('client'));
// app.use(cookieMiddleware)
app.use(sessionMiddleware)

app.use("/", serverDocxRouter(path, __dirname) )
app.use("/adverts", advertsRouter() )
addRoutes(app, path, __dirname)