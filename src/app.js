// ========================
// Get the packages we need
// ========================
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import CubejsServerCore from '@cubejs-backend/server-core';
import session from 'express-session';
import {dependencies} from './app.module';
import { authenticate, nonAuthenticate } from'./middleware/authentication';
import { logger } from'./middleware/logs';
import { validateJSONSyntax, validateContentType, defaultErrorHandler } from './middleware/errors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(helmet());
app.use(logger());
app.use(express.static(`${__dirname}/public`));
app.use(session({ secret: process.env.CUBEJS_API_SECRET }));
// cors & body parser middleware should come before any routes are handled
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '2mb', extended: false }));

// catch body parser json errors. must come directly after body parser
app.use(validateJSONSyntax);

// =======================
// Dynamic route loading
// =======================
if (Array.isArray(dependencies)) {
    for (let mod of dependencies) {
        const modPath = `./modules/${mod}/${mod}.router.js`;
        const parts = require(modPath);
        const basepath = parts.path || mod;
        app.use(`/${basepath}`, parts.routes(authenticate, nonAuthenticate));
    }
}

// post-routes middleware. Content type validation should come after routes so that
// auth middleware happens first. The default error handler should come last to catch
// all application errors and handle them in a consistent manner.
app.use(validateContentType);
app.use(defaultErrorHandler);

const serverCore = CubejsServerCore.create();
serverCore.initApp(app);


export default app;
module.exports = app;
