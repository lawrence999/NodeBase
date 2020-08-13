import express from 'express';
import controller from './users.controller';

const router = express.Router();

const routes = (authenticate, nonAuthenticate) => {
//use authenticate methord to authorize the api
	router.route("/")
		.post(nonAuthenticate,controller.signup);
	return router;
}

module.exports = { routes, path: 'users'};
