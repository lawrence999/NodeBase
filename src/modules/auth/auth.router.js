import express from 'express';
import controller from './auth.controller';

const router = express.Router();

const routes = (authenticate, nonAuthenticate) => {
//use authenticate methord to authorize the api

	router.route("/")
		.post(nonAuthenticate,controller.login);

	return router;
}

module.exports = { routes, path: 'auth' };
